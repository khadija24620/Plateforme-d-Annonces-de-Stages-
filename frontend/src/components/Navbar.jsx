import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Design tokens — thème darkred Annostage ───────────────────────────────────
const C = {
  bg:           'rgba(13,11,18,0.85)',
  bgSolid:      '#0d0b12',
  border:       'rgba(255,255,255,0.07)',
  accent:       '#8d1723',
  accentHover:  '#a81e2d',
  accentGlow:   'rgba(141,23,35,0.3)',
  accentLight:  'rgba(141,23,35,0.08)',
  text:         '#f0eaf8',
  textSec:      'rgba(240,234,248,0.55)',
  textMuted:    'rgba(240,234,248,0.3)',
}

const LINKS = [
  {
    to: '/',
    label: 'Offres',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M8 7V5a2 2 0 0 0-4 0v2"/>
      </svg>
    ),
  },
  {
    to: '/create-offer',
    label: 'Créer une offre',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/>
      </svg>
    ),
  },
  {
    to: '/admin',
    label: 'Admin',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z"/><path d="M12 8v4l3 3"/>
      </svg>
    ),
  },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fermer le menu mobile au changement de route

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:wght@700&display=swap');

        .nav-link {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 13px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 500;
          text-decoration: none;
          color: ${C.textSec};
          transition: all 0.18s cubic-bezier(0.4,0,0.2,1);
          position: relative;
          white-space: nowrap;
          border: 1px solid transparent;
        }
        .nav-link:hover {
          color: ${C.text};
          background: rgba(255,255,255,0.04);
          border-color: ${C.border};
        }
        .nav-link.active {
          color: ${C.accent};
          background: ${C.accentLight};
          border-color: rgba(141,23,35,0.2);
        }
        .nav-link.active svg {
          color: ${C.accent};
        }

        .btn-login {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          color: ${C.textSec};
          border: 1px solid ${C.border};
          background: transparent;
          transition: all 0.18s ease;
          white-space: nowrap;
        }
        .btn-login:hover {
          color: ${C.text};
          border-color: rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.04);
        }

        .btn-register {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 16px;
          border-radius: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          color: #fff;
          background: ${C.accent};
          border: 1px solid transparent;
          transition: all 0.18s ease;
          white-space: nowrap;
          box-shadow: 0 2px 12px ${C.accentGlow};
        }
        .btn-register:hover {
          background: ${C.accentHover};
          box-shadow: 0 4px 20px ${C.accentGlow};
          transform: translateY(-1px);
        }

        .hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 6px;
          border: 1px solid ${C.border};
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: background 0.15s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.05); }
        .hamburger span {
          display: block;
          height: 1.5px;
          border-radius: 2px;
          background: ${C.textSec};
          transition: all 0.25s cubic-bezier(0.4,0,0.2,1);
        }
        .hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* Mobile drawer */
        .mobile-menu {
          display: none;
          flex-direction: column;
          padding: 12px 16px 16px;
          border-top: 1px solid ${C.border};
          gap: 4px;
          background: ${C.bgSolid};
          animation: slideDown 0.2s ease both;
        }
        .mobile-menu .nav-link,
        .mobile-menu .btn-login,
        .mobile-menu .btn-register {
          width: 100%;
          justify-content: flex-start;
        }
        .mobile-menu .auth-row {
          display: flex;
          gap: 8px;
          margin-top: 8px;
          padding-top: 12px;
          border-top: 1px solid ${C.border};
        }
        .mobile-menu .auth-row .btn-login,
        .mobile-menu .auth-row .btn-register {
          flex: 1;
          justify-content: center;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .hamburger { display: flex !important; }
          .desktop-links { display: none !important; }
          .desktop-auth  { display: none !important; }
          .mobile-menu   { display: flex !important; }
        }
      `}</style>

      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? C.bg : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none',
      }}>
        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 9, marginRight: 12 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: C.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 2px 10px ${C.accentGlow}`,
              flexShrink: 0,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '1.05rem',
              fontWeight: 700,
              color: C.text,
              letterSpacing: '-0.01em',
            }}>
              Anno<span style={{ color: C.accent }}>Stage</span>
            </span>
          </Link>

          {/* ── Séparateur vertical ── */}
          <div style={{ width: 1, height: 20, background: C.border, marginRight: 4 }} />

          {/* ── Liens de navigation (desktop) ── */}
          <nav className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
            {LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? ' active' : ''}`}
              >
                {link.icon}
                {link.label}
                {isActive(link.to) && (
                  <span style={{
                    position: 'absolute', bottom: -1, left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4, height: 4, borderRadius: '50%',
                    background: C.accent,
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* ── Auth buttons (desktop) ── */}
          <div className="desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
            <Link to="/login" className="btn-login">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Connexion
            </Link>
            <Link to="/register" className="btn-register">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              S'inscrire
            </Link>
          </div>

          {/* ── Hamburger (mobile) ── */}
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
          <div className="mobile-menu">
            {LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive(link.to) ? ' active' : ''}`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            <div className="auth-row">
              <Link to="/login" className="btn-login">Connexion</Link>
              <Link to="/register" className="btn-register">S'inscrire</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}