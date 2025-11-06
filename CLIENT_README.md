# BlueHive - Guide d'Installation et d'Utilisation

Bienvenue dans le guide d'installation de votre site web BlueHive. Ce document vous accompagne étape par étape pour installer et utiliser votre application.

---

## 📋 Table des matières

1. [Présentation](#présentation)
2. [Prérequis](#prérequis)
3. [Installation](#installation)
4. [Première utilisation](#première-utilisation)
5. [Gestion du contenu](#gestion-du-contenu)
6. [Maintenance](#maintenance)
7. [Dépannage](#dépannage)
8. [Support](#support)

---

## 🎯 Présentation

BlueHive est votre site web professionnel avec un système de gestion de contenu (CMS) intégré. Il vous permet de :

- ✅ Gérer vos projets et services
- ✅ Modifier le contenu sans connaissances techniques
- ✅ Ajouter des images et médias
- ✅ Publier en français et en anglais
- ✅ Accéder à une interface d'administration intuitive

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir :

- **Docker** installé sur votre serveur (version 20.10 ou supérieure)
- **Docker Compose** installé (version 2.0 ou supérieure)
- **Port 4000** disponible (ou un autre port de votre choix)
- **Espace disque** : Au moins 5 Go libres

### Vérifier l'installation de Docker

Ouvrez un terminal sur votre serveur et exécutez :

```bash
docker --version
docker-compose --version
```

Si ces commandes affichent des numéros de version, Docker est installé. Sinon, consultez la [documentation Docker](https://docs.docker.com/get-docker/) pour installer Docker.

---

## 🚀 Installation

### Option 1 : Installation automatique (recommandé)

1. **Extraire l'archive** que vous avez reçue :

   ```bash
   tar -xzf bluehive-package-*.tar.gz
   cd bluehive-package
   ```

2. **Exécuter le script d'installation** :

   ```bash
   ./install.sh
   ```

3. **Configurer la sécurité** :

   Le script va créer un fichier `.env`. **IMPORTANT** : Vous devez modifier ce fichier avec vos propres mots de passe sécurisés.

   ```bash
   nano .env
   ```

   Modifiez ces valeurs :
   - `POSTGRES_PASSWORD` : Choisissez un mot de passe fort pour la base de données
   - `PAYLOAD_SECRET` : Générez un secret aléatoire avec cette commande :
     ```bash
     openssl rand -base64 32
     ```
     Copiez le résultat et collez-le dans `PAYLOAD_SECRET`

4. **Redémarrer l'application** :

   ```bash
   docker-compose restart
   ```

5. **Vérifier que tout fonctionne** :

   ```bash
   docker-compose ps
   ```

   Vous devriez voir deux services (`app` et `postgres`) avec le statut `Up`.

### Option 2 : Installation manuelle

Si vous préférez installer manuellement, consultez le fichier `INSTALLATION.md` inclus dans le package pour les instructions détaillées.

---

## 🎉 Première utilisation

### Accéder à votre site

Une fois l'installation terminée, votre site est accessible à :

- **Site web** : `http://votre-serveur:4000`
- **Interface d'administration** : `http://votre-serveur:4000/admin`

### Créer votre premier compte administrateur

1. Accédez à `http://votre-serveur:4000/admin`
2. Cliquez sur "Create First User" ou "Créer le premier utilisateur"
3. Remplissez le formulaire :
   - Email : votre adresse email
   - Mot de passe : choisissez un mot de passe fort
4. Cliquez sur "Create"

**Félicitations !** Vous pouvez maintenant gérer votre site.

---

## 📝 Gestion du contenu

### Interface d'administration

L'interface d'administration vous permet de gérer :

- **Projets** : Ajouter, modifier ou supprimer vos projets
- **Services** : Gérer vos services et leurs descriptions
- **Catégories** : Organiser vos projets par catégories
- **Médias** : Uploader et gérer vos images
- **Utilisateurs** : Gérer les comptes administrateurs

### Ajouter un projet

1. Connectez-vous à `/admin`
2. Cliquez sur "Projects" dans le menu de gauche
3. Cliquez sur "Create New"
4. Remplissez les informations :
   - **Titre** : Nom du projet (en français et en anglais)
   - **Description** : Description détaillée
   - **Image** : Uploader une image de présentation
   - **Catégories** : Sélectionner les catégories
5. Cliquez sur "Save"

### Modifier le contenu

Pour modifier un élément existant :

1. Accédez à la section concernée (Projects, Services, etc.)
2. Cliquez sur l'élément à modifier
3. Modifiez les champs souhaités
4. Cliquez sur "Save"

### Gérer les langues

Votre site est disponible en français et en anglais. Lors de la création ou modification d'un contenu :

- Les champs avec l'indicateur de langue peuvent être remplis dans les deux langues
- Le contenu s'affichera automatiquement dans la langue choisie par le visiteur

---

## 🔧 Maintenance

### Voir les logs de l'application

Pour vérifier que tout fonctionne correctement :

```bash
docker-compose logs -f app
```

Appuyez sur `Ctrl+C` pour quitter.

### Redémarrer l'application

Si vous rencontrez un problème ou après une modification :

```bash
docker-compose restart
```

### Arrêter l'application

Pour arrêter temporairement l'application :

```bash
docker-compose down
```

Pour redémarrer :

```bash
docker-compose up -d
```

### Sauvegarder vos données

Il est **fortement recommandé** de faire des sauvegardes régulières de votre base de données.

**Sauvegarde manuelle** :

```bash
docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website | gzip > backup_$(date +%Y%m%d).sql.gz
```

**Sauvegarde automatique** :

Créez un fichier `backup.sh` :

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/bluehive"
mkdir -p $BACKUP_DIR
cd /chemin/vers/votre/application

docker-compose exec -T postgres pg_dump -U bluehive_user -d bluehive_website | gzip > $BACKUP_DIR/backup_$(date +%Y%m%d_%H%M%S).sql.gz

# Garder seulement les 7 dernières sauvegardes
ls -t $BACKUP_DIR/backup_*.sql.gz | tail -n +8 | xargs rm -f
```

Rendez-le exécutable :

```bash
chmod +x backup.sh
```

Ajoutez-le au crontab pour une sauvegarde quotidienne à 2h du matin :

```bash
crontab -e
# Ajouter cette ligne :
0 2 * * * /chemin/vers/backup.sh
```

### Restaurer une sauvegarde

Si vous devez restaurer une sauvegarde :

```bash
# Arrêter l'application
docker-compose down

# Redémarrer (cela recréera la base de données vide)
docker-compose up -d

# Attendre que PostgreSQL soit prêt (environ 10 secondes)
sleep 10

# Restaurer la sauvegarde
gunzip -c backup_YYYYMMDD.sql.gz | docker-compose exec -T postgres psql -U bluehive_user -d bluehive_website
```

---

## 🆘 Dépannage

### Le site ne s'affiche pas

1. **Vérifier que les conteneurs sont en cours d'exécution** :

   ```bash
   docker-compose ps
   ```

   Si un conteneur n'est pas `Up`, consultez les logs :

   ```bash
   docker-compose logs app
   docker-compose logs postgres
   ```

2. **Vérifier que le port est accessible** :

   ```bash
   curl http://localhost:4000
   ```

   Si cela fonctionne localement mais pas depuis l'extérieur, vérifiez votre firewall et votre configuration réseau.

### Erreur de connexion à la base de données

1. Vérifier que PostgreSQL est démarré :

   ```bash
   docker-compose ps postgres
   ```

2. Vérifier les variables d'environnement :

   ```bash
   cat .env
   ```

   Assurez-vous que `POSTGRES_PASSWORD` dans `DATABASE_URI` correspond à `POSTGRES_PASSWORD`.

3. Redémarrer les services :

   ```bash
   docker-compose restart
   ```

### L'interface d'administration ne charge pas

1. Vérifier les logs :

   ```bash
   docker-compose logs app | tail -50
   ```

2. Vérifier que le conteneur est en cours d'exécution :

   ```bash
   docker-compose ps
   ```

3. Redémarrer l'application :

   ```bash
   docker-compose restart app
   ```

### Problème d'espace disque

Si vous recevez des erreurs liées à l'espace disque :

```bash
# Vérifier l'espace disponible
df -h

# Nettoyer les images Docker inutilisées
docker system prune -a

# Nettoyer les volumes inutilisés (⚠️ attention : supprime les données non utilisées)
docker volume prune
```

### Réinitialiser complètement l'application

⚠️ **ATTENTION** : Cette opération supprime toutes vos données !

```bash
# Arrêter et supprimer tout
docker-compose down -v

# Redémarrer
docker-compose up -d
```

Vous devrez recréer votre compte administrateur.

---

## 📞 Support

### En cas de problème

1. **Consultez les logs** :

   ```bash
   docker-compose logs app
   ```

2. **Vérifiez ce guide** : La plupart des problèmes courants sont couverts dans la section [Dépannage](#dépannage).

3. **Contactez le support** : Si le problème persiste, contactez l'équipe de développement avec :
   - Une description du problème
   - Les logs de l'application (`docker-compose logs app`)
   - Les informations sur votre environnement (système d'exploitation, version de Docker)

### Informations utiles à fournir

Lors d'une demande de support, incluez :

- Version de Docker : `docker --version`
- Version de Docker Compose : `docker-compose --version`
- Statut des conteneurs : `docker-compose ps`
- Logs récents : `docker-compose logs app | tail -100`

---

## 📚 Commandes utiles

### Voir l'état de l'application

```bash
docker-compose ps
```

### Voir les logs en temps réel

```bash
docker-compose logs -f app
```

### Redémarrer un service spécifique

```bash
docker-compose restart app      # Redémarrer l'application
docker-compose restart postgres  # Redémarrer la base de données
```

### Accéder à la base de données (avancé)

```bash
docker-compose exec postgres psql -U bluehive_user -d bluehive_website
```

### Vérifier l'utilisation des ressources

```bash
docker stats
```

---

## 🔒 Sécurité

### Recommandations importantes

1. **Mots de passe forts** : Utilisez des mots de passe complexes pour :
   - La base de données (`POSTGRES_PASSWORD`)
   - Le secret Payload (`PAYLOAD_SECRET`)
   - Votre compte administrateur

2. **Fichier `.env`** : Ne partagez jamais ce fichier. Il contient des informations sensibles.

3. **Sauvegardes régulières** : Configurez des sauvegardes automatiques (voir section [Maintenance](#maintenance)).

4. **Mises à jour** : Gardez Docker à jour pour bénéficier des correctifs de sécurité.

5. **Firewall** : Configurez un firewall pour limiter l'accès au port 4000 si nécessaire.

6. **HTTPS** : En production, configurez HTTPS via un reverse proxy (Nginx, Caddy) avec Let's Encrypt.

---

## 🎓 Ressources supplémentaires

- [Documentation Docker](https://docs.docker.com/)
- [Documentation Payload CMS](https://payloadcms.com/docs)
- Fichier `INSTALLATION.md` : Guide d'installation technique détaillé

---

## ✅ Checklist post-installation

Après l'installation, vérifiez que :

- [ ] Les conteneurs sont en cours d'exécution (`docker-compose ps`)
- [ ] Le site est accessible (`http://votre-serveur:4000`)
- [ ] L'interface d'administration est accessible (`http://votre-serveur:4000/admin`)
- [ ] Vous avez créé votre compte administrateur
- [ ] Vous avez modifié les mots de passe dans `.env`
- [ ] Vous avez configuré les sauvegardes automatiques
- [ ] Vous avez testé l'ajout d'un projet ou service

---

**Félicitations !** Votre site BlueHive est maintenant installé et prêt à être utilisé. 🎉

Pour toute question, n'hésitez pas à contacter l'équipe de développement.
