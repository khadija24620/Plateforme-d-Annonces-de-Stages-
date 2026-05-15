const Application = require('../models/Application');
const Offer = require('../models/Offer');

exports.applyToOffer = async (req, res) => {
  try {
    if (req.user.role !== 'student')
      return res.status(403).json({ error: 'Étudiant seulement' });
    if (!req.file)
      return res.status(400).json({ error: 'CV PDF requis' });
    const exists = await Application.findOne({ offer: req.body.offerId, student: req.user.id });
    if (exists)
      return res.status(400).json({ error: 'Déjà postulé' });
    const app = await Application.create({
      offer: req.body.offerId,
      student: req.user.id,
      cvUrl: req.file.path,
      motivation: req.body.motivation
    });
    res.status(201).json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApplicationsForOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.offerId);
    if (offer.company.toString() !== req.user.id)
      return res.status(403).json({ error: 'Pas ton offre' });
    const apps = await Application.find({ offer: req.params.offerId })
      .populate('student', 'fullName email filiere');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ error: 'Admin seulement' });
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /applications/all  — admin only
exports.getAllApplications = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ error: 'Admin seulement' });
    const apps = await Application.find()
      .populate('student', 'fullName email filiere')
      .populate({ path: 'offer', select: 'title', populate: { path: 'company', select: 'companyName' } })
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /stats  — admin only
exports.getStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ error: 'Admin seulement' });
    const [total, pending, accepted, rejected] = await Promise.all([
      Application.countDocuments(),
      Application.countDocuments({ status: 'pending' }),
      Application.countDocuments({ status: 'accepted' }),
      Application.countDocuments({ status: 'rejected' }),
    ]);
    res.json({ total, pending, accepted, rejected });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /applications/mine  — student only
exports.getMyApplications = async (req, res) => {
  try {
    if (req.user.role !== 'student')
      return res.status(403).json({ error: 'Étudiant seulement' });
    const apps = await Application.find({ student: req.user.id })
      .populate('offer', 'title location duration deadline');
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};