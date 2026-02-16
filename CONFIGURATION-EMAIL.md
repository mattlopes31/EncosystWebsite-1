# Configuration Email - Nodemailer avec SMTP

## Avantages de cette solution

✅ **Plus simple** : Pas besoin d'API key externe complexe  
✅ **Plus fiable** : Utilise directement votre serveur email  
✅ **Gratuit** : Pas de limite pour les petits volumes  
✅ **Long terme** : Solution standard et bien maintenue  

## Configuration

### Option 1: Gmail (Recommandé pour commencer)

1. Créez un fichier `.env.local` à la racine du projet
2. Ajoutez ces variables :

```env
SMTP_SERVICE=gmail
SMTP_USER=votre-email@gmail.com
SMTP_PASSWORD=votre-app-password
```

**Important pour Gmail** : Vous devez créer un "App Password" :
- Allez dans votre compte Google → Sécurité
- Activez la validation en 2 étapes si ce n'est pas déjà fait
- Créez un "Mot de passe d'application" pour cette application
- Utilisez ce mot de passe (pas votre mot de passe Gmail normal)

### Option 2: Outlook/Office365

```env
SMTP_SERVICE=outlook
SMTP_USER=votre-email@outlook.com
SMTP_PASSWORD=votre-mot-de-passe
```

### Option 3: Serveur SMTP personnalisé

Si vous avez votre propre serveur email (ex: contact@encosyst.fr) :

```env
SMTP_HOST=smtp.votre-serveur.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@encosyst.fr
SMTP_PASSWORD=votre-mot-de-passe
```

## Test

Une fois configuré, testez le formulaire de contact. Les emails seront envoyés à `contact@encosyst.fr`.

## Dépannage

- **Erreur d'authentification** : Vérifiez vos identifiants
- **Gmail bloque** : Utilisez un "App Password" (pas le mot de passe normal)
- **Port bloqué** : Vérifiez que le port 587 ou 465 est ouvert
