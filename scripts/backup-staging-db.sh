#!/bin/bash
# Script de sauvegarde de la base de données depuis le serveur de staging
# À exécuter sur le serveur de staging ou depuis votre machine locale

set -e

# Configuration
STAGING_SERVER="ubuntu@84.234.21.152"
STAGING_PATH="/var/www/bluehive"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="bluehive_backup_${TIMESTAMP}.sql"

echo "=== Sauvegarde de la base de données BlueHive ==="
echo ""

# Vérifier si on est sur le serveur de staging ou en local
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    # On est sur le serveur de staging
    echo "📍 Exécution sur le serveur de staging"
    cd /var/www/bluehive
    BACKUP_PATH="./backups"
else
    # On est en local, se connecter au serveur
    echo "📍 Exécution depuis la machine locale"
    echo "🔌 Connexion au serveur de staging..."
    BACKUP_PATH="/tmp"
fi

# Créer le répertoire de sauvegarde
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    mkdir -p backups
else
    ssh $STAGING_SERVER "mkdir -p $STAGING_PATH/backups"
fi

# Créer la sauvegarde
echo "💾 Création de la sauvegarde..."
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    # Sur le serveur
    docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backups/$BACKUP_NAME
    BACKUP_FILE="backups/$BACKUP_NAME"
else
    # Depuis la machine locale
    ssh $STAGING_SERVER "cd $STAGING_PATH && docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backups/$BACKUP_NAME"
    BACKUP_FILE="$STAGING_PATH/backups/$BACKUP_NAME"
fi

# Compresser la sauvegarde (optionnel mais recommandé)
echo "📦 Compression de la sauvegarde..."
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    # Sur le serveur
    gzip backups/$BACKUP_NAME
    BACKUP_FILE_GZ="backups/${BACKUP_NAME}.gz"
    BACKUP_SIZE=$(du -h backups/${BACKUP_NAME}.gz | cut -f1)
else
    # Depuis la machine locale
    ssh $STAGING_SERVER "cd $STAGING_PATH && gzip backups/$BACKUP_NAME"
    BACKUP_FILE_GZ="$STAGING_PATH/backups/${BACKUP_NAME}.gz"
    BACKUP_SIZE=$(ssh $STAGING_SERVER "du -h $STAGING_PATH/backups/${BACKUP_NAME}.gz | cut -f1")
fi

# Télécharger la sauvegarde si on est en local
if [ ! -f "/var/www/bluehive/docker-compose.yml" ]; then
    echo "📥 Téléchargement de la sauvegarde..."
    mkdir -p $BACKUP_DIR
    scp $STAGING_SERVER:$BACKUP_FILE_GZ $BACKUP_DIR/
    echo "✅ Sauvegarde téléchargée : $BACKUP_DIR/${BACKUP_NAME}.gz"
fi

# Afficher le résumé
echo ""
echo "✅ Sauvegarde créée avec succès !"
echo ""
echo "📋 Détails :"
echo "   - Fichier : ${BACKUP_NAME}.gz"
echo "   - Taille : $BACKUP_SIZE"
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    echo "   - Emplacement : $(pwd)/backups/${BACKUP_NAME}.gz"
else
    echo "   - Emplacement local : $BACKUP_DIR/${BACKUP_NAME}.gz"
    echo "   - Emplacement serveur : $STAGING_SERVER:$BACKUP_FILE_GZ"
fi
echo ""

# Option : Garder seulement les N dernières sauvegardes
KEEP_BACKUPS=10
echo "🧹 Nettoyage des anciennes sauvegardes (garde les $KEEP_BACKUPS plus récentes)..."
if [ -f "/var/www/bluehive/docker-compose.yml" ]; then
    # Sur le serveur
    ls -t backups/bluehive_backup_*.sql.gz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true
else
    # Depuis la machine locale
    ssh $STAGING_SERVER "cd $STAGING_PATH && ls -t backups/bluehive_backup_*.sql.gz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true"
    ls -t $BACKUP_DIR/bluehive_backup_*.sql.gz 2>/dev/null | tail -n +$((KEEP_BACKUPS + 1)) | xargs rm -f 2>/dev/null || true
fi

echo "✅ Nettoyage terminé"
echo ""

