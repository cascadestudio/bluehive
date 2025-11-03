# Bluehive Payload CMS

Application Payload CMS pour le site web Bluehive avec Next.js 15 et PostgreSQL.

## 🚀 Technologies

- **Payload CMS** 3.60
- **Next.js** 15.4
- **PostgreSQL** 16
- **TypeScript** 5.7
- **Tailwind CSS** 4.1

## 📋 Prérequis

**Unique prérequis : Docker & Docker Compose**

Tout le reste (Node.js, pnpm, PostgreSQL) est géré automatiquement dans Docker ! 🎉

## 🚀 Démarrage rapide

### 1. Clone le repository

```bash
git clone <repo-url>
cd bluehive-payload
```

### 2. Lance le projet

```bash
docker-compose -f docker-compose.dev.yml up
```

C'est tout ! Docker va :

- ✅ Télécharger toutes les dépendances
- ✅ Créer la base de données PostgreSQL
- ✅ Lancer Next.js en mode développement
- ✅ Activer le hot-reload

### 3. Ouvre l'application

- **Frontend** : http://localhost:3000
- **Admin Panel** : http://localhost:3000/admin

Les identifiants de développement sont pré-configurés dans le fichier `docker-compose.dev.yml`.

## 🛠️ Commandes utiles

### Afficher les logs

```bash
# Tous les logs
docker-compose -f docker-compose.dev.yml logs -f

# Logs Next.js uniquement
docker-compose -f docker-compose.dev.yml logs -f app

# Logs PostgreSQL uniquement
docker-compose -f docker-compose.dev.yml logs -f postgres
```

### Arrêter le projet

```bash
# Arrêter les conteneurs
docker-compose -f docker-compose.dev.yml down

# Arrêter + supprimer les volumes (⚠️ supprime la DB)
docker-compose -f docker-compose.dev.yml down -v
```

### Redémarrer après un changement

```bash
docker-compose -f docker-compose.dev.yml restart
```

### Accéder au shell du conteneur app

```bash
docker-compose -f docker-compose.dev.yml exec app sh
```

## 📦 Collections

- **Users** : Authentification et gestion des utilisateurs
- **Media** : Gestion des médias (images, vidéos)
- **Projects** : Projets réalisés
- **ProjectCategories** : Catégories de projets
- **Services** : Services offerts

## 🧪 Tests

Les tests sont configurés et peuvent être lancés via Docker ou localement si vous avez pnpm installé.

```bash
# Via Docker
docker-compose -f docker-compose.dev.yml exec app pnpm test

# Ou en local si vous avez pnpm installé
pnpm test
```

## 🏗️ Production

### Build l'image

```bash
docker build -t bluehive-app:latest .
```

### Lance en production

```bash
docker-compose -f docker-compose.yml up -d
```

⚠️ Configure les variables d'environnement via `.env` avant de lancer la production.

## 📝 Configuration

### Développement

Tout est configuré dans `docker-compose.dev.yml` :

- Base de données : `bluehive_website`
- Utilisateur : `postgres`
- Mot de passe : `dev_password_123`
- Port : `3000`

### Production

Utilise `docker-compose.yml` avec les variables d'environnement du fichier `.env`.

## 👥 Nouveau développeur ?

1. Clone le projet
2. Lance `docker-compose -f docker-compose.dev.yml up`
3. C'est tout ! 🎉

Aucune installation de Node.js, pnpm ou PostgreSQL nécessaire.

## 🔧 Dépannage

### Le projet ne démarre pas

```bash
# Nettoie tout et recommence
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up --build
```

### La base de données est corrompue ou vide

```bash
# Supprime la DB et recrée-la
docker-compose -f docker-compose.dev.yml down -v
docker-compose -f docker-compose.dev.yml up

# Ensuite, restaure les données depuis le backup
docker exec -i bluehive-postgres-1 psql -U postgres -d bluehive_website < backup.sql
```

### Port déjà utilisé

Modifie le port dans `docker-compose.dev.yml` :

```yaml
ports:
  - '3001:3000' # Change 3000 en 3001 (ou autre)
```

## 📚 Fichiers importants

- `docker-compose.dev.yml` : Configuration Docker pour le développement
- `docker-compose.yml` : Configuration Docker pour la production
- `.env.example` : Exemple de variables d'environnement
- `src/payload.config.ts` : Configuration Payload CMS
- `src/collections/` : Définition des collections

## 🤝 Support

Pour toute question, contactez l'équipe de développement.
