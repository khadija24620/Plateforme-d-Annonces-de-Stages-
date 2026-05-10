const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const authCtrl = require('../controllers/authController');
const offerCtrl = require('../controllers/offerController');
const appCtrl = require('../controllers/applicationController');

// Auth
router.post('/auth/register', authCtrl.register);
router.post('/auth/login', authCtrl.login);

// Offres
router.post('/offers', auth, offerCtrl.createOffer);
router.get('/offers', offerCtrl.getAllOffers);
router.get('/offers/my', auth, offerCtrl.getMyOffers);

// Candidatures
router.post('/applications', auth, upload.single('cv'), appCtrl.applyToOffer);
router.get('/offers/:offerId/applications', auth, appCtrl.getApplicationsForOffer);
router.patch('/applications/:id/status', auth, appCtrl.updateStatus);

module.exports = router;