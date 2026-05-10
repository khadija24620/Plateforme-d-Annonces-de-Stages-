const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/api'));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connecté');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.log('❌ Erreur MongoDB:', err));