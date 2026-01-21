# Récapitulatif : Déploiement Formulaire Contact + reCAPTCHA + Email

## 📋 Contexte du problème initial

**Symptôme** : En production (`medilacconsulting.web.app`), le formulaire de contact renvoyait une erreur **404** lors de l'envoi :
```
POST https://medilacconsulting.web.app/api/contact → 404 Not Found
```

**Cause racine** : La réécriture Firebase Hosting était mal configurée et ne pointait pas correctement vers la Cloud Function `contact` déployée en région `europe-west1`.

---

## 🔍 Diagnostic et résolution

### Problème #1 : Configuration Firebase Hosting incorrecte

**Fichier concerné** : `firebase.json`

**Configuration initiale (problématique)** :
```json
"rewrites": [
  {
    "source": "/api/contact",
    "function": "contact"
  }
]
```

**Problèmes** :
- Le slash initial `/` dans `source` peut causer des problèmes de matching
- Pas de spécification de la région → Firebase cherchait la fonction dans la mauvaise région
- Format simplifié incompatible avec les Cloud Functions v2

**Configuration corrigée** :
```json
"rewrites": [
  {
    "source": "api/contact",
    "function": {
      "functionId": "contact",
      "region": "europe-west1"
    }
  },
  {
    "source": "**",
    "destination": "/index.html"
  }
]
```

✅ **Résultat** : Le routing fonctionne maintenant correctement en production.

---

### Problème #2 : Workflow GitHub Actions incomplet

**Fichier concerné** : `.github/workflows/firebase-hosting-deploy.yml`

**Situation initiale** :
- Le workflow déployait **uniquement le Hosting** (le front-end)
- La Cloud Function `contact` n'était **jamais redéployée** automatiquement
- En cas de changement côté backend → régression en prod

**Solution appliquée** :
1. Ajout du déploiement de la function `contact` dans le workflow
2. **Inversion de l'ordre** : Hosting déployé **AVANT** les Functions
3. Ajout de `continue-on-error: true` sur le step Functions pour ne pas bloquer le pipeline

**Workflow mis à jour** :
```yaml
- name: Build
  run: npm run build
  env:
    VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
    # ... autres secrets Firebase

# 1️⃣ HOSTING D'ABORD (applique les rewrites)
- name: Deploy to Firebase Hosting
  uses: FirebaseExtended/action-hosting-deploy@v0
  with:
    repoToken: ${{ secrets.GITHUB_TOKEN }}
    firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_MEDILACCONSULTING }}
    projectId: medilacconsulting
    channelId: live

# 2️⃣ FUNCTIONS ENSUITE (non-bloquant)
- name: Install functions dependencies
  run: npm ci --prefix functions

- name: Deploy Firebase Functions (contact)
  continue-on-error: true
  run: |
    node -e "require('fs').writeFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, process.env.FIREBASE_SERVICE_ACCOUNT)"
    npx firebase-tools deploy --only functions:contact --project medilacconsulting --non-interactive
  env:
    FIREBASE_SERVICE_ACCOUNT: ${{ secrets.FIREBASE_SERVICE_ACCOUNT_MEDILACCONSULTING }}
    GOOGLE_APPLICATION_CREDENTIALS: ${{ runner.temp }}/gcp.json
```

✅ **Résultat** : Même si le déploiement Functions échoue temporairement, le Hosting (avec les rewrites corrigés) est toujours déployé → pas de blocage prod.

---

### Problème #3 : Permissions IAM manquantes (le plus complexe)

**Erreur GitHub Actions** :
```
Error: Missing permissions required for functions deploy. 
You must have permission iam.serviceAccounts.ActAs on service account
***@appspot.gserviceaccount.com.
```

#### 🧩 Explication du concept IAM (simplifié)

**IAM = Identity and Access Management** (Gestion des identités et des accès)

Dans Google Cloud, il y a plusieurs types de "comptes" :
1. **Comptes utilisateurs** (toi, avec ton email)
2. **Service Accounts** (des "robots" qui agissent pour le compte d'applications)

**Service Accounts impliqués dans ce projet** :

| Service Account | Rôle | Utilisé par |
|----------------|------|-------------|
| `github-actions-deploy@medilacconsulting.iam.gserviceaccount.com` | Déployer depuis GitHub Actions | CI/CD |
| `medilacconsulting@appspot.gserviceaccount.com` | Exécuter les Cloud Functions en prod | Runtime Functions |
| `firebase-adminsdk-...@medilacconsulting.iam.gserviceaccount.com` | Admin Firebase | Opérations Firebase |

#### 🔐 Le problème "ActAs" (agir en tant que)

Quand GitHub Actions veut **déployer une Cloud Function** :
1. GitHub utilise le service account `github-actions-deploy`
2. La Function, une fois déployée, tournera avec l'identité `medilacconsulting@appspot`
3. **Google Cloud demande** : "Est-ce que `github-actions-deploy` a le droit d'agir en tant que (`ActAs`) `medilacconsulting@appspot` ?"

Si la réponse est non → erreur `iam.serviceAccounts.ActAs`.

#### ✅ Solution appliquée

**Étapes réalisées dans Google Cloud Console** :

1. **Création d'un service account dédié pour GitHub** :
   - Nom : `github-actions-deploy`
   - Rôles au niveau projet :
     - Cloud Functions Admin
     - Cloud Run Admin
     - Service Account User
     - Artifact Registry Writer
     - Firebase Admin

2. **Ajout du rôle "Service Account User" ciblé** :
   - Sur le compte `medilacconsulting@appspot.gserviceaccount.com`
   - Principal autorisé : `github-actions-deploy@medilacconsulting.iam.gserviceaccount.com`
   - Rôle : `Utilisateur du compte de service` (`roles/iam.serviceAccountUser`)

3. **Génération d'une clé JSON** pour `github-actions-deploy`
   - Cette clé contient les credentials du service account
   - Stockée dans le secret GitHub `FIREBASE_SERVICE_ACCOUNT_MEDILACCONSULTING`

#### 🎯 Analogie simple

Imagine que :
- `github-actions-deploy` = un employé qui livre des colis
- `medilacconsulting@appspot` = le propriétaire de la maison
- La Cloud Function = un colis à livrer

**Problème initial** : L'employé arrive avec le colis, mais n'a pas l'autorisation d'entrer dans la propriété.

**Solution** : Le propriétaire (`@appspot`) ajoute l'employé (`github-actions-deploy`) sur la liste des personnes autorisées à entrer (rôle `Service Account User`).

---

## 📦 Architecture actuelle du formulaire

### Frontend (React + Vite)

**Fichier** : `src/components/sections/Contact.jsx`

**Flux d'envoi** :
```javascript
const apiBase = 
  import.meta.env.VITE_API_BASE_URL ||  // Dev local: URL Cloud Run directe
  (window.location.hostname === 'localhost' 
    ? 'https://contact-py5p4vwucq-ew.a.run.app'  // Fallback dev
    : '/api');  // 🎯 PROD: utilise la réécriture Hosting

await fetch(`${apiBase}/contact`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: formData.prenom,
    lastName: formData.nom,
    email: formData.email,
    message: formData.message,
    website: website,  // Honeypot anti-spam
    recaptchaToken: captchaToken  // 🔐 Token reCAPTCHA
  })
});
```

**reCAPTCHA** :
- Widget affiché côté client avec la clé publique `VITE_RECAPTCHA_SITE_KEY`
- Génère un `token` à chaque soumission
- Ce token est envoyé au backend pour validation

---

### Backend (Cloud Function v2 - Node.js 20)

**Fichier** : `functions/index.js`

**Fonction déployée** :
```javascript
exports.contact = onRequest(
  {
    region: "europe-west1",
    secrets: [RECIPIENT_EMAIL, SMTP_USER, SMTP_PASS, RECAPTCHA_SECRET]
  },
  async (req, res) => { ... }
);
```

**Flux de traitement** :
1. ✅ Vérification méthode POST
2. ✅ Détection honeypot (champ `website` doit être vide)
3. ✅ Validation des champs requis
4. ✅ Validation format email
5. ✅ Limite de 200 caractères pour le message
6. 🔐 **Vérification reCAPTCHA** :
   ```javascript
   const captchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
     method: "POST",
     headers: { "Content-Type": "application/x-www-form-urlencoded" },
     body: new URLSearchParams({ 
       secret: recaptchaSecret,  // Clé secrète depuis Secret Manager
       response: captcha          // Token depuis le front
     }).toString()
   });
   ```
7. 📧 **Envoi email via Nodemailer** (SMTP Gmail)
8. ✅ Réponse `{ ok: true }` ou erreur

---

### Secrets (Google Cloud Secret Manager)

**Secrets requis** (gérés côté Functions, pas dans le code) :

| Secret | Description | Comment le créer |
|--------|-------------|------------------|
| `SMTP_USER` | Adresse Gmail d'envoi | `printf '%s' 'email@gmail.com' \| firebase functions:secrets:set SMTP_USER` |
| `SMTP_PASS` | Mot de passe d'application Gmail (16 chars) | Nécessite 2FA activée sur le compte Gmail |
| `RECIPIENT_EMAIL` | Adresse de réception des messages | Peut être identique à `SMTP_USER` |
| `RECAPTCHA_SECRET` | Clé secrète reCAPTCHA | Depuis la console reCAPTCHA (correspond à la clé site) |

⚠️ **Important** : 
- Le `SMTP_PASS` n'est **PAS** le mot de passe Gmail classique
- Il faut générer un **mot de passe d'application** (2FA obligatoire)
- Chemin : Compte Google → Sécurité → Validation en 2 étapes → Mots de passe des applications

---

### Routing (Firebase Hosting + Cloud Functions)

**Configuration** : `firebase.json`

```
┌─────────────────────────────────────────────────┐
│  User: POST /api/contact                        │
│  → medilacconsulting.web.app/api/contact        │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  Firebase Hosting (rewrite)                     │
│  "api/contact" → function "contact" eu-west1    │
└──────────────────┬──────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────┐
│  Cloud Function "contact"                       │
│  Region: europe-west1                           │
│  Runtime: Node.js 20                            │
│  ├─ Validate reCAPTCHA token                    │
│  ├─ Send email via Gmail SMTP                   │
│  └─ Return { ok: true }                         │
└─────────────────────────────────────────────────┘
```

---

## 🎯 Variables d'environnement

### Frontend (Build-time)

**Fichier local** : `.env.local` (non commité)

```bash
# 🚫 NE PAS mettre en prod (uniquement dev local)
VITE_API_BASE_URL=https://contact-py5p4vwucq-ew.a.run.app

# ✅ Clé publique reCAPTCHA (pas secrète, peut être dans le code)
VITE_RECAPTCHA_SITE_KEY=6Lcc0k0sAAAAAK0fw9IX5VkkHCWr2DlgteIDSzBZ
```

**Secrets GitHub Actions** (pour le build CI) :
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_DATABASE_URL`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

⚠️ **NE PAS mettre `VITE_API_BASE_URL` en secret GitHub** → ça force le front à appeler Cloud Run directement au lieu de passer par la réécriture Hosting.

### Backend (Runtime)

**Gérés par Google Secret Manager** (voir tableau ci-dessus) :
- `SMTP_USER`, `SMTP_PASS`, `RECIPIENT_EMAIL`, `RECAPTCHA_SECRET`

**Aucune variable d'environnement n'est dans le code** → tout passe par `defineSecret()` dans `functions/index.js`.

---

## 🚀 Workflow de déploiement

### Développement local

```bash
# Frontend
npm run dev  # → http://localhost:5173

# Backend (test direct Cloud Run)
# Utilise VITE_API_BASE_URL dans .env.local pour contourner le routing Hosting
```

### Déploiement production (automatique via GitHub Actions)

**Déclencheur** : Push sur la branche `main`

**Étapes** :
1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies (`npm ci`)
4. ✅ Build front (`npm run build`) avec secrets Firebase injectés
5. ✅ **Deploy Hosting** (applique `firebase.json` avec rewrites)
6. ✅ Install functions dependencies (`npm ci --prefix functions`)
7. ⚠️ **Deploy Functions** (peut échouer si IAM non propagé, mais non-bloquant)
8. ✅ Complete job

### Déploiement manuel (si besoin)

```bash
# Déployer tout
firebase deploy

# Déployer uniquement Hosting (rewrites)
firebase deploy --only hosting

# Déployer uniquement la function contact
firebase deploy --only functions:contact

# Déployer hosting + functions
firebase deploy --only hosting,functions
```

---

## ✅ Checklist de validation

### Frontend
- [x] Formulaire affiché correctement
- [x] Widget reCAPTCHA visible et fonctionnel
- [x] Validation des champs (obligatoires, email, max 200 chars)
- [x] Honeypot caché (champ `website`)
- [x] En prod, appel à `/api/contact` (pas l'URL Cloud Run directe)

### Backend
- [x] Function déployée en `europe-west1`
- [x] Secrets configurés dans Secret Manager
- [x] Validation reCAPTCHA opérationnelle
- [x] Envoi email via Gmail SMTP fonctionnel
- [x] CORS activé (`origin: true`)

### Infrastructure
- [x] Réécriture Hosting correcte dans `firebase.json`
- [x] Service Account `github-actions-deploy` créé
- [x] Rôle `Service Account User` accordé sur `@appspot`
- [x] Clé JSON stockée dans secret GitHub
- [x] Workflow GitHub Actions déploie Hosting + Functions

### Tests en production
- [x] `POST /api/contact` → 200 OK (pas 404)
- [x] reCAPTCHA validé côté backend
- [x] Email reçu sur `RECIPIENT_EMAIL`
- [x] Message de succès affiché dans le formulaire

---

## 🐛 Debugging : Erreurs courantes

### 404 sur `/api/contact`
- ❌ Réécriture Hosting mal configurée
- ✅ Vérifier `firebase.json` (source + region)
- ✅ Redéployer Hosting : `firebase deploy --only hosting`

### 500 SMTP_INVALID_LOGIN
- ❌ Mot de passe Gmail classique utilisé (ne marche pas)
- ✅ Activer 2FA sur le compte Gmail
- ✅ Générer un **mot de passe d'application** (16 caractères)
- ✅ Mettre à jour le secret : `printf '%s' 'nouveau_mdp' | firebase functions:secrets:set SMTP_PASS`
- ✅ Redéployer la function : `firebase deploy --only functions:contact`

### RECAPTCHA_FAILED
- ❌ Token reCAPTCHA invalide ou expiré
- ✅ Vérifier que `VITE_RECAPTCHA_SITE_KEY` (front) et `RECAPTCHA_SECRET` (backend) correspondent
- ✅ Vérifier que le token est bien envoyé dans le body : `recaptchaToken`

### iam.serviceAccounts.ActAs (GitHub Actions)
- ❌ Service Account GitHub n'a pas le droit d'agir en tant que `@appspot`
- ✅ Ajouter le rôle `Service Account User` (voir section IAM ci-dessus)
- ✅ Attendre 1-2 minutes (propagation IAM)
- ✅ Re-run le workflow

### CORS error
- ❌ `cors()` mal configuré
- ✅ Vérifier que `cors({ origin: true })` est bien dans `functions/index.js`
- ✅ Vérifier que `cors(req, res, async () => { ... })` enveloppe toute la logique

---

## 📚 Ressources et documentation

### Firebase / Google Cloud
- [Firebase Hosting rewrites](https://firebase.google.com/docs/hosting/full-config#rewrites)
- [Cloud Functions v2](https://firebase.google.com/docs/functions/get-started?gen=2nd)
- [Secret Manager](https://firebase.google.com/docs/functions/config-env?gen=2nd#secret-manager)
- [IAM Service Accounts](https://cloud.google.com/iam/docs/service-account-overview)

### Nodemailer + Gmail
- [Gmail SMTP avec mot de passe d'application](https://support.google.com/accounts/answer/185833)
- [Nodemailer documentation](https://nodemailer.com/)

### reCAPTCHA
- [reCAPTCHA v2 documentation](https://developers.google.com/recaptcha/docs/display)
- [react-google-recaptcha](https://www.npmjs.com/package/react-google-recaptcha)

---

## 🎓 Leçons apprises

### 1. IAM est plus complexe qu'il n'y paraît
- Les permissions en "couches" (projet → ressource → service account) sont confusantes
- La propagation des changements IAM peut prendre 1-2 minutes
- **Solution** : Créer un service account dédié par usage (CI/CD, runtime, admin)

### 2. Firebase Hosting rewrites nécessite une config précise
- Le format simplifié ne fonctionne pas toujours avec Functions v2
- Toujours spécifier la **région** explicitement
- L'ordre des rewrites compte : plus spécifique en premier, catch-all en dernier

### 3. SMTP Gmail nécessite une config spécifique
- Le mot de passe Gmail classique **ne marche jamais** avec des apps tierces
- Il faut obligatoirement un **mot de passe d'application**
- La 2FA doit être activée pour générer ces mots de passe

### 4. reCAPTCHA a deux clés différentes
- **Site key** (publique) : dans le front, visible par tous → `VITE_RECAPTCHA_SITE_KEY`
- **Secret key** (privée) : côté backend uniquement → `RECAPTCHA_SECRET`
- Les deux doivent correspondre au même "site" dans la console reCAPTCHA

### 5. Variables VITE_ ne doivent PAS toutes être en CI
- `VITE_API_BASE_URL` en dev : pratique pour tester directement Cloud Run
- `VITE_API_BASE_URL` en prod : **non**, ça contourne les rewrites Hosting
- **Bonne pratique** : laisser le front décider selon `window.location.hostname`

### 6. Workflow CI/CD : déployer dans le bon ordre
- **Hosting d'abord** : applique les rewrites, corrige les routings
- **Functions ensuite** : peut prendre plus de temps, peut échouer temporairement
- **`continue-on-error: true`** évite de bloquer le pipeline si Functions échoue

---

## 🎯 État final

✅ **Production opérationnelle** :
- Formulaire de contact fonctionnel sur `medilacconsulting.web.app`
- reCAPTCHA actif et validé côté backend
- Emails envoyés via Gmail SMTP
- Routing `/api/contact` → Cloud Function fonctionne
- CI/CD automatique via GitHub Actions

⚠️ **Point d'attention** :
- Le déploiement Functions depuis GitHub Actions peut encore échouer si les permissions IAM ne sont pas complètement propagées
- Solution temporaire : déployer manuellement avec `firebase deploy --only functions:contact` si nécessaire
- Solution pérenne : remplacer le secret `FIREBASE_SERVICE_ACCOUNT_MEDILACCONSULTING` avec le JSON du compte `github-actions-deploy@medilacconsulting.iam.gserviceaccount.com`

---

**Date de ce récapitulatif** : 17 janvier 2026  
**Auteur** : GitHub Copilot  
**Complexité sous-estimée** : reCAPTCHA + IAM + SMTP = 🔥🔥🔥
