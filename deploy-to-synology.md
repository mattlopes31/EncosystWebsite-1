# Guide de déploiement sur Synology NAS

## Méthode 1: Export/Import de l'image Docker

### 1. Builder et exporter l'image sur votre PC

```bash
# Builder l'image
docker-compose build

# Exporter l'image vers un fichier .tar
docker save encosystwebsite-encosyst-website:latest -o encosyst-website.tar
```

### 2. Transférer le fichier sur le NAS

- Copiez le fichier `encosyst-website.tar` sur votre NAS via le File Station
- Ou utilisez SCP/SFTP: `scp encosyst-website.tar admin@192.168.123.6:/volume1/docker/`

### 3. Importer l'image dans Container Station

1. Ouvrez Container Station sur votre NAS
2. Allez dans **Images** (menu de gauche)
3. Cliquez sur **Ajouter** → **Importer depuis un fichier**
4. Sélectionnez le fichier `encosyst-website.tar`
5. Attendez l'import

### 4. Créer le conteneur

1. Dans Container Station, allez dans **Conteneurs**
2. Cliquez sur **Créer**
3. Sélectionnez l'image importée `encosystwebsite-encosyst-website`
4. Configurez:
   - **Nom du conteneur**: encosyst-website
   - **Port mapping**:
     - Port local: 3000 (ou un autre port disponible comme 3001)
     - Port conteneur: 3000
   - **Variables d'environnement**:
     - Nom: `RESEND_API_KEY`
     - Valeur: `re_SJVMYXKs_YPK6zAfxaKdTdHXW1wdawACb`
     - Nom: `NODE_ENV`
     - Valeur: `production`
   - **Redémarrage automatique**: Oui
5. Cliquez sur **Appliquer** puis **Démarrer**

## Méthode 2: Via Docker Compose directement sur le NAS

### 1. Activer SSH sur le NAS

1. Dans DSM, allez dans **Panneau de configuration** → **Terminal & SNMP**
2. Activez le service SSH

### 2. Se connecter en SSH et installer le projet

```bash
# Se connecter au NAS
ssh admin@192.168.123.6

# Créer un dossier pour le projet
mkdir -p /volume1/docker/encosyst-website
cd /volume1/docker/encosyst-website

# Vous devrez copier les fichiers du projet ici
```

### 3. Copier les fichiers depuis votre PC

Depuis votre PC, copiez tout le projet sur le NAS:

```bash
# Utilisez SCP ou WinSCP pour copier le dossier complet
scp -r C:\Users\papar\OneDrive\Documents\GitHub\EncosystWebsite admin@192.168.123.6:/volume1/docker/encosyst-website
```

### 4. Builder et lancer sur le NAS

```bash
# SSH sur le NAS
ssh admin@192.168.123.6

cd /volume1/docker/encosyst-website

# Builder et lancer
docker-compose build
docker-compose up -d
```

## Configuration du DNS / Reverse Proxy

### 1. Configurer le Reverse Proxy dans DSM

1. Dans DSM, allez dans **Panneau de configuration** → **Portail d'application**
2. Allez dans l'onglet **Reverse Proxy**
3. Cliquez sur **Créer**
4. Configurez:
   - **Description**: ENCOSYST Website
   - **Source**:
     - Protocole: HTTPS (ou HTTP)
     - Nom d'hôte: `votre-domaine.com` (votre DNS)
     - Port: 443 (ou 80 pour HTTP)
   - **Destination**:
     - Protocole: HTTP
     - Nom d'hôte: localhost
     - Port: 3000 (le port de votre conteneur)
5. Cliquez sur **Enregistrer**

### 2. Configuration DNS

Pointez votre nom de domaine vers l'IP de votre NAS:
- Type A: `votre-domaine.com` → `192.168.123.6` (ou votre IP publique si accessible depuis Internet)

### 3. Certificat SSL (optionnel mais recommandé)

1. Dans DSM: **Panneau de configuration** → **Sécurité** → **Certificat**
2. Ajoutez un certificat Let's Encrypt pour votre domaine
3. Assignez-le au service Reverse Proxy

## Ports utilisés

- **Port 3000**: Application Next.js dans le conteneur
- **Port 3000** (ou autre): Port exposé sur le NAS
- **Port 80/443**: Reverse proxy DSM → redirige vers le conteneur

## Commandes utiles

```bash
# Voir les conteneurs en cours
docker ps

# Voir les logs
docker logs encosyst-website

# Redémarrer le conteneur
docker restart encosyst-website

# Arrêter le conteneur
docker stop encosyst-website

# Voir l'utilisation des ressources
docker stats encosyst-website
```
