#!/bin/bash
# Script pour restaurer les données de staging dans l'environnement de dev
# À exécuter depuis la racine du projet

set -e

BACKUP_DIR="./backups"
COMPOSE_FILE="docker-compose.dev.yml"

echo "=== Restauration des données de staging en dev ==="
echo ""

# Vérifier que docker-compose est en cours d'exécution
if ! docker-compose -f $COMPOSE_FILE ps | grep -q "Up"; then
    echo "⚠️  Les conteneurs ne sont pas démarrés. Démarrage..."
    docker-compose -f $COMPOSE_FILE up -d
    echo "⏳ Attente que PostgreSQL soit prêt..."
    sleep 10
fi

# Trouver le fichier de sauvegarde le plus récent
if [ -d "$BACKUP_DIR" ]; then
    BACKUP_FILE=$(ls -t $BACKUP_DIR/bluehive_backup_*.sql.gz 2>/dev/null | head -1)
    
    if [ -z "$BACKUP_FILE" ]; then
        echo "❌ Aucune sauvegarde trouvée dans $BACKUP_DIR"
        echo ""
        echo "💡 Pour récupérer une sauvegarde depuis staging, exécutez :"
        echo "   ./scripts/backup-staging-db.sh"
        exit 1
    fi
else
    echo "❌ Le répertoire $BACKUP_DIR n'existe pas"
    echo ""
    echo "💡 Pour récupérer une sauvegarde depuis staging, exécutez :"
    echo "   ./scripts/backup-staging-db.sh"
    exit 1
fi

echo "📦 Sauvegarde trouvée : $(basename $BACKUP_FILE)"
echo ""

# Demander confirmation
read -p "⚠️  Cette opération va remplacer toutes les données de dev. Continuer ? (o/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Oo]$ ]]; then
    echo "❌ Opération annulée"
    exit 1
fi

# Obtenir le nom du conteneur PostgreSQL
POSTGRES_CONTAINER=$(docker-compose -f $COMPOSE_FILE ps -q postgres)

if [ -z "$POSTGRES_CONTAINER" ]; then
    echo "❌ Le conteneur PostgreSQL n'est pas trouvé"
    exit 1
fi

echo "🔄 Suppression des données existantes..."
# Supprimer et recréer la base de données
docker-compose -f $COMPOSE_FILE exec -T postgres psql -U postgres -c "DROP DATABASE IF EXISTS bluehive_website;"
docker-compose -f $COMPOSE_FILE exec -T postgres psql -U postgres -c "CREATE DATABASE bluehive_website;"

echo "💾 Restauration de la sauvegarde..."
# Restaurer la sauvegarde
# Note: La sauvegarde peut contenir des références à 'bluehive_user', 
# mais on restaure avec 'postgres' qui est l'utilisateur de dev
# On utilise sed pour remplacer les références à bluehive_user par postgres si nécessaire
gunzip -c "$BACKUP_FILE" | sed 's/bluehive_user/postgres/g' | docker-compose -f $COMPOSE_FILE exec -T postgres psql -U postgres -d bluehive_website

echo ""
echo "✅ Restauration terminée avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "   1. Vérifiez les logs : docker-compose -f $COMPOSE_FILE logs app"
echo "   2. Accédez à l'application : http://localhost:3000"
echo "   3. Accédez à l'admin : http://localhost:3000/admin"
echo ""
echo "⚠️  Note : Les mots de passe des utilisateurs de staging sont conservés."
echo "   Vous devrez peut-être réinitialiser les mots de passe pour vous connecter en dev."

