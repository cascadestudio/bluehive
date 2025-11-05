# Guide de Déploiement Bluehive

Ce guide explique comment déployer l'application Bluehive sur votre serveur Ubuntu.

## Prérequis

- Docker installé sur votre machine locale (macOS)
- Docker installé sur le serveur Ubuntu
- Accès SSH au serveur Ubuntu
- Clé SSH configurée

## Déploiement Automatique

### 1. Build et Upload de l'image

Exécutez le script de déploiement :

```bash
./scripts/build-and-transfer.sh
```

Ce script va :

1. Build l'image Docker `bluehive-app:latest`
2. La compresser en `bluehive-app.tar.gz`
3. L'uploader sur le serveur via SCP
4. La charger dans Docker sur le serveur

### 2. Déploiement sur le serveur

Une fois l'image uploadée, connectez-vous au serveur :

```bash
ssh ubuntu@84.234.21.152
cd /var/www/bluehive
```

Arrêtez les containers existants (preserve la base de données) :

```bash
docker-compose down
```

Redémarrez avec la nouvelle image :

```bash
docker-compose up -d
```

Vérifiez que tout fonctionne :

```bash
docker-compose ps
docker-compose logs app
```

## Déploiement Manuel

Si vous préférez un déploiement manuel :

### 1. Build local

```bash
docker build -t bluehive-app:latest .
```

### 2. Sauvegarde de l'image

```bash
docker save bluehive-app:latest | gzip > bluehive-app.tar.gz
```

### 3. Upload sur le serveur

```bash
scp bluehive-app.tar.gz ubuntu@84.234.21.152:/var/www/bluehive/
```

### 4. Chargement sur le serveur

```bash
ssh ubuntu@84.234.21.152
cd /var/www/bluehive
gunzip -c bluehive-app.tar.gz | docker load
```

### 5. Redémarrage des services

```bash
docker-compose down
docker-compose up -d
```

## Structure du Projet sur le Serveur

```
/var/www/bluehive/
├── docker-compose.yml      # Configuration Docker Compose
├── .env                    # Variables d'environnement (non versionné)
├── backup.sql              # Backup de la base de données
├── bluehive-app.tar.gz     # Image Docker compressée
└── Dockerfile              # (optionnel, pour rebuild local)
```

## Base de Données

⚠️ **IMPORTANT** : La base de données est stockée dans un volume Docker nommé `postgres_data`.

### Backup de la base de données

```bash
docker exec bluehive_postgres_1 pg_dump -U postgres bluehive_website > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restauration de la base de données

```bash
docker exec -i bluehive_postgres_1 psql -U postgres bluehive_website < backup.sql
```

## Volumes Docker

Les données persistantes sont stockées dans ces volumes :

- `postgres_data` : Base de données PostgreSQL
- Les volumes sont préservés lors des `docker-compose down`

## Variables d'Environnement

Créez un fichier `.env` sur le serveur avec ces variables :

```env
# Database
POSTGRES_DB=bluehive_website
POSTGRES_USER=postgres
POSTGRES_PASSWORD=votre_mot_de_passe_securise

# App
DATABASE_URI=postgres://postgres:votre_mot_de_passe_securise@postgres:5432/bluehive_website
PAYLOAD_SECRET=votre_secret_très_long_et_aléatoire
NODE_ENV=production
APP_PORT=4000
```

## Dépannage

### Site inaccessible en production

**1. Vérifier que les conteneurs sont en cours d'exécution :**

```bash
ssh ubuntu@84.234.21.152
cd /var/www/bluehive
docker-compose ps
```

Les deux services (`app` et `postgres`) doivent être `Up`.

**2. Vérifier les logs de l'application :**

```bash
docker-compose logs app
```

Cherchez des erreurs comme :

- `DATABASE_URI` manquant
- `PAYLOAD_SECRET` manquant
- Erreurs de connexion à la base de données
- Erreurs de build Next.js

**3. Vérifier que le port est exposé :**

```bash
docker-compose ps
# Vérifiez que vous voyez : 0.0.0.0:4000->3000/tcp (ou le port configuré dans APP_PORT)
```

**4. Tester depuis le serveur :**

```bash
# Depuis le serveur, tester localement
curl http://localhost:4000
# ou
curl http://127.0.0.1:4000
```

Si ça fonctionne localement mais pas depuis l'extérieur :

- Vérifiez le firewall (UFW)
- Vérifiez le reverse proxy (Nginx/Caddy)
- Vérifiez que le port est ouvert dans le firewall du fournisseur cloud

**5. Vérifier les variables d'environnement :**

```bash
# Vérifier que le fichier .env existe
ls -la /var/www/bluehive/.env

# Vérifier les variables dans le conteneur
docker-compose exec app env | grep -E "DATABASE_URI|PAYLOAD_SECRET|NODE_ENV"
```

**6. Vérifier le firewall :**

```bash
# Vérifier les ports ouverts
sudo ufw status
# Si le port 4000 n'est pas ouvert :
sudo ufw allow 4000/tcp
```

**7. Vérifier le reverse proxy (si configuré) :**

Si vous utilisez Nginx ou Caddy, vérifiez la configuration :

```bash
# Nginx
sudo nginx -t
sudo systemctl status nginx

# Vérifier la configuration du site
sudo cat /etc/nginx/sites-available/bluehive
```

**8. Redémarrer proprement :**

```bash
cd /var/www/bluehive
docker-compose down
docker-compose up -d
docker-compose logs -f app
```

### Voir les logs

```bash
docker-compose logs -f app
docker-compose logs -f postgres
```

### Redémarrer un service

```bash
docker-compose restart app
docker-compose restart postgres
```

### Accéder au container

```bash
docker-compose exec app sh
```

### Vérifier les volumes

```bash
docker volume ls
docker volume inspect bluehive_postgres_data
```

### Purger et redémarrer (⚠️ Attention : supprime les données !)

```bash
docker-compose down -v  # Supprime les volumes
docker-compose up -d
```

## Rollback

Pour revenir à une version précédente :

1. Rebuild d'une version antérieure
2. Upload de l'image
3. Restart des services

## Sécurité

- Ne commitez jamais le fichier `.env`
- Utilisez des mots de passe forts
- Configurez un firewall approprié
- Utilisez HTTPS en production avec un reverse proxy (Nginx/Caddy)
- Configurez des backups automatiques

## Support

Pour toute question, consultez :

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Payload CMS](https://payloadcms.com/docs)
- [Documentation Docker](https://docs.docker.com/)
