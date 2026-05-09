# 🎓 Plateforme d'Annonces de Stages

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
![Status](https://img.shields.io/badge/Status-En%20développement-orange?style=flat-square)
![Version](https://img.shields.io/badge/Version-1.0.0-brightgreen?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)

**Application full-stack MVC permettant aux étudiants de postuler à des offres de stages, aux entreprises de gérer leurs offres, et aux administrateurs de superviser les candidatures.**

</div>

---

## 📌 Table des matières

- [Aperçu](#-aperçu)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Variables d'environnement](#-variables-denvironnement)
- [API Endpoints](#-api-endpoints)
- [Flux d'utilisation](#-flux-dutilisation)
- [Structure du projet](#-structure-du-projet)
- [Contribution](#-contribution)

---

## 🔍 Aperçu

La **Plateforme d'Annonces de Stages** est une application web full-stack développée avec une architecture **MVC**. Elle connecte trois types d'utilisateurs :

| Rôle | Accès |
|------|-------|
| 🎓 **Étudiant** | Consulter les offres, postuler avec CV PDF |
| 🏢 **Entreprise** | Publier des offres, voir les candidats |
| 🛡️ **Admin** | Valider / refuser les candidatures |

---

## ✨ Fonctionnalités

- 🔐 **Authentification JWT** — Register / Login sécurisé avec token
- 📋 **Gestion des offres** — CRUD complet pour les entreprises
- 📄 **Upload de CV** — Envoi de fichiers PDF via Multer
- 👥 **3 rôles distincts** — Permissions granulaires par rôle
- ✅ **Workflow de validation** — Statut `pending → accepted / rejected`
- 🔗 **Relations MongoDB** — Références entre User, Offer, Application
- 🚀 **API RESTful** — Endpoints clairs et documentés

---

## 🏗️ Architecture

```
MVC (Model - View - Controller)
```

```
backend/
├── controllers/
│   ├── authController.js          # Register / Login JWT
│   ├── offerController.js         # CRUD offres de stage
│   └── applicationController.js   # Postuler + gérer candidatures
├── models/
│   ├── User.js                    # Schéma utilisateur (3 rôles)
│   ├── Offer.js                   # Schéma offre de stage
│   └── Application.js             # Schéma candidature
├── middleware/
│   ├── authMiddleware.js          # Vérification JWT
│   └── uploadMiddleware.js        # Multer — upload CV PDF
├── routes/
│   └── api.js                     # Routes RESTful
└── server.js                      # Point d'entrée Express

frontend/
├── src/
│   ├── components/                # Composants React
│   ├── pages/                     # Pages (Login, Offers, Apply...)
│   └── services/                  # Appels Axios
└── public/
```

---

## 🛠️ Technologies

### Backend
| Package | Version | Rôle |
|---------|---------|------|
| `express` | ^4.x | Serveur HTTP / routage |
| `mongoose` | ^7.x | ODM MongoDB |
| `jsonwebtoken` | ^9.x | Authentification JWT |
| `bcryptjs` | ^2.x | Hashage des mots de passe |
| `multer` | ^1.x | Upload fichiers PDF |
| `dotenv` | ^16.x | Variables d'environnement |
| `cors` | ^2.x | Cross-Origin Resource Sharing |

### Frontend
| Package | Version | Rôle |
|---------|---------|------|
| `react` | ^18.x | Interface utilisateur |
| `axios` | ^1.x | Requêtes HTTP |
| `react-router-dom` | ^6.x | Navigation SPA |

---

## 🚀 Installation

### Prérequis

- **Node.js** >= 18.x
- **MongoDB** (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))
- **npm** ou **yarn**

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/plateforme-stages.git
cd plateforme-stages
```

### 2. Installer les dépendances backend

```bash
cd backend
npm install
```

### 3. Installer les dépendances frontend

```bash
cd ../frontend
npm install
```

### 4. Configurer les variables d'environnement

Créer un fichier `.env` dans `/backend` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/plateforme-stages
JWT_SECRET=votre_secret_jwt_tres_long
```

### 5. Lancer l'application

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm start
```

L'API sera disponible sur `http://localhost:5000` et le frontend sur `http://localhost:3000`.

---

## 🔑 Variables d'environnement

| Variable | Description | Exemple |
|----------|-------------|---------|
| `PORT` | Port du serveur Express | `5000` |
| `MONGO_URI` | URI de connexion MongoDB | `mongodb://localhost:27017/stages` |
| `JWT_SECRET` | Clé secrète pour les tokens JWT | `mon_secret_super_securise` |

---

## 📡 API Endpoints

### Auth
| Méthode | Route | Description | Auth |
|---------|-------|-------------|------|
| `POST` | `/api/auth/register` | Créer un compte | ❌ |
| `POST` | `/api/auth/login` | Se connecter | ❌ |

### Offres de stage
| Méthode | Route | Description | Auth | Rôle |
|---------|-------|-------------|------|------|
| `GET` | `/api/offers` | Lister toutes les offres actives | ❌ | — |
| `POST` | `/api/offers` | Créer une offre | ✅ | `company` |
| `GET` | `/api/offers/my` | Mes offres | ✅ | `company` |

### Candidatures
| Méthode | Route | Description | Auth | Rôle |
|---------|-------|-------------|------|------|
| `POST` | `/api/applications` | Postuler (avec CV PDF) | ✅ | `student` |
| `GET` | `/api/offers/:offerId/applications` | Voir les candidats d'une offre | ✅ | `company` |
| `PATCH` | `/api/applications/:id/status` | Accepter / Refuser | ✅ | `admin` |

---

## 🔄 Flux d'utilisation

```
1. 🏢 Entreprise  →  POST /api/offers         →  Publie "Stage Dev Fullstack 6 mois"
2. 🎓 Étudiant    →  GET  /api/offers         →  Consulte les offres disponibles
3. 🎓 Étudiant    →  POST /api/applications   →  Postule avec son CV (PDF)
4. 🛡️ Admin       →  PATCH /applications/status →  Passe le statut à "accepted"
5. 🏢 Entreprise  →  GET  /api/offers/:id/applications → Voit les candidats acceptés
```

---

## 📁 Structure du projet

```
plateforme-stages/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── offerController.js
│   │   └── applicationController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Offer.js
│   │   └── Application.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── routes/
│   │   └── api.js
│   ├── uploads/              # CV PDF stockés ici
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. **Fork** le projet
2. Créer une branche — `git checkout -b feature/ma-fonctionnalite`
3. Commit — `git commit -m 'feat: ajout de ma fonctionnalité'`
4. Push — `git push origin feature/ma-fonctionnalite`
5. Ouvrir une **Pull Request**

---

## 📄 Licence

Distribué sous la licence **MIT**. Voir `LICENSE` pour plus d'informations.

---

<div align="center">
  Développé dans le cadre d'un <strong>Projet de Module Full Stack</strong>
</div>