# instruction_formulaire.md — Formulaire Contact (Vite React + Firebase Hosting + Functions)

## Objectif
- Formulaire: nom, prénom, email, message (200 caractères max)
- Au clic "Envoyer", le front POST vers `/api/contact`
- Firebase Hosting rewrite `/api/contact` -> Cloud Function `contact`
- La Function valide et envoie un email via SMTP
- Destinataire géré côté serveur (Secret), pas dans le front

Destinataire TEST:
- karaoui.malik@gmail.com

Destinataire PROD (après tests):
- vincent.limbach@medilac.ch


---

## 1) Installation / Pré-requis
### 1.1 Firebase CLI
```bash
npm i -g firebase-tools
firebase login
1.2 Vérifier le projet Firebase
À la racine du repo:
firebase use --add
Choisis ton projet Firebase (Blaze).
2) Initialiser Hosting + Functions (si pas déjà fait)
À la racine du projet:
firebase init hosting functions
Choix recommandés
Hosting
Public directory: dist
Configure as a single-page app (SPA): Yes
Set up automatic builds and deploys with GitHub: au choix (pas obligatoire)
Functions
Language: JavaScript (simple)
ESLint: au choix
Install dependencies: Yes
Tu gardes Vite/React côté racine, et Functions dans le dossier functions/.
3) Config Firebase Hosting (rewrites API + SPA)
Ouvre firebase.json et assure-toi d’avoir:
une rewrite API AVANT la rewrite SPA
public: "dist"
Exemple propre:
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "/api/contact", "function": "contact" },
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
⚠️ Important: si la rewrite SPA ("source": "**") est avant, elle “mange” /api/contact.
4) Secrets (destinataire + SMTP) — 100% CLI
Je recommande de mettre TOUT en secrets:
RECIPIENT_EMAIL (destinataire)
SMTP_USER (compte expéditeur)
SMTP_PASS (mot de passe/app password SMTP)
4.1 Destinataire (TEST)
firebase functions:secrets:set RECIPIENT_EMAIL
Valeur:
karaoui.malik@gmail.com
4.2 SMTP
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
Notes:
Idéal: une adresse expéditeur dédiée (ex: contact@... ou une gmail dédiée).
Pour Gmail: utiliser un “App Password” (si 2FA) plutôt qu’un mot de passe normal.
5) Function contact (envoi email)
5.1 Dépendances
Dans functions/:
cd functions
npm i nodemailer cors
cd ..
5.2 Code (functions/index.js)
Remplace le contenu par ceci:
const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

const RECIPIENT_EMAIL = defineSecret("RECIPIENT_EMAIL");
const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_PASS = defineSecret("SMTP_PASS");

function safeStr(v) {
  return typeof v === "string" ? v.trim() : "";
}

exports.contact = onRequest(
  {
    region: "europe-west1",
    secrets: [RECIPIENT_EMAIL, SMTP_USER, SMTP_PASS],
    // Optionnel: limiter la taille du body côté function (évite abus)
    // maxInstances: 2, // optionnel
  },
  async (req, res) => {
    cors(req, res, async () => {
      try {
        if (req.method !== "POST") {
          return res.status(405).json({ ok: false, error: "METHOD_NOT_ALLOWED" });
        }

        // Anti-spam ultra simple (honeypot)
        // Le front enverra "website" vide. Si rempli => bot.
        const { firstName, lastName, email, message, website } = req.body || {};
        if (safeStr(website)) {
          return res.status(200).json({ ok: true }); // on "fait semblant" d'accepter
        }

        const fn = safeStr(firstName);
        const ln = safeStr(lastName);
        const em = safeStr(email);
        const msg = safeStr(message);

        if (!fn || !ln || !em || !msg) {
          return res.status(400).json({ ok: false, error: "MISSING_FIELDS" });
        }
        if (msg.length > 200) {
          return res.status(400).json({ ok: false, error: "MESSAGE_TOO_LONG" });
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
        if (!emailOk) {
          return res.status(400).json({ ok: false, error: "INVALID_EMAIL" });
        }

        const recipient = RECIPIENT_EMAIL.value();
        const smtpUser = SMTP_USER.value();
        const smtpPass = SMTP_PASS.value();

        // Transport SMTP (ex: Gmail)
        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: smtpUser, pass: smtpPass },
        });

        // Sujet propre (évite injection CRLF)
        const subject = `Contact site — ${fn} ${ln}`.replace(/[\r\n]+/g, " ").slice(0, 120);

        const text =
`Nouveau message via formulaire:

Nom: ${ln}
Prénom: ${fn}
Email: ${em}

Message (<= 200):
${msg}
`;

        await transporter.sendMail({
          from: smtpUser,
          to: recipient,
          replyTo: em,
          subject,
          text,
        });

        return res.json({ ok: true });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ ok: false, error: "INTERNAL_ERROR" });
      }
    });
  }
);
✅ Ce code:
n’expose jamais le destinataire au front
valide strictement
limite message à 200
ajoute un honeypot (anti-bot simple et gratuit)
6) Front (Vite React) — composant de formulaire prêt
Exemple ContactForm.jsx (à adapter à ton design):
import { useMemo, useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (caché en CSS)
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [errorMsg, setErrorMsg] = useState("");

  const remaining = useMemo(() => 200 - message.length, [message]);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setErrorMsg("");

    if (message.length > 200) {
      setStatus("error");
      setErrorMsg("Message trop long (200 caractères max).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, message, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "SEND_FAILED");

      setStatus("ok");
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setWebsite("");
    } catch (err) {
      setStatus("error");
      setErrorMsg("Échec de l’envoi. Réessaie dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Prénom</label>
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>

      <div>
        <label>Nom</label>
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>

      <div>
        <label>Message (200 caractères max)</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, 200))}
          maxLength={200}
          required
        />
        <small>{remaining} caractères restants</small>
      </div>

      {/* Honeypot: cacher via CSS: display:none; */}
      <div style={{ display: "none" }}>
        <label>Website</label>
        <input value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Envoi..." : "Envoyer le message"}
      </button>

      {status === "ok" && <p>Message envoyé ✅</p>}
      {status === "error" && <p>{errorMsg}</p>}
    </form>
  );
}
7) Tests locaux (émulateurs)
7.1 Build Vite
À la racine:
npm run build
7.2 Démarrer les émulateurs
firebase emulators:start
➡️ Teste le formulaire sur l’URL locale indiquée.
Notes:

Les secrets peuvent être requis en local. Si tu veux un test local “sans secret”, tu peux temporairement remplacer l’envoi SMTP par un console.log (mais en général on garde pareil et on met des secrets).
8) Déploiement (Hosting + Functions)
npm run build
firebase deploy --only functions,hosting
Vérifie:
le site charge (SPA OK)
le POST /api/contact renvoie { ok: true }
tu reçois l’email sur RECIPIENT_EMAIL
9) Passer de TEST -> PROD (destinataire)
Tu changes seulement le secret:
firebase functions:secrets:set RECIPIENT_EMAIL
Valeur:
vincent.limbach@medilac.ch
Puis redeploy:
firebase deploy --only functions
10) (Optionnel mais recommandé) Anti-spam + durcissement
Minimum gratuit déjà inclus: honeypot.
Si tu veux un cran au-dessus:

Rate-limit par IP (Firestore): 1 requête / minute
reCAPTCHA v3 côté front + vérif côté function
App Check (si tu utilises Firebase App Check sur ton front)
Je peux te fournir une version “rate-limit Firestore” si tu veux.

---

### Bonus pratique (scripts NPM)
Tu peux ajouter dans ton `package.json` (racine) :
```json
{
  "scripts": {
    "build": "vite build",
    "deploy": "npm run build && firebase deploy --only functions,hosting"
  }
}
