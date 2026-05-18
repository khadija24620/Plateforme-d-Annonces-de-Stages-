import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const C = {
  bg:          'rgba(13,11,18,0.92)',
  bgSolid:     '#0d0b12',
  border:      'rgba(255,255,255,0.07)',
  accent:      '#8d1723',
  accentHover: '#a81e2d',
  accentGlow:  'rgba(141,23,35,0.3)',
  accentLight: 'rgba(141,23,35,0.08)',
  text:        '#f0eaf8',
  textSec:     'rgba(240,234,248,0.55)',
  textMuted:   'rgba(240,234,248,0.3)',
};

// Liens par rôle
const NAV_LINKS = {
  student: [
    {
      to: '/', label: 'Offres',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    },
    {
      to: '/my-applications', label: 'Mes candidatures',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    },
  ],
  company: [
    {
      to: '/', label: 'Offres',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    },
    {
      to: '/my-offers', label: 'Mes offres',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    },
    {
      to: '/create-offer', label: 'Créer une offre',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    },
  ],
  admin: [
    {
      to: '/', label: 'Offres',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>,
    },
    {
      to: '/create-offer', label: 'Créer une offre',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
    },
    {
      to: '/admin', label: 'Dashboard',
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    },
  ],
};

// Badge rôle
const ROLE_BADGE = {
  student: { label: 'Étudiant', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.2)' },
  company: { label: 'Entreprise', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)' },
  admin:   { label: 'Admin', color: '#8d1723', bg: 'rgba(141,23,35,0.12)', border: 'rgba(141,23,35,0.25)' },
};

export default function Navbar() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = user ? (NAV_LINKS[user.role] ?? []) : [];
  const badge = user ? ROLE_BADGE[user.role] : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le mobile menu au changement de route
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');

        .nav-link {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 13px; border-radius: 9px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
          text-decoration: none; color: ${C.textSec};
          transition: all 0.18s ease; border: 1px solid transparent;
          white-space: nowrap; flex-shrink: 0;
        }
        .nav-link:hover { color: ${C.text}; background: rgba(255,255,255,0.04); border-color: ${C.border}; }
        .nav-link.active { color: ${C.accent}; background: ${C.accentLight}; border-color: rgba(141,23,35,0.2); }

        .logout-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 14px; border-radius: 9px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500;
          color: ${C.textMuted}; background: transparent;
          border: 1px solid ${C.border}; cursor: pointer;
          transition: all 0.18s ease; white-space: nowrap; flex-shrink: 0;
        }
        .logout-btn:hover { color: #ef4444; border-color: rgba(239,68,68,0.3); background: rgba(239,68,68,0.06); }

        .btn-login {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 9px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
          text-decoration: none; color: ${C.textSec};
          border: 1px solid ${C.border}; background: transparent;
          transition: all 0.18s ease; white-space: nowrap;
        }
        .btn-login:hover { color: ${C.text}; border-color: rgba(255,255,255,0.15); background: rgba(255,255,255,0.04); }

        .btn-register {
          display: flex; align-items: center; gap: 7px;
          padding: 7px 16px; border-radius: 9px;
          font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 600;
          text-decoration: none; color: #fff;
          background: ${C.accent}; border: 1px solid transparent;
          transition: all 0.18s ease; white-space: nowrap;
          box-shadow: 0 2px 12px ${C.accentGlow};
        }
        .btn-register:hover { background: ${C.accentHover}; box-shadow: 0 4px 20px ${C.accentGlow}; transform: translateY(-1px); }

        .hamburger {
          display: none; flex-direction: column; justify-content: center;
          gap: 5px; width: 36px; height: 36px; padding: 6px;
          border: 1px solid ${C.border}; border-radius: 8px;
          background: transparent; cursor: pointer; transition: background 0.15s;
          flex-shrink: 0;
        }
        .hamburger:hover { background: rgba(255,255,255,0.05); }
        .hamburger span { display: block; height: 1.5px; border-radius: 2px; background: ${C.textSec}; transition: all 0.25s ease; }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        .mobile-drawer {
          display: none; flex-direction: column;
          padding: 12px 16px 16px; border-top: 1px solid ${C.border};
          gap: 4px; background: ${C.bgSolid};
          animation: slideDown 0.2s ease both;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-drawer .nav-link,
        .mobile-drawer .logout-btn,
        .mobile-drawer .btn-login,
        .mobile-drawer .btn-register { width: 100%; justify-content: flex-start; box-sizing: border-box; }
        .mobile-drawer .divider { height: 1px; background: ${C.border}; margin: 8px 0; }

        @media (max-width: 768px) {
          .hamburger      { display: flex !important; }
          .desktop-links  { display: none !important; }
          .desktop-right  { display: none !important; }
          .mobile-drawer  { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? C.bg : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}>
        {/* ── Barre principale ── */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '0 24px', height: 60,
          display: 'flex', alignItems: 'center', gap: 12,
          overflow: 'hidden',
        }}>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, flexShrink: 0 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 10px ${C.accentGlow}`, flexShrink: 0,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: '1.05rem', fontWeight: 700, color: C.text, letterSpacing: '-0.01em' }}>
              Anno<span style={{ color: C.accent }}>Stage</span>
            </span>
          </Link>

          {/* Séparateur */}
          <div style={{ width: 1, height: 20, background: C.border, flexShrink: 0 }} />

          {/* Liens desktop */}
          <nav className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, overflow: 'hidden' }}>
            {links.map(link => (
              <Link key={link.to} to={link.to} className={`nav-link${isActive(link.to) ? ' active' : ''}`}>
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Zone droite desktop */}
          <div className="desktop-right" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, marginLeft: 'auto' }}>
            {user ? (
              <>
                {/* Badge rôle + email */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                  {badge && (
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em',
                      textTransform: 'uppercase', color: badge.color,
                      background: badge.bg, border: `1px solid ${badge.border}`,
                      padding: '2px 8px', borderRadius: 6, fontFamily: "'DM Sans', sans-serif",
                    }}>
                      {badge.label}
                    </span>
                  )}
                  <span style={{ color: C.textMuted, fontSize: '0.73rem', fontFamily: "'DM Sans', sans-serif", maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.email}
                  </span>
                </div>

                {/* Bouton déconnexion */}
                <button onClick={handleLogout} className="logout-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Connexion</Link>
                <Link to="/register" className="btn-register">S'inscrire</Link>
              </>
            )}
          </div>

          {/* Hamburger mobile */}
          <button
            className={`hamburger${mobileOpen ? ' open' : ''}`}
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
            style={{ marginLeft: 'auto' }}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* ── Menu mobile ── */}
        {mobileOpen && (
          <div className="mobile-drawer">
            {links.map(link => (
              <Link key={link.to} to={link.to} className={`nav-link${isActive(link.to) ? ' active' : ''}`}>
                {link.icon}
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <div className="divider" />
                {badge && (
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em',
                    textTransform: 'uppercase', color: badge.color,
                    background: badge.bg, border: `1px solid ${badge.border}`,
                    padding: '3px 10px', borderRadius: 6, alignSelf: 'flex-start',
                    fontFamily: "'DM Sans', sans-serif", marginBottom: 2,
                  }}>
                    {badge.label}
                  </span>
                )}
                <span style={{ color: C.textMuted, fontSize: '0.75rem', padding: '0 2px', fontFamily: "'DM Sans', sans-serif" }}>
                  {user.email}
                </span>
                <div className="divider" />
                <button onClick={handleLogout} className="logout-btn">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <div className="divider" />
                <div style={{ display: 'flex', gap: 8 }}>
                  <Link to="/login" className="btn-login" style={{ flex: 1, justifyContent: 'center' }}>Connexion</Link>
                  <Link to="/register" className="btn-register" style={{ flex: 1, justifyContent: 'center' }}>S'inscrire</Link>
                </div>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
}