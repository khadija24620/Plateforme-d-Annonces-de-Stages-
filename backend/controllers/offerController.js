const Offer = require('../models/Offer');

exports.createOffer = async (req, res) => {
  try {
    if (req.user.role !== 'company')
      return res.status(403).json({ error: 'Entreprise seulement' });
    const offer = await Offer.create({ ...req.body, company: req.user.id });
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).populate('company', 'companyName email');
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ company: req.user.id });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};