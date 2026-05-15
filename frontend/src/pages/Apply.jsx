import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Apply() {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState('');
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv) { setError('Le CV est requis'); return; }
    setLoading(true);
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('motivation', motivation);
    formData.append('offerId', offerId);
    try {
      await api.post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/', { state: { success: 'Candidature envoyée !' } });
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la candidature');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '80px auto', padding: '0 24px' }}>
      <h2>Postuler</h2>
      <textarea
        placeholder="Lettre de motivation..."
        value={motivation}
        onChange={e => setMotivation(e.target.value)}
        rows={6}
        style={{ width: '100%', marginBottom: 16 }}
      />
      <input
        type="file" accept=".pdf"
        onChange={e => setCv(e.target.files[0])}
        style={{ marginBottom: 16 }}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : 'Envoyer ma candidature'}
      </button>
    </form>
  );
}