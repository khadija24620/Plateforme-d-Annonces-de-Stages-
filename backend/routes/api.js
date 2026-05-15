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

router.post('/offers', auth, offerCtrl.createOffer);
router.get('/offers', offerCtrl.getAllOffers);
router.get('/offers/my', auth, offerCtrl.getMyOffers);
router.get('/offers/:id', offerCtrl.getOfferById);
router.delete('/offers/:id', auth, offerCtrl.deleteOffer);
router.patch('/offers/:id', auth, offerCtrl.updateOffer);
router.get('/offers/:offerId/applications', auth, appCtrl.getApplicationsForOffer);

router.get('/applications/all', auth, appCtrl.getAllApplications);
router.get('/applications/mine', auth, appCtrl.getMyApplications);
router.post('/applications', auth, upload.single('cv'), appCtrl.applyToOffer);
router.patch('/applications/:id/status', auth, appCtrl.updateStatus);

// Stats admin
router.get('/stats', auth, appCtrl.getStats);

module.exports = router;