# 🏰 Village Numérique Résistant NIRD

> **Nuit de l'Info 2025** - Équipe Rotschield & Co - UCA Sophia Antipolis

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.181-000000?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)

---

#### Lien du site web : [Site Web](https://nuit-de-info-2025-uca-rotchields-co.vercel.app)

## 🎮 À propos

**Village Numérique Résistant** est une expérience web interactive 3D qui sensibilise à la souveraineté numérique et à la résistance face aux géants du numérique (Big Tech).

Incarnez un étudiant chargé de protéger son école ! Explorez un village virtuel immersif, découvrez les secrets de la dépendance numérique et devenez un défenseur du numérique **inclusif**, **responsable** et **durable**.

### 🎯 Objectifs pédagogiques

- Comprendre les enjeux de la dépendance aux Big Tech
- Découvrir la démarche NIRD (Numérique Inclusif, Responsable et Durable)
- Renforcer l'autonomie numérique des établissements scolaires
- Sensibiliser aux alternatives open source

---

## ✨ Fonctionnalités

- 🗺️ **Exploration 3D** - Naviguez librement dans un village interactif avec Three.js
- 🏛️ **4 Zones thématiques** - Tour Google, Bibliothèque, École, Cabane
- 🎯 **Système de quêtes** - Visitez chaque lieu et accumulez des points
- 🎙️ **Podcast** - Découvrez les femmes dans le numérique
- ⚡ **Transitions immersives** - Effets StarWarp entre les scènes
- 📱 **Responsive** - Adapté à tous les écrans

---

## 🚀 Installation

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- npm ou yarn

### Étapes

```bash
# Cloner le repository
git clone https://github.com/votre-repo/n2i_rotshield.git
cd n2i_rotshield

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

---

## 📜 Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance le serveur de développement |
| `npm run build` | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

---

## 🎮 Contrôles

| Touche | Action |
|--------|--------|
| `↑ ↓ ← →` | Se déplacer dans le village |
| `Souris` | Regarder autour |
| `E` | Interagir avec les bâtiments |

---

## 🏗️ Structure du projet

```
n2i_rotshield/
├── public/
│   ├── audio/          # Fichiers audio (podcast)
│   ├── image/          # Images du projet
│   ├── *.glb           # Modèles 3D (map, player, licorn)
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── StarWarp.tsx    # Effet de transition
│   │   └── ThreeScene.tsx  # Scène 3D principale
│   ├── pages/
│   │   ├── Village.tsx     # Page du village
│   │   ├── GooglePage.tsx  # Zone Tour Google
│   │   ├── LibraryPage.tsx # Zone Bibliothèque
│   │   ├── SchoolPage.tsx  # Zone École
│   │   ├── CabanePage.tsx  # Zone Cabane
│   │   └── PodcastPage.tsx # Page podcast
│   ├── App.tsx             # Composant principal
│   ├── App.css             # Styles globaux
│   └── main.tsx            # Point d'entrée
├── vercel.json             # Configuration Vercel
├── package.json
└── vite.config.ts
```

---

## 🌐 Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub/GitLab
2. Connectez-vous sur [Vercel](https://vercel.com)
3. Importez votre repository
4. Sélectionnez le dossier `n2i_rotshield` comme Root Directory
5. Cliquez sur **Deploy**

Le fichier `vercel.json` est déjà configuré pour le routage SPA.

### Build manuel

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`.

---

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| [React 19](https://react.dev/) | Framework UI |
| [TypeScript](https://www.typescriptlang.org/) | Typage statique |
| [Vite](https://vite.dev/) | Build tool |
| [Three.js](https://threejs.org/) | Rendu 3D |
| [React Router](https://reactrouter.com/) | Routage SPA |

---

## 👥 Équipe

**Rotschield & Co** - UCA Sophia Antipolis

Projet réalisé dans le cadre de la **Nuit de l'Info 2025**.

---

## 📄 Licence

Ce projet a été créé pour la Nuit de l'Info 2025.

---

<p align="center">
  <strong>🛡️ Reprends le contrôle face aux Big Tech 🛡️</strong>
</p>
