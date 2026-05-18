import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const C = {
  bg: '#0d0b12', bgCard: '#13101c', bgInput: '#1a1628',
  border: 'rgba(255,255,255,0.07)', borderFocus: '#8d1723',
  accent: '#8d1723', accentHover: '#a81e2d',
  accentGlow: 'rgba(141,23,35,0.35)', accentLight: 'rgba(141,23,35,0.08)',
  text: '#f0eaf8', textSec: 'rgba(240,234,248,0.55)',
  textMuted: 'rgba(240,234,248,0.3)', red: '#ef4444', success: '#22c55e',
};

export default function MyOffers() {
  const navigate = useNavigate();
  const [offers,  setOffers]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState({});
  const [toast,   setToast]   = useState(null);

  useEffect(() => {
    api.get('/offers/my')
      .then(res => setOffers(res.data))
      .catch(() => setOffers([]))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer cette offre ?')) return;
    setDeleting(prev => ({ ...prev, [id]: true }));
    try {
      await api.delete(`/offers/${id}`);
      setOffers(prev => prev.filter(o => o._id !== id));
      showToast('Offre supprimée.');
    } catch {
      showToast('Erreur lors de la suppression.', 'error');
    } finally {
      setDeleting(prev => ({ ...prev, [id]: false }));
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });

  const isExpired = (deadline) => deadline && new Date(deadline) < new Date();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes orb1{ 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.1)} 66%{transform:translate(-20px,15px) scale(0.95)} }
        @keyframes orb2{ 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-25px,20px) scale(0.9)} 66%{transform:translate(20px,-10px) scale(1.05)} }

        .offer-card {
          background: ${C.bgCard}; border: 1px solid ${C.border}; border-radius: 16px;
          padding: 22px 24px; transition: all 0.22s ease;
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .offer-card:hover { border-color: rgba(141,23,35,0.25); box-shadow: 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-2px); }

        .action-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 9px; font-size: 0.76rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; border: 1px solid;
        }
        .btn-edit {
          background: rgba(255,255,255,0.04); border-color: ${C.border}; color: ${C.textSec};
        }
        .btn-edit:hover { border-color: rgba(141,23,35,0.3); color: ${C.accent}; background: ${C.accentLight}; }
        .btn-delete {
          background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.15); color: rgba(239,68,68,0.7);
        }
        .btn-delete:hover { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #ef4444; }
        .btn-apps {
          background: ${C.accentLight}; border-color: rgba(141,23,35,0.2); color: ${C.accent};
        }
        .btn-apps:hover { background: ${C.accent}; color: #fff; }

        .toast {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          display: flex; align-items: center; gap: 10px;
          padding: 12px 18px; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
          animation: slideUp 0.3s ease both;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        }
      `}</style>

      {/* Toast */}
      {toast && (
        <div className="toast" style={{
          background: toast.type === 'error' ? 'rgba(239,68,68,0.12)' : 'rgba(34,197,94,0.12)',
          border: `1px solid ${toast.type === 'error' ? 'rgba(239,68,68,0.25)' : 'rgba(34,197,94,0.25)'}`,
          color: toast.type === 'error' ? '#f87171' : '#4ade80',
        }}>
          {toast.type === 'error'
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          }
          {toast.msg}
        </div>
      )}

      <div style={{
        minHeight: '100vh', background: C.bg,
        padding: '40px 24px', position: 'relative',
        overflow: 'hidden', fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Background déco */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '5%', right: '10%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.12) 0%, transparent 70%)', animation: 'orb1 14s ease-in-out infinite', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.08) 0%, transparent 70%)', animation: 'orb2 18s ease-in-out infinite', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>

          {/* Header */}
          <div style={{ marginBottom: 36, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 18 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
              <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Espace entreprise</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
                  Mes offres
                </h1>
                <p style={{ color: C.textMuted, fontSize: '0.82rem' }}>
                  {loading ? '…' : `${offers.length} offre${offers.length > 1 ? 's' : ''} publiée${offers.length > 1 ? 's' : ''}`}
                </p>
              </div>
              <button
                onClick={() => navigate('/create-offer')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', borderRadius: 10,
                  background: C.accent, border: 'none', color: '#fff',
                  fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: `0 4px 16px ${C.accentGlow}`,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.accentHover; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Nouvelle offre
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '80px 0', color: C.textMuted }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span style={{ fontSize: '0.88rem' }}>Chargement…</span>
            </div>
          )}

          {/* Empty state */}
          {!loading && offers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 24px', animation: 'fadeIn 0.4s ease both' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
              </div>
              <p style={{ color: C.text, fontSize: '1rem', fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Aucune offre publiée</p>
              <p style={{ color: C.textMuted, fontSize: '0.82rem', maxWidth: 300, margin: '0 auto 24px' }}>
                Vous n'avez pas encore publié d'offre de stage. Créez votre première annonce.
              </p>
              <button onClick={() => navigate('/create-offer')} style={{ padding: '10px 22px', borderRadius: 10, background: C.accent, border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 16px ${C.accentGlow}` }}>
                Créer une offre →
              </button>
            </div>
          )}

          {/* Liste des offres */}
          {!loading && offers.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {offers.map((offer, i) => (
                <div key={offer._id} className="offer-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>

                    {/* Infos offre */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <h3 style={{ color: C.text, fontSize: '0.98rem', fontWeight: 600 }}>
                          {offer.title}
                        </h3>
                        {isExpired(offer.deadline) && (
                          <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                            Expirée
                          </span>
                        )}
                      </div>
                      <p style={{ color: C.textMuted, fontSize: '0.75rem', marginBottom: 10 }}>
                        {[offer.location, offer.duration, offer.domain].filter(Boolean).join(' · ')}
                      </p>
                      {offer.description && (
                        <p style={{ color: C.textSec, fontSize: '0.78rem', lineHeight: 1.55, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxWidth: 500 }}>
                          {offer.description}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
                        {offer.deadline && (
                          <span style={{ color: C.textMuted, fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            Limite : {formatDate(offer.deadline)}
                          </span>
                        )}
                        <span style={{ color: C.textMuted, fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          Publié le {formatDate(offer.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, alignItems: 'flex-end' }}>
                      <button
                        className="action-btn btn-apps"
                        onClick={() => navigate(`/offers/${offer._id}/applications`)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Candidatures
                      </button>
                      <button
                        className="action-btn btn-edit"
                        onClick={() => navigate(`/edit-offer/${offer._id}`)}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                        Modifier
                      </button>
                      <button
                        className="action-btn btn-delete"
                        onClick={() => handleDelete(offer._id)}
                        disabled={deleting[offer._id]}
                      >
                        {deleting[offer._id]
                          ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                          : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        }
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}