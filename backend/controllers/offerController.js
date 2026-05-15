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

// GET /offers/:id
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate('company', 'companyName email');
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /offers/:id
exports.deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    if (offer.company.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Non autorisé' });
    await offer.deleteOne();
    res.json({ message: 'Supprimée' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /offers/:id
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ error: 'Offre non trouvée' });
    if (offer.company.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ error: 'Non autorisé' });
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};