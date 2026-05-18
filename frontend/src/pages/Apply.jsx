import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const C = {
  bg: '#0d0b12', bgCard: '#13101c', bgInput: '#1a1628',
  border: 'rgba(255,255,255,0.07)', borderFocus: '#8d1723',
  accent: '#8d1723', accentHover: '#a81e2d',
  accentGlow: 'rgba(141,23,35,0.35)', accentLight: 'rgba(141,23,35,0.08)',
  text: '#f0eaf8', textSec: 'rgba(240,234,248,0.55)',
  textMuted: 'rgba(240,234,248,0.3)', red: '#ef4444', success: '#22c55e',
};

export default function Apply() {
  const { offerId } = useParams();
  const navigate    = useNavigate();

  const [offer,      setOffer]      = useState(null);
  const [motivation, setMotivation] = useState('');
  const [cv,         setCv]         = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [success,    setSuccess]    = useState(false);
  const [dragOver,   setDragOver]   = useState(false);

  // Charger les infos de l'offre pour l'afficher
  useEffect(() => {
    api.get(`/offers/${offerId}`)
      .then(res => setOffer(res.data))
      .catch(() => {});
  }, [offerId]);

  const handleFile = (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') { setError('Seuls les fichiers PDF sont acceptés.'); return; }
    if (file.size > 5 * 1024 * 1024)    { setError('Le fichier ne doit pas dépasser 5 Mo.'); return; }
    setError('');
    setCv(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cv)         { setError('Le CV (PDF) est requis.'); return; }
    if (!motivation.trim()) { setError('La lettre de motivation est requise.'); return; }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('cv', cv);
    formData.append('motivation', motivation);
    formData.append('offerId', offerId);
    try {
      await api.post('/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de la candidature.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,300;0,700;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes slideUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
        @keyframes spin     { to{transform:rotate(360deg)} }
        @keyframes checkDraw{ from{stroke-dashoffset:50} to{stroke-dashoffset:0} }
        @keyframes pulseRing{ 0%{transform:scale(0.8);opacity:1} 100%{transform:scale(2);opacity:0} }
        @keyframes orb1{ 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,15px) scale(0.95)} }
        @keyframes orb2{ 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(0.9)} 66%{transform:translate(20px,-10px) scale(1.05)} }
        .apply-btn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          background: ${C.accent}; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px ${C.accentGlow};
        }
        .apply-btn:not(:disabled):hover { background: ${C.accentHover}; transform: translateY(-1px); box-shadow: 0 8px 30px ${C.accentGlow}; }
        .apply-btn:disabled { cursor: not-allowed; opacity: 0.7; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', position: 'relative', overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Background orbs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '10%', left: '15%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.18) 0%, transparent 70%)', animation: 'orb1 12s ease-in-out infinite', filter: 'blur(40px)' }} />
          <div style={{ position: 'absolute', bottom: '5%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.12) 0%, transparent 70%)', animation: 'orb2 15s ease-in-out infinite', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{
          width: '100%', maxWidth: 520, background: C.bgCard,
          border: `1px solid ${C.border}`, borderRadius: 24, padding: '44px 40px',
          position: 'relative', backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
          animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 2, background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`, borderRadius: '0 0 4px 4px' }} />

          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeIn 0.4s ease both' }}>
              <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 24px' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14l6 6L22 8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="50" strokeDashoffset="50" style={{ animation: 'checkDraw 0.4s 0.1s ease forwards' }} />
                  </svg>
                </div>
                <div style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid rgba(34,197,94,0.4)', animation: 'pulseRing 1s ease-out forwards' }} />
              </div>
              <p style={{ color: C.text, fontSize: '1.1rem', fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Candidature envoyée !</p>
              <p style={{ color: C.textMuted, fontSize: '0.82rem', marginBottom: 24 }}>Vous recevrez une réponse par email dès que possible.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => navigate('/my-applications')} style={{ padding: '10px 20px', borderRadius: 10, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, color: C.accent, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Mes candidatures
                </button>
                <button onClick={() => navigate('/')} style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.textSec, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Voir les offres →
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: 32, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
                <button onClick={() => navigate(-1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: C.textMuted, fontSize: '0.78rem', cursor: 'pointer', marginBottom: 20, padding: 0, fontFamily: "'DM Sans', sans-serif" }}
                  onMouseEnter={e => e.currentTarget.style.color = C.accent}
                  onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5m7-7-7 7 7 7"/></svg>
                  Retour
                </button>

                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.9rem', fontWeight: 700, color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 8 }}>
                  Postuler
                  <span style={{ display: 'block', color: C.accent, fontStyle: 'italic', fontWeight: 300, fontSize: '1.5rem' }}>à cette offre.</span>
                </h1>

                {/* Résumé de l'offre */}
                {offer && (
                  <div style={{ marginTop: 14, padding: '12px 16px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: `1px solid ${C.border}` }}>
                    <p style={{ color: C.text, fontSize: '0.85rem', fontWeight: 600, marginBottom: 3 }}>{offer.title}</p>
                    <p style={{ color: C.textMuted, fontSize: '0.75rem' }}>
                      {[offer.companyName || offer.company, offer.location, offer.duration].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                {/* Lettre de motivation */}
                <div style={{ position: 'relative', animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 80ms both' }}>
                  <label style={{ display: 'block', color: C.textSec, fontSize: '0.78rem', fontWeight: 600, marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    Lettre de motivation
                  </label>
                  <textarea
                    value={motivation}
                    onChange={e => setMotivation(e.target.value)}
                    rows={6}
                    placeholder="Expliquez pourquoi vous êtes le candidat idéal pour ce poste…"
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: C.bgInput, border: `1.5px solid ${motivation ? C.borderFocus : C.border}`,
                      borderRadius: 12, color: C.text, fontSize: '0.88rem',
                      fontFamily: "'DM Sans', sans-serif", outline: 'none',
                      boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.65,
                      transition: 'all 0.2s',
                    }}
                    onFocus={e => e.target.style.boxShadow = `0 0 0 3px ${C.accentGlow}`}
                    onBlur={e => e.target.style.boxShadow = 'none'}
                  />
                  <div style={{ position: 'absolute', bottom: 12, right: 14, color: motivation.length > 900 ? C.accent : C.textMuted, fontSize: '0.68rem', pointerEvents: 'none' }}>
                    {motivation.length} car.
                  </div>
                </div>

                {/* Upload CV */}
                <div style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 140ms both' }}>
                  <label style={{ display: 'block', color: C.textSec, fontSize: '0.78rem', fontWeight: 600, marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    CV (PDF uniquement · max 5 Mo)
                  </label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => document.getElementById('cv-input').click()}
                    style={{
                      border: `2px dashed ${dragOver ? C.accent : cv ? 'rgba(34,197,94,0.4)' : C.border}`,
                      borderRadius: 12, padding: '24px 20px',
                      textAlign: 'center', cursor: 'pointer',
                      background: dragOver ? C.accentLight : cv ? 'rgba(34,197,94,0.05)' : 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    {cv ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        <div style={{ textAlign: 'left' }}>
                          <p style={{ color: '#22c55e', fontSize: '0.82rem', fontWeight: 600 }}>{cv.name}</p>
                          <p style={{ color: C.textMuted, fontSize: '0.7rem' }}>{(cv.size / 1024).toFixed(0)} Ko · Cliquer pour changer</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 10px' }}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <p style={{ color: C.textSec, fontSize: '0.82rem', fontWeight: 500 }}>Glissez votre CV ici ou <span style={{ color: C.accent }}>cliquez pour parcourir</span></p>
                        <p style={{ color: C.textMuted, fontSize: '0.7rem', marginTop: 4 }}>PDF uniquement · max 5 Mo</p>
                      </>
                    )}
                  </div>
                  <input id="cv-input" type="file" accept=".pdf,application/pdf" onChange={e => handleFile(e.target.files[0])} style={{ display: 'none' }} />
                </div>

                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', animation: 'fadeIn 0.2s ease both' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                    <span style={{ color: C.red, fontSize: '0.78rem' }}>{error}</span>
                  </div>
                )}

                <button type="submit" className="apply-btn" disabled={loading} style={{ marginTop: 4 }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Envoi en cours…
                    </span>
                  ) : 'Envoyer ma candidature'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}