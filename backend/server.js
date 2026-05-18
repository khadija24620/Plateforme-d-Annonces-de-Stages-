const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ── Dossier uploads — créé automatiquement s'il n'existe pas ─────────────────
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Dossier uploads/ créé');
}

// ── Servir les fichiers uploadés publiquement ─────────────────────────────────
app.use('/uploads', express.static(uploadsDir));

// ── Routes API ────────────────────────────────────────────────────────────────
app.use('/api', require('./routes/api'));

// ── Connexion MongoDB ─────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.log('❌ Erreur MongoDB:', err));