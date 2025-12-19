# Médilac Consulting

Site web professionnel pour Médilac Consulting - Conseil stratégique et financier pour médecins en Suisse.

## 🚀 Demo

Le site est accessible à l'adresse suivante : [https://medilacconsulting.web.app](https://medilacconsulting.web.app)

## ✨ Fonctionnalités

- **Design moderne et responsive** avec animations 3D (Three.js)
- **Navigation fluide** avec défilement smooth entre sections
- **Formulaire de contact** connecté à Firebase Realtime Database
- **Carousel 3D interactif** pour présenter les thématiques
- **Thème personnalisé** avec couleur rouge signature
- **Logo professionnel** intégré dans l'en-tête et le pied de page

## 🛠️ Stack Technique

### Frontend
- **Framework** : [React](https://react.dev/) 18
- **Build Tool** : [Vite](https://vitejs.dev/) 7
- **Styling** : [Tailwind CSS](https://tailwindcss.com/) v4
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics** : [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
- **Icons** : [Lucide React](https://lucide.dev/)

### Backend & Hosting
- **Database** : [Firebase Realtime Database](https://firebase.google.com/docs/database)
- **Hosting** : [Firebase Hosting](https://firebase.google.com/docs/hosting)
- **Deployment** : Automatisé via Firebase CLI

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/malikkaraoui/M-dilac_Consulting.git
cd M-dilac_Consulting

# Installer les dépendances
npm install
```

## 💻 Développement

```bash
# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 🏗️ Build

```bash
# Créer un build de production
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`

## 🚀 Déploiement

```bash
# Déployer sur Firebase Hosting
firebase deploy
```

Ou pour déployer avec build automatique :

```bash
npm run build && firebase deploy
```

## 📁 Structure du Projet

```
VINCENT/
├── public/
│   └── logo_medilac.png          # Logo de l'entreprise
├── src/
│   ├── components/
│   │   ├── canvas/                # Composants 3D (Three.js)
│   │   ├── layout/                # Layout (Navbar, Footer)
│   │   ├── sections/              # Sections de la page
│   │   └── ui/                    # Composants UI réutilisables
│   ├── lib/
│   │   ├── firebase.js            # Configuration Firebase
│   │   └── utils.js               # Utilitaires
│   ├── App.jsx                    # Composant principal
│   ├── main.jsx                   # Point d'entrée
│   └── index.css                  # Styles globaux + thème
├── database.rules.json            # Règles de sécurité Firebase
├── firebase.json                  # Configuration Firebase
└── vite.config.js                 # Configuration Vite
```

## 🎨 Personnalisation

### Couleurs du thème

Les couleurs principales sont définies dans `src/index.css` :

```css
--color-primary: #1E3A8A;    /* Bleu foncé */
--color-secondary: #64748B;  /* Gris */
--color-accent: #E11D48;     /* Rouge signature */
```

### Logo

Pour remplacer le logo, ajoutez votre fichier dans `public/` et mettez à jour les références dans :
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`

## 📝 Configuration Firebase

1. Créer un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Activer Realtime Database
3. Copier les credentials dans `src/lib/firebase.js`
4. Configurer les règles de sécurité via `database.rules.json`

## 🔒 Sécurité

Les données du formulaire de contact sont stockées dans Firebase Realtime Database avec des règles de sécurité configurées pour permettre uniquement l'écriture publique et la lecture authentifiée.

## 📄 Licence

Tous droits réservés © 2024 Médilac Consulting

## 👤 Contact

Pour toute question concernant le projet, veuillez utiliser le formulaire de contact sur le site web.
