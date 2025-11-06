#!/bin/bash
# Script de préparation du package Bluehive
# Ce script prépare tout le nécessaire pour déployer sur le serveur Bluehive

set -e

echo "=== Préparation du package Bluehive ==="
echo ""

# Variables
STAGING_SERVER="ubuntu@84.234.21.152"
STAGING_PATH="/var/www/bluehive"
BACKUP_DIR="./backups"
PACKAGE_DIR="./bluehive-package"

# 1. Créer les répertoires
echo "📁 Création des répertoires..."
mkdir -p $BACKUP_DIR $PACKAGE_DIR

# 2. Télécharger la sauvegarde depuis staging
echo "📥 Téléchargement de la sauvegarde depuis staging..."
LATEST_BACKUP=$(ssh $STAGING_SERVER "ls -t $STAGING_PATH/backups/bluehive_backup_*.sql 2>/dev/null | head -1" || echo "")

if [ -z "$LATEST_BACKUP" ]; then
    echo "⚠️  Aucune sauvegarde trouvée sur staging. Création d'une sauvegarde..."
    ssh $STAGING_SERVER "cd $STAGING_PATH && mkdir -p backups && docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backups/bluehive_backup_\$(date +%Y%m%d_%H%M%S).sql"
    LATEST_BACKUP=$(ssh $STAGING_SERVER "ls -t $STAGING_PATH/backups/bluehive_backup_*.sql | head -1")
fi

scp $STAGING_SERVER:$LATEST_BACKUP $BACKUP_DIR/
BACKUP_FILE=$(basename $LATEST_BACKUP)
echo "✅ Sauvegarde téléchargée : $BACKUP_FILE"

# 3. Build de l'image Docker
echo ""
echo "🔨 Build de l'image Docker..."
docker build -t bluehive-app:latest .

# 4. Exporter l'image
echo ""
echo "📦 Export de l'image Docker..."
docker save bluehive-app:latest | gzip > $PACKAGE_DIR/bluehive-app.tar.gz
echo "✅ Image exportée : $(du -h $PACKAGE_DIR/bluehive-app.tar.gz | cut -f1)"

# 5. Copier les fichiers nécessaires
echo ""
echo "📋 Copie des fichiers..."
cp docker-compose.yml $PACKAGE_DIR/
cp $BACKUP_DIR/$BACKUP_FILE $PACKAGE_DIR/database_backup.sql

# 6. Créer les fichiers d'installation
echo ""
echo "📝 Création des fichiers d'installation..."

# Script d'installation
cat > $PACKAGE_DIR/install.sh << 'INSTALL_EOF'
#!/bin/bash

set -e

echo "=== Installation de BlueHive ==="

# Vérifier Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Charger l'image Docker
echo "📦 Chargement de l'image Docker..."
gunzip -c bluehive-app.tar.gz | docker load

# Créer le fichier .env si il n'existe pas
if [ ! -f .env ]; then
    echo "📝 Création du fichier .env..."
    cat > .env << 'ENVEOF'
# Database
POSTGRES_DB=bluehive_website
POSTGRES_USER=bluehive_user
POSTGRES_PASSWORD=CHANGEZ_MOI_AVEC_UN_MOT_DE_PASSE_SECURISE

# App
DATABASE_URI=postgres://bluehive_user:CHANGEZ_MOI_AVEC_UN_MOT_DE_PASSE_SECURISE@postgres:5432/bluehive_website
PAYLOAD_SECRET=GENERER_UN_SECRET_ALEATOIRE_TRES_LONG_ICI
NODE_ENV=production
APP_PORT=4000
ENVEOF
    echo ""
    echo "⚠️  IMPORTANT : Modifiez le fichier .env avec vos propres valeurs sécurisées !"
    echo "   - POSTGRES_PASSWORD : Mot de passe fort pour PostgreSQL"
    echo "   - PAYLOAD_SECRET : Secret aléatoire (générez avec : openssl rand -base64 32)"
    echo ""
    read -p "Appuyez sur Entrée après avoir modifié le fichier .env..."
fi

# Démarrer les conteneurs
echo "🚀 Démarrage des conteneurs..."
docker-compose up -d

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de PostgreSQL (10 secondes)..."
sleep 10

# Vérifier que PostgreSQL est prêt
echo "🔍 Vérification de PostgreSQL..."
for i in {1..30}; do
    if docker-compose exec -T postgres pg_isready -U bluehive_user > /dev/null 2>&1; then
        echo "✅ PostgreSQL est prêt"
        break
    fi
    if [ $i -eq 30 ]; then
        echo "❌ PostgreSQL n'est pas prêt après 30 tentatives"
        exit 1
    fi
    sleep 1
done

# Restaurer la base de données
echo "💾 Restauration de la base de données..."
if [ -f database_backup.sql.gz ]; then
    echo "   Restauration depuis database_backup.sql.gz..."
    gunzip -c database_backup.sql.gz | docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website
elif [ -f database_backup.sql ]; then
    echo "   Restauration depuis database_backup.sql..."
    docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website < database_backup.sql
else
    echo "⚠️  Aucune sauvegarde trouvée. La base de données sera vide."
fi

echo ""
echo "✅ Installation terminée !"
echo ""
echo "📋 Commandes utiles :"
echo "   - Voir les logs : docker-compose logs -f app"
echo "   - Vérifier les conteneurs : docker-compose ps"
echo "   - Accéder à l'application : http://localhost:4000"
echo "   - Accéder à l'admin : http://localhost:4000/admin"
INSTALL_EOF

chmod +x $PACKAGE_DIR/install.sh

# Copier le README client complet
if [ -f CLIENT_README.md ]; then
    echo "📄 Copie du README Bluehive..."
    cp CLIENT_README.md $PACKAGE_DIR/README.md
else
    # Créer un README basique si CLIENT_README.md n'existe pas
    cat > $PACKAGE_DIR/README.md << 'README_EOF'
# BlueHive - Package d'installation

## Contenu du package

- `bluehive-app.tar.gz` : Image Docker de l'application
- `docker-compose.yml` : Configuration Docker Compose
- `database_backup.sql` : Sauvegarde de la base de données
- `install.sh` : Script d'installation automatique
- `INSTALLATION.md` : Guide d'installation détaillé
- `README.md` : Ce fichier

## Installation rapide

1. Extraire l'archive :
   ```bash
   tar -xzf bluehive-package-*.tar.gz
   cd bluehive-package
   ```

2. Exécuter le script d'installation :
   ```bash
   ./install.sh
   ```

3. Modifier le fichier `.env` avec des valeurs sécurisées

4. Redémarrer si nécessaire :
   ```bash
   docker-compose restart
   ```

## Prérequis

- Docker version 20.10+
- Docker Compose version 2.0+
- Port 4000 disponible

## Support

Consultez `INSTALLATION.md` pour plus de détails.
README_EOF
fi

# Copier le guide d'installation depuis CLIENT_DEPLOYMENT.md (section INSTALLATION.md)
if [ -f CLIENT_DEPLOYMENT.md ]; then
    # Extraire la section INSTALLATION.md du fichier CLIENT_DEPLOYMENT.md
    sed -n '/^```bash$/,/^```$/p' CLIENT_DEPLOYMENT.md | grep -v '^```' > $PACKAGE_DIR/INSTALLATION.md || true
fi

# Si le fichier INSTALLATION.md n'a pas été créé correctement, créer une version basique
if [ ! -s $PACKAGE_DIR/INSTALLATION.md ]; then
    cat > $PACKAGE_DIR/INSTALLATION.md << 'INSTALL_GUIDE_EOF'
# Guide d'Installation BlueHive

Voir CLIENT_DEPLOYMENT.md pour les instructions complètes.
INSTALL_GUIDE_EOF
fi

# 7. Créer l'archive finale
echo ""
echo "📦 Création de l'archive finale..."
ARCHIVE_NAME="bluehive-package-$(date +%Y%m%d).tar.gz"
tar -czf $ARCHIVE_NAME $PACKAGE_DIR/

# Afficher le résumé
echo ""
echo "✅ Package créé avec succès !"
echo ""
echo "📦 Archive : $ARCHIVE_NAME"
echo "📊 Taille : $(du -h $ARCHIVE_NAME | cut -f1)"
echo ""
echo "📋 Contenu du package :"
ls -lh $PACKAGE_DIR/
echo ""
echo "📤 Prochaines étapes :"
echo "   1. Transférez l'archive à Bluehive :"
echo "      scp $ARCHIVE_NAME bluehive@serveur:/chemin/destination/"
echo ""
echo "   2. Bluehive doit :"
echo "      - Extraire l'archive : tar -xzf $ARCHIVE_NAME"
echo "      - Suivre les instructions dans bluehive-package/INSTALLATION.md"
echo ""

