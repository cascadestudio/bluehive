# Guide de Déploiement BlueHive

Ce guide explique comment sauvegarder la base de données depuis l'environnement de staging et déployer l'application complète (container Docker + base de données) sur le serveur Bluehive.

## Vue d'ensemble du processus

1. **Staging** : Populer la base de données avec le contenu validé
2. **Sauvegarde** : Exporter la base de données depuis le serveur de staging
3. **Packaging** : Préparer l'image Docker et la sauvegarde pour transfert
4. **Déploiement Bluehive** : Transférer et installer sur le serveur Bluehive
5. **Restauration** : Restaurer la base de données sur le serveur Bluehive

---

## Partie 1 : Sauvegarde depuis le serveur de staging

### Étape 1.1 : Se connecter au serveur de staging

```bash
ssh ubuntu@84.234.21.152
cd /var/www/bluehive
```

### Étape 1.2 : Vérifier que les conteneurs sont en cours d'exécution

```bash
docker-compose ps
```

Les deux services (`app` et `postgres`) doivent être `Up`.

### Étape 1.3 : Créer une sauvegarde de la base de données

```bash
# Créer un répertoire pour les sauvegardes
mkdir -p backups

# Créer la sauvegarde avec timestamp
docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backups/bluehive_backup_$(date +%Y%m%d_%H%M%S).sql

# Exemple de nom de fichier généré : bluehive_backup_20250115_143022.sql
```

**Alternative avec compression** (recommandé pour les grandes bases) :

```bash
docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website | gzip > backups/bluehive_backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Étape 1.4 : Vérifier la sauvegarde

```bash
# Vérifier la taille du fichier
ls -lh backups/

# Vérifier le contenu (premières lignes)
head -20 backups/bluehive_backup_*.sql
```

### Étape 1.5 : Télécharger la sauvegarde sur votre machine locale

```bash
# Depuis votre machine locale (pas sur le serveur)
scp ubuntu@84.234.21.152:/var/www/bluehive/backups/bluehive_backup_*.sql ./backups/
```

Ou si vous avez utilisé la compression :

```bash
scp ubuntu@84.234.21.152:/var/www/bluehive/backups/bluehive_backup_*.sql.gz ./backups/
```

---

## Partie 2 : Préparer le package pour Bluehive

### Étape 2.1 : Build de l'image Docker en production

Sur votre machine locale :

```bash
# Build de l'image de production
docker build -t bluehive-app:latest .

# Vérifier que l'image est créée
docker images | grep bluehive-app
```

### Étape 2.2 : Exporter l'image Docker

```bash
# Créer un répertoire pour le package Bluehive
mkdir -p bluehive-package

# Exporter l'image Docker
docker save bluehive-app:latest | gzip > bluehive-package/bluehive-app.tar.gz

# Vérifier la taille
ls -lh bluehive-package/bluehive-app.tar.gz
```

### Étape 2.3 : Copier les fichiers nécessaires

```bash
# Copier docker-compose.yml
cp docker-compose.yml bluehive-package/

# Copier la sauvegarde de la base de données
cp backups/bluehive_backup_*.sql bluehive-package/database_backup.sql

# Si vous avez utilisé la compression
cp backups/bluehive_backup_*.sql.gz bluehive-package/database_backup.sql.gz
```

### Étape 2.4 : Créer un fichier README pour Bluehive

```bash
cat > bluehive-package/README.md << 'EOF'
# BlueHive - Guide d'installation

## Contenu du package

- `bluehive-app.tar.gz` : Image Docker de l'application
- `docker-compose.yml` : Configuration Docker Compose
- `database_backup.sql` : Sauvegarde de la base de données
- `README.md` : Ce fichier

## Prérequis

- Docker installé
- Docker Compose installé
- Port 4000 disponible (ou modifier dans docker-compose.yml)

## Installation

Voir le fichier INSTALLATION.md pour les instructions détaillées.
EOF
```

### Étape 2.5 : Créer un script d'installation pour Bluehive

```bash
cat > bluehive-package/install.sh << 'EOF'
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
    echo "⚠️  IMPORTANT : Modifiez le fichier .env avec vos propres valeurs sécurisées !"
    echo "   - POSTGRES_PASSWORD : Mot de passe fort pour PostgreSQL"
    echo "   - PAYLOAD_SECRET : Secret aléatoire (générez avec : openssl rand -base64 32)"
    read -p "Appuyez sur Entrée après avoir modifié le fichier .env..."
fi

# Démarrer les conteneurs
echo "🚀 Démarrage des conteneurs..."
docker-compose up -d

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente de PostgreSQL..."
sleep 10

# Restaurer la base de données
echo "💾 Restauration de la base de données..."
if [ -f database_backup.sql.gz ]; then
    gunzip -c database_backup.sql.gz | docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website
elif [ -f database_backup.sql ]; then
    docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website < database_backup.sql
else
    echo "⚠️  Aucune sauvegarde trouvée. La base de données sera vide."
fi

echo "✅ Installation terminée !"
echo ""
echo "Vérifiez les logs avec : docker-compose logs -f app"
echo "Accédez à l'application sur : http://localhost:4000"
EOF

chmod +x bluehive-package/install.sh
```

### Étape 2.6 : Créer un guide d'installation détaillé

````bash
cat > bluehive-package/INSTALLATION.md << 'EOF'
# Guide d'Installation BlueHive

## Prérequis

- **Docker** version 20.10 ou supérieure
- **Docker Compose** version 2.0 ou supérieure
- **Port 4000** disponible (ou modifier dans `docker-compose.yml`)
- **Espace disque** : Au moins 5 Go libres

### Vérifier l'installation

```bash
docker --version
docker-compose --version
````

## Installation automatique (recommandé)

```bash
# Exécuter le script d'installation
./install.sh
```

Le script va :

1. Charger l'image Docker
2. Créer le fichier `.env` (si nécessaire)
3. Démarrer les conteneurs
4. Restaurer la base de données

**⚠️ IMPORTANT** : Avant de continuer, modifiez le fichier `.env` avec des valeurs sécurisées.

## Installation manuelle

### Étape 1 : Charger l'image Docker

```bash
gunzip -c bluehive-app.tar.gz | docker load
```

### Étape 2 : Configurer les variables d'environnement

Créez un fichier `.env` :

```env
# Database
POSTGRES_DB=bluehive_website
POSTGRES_USER=bluehive_user
POSTGRES_PASSWORD=VOTRE_MOT_DE_PASSE_SECURISE

# App
DATABASE_URI=postgres://bluehive_user:VOTRE_MOT_DE_PASSE_SECURISE@postgres:5432/bluehive_website
PAYLOAD_SECRET=GENERER_UN_SECRET_ALEATOIRE
NODE_ENV=production
APP_PORT=4000
```

**Générer un PAYLOAD_SECRET sécurisé :**

```bash
openssl rand -base64 32
```

### Étape 3 : Démarrer les conteneurs

```bash
docker-compose up -d
```

### Étape 4 : Attendre que PostgreSQL soit prêt

```bash
# Vérifier les logs
docker-compose logs postgres

# Attendre le message "database system is ready to accept connections"
```

### Étape 5 : Restaurer la base de données

Si vous avez un fichier `.sql` :

```bash
docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website < database_backup.sql
```

Si vous avez un fichier `.sql.gz` :

```bash
gunzip -c database_backup.sql.gz | docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website
```

### Étape 6 : Vérifier l'installation

```bash
# Vérifier que les conteneurs sont en cours d'exécution
docker-compose ps

# Vérifier les logs de l'application
docker-compose logs app

# Tester l'application
curl http://localhost:4000
```

## Accès à l'application

- **Frontend** : `http://localhost:4000` (ou l'IP de votre serveur)
- **Admin Payload** : `http://localhost:4000/admin`

## Configuration du reverse proxy (optionnel)

Si vous voulez utiliser un domaine et HTTPS, configurez Nginx ou Caddy.

### Exemple Nginx

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Commandes utiles

### Voir les logs

```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Redémarrer les services

```bash
docker-compose restart app
docker-compose restart postgres
```

### Arrêter les services

```bash
docker-compose down
```

### Arrêter et supprimer les données (⚠️ attention)

```bash
docker-compose down -v
```

### Sauvegarder la base de données

```bash
docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Dépannage

### Les conteneurs ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Vérifier les variables d'environnement
cat .env
```

### Erreur de connexion à la base de données

1. Vérifier que PostgreSQL est démarré : `docker-compose ps`
2. Vérifier les variables dans `.env`
3. Vérifier les logs PostgreSQL : `docker-compose logs postgres`

### L'application ne répond pas

1. Vérifier que le port 4000 est ouvert : `netstat -tlnp | grep 4000`
2. Vérifier les logs de l'application : `docker-compose logs app`
3. Tester localement : `curl http://localhost:4000`

## Support

Pour toute question, contactez l'équipe de développement.
EOF

````

### Étape 2.7 : Créer une archive complète

```bash
# Créer une archive tar du package Bluehive
tar -czf bluehive-package-$(date +%Y%m%d).tar.gz bluehive-package/

# Vérifier le contenu
tar -tzf bluehive-package-*.tar.gz
````

---

## Partie 3 : Transfert à Bluehive

### Option A : Transfert via SCP/SFTP

```bash
# Transférer l'archive à Bluehive
scp bluehive-package-*.tar.gz bluehive@serveur-bluehive:/chemin/destination/
```

### Option B : Partage via cloud (Dropbox, Google Drive, etc.)

1. Uploader l'archive sur votre service de cloud
2. Partager le lien avec Bluehive
3. Bluehive télécharge et extrait l'archive

### Option C : USB/Disque externe

1. Copier l'archive sur un support physique
2. Remettre à Bluehive
3. Bluehive extrait l'archive sur son serveur

---

## Partie 4 : Installation sur le serveur Bluehive

### Instructions pour Bluehive

Bluehive doit suivre les instructions dans `bluehive-package/README.md` (guide complet destiné à Bluehive) ou `bluehive-package/INSTALLATION.md` (guide technique détaillé).

**Résumé rapide :**

```bash
# 1. Extraire l'archive
tar -xzf bluehive-package-*.tar.gz
cd bluehive-package

# 2. Lire le README.md pour les instructions complètes
cat README.md

# 3. Exécuter le script d'installation
./install.sh

# 4. Modifier le fichier .env avec des valeurs sécurisées
nano .env

# 5. Redémarrer si nécessaire
docker-compose restart
```

**Note** : Le fichier `README.md` inclus dans le package est un guide complet et convivial destiné à Bluehive, avec toutes les instructions nécessaires pour installer, utiliser et maintenir l'application.

---

## Partie 5 : Vérification post-déploiement

### Checklist de vérification

- [ ] Les conteneurs sont en cours d'exécution (`docker-compose ps`)
- [ ] L'application répond (`curl http://localhost:4000`)
- [ ] L'admin Payload est accessible (`http://localhost:4000/admin`)
- [ ] La base de données contient les données (`docker-compose exec postgres psql -U bluehive_user -d bluehive_website -c "SELECT COUNT(*) FROM projects;"`)
- [ ] Les logs ne montrent pas d'erreurs (`docker-compose logs app`)

### Commandes de vérification

```bash
# Vérifier les conteneurs
docker-compose ps

# Vérifier les logs
docker-compose logs app | tail -50

# Vérifier la base de données
docker-compose exec postgres psql -U bluehive_user -d bluehive_website -c "\dt"

# Tester l'API
curl http://localhost:4000/api/projects
```

---

## Partie 6 : Sauvegarde régulière (pour Bluehive)

### Script de sauvegarde automatique

Créer un script `backup.sh` sur le serveur Bluehive :

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/bluehive"
mkdir -p $BACKUP_DIR

# Sauvegarde de la base de données
docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website | gzip > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Garder seulement les 7 dernières sauvegardes
ls -t $BACKUP_DIR/backup_*.sql.gz | tail -n +8 | xargs rm -f

echo "Sauvegarde créée : $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql.gz"
```

Ajouter au crontab pour une sauvegarde quotidienne :

```bash
# Sauvegarde tous les jours à 2h du matin
0 2 * * * /chemin/vers/backup.sh
```

---

## Résumé du workflow complet

```
┌─────────────────────────────────────────────────────────────┐
│ 1. STAGING                                                  │
│    - Populer la base de données                            │
│    - Valider le contenu                                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. SAUVEGARDE                                               │
│    - Exporter la DB depuis staging                          │
│    - Build de l'image Docker                                │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. PACKAGING                                                │
│    - Créer le package Bluehive                              │
│    - Inclure : image Docker + DB backup + scripts          │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. TRANSFERT                                                │
│    - Envoyer à Bluehive (SCP/Cloud/USB)                    │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. INSTALLATION BLUEHIVE                                    │
│    - Extraire l'archive                                     │
│    - Exécuter install.sh                                    │
│    - Configurer .env                                        │
│    - Restaurer la DB                                        │
└─────────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. VÉRIFICATION                                             │
│    - Tester l'application                                   │
│    - Vérifier les données                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Notes importantes

1. **Sécurité** : Bluehive doit modifier tous les mots de passe dans `.env`
2. **Backups** : Mettre en place des sauvegardes régulières sur le serveur Bluehive
3. **Mises à jour** : Pour mettre à jour l'application, répéter le processus avec une nouvelle image
4. **Support** : Fournir les instructions de dépannage à Bluehive

---

## Scripts rapides

### Script complet de préparation du package (à exécuter localement)

```bash
#!/bin/bash
# prepare-bluehive-package.sh

set -e

echo "=== Préparation du package Bluehive ==="

# Variables
STAGING_SERVER="ubuntu@84.234.21.152"
STAGING_PATH="/var/www/bluehive"
BACKUP_DIR="./backups"
PACKAGE_DIR="./bluehive-package"

# 1. Créer les répertoires
mkdir -p $BACKUP_DIR $PACKAGE_DIR

# 2. Télécharger la sauvegarde depuis staging
echo "📥 Téléchargement de la sauvegarde depuis staging..."
scp $STAGING_SERVER:$STAGING_PATH/backups/bluehive_backup_*.sql $BACKUP_DIR/ || {
    echo "⚠️  Aucune sauvegarde trouvée sur staging. Création d'une sauvegarde..."
    ssh $STAGING_SERVER "cd $STAGING_PATH && mkdir -p backups && docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website > backups/bluehive_backup_\$(date +%Y%m%d_%H%M%S).sql"
    scp $STAGING_SERVER:$STAGING_PATH/backups/bluehive_backup_*.sql $BACKUP_DIR/
}

# 3. Build de l'image Docker
echo "🔨 Build de l'image Docker..."
docker build -t bluehive-app:latest .

# 4. Exporter l'image
echo "📦 Export de l'image Docker..."
docker save bluehive-app:latest | gzip > $PACKAGE_DIR/bluehive-app.tar.gz

# 5. Copier les fichiers
echo "📋 Copie des fichiers..."
cp docker-compose.yml $PACKAGE_DIR/
cp $BACKUP_DIR/bluehive_backup_*.sql $PACKAGE_DIR/database_backup.sql

# 6. Créer l'archive
echo "📦 Création de l'archive..."
tar -czf bluehive-package-$(date +%Y%m%d).tar.gz $PACKAGE_DIR/

echo "✅ Package créé : bluehive-package-$(date +%Y%m%d).tar.gz"
echo ""
echo "📤 Transférez cette archive à Bluehive et suivez les instructions dans CLIENT_DEPLOYMENT.md"
```

Sauvegardez ce script dans `scripts/prepare-bluehive-package.sh` et rendez-le exécutable :

```bash
chmod +x scripts/prepare-bluehive-package.sh
```
