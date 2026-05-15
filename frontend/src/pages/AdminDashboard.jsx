import { useState, useEffect } from 'react';
import api from '../api/axios';

const C = {
  bg: '#0d0b12', bgCard: '#13101c', bgInput: '#1a1628',
  border: 'rgba(255,255,255,0.07)', borderFocus: '#8d1723',
  accent: '#8d1723', accentHover: '#a81e2d',
  accentGlow: 'rgba(141,23,35,0.35)', accentLight: 'rgba(141,23,35,0.08)',
  text: '#f0eaf8', textSec: 'rgba(240,234,248,0.55)',
  textMuted: 'rgba(240,234,248,0.3)', red: '#ef4444', success: '#22c55e',
};


const STATUS_CONFIG = {
  pending:  { label: 'En attente',   bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.25)',  text: '#fbbf24' },
  accepted: { label: 'Acceptée',     bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',   text: '#4ade80' },
  rejected: { label: 'Refusée',      bg: 'rgba(239,68,68,0.1)',   border: 'rgba(239,68,68,0.25)',   text: '#f87171' },
};

const AVATAR_COLORS = ['#8d1723','#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981'];

function StatCard({ label, value, icon, color, delay, sublabel }) {
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: '20px 22px', position: 'relative', overflow: 'hidden',
      animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`,
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.6 }} />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
        {sublabel && <span style={{ color: C.textMuted, fontSize: '0.7rem' }}>{sublabel}</span>}
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 700, color: C.text, fontFamily: "'Fraunces', serif", lineHeight: 1, marginBottom: 6 }}>{value}</div>
      <div style={{ color: C.textMuted, fontSize: '0.78rem' }}>{label}</div>
    </div>
  );
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState({});
  const [toast, setToast] = useState(null);

  useEffect(() => {
  Promise.all([
    api.get('/applications/all'),  // endpoint à ajouter
    api.get('/stats')              // endpoint à ajouter
  ]).then(([appsRes, statsRes]) => {
    setApplications(appsRes.data);
    setStats(statsRes.data);
  }).finally(() => setLoading(false));
}, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = async (id, action) => {
  setActionLoading(prev => ({ ...prev, [id]: action }));
  try {
    await api.patch(`/applications/${id}/status`, { status: action });
    setApplications(prev => prev.map(a =>
      a._id === id ? { ...a, status: action } : a
    ));
    showToast(action === 'accepted' ? 'Candidature acceptée !' : 'Candidature refusée.');
  } catch {
    showToast('Erreur', 'error');
  } finally {
    setActionLoading(prev => ({ ...prev, [id]: null }));
  }
};

  const filtered = applications.filter(a => filter === 'all' || a.status === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,300;0,700;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.1); } 66% { transform: translate(-20px,15px) scale(0.95); } }
        @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-25px,20px) scale(0.9); } 66% { transform: translate(20px,-10px) scale(1.05); } }
        @keyframes grain { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 30% { transform: translate(3%,-1%); } 50% { transform: translate(-1%,2%); } 70% { transform: translate(2%,3%); } 90% { transform: translate(-3%,1%); } }
        .filter-tab {
          padding: 8px 16px; border-radius: 8px; border: 1px solid ${C.border};
          background: transparent; color: ${C.textMuted};
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .filter-tab:hover { border-color: rgba(255,255,255,0.15); color: ${C.textSec}; }
        .filter-tab.active { background: ${C.accentLight}; border-color: rgba(141,23,35,0.3); color: ${C.accent}; }
        .action-btn {
          padding: 7px 14px; border-radius: 8px; font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem; font-weight: 600; cursor: pointer; border: 1px solid;
          transition: all 0.2s; display: flex; align-items: center; gap: 5px;
        }
        .action-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-accept { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25); color: #4ade80; }
        .btn-accept:not(:disabled):hover { background: rgba(34,197,94,0.15); }
        .btn-reject { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.25); color: #f87171; }
        .btn-reject:not(:disabled):hover { background: rgba(239,68,68,0.15); }
      `}</style>

      <div style={{ minHeight: '100vh', background: C.bg, fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden' }}>
        {/* Background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-5%', right: '0%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.1) 0%, transparent 70%)', animation: 'orb1 14s ease-in-out infinite', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', bottom: '0%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.07) 0%, transparent 70%)', animation: 'orb2 18s ease-in-out infinite', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 18 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, animation: 'pulse 2s ease-in-out infinite' }} />
                <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Administration</span>
              </div>
              <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '2.2rem', fontWeight: 700, color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>
                Tableau de bord
                <span style={{ display: 'block', color: C.accent, fontStyle: 'italic', fontWeight: 300, fontSize: '1.6rem' }}>administrateur.</span>
              </h1>
              <p style={{ color: C.textSec, fontSize: '0.85rem' }}>Gérez les candidatures reçues et suivez les statistiques.</p>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 8 }}>
              <a href="/offers/create" style={{
                padding: '10px 18px', borderRadius: 10, background: C.accentLight,
                border: `1px solid rgba(141,23,35,0.25)`, color: C.accent,
                fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                Nouvelle offre
              </a>
            </div>
          </div>

          {/* Stats Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 16, padding: '20px 22px', animation: 'pulse 1.5s ease-in-out infinite' }}>
                  <div style={{ width: 38, height: 38, background: 'rgba(255,255,255,0.05)', borderRadius: 10, marginBottom: 16 }} />
                  <div style={{ height: 32, width: '50%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: 8 }} />
                  <div style={{ height: 12, width: '70%', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              <StatCard label="Total candidatures" value={stats.total} delay={80} color={C.accent}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>}
              />
              <StatCard label="En attente" value={stats.pending} delay={140} color="#f59e0b" sublabel="À traiter"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              />
              <StatCard label="Acceptées" value={stats.accepted} delay={200} color="#22c55e"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>}
              />
              <StatCard label="Refusées" value={stats.rejected} delay={260} color={C.red}
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>}
              />
            </div>
          )}

          {/* Filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 300ms both' }}>
            {[['all', 'Toutes'], ['pending', 'En attente'], ['accepted', 'Acceptées'], ['rejected', 'Refusées']].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} className={`filter-tab${filter === val ? ' active' : ''}`}>
                {label}
                <span style={{ marginLeft: 6, padding: '1px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.06)', fontSize: '0.7rem' }}>
                  {val === 'all' ? applications.length : applications.filter(a => a.status === val).length}
                </span>
              </button>
            ))}
          </div>

          {/* Applications Table */}
          <div style={{
            background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 20, overflow: 'hidden',
            animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 340ms both',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          }}>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 2.5fr 1fr 1fr',
              padding: '14px 24px', borderBottom: `1px solid ${C.border}`,
              background: 'rgba(255,255,255,0.02)',
            }}>
              {['Candidat', 'Offre', 'Statut', 'Actions'].map(h => (
                <span key={h} style={{ color: C.textMuted, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</span>
              ))}
            </div>

            {loading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite', margin: '0 auto' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              </div>
            ) : filtered.length === 0 ? (
              <div style={{ padding: '60px', textAlign: 'center' }}>
                <p style={{ color: C.textMuted, fontSize: '0.88rem' }}>Aucune candidature dans cette catégorie.</p>
              </div>
            ) : (
              filtered.map((app, i) => {
                const statusCfg = STATUS_CONFIG[app.status];
                const avatarColor = AVATAR_COLORS[i % AVATAR_COLORS.length];
                const isLoading = actionLoading[app._id];
                return (
                  <div key={app._id} style={{
                    display: 'grid', gridTemplateColumns: '2fr 2.5fr 1fr 1fr',
                    padding: '16px 24px', alignItems: 'center',
                    borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : 'none',
                    transition: 'background 0.2s',
                    animation: `slideUp 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms both`,
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Candidat */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: `${avatarColor}22`, border: `1px solid ${avatarColor}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: avatarColor, fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.04em',
                        flexShrink: 0,
                      }}>{app.student?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'}   </div>
                      <div>
                        <p style={{ color: C.text, fontSize: '0.85rem', fontWeight: 600, marginBottom: 2 }}>{app.student.fullName}</p>
                        <p style={{ color: C.textMuted, fontSize: '0.72rem' }}>{app.student.email}</p>
                      </div>
                    </div>

                    {/* Offre */}
                    <div>
                      <p style={{ color: C.textSec, fontSize: '0.82rem', marginBottom: 2, lineHeight: 1.3 }}>{app.offer.title}</p>
                      <p style={{ color: C.textMuted, fontSize: '0.72rem' }}>{app.offer.company?.companyName ?? '—'} · {new Date(app.createdAt).toLocaleDateString('fr-FR')}</p>
                    </div>

                    {/* Statut */}
                    <div>
                      <span style={{
                        padding: '4px 10px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 600,
                        background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, color: statusCfg.text,
                        display: 'inline-block',
                      }}>{statusCfg.label}</span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: 6 }}>
                      {app.status === 'pending' ? (
                        <>
                          <button className="action-btn btn-accept" disabled={!!isLoading}
                            onClick={() => handleAction(app._id, 'accepted')}>
                            {isLoading === 'accepted' ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M20 6L9 17l-5-5"/></svg>
                            )}
                            Accepter
                          </button>
                          <button className="action-btn btn-reject" disabled={!!isLoading}
                            onClick={() => handleAction(app._id, 'rejected')}>
                            {isLoading === 'rejected' ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                            ) : (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            )}
                            Refuser
                          </button>
                        </>
                      ) : (
                        <span style={{ color: C.textMuted, fontSize: '0.75rem' }}>—</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          padding: '12px 20px', borderRadius: 12,
          background: toast.type === 'success' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
          border: `1px solid ${toast.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
          color: toast.type === 'success' ? '#4ade80' : '#f87171',
          fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500,
          animation: 'slideInRight 0.3s cubic-bezier(0.16,1,0.3,1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            {toast.type === 'success' ? <path d="M20 6L9 17l-5-5"/> : <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}
          </svg>
          {toast.msg}
        </div>
      )}
    </>
  );
}