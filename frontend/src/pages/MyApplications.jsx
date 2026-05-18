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

const STATUS = {
  pending:  { label: 'En attente', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',   border: 'rgba(251,191,36,0.25)'  },
  accepted: { label: 'Acceptée',   color: '#4ade80', bg: 'rgba(74,222,128,0.1)',   border: 'rgba(74,222,128,0.25)'  },
  rejected: { label: 'Refusée',    color: '#f87171', bg: 'rgba(248,113,113,0.1)',  border: 'rgba(248,113,113,0.25)' },
};

function StatusBadge({ status }) {
  const s = STATUS[status] ?? STATUS.pending;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, fontSize: '0.72rem', fontWeight: 700, color: s.color, background: s.bg, border: `1px solid ${s.border}` }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {s.label}
    </span>
  );
}

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading,      setLoading]      = useState(true);

  useEffect(() => {
    api.get('/applications/mine')
      .then(res => setApplications(res.data))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  const downloadCV = async (appId, filename) => {
    try {
      const res = await api.get(`/applications/${appId}/cv`, { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a   = document.createElement('a');
      a.href = url; a.download = filename || 'cv.pdf'; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch {
      alert('Impossible de télécharger le CV.');
    }
  };

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
        .app-card {
          background: ${C.bgCard}; border: 1px solid ${C.border}; border-radius: 16px;
          padding: 22px 24px; transition: all 0.22s cubic-bezier(0.4,0,0.2,1);
          animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .app-card:hover { border-color: rgba(141,23,35,0.3); box-shadow: 0 8px 32px rgba(0,0,0,0.4); transform: translateY(-2px); }
        .icon-btn {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 9px; font-size: 0.76rem; font-weight: 600;
          font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; border: none;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, padding: '40px 24px', position: 'relative', overflow: 'hidden', fontFamily: "'DM Sans', sans-serif" }}>

        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '5%', right: '10%', width: 450, height: 450, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.12) 0%, transparent 70%)', animation: 'orb1 14s ease-in-out infinite', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.08) 0%, transparent 70%)', animation: 'orb2 18s ease-in-out infinite', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>

          {/* Header */}
          <div style={{ marginBottom: 36, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 18 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
              <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Espace étudiant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2rem', fontWeight: 700, color: C.text, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 6 }}>
                  Mes candidatures
                </h1>
                <p style={{ color: C.textMuted, fontSize: '0.82rem' }}>
                  {loading ? '…' : `${applications.length} candidature${applications.length > 1 ? 's' : ''} au total`}
                </p>
              </div>
              <button onClick={() => navigate('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', borderRadius: 10, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, color: C.accent, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = C.accent; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.accentLight; e.currentTarget.style.color = C.accent; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            Voir les offres
          </button>
            </div>

            {/* Stats rapides */}
            {!loading && applications.length > 0 && (
              <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
                {[
                  { label: 'En attente', count: applications.filter(a => a.status === 'pending').length,  color: '#fbbf24' },
                  { label: 'Acceptées',  count: applications.filter(a => a.status === 'accepted').length, color: '#4ade80' },
                  { label: 'Refusées',   count: applications.filter(a => a.status === 'rejected').length, color: '#f87171' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}` }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: s.color, display: 'inline-block' }} />
                    <span style={{ color: C.textSec, fontSize: '0.75rem' }}>{s.count} {s.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '80px 0', color: C.textMuted }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              <span style={{ fontSize: '0.88rem' }}>Chargement…</span>
            </div>
          )}

          {/* Empty state */}
          {!loading && applications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 24px', animation: 'fadeIn 0.4s ease both' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={C.accent} strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <p style={{ color: C.text, fontSize: '1rem', fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Aucune candidature</p>
              <p style={{ color: C.textMuted, fontSize: '0.82rem', marginBottom: 24, maxWidth: 300, margin: '0 auto 24px' }}>Vous n'avez pas encore postulé à une offre. Parcourez les annonces disponibles.</p>
              <button onClick={() => navigate('/')} style={{ padding: '10px 22px', borderRadius: 10, background: C.accent, border: 'none', color: '#fff', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", boxShadow: `0 4px 16px ${C.accentGlow}` }}>
                Voir les offres →
              </button>
            </div>
          )}

          {/* Liste */}
          {!loading && applications.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {applications.map((app, i) => (
                <div key={app._id} className="app-card" style={{ animationDelay: `${i * 60}ms` }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                        <h3 style={{ color: C.text, fontSize: '0.95rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 320 }}>
                          {app.offer?.title ?? 'Offre supprimée'}
                        </h3>
                        <StatusBadge status={app.status} />
                      </div>
                      <p style={{ color: C.textMuted, fontSize: '0.75rem', marginBottom: 10 }}>
                        {[app.offer?.location, app.offer?.duration, app.offer?.domain].filter(Boolean).join(' · ')}
                      </p>

                      {/* Lettre de motivation (résumé) */}
                      {app.motivation && (
                        <p style={{ color: C.textSec, fontSize: '0.78rem', lineHeight: 1.55, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', maxWidth: 500 }}>
                          {app.motivation}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, alignItems: 'flex-end' }}>
                      {app.cvPath && (
                        <button
                          className="icon-btn"
                          onClick={() => downloadCV(app._id, `CV_${app.offer?.title ?? 'offre'}.pdf`)}
                          style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.textSec }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(141,23,35,0.3)'; e.currentTarget.style.color = C.accent; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSec; }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                          Télécharger CV
                        </button>
                      )}
                      <span style={{ color: C.textMuted, fontSize: '0.68rem' }}>
                        {new Date(app.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
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