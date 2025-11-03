# Bluehive Payload CMS

Application Payload CMS pour le site web Bluehive avec Next.js 15 et PostgreSQL.

## 🚀 Technologies

- **Payload CMS** 3.60
- **Next.js** 15.4
- **PostgreSQL** 16
- **TypeScript** 5.7
- **Tailwind CSS** 4.1

## 📋 Prérequis

- Node.js >= 18.20.2 ou >= 20.9.0
- pnpm >= 9
- Docker & Docker Compose (optionnel)

## 🛠️ Développement local

### Option 1 : Sans Docker

1. **Clone le repository**

   ```bash
   git clone <repo-url>
   cd bluehive-payload
   ```

2. **Installe les dépendances**

   ```bash
   pnpm install
   ```

3. **Configure les variables d'environnement**

   ```bash
   cp .env.example .env
   ```

   - Le fichier `.env.example` contient toutes les variables nécessaires
   - Configurez les valeurs selon votre environnement local

4. **Lance le serveur de développement**

   ```bash
   pnpm dev
   ```

5. **Ouvre l'application**
   - Frontend : http://localhost:3000
   - Admin Panel : http://localhost:3000/admin

### Option 2 : Avec Docker (Recommandé)

**Développement :**

```bash
docker-compose -f docker-compose.dev.yml up
```

Les données de développement sont pré-configurées :

- Base de données : `bluehive_website`
- Utilisateur : `postgres`
- Mot de passe : `dev_password_123`

**Production :**

```bash
docker-compose -f docker-compose.yml up -d
```

Configure les variables d'environnement via `.env` pour la production.

## 📦 Collections

- **Users** : Authentification et gestion des utilisateurs
- **Media** : Gestion des médias (images, vidéos)
- **Projects** : Projets réalisés
- **ProjectCategories** : Catégories de projets
- **Services** : Services offerts

## 🧪 Tests

```bash
# Tests d'intégration
pnpm test:int

# Tests E2E
pnpm test:e2e

# Tous les tests
pnpm test
```

## 🏗️ Build Production

```bash
pnpm build
pnpm start
```

## 📚 Scripts disponibles

- `pnpm dev` : Serveur de développement
- `pnpm build` : Build production
- `pnpm start` : Serveur production
- `pnpm generate:types` : Génère les types Payload
- `pnpm lint` : Lint du code
- `pnpm test` : Lance tous les tests

### ⚠️ Important : Avant de commiter

Toujours lancer `pnpm lint` pour vérifier que votre code respecte les standards du projet !

## 👥 Travail en équipe

### Configuration pour un nouveau développeur

1. **Clone le projet**

   ```bash
   git clone <repo-url>
   cd bluehive-payload
   ```

2. **Installe les dépendances**

   ```bash
   pnpm install
   ```

3. **Configure ton environnement**

   ```bash
   cp .env.example .env
   ```

4. **Lance avec Docker** (recommandé)

   ```bash
   docker-compose -f docker-compose.dev.yml up
   ```

5. **Ou lance en local**
   - Assure-toi d'avoir PostgreSQL installé et démarré
   ```bash
   pnpm dev
   ```

### Workflow Git

- ✨ Crée une **nouvelle branche** pour chaque feature/fix
- 📝 Fais des **commits clairs** et descriptifs
- 🔍 Lance `pnpm lint` **avant de commiter**
- 💬 Ouvre une **Pull Request** pour review
- ✅ Les tests doivent **passer** avant de merger

### Standards de code

- **ESLint** : Configuration dans `eslint.config.mjs`
- **Prettier** : Configuration dans `.prettierrc.json`
- **TypeScript** : Types stricts activés
- **Tests** : Couvrir les nouvelles features

## 🐳 Différences Docker

### docker-compose.dev.yml

- Hot-reload activé
- Code monté en volume
- Valeurs par défaut pour le développement
- Pas de restart automatique

### docker-compose.yml

- Image containerisée
- Configuration via variables d'environnement
- Restart automatique
- Optimisé pour la production

## 📝 Notes

- Les migrations se trouvent dans `src/migrations/`
- Les types générés sont dans `src/payload-types.ts`
- La configuration Payload est dans `src/payload.config.ts`

## 🤝 Support

Pour toute question, contactez l'équipe de développement.
