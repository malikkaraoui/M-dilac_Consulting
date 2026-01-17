# Guide déploiement formulaire email (React + Firebase Functions)

## Contexte
- Front : Vite/React, formulaire de contact.
- Backend : Cloud Function HTTP `contact` (Node.js 20) utilisant Nodemailer + SMTP Gmail.
- Hébergement : Firebase Hosting avec réécriture `/api/contact -> contact`.

## Champs attendus côté front
- `firstName` (prénom, requis)
- `lastName` (nom, requis)
- `email` (format valide, requis)
- `message` (max 200 caractères, requis)
- `website` (champ caché honeypot, doit rester vide)

## Variables d’environnement front
- `VITE_API_BASE_URL` :
  - Prod (Firebase Hosting) : `/api` (utilise la réécriture Hosting)
  - Dev local : URL directe de la fonction (ex. `https://contact-py5p4vwucq-ew.a.run.app`) pour éviter le 404.
- Placer dans `.env.local` (non commité) et redémarrer `npm run dev` après changement.

## Secrets à renseigner côté Functions (via CLI)
- `SMTP_USER` : adresse Gmail d’envoi.
- `SMTP_PASS` : **mot de passe d’application** (16 caractères) généré après avoir activé la 2FA sur le compte Gmail. Le mot de passe Gmail normal ne fonctionne pas.
- `RECIPIENT_EMAIL` : adresse de réception (peut être la même que l’adresse d’envoi).

Commande type :
```bash
printf '%s' 'valeur' | firebase functions:secrets:set SMTP_USER
printf '%s' 'motdepasseapplication' | firebase functions:secrets:set SMTP_PASS
printf '%s' 'destinataire@domaine.com' | firebase functions:secrets:set RECIPIENT_EMAIL
```

## Dépendances côté Functions
- `firebase-functions@5.1.0` (Node 20)
- `nodemailer`
- `cors`

## Réécriture Hosting (firebase.json)
```json
"rewrites": [
  { "source": "/api/contact", "function": "contact" },
  { "source": "**", "destination": "/index.html" }
]
```

## Flux de déploiement
1) Installer deps functions (si modifiées) :
```bash
cd functions && npm install
```
2) Construire le front :
```bash
cd .. && npm run build
```
3) Déployer la fonction (après mise à jour des secrets) :
```bash
firebase deploy --only functions:contact --non-interactive --force
```
4) Déployer l’hébergement :
```bash
firebase deploy --only hosting
```

## Tests rapides
- Appeler en POST : `https://<site>/api/contact` ou directement l’URL Cloud Run.
- Exemple curl :
```bash
curl -X POST https://<site>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","message":"Hello","website":""}'
```
- Réponse attendue : `{ "ok": true, "message": "Email sent" }`.

## Erreurs rencontrées & résolutions
- **404 `/api/contact` en dev** : Vite n’a pas la réécriture ; utiliser `VITE_API_BASE_URL` pointant vers l’URL Cloud Run ou fallback automatique côté front.
- **404 en prod** : rebuild + `firebase deploy --only hosting` pour rafraîchir la réécriture.
- **SMTP invalid login / 534 5.7.9** : utiliser un mot de passe d’application Gmail (2FA activée), pas le mot de passe standard.
- **METHOD_NOT_ALLOWED en GET** : normal si on ouvre l’URL de la fonction dans le navigateur ; seul le POST est accepté.

## Checklist opérationnelle
- [ ] Secrets `SMTP_USER`, `SMTP_PASS` (mot de passe d’application), `RECIPIENT_EMAIL` saisis.
- [ ] Front configuré (`VITE_API_BASE_URL`) et rebuildé.
- [ ] Fonctions déployées.
- [ ] Hosting déployé.
- [ ] Test POST ok (réponse `{ ok: true }`).

## Bonnes pratiques
- Ne jamais commiter les secrets ; utiliser Secret Manager via `functions:secrets:set`.
- Toujours redéployer la fonction après mise à jour des secrets.
- En dev, pointer directement vers l’URL Cloud Run pour éviter les 404 liés aux réécritures Hosting.
- Limiter la taille du message (ici 200 chars) et garder un honeypot pour les bots.
- Sur erreur SMTP, loguer le message retourné et vérifier en priorité : mot de passe d’application, 2FA activée, adresse expéditrice identique à `SMTP_USER`.
