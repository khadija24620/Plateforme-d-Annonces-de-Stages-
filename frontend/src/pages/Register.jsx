import { useState } from 'react';
// import api from '../api/axios';

const C = {
  bg: '#0d0b12', bgCard: '#13101c', bgInput: '#1a1628',
  border: 'rgba(255,255,255,0.07)', borderFocus: '#8d1723',
  accent: '#8d1723', accentHover: '#a81e2d',
  accentGlow: 'rgba(141,23,35,0.35)', accentLight: 'rgba(141,23,35,0.08)',
  text: '#f0eaf8', textSec: 'rgba(240,234,248,0.55)',
  textMuted: 'rgba(240,234,248,0.3)', red: '#ef4444', success: '#22c55e',
};

function PageBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: '10%', left: '15%',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(141,23,35,0.18) 0%, transparent 70%)',
        animation: 'orb1 12s ease-in-out infinite', filter: 'blur(40px)',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(141,23,35,0.12) 0%, transparent 70%)',
        animation: 'orb2 15s ease-in-out infinite', filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute', inset: '-50%',
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        animation: 'grain 0.5s steps(1) infinite', opacity: 0.4,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
    </div>
  );
}

function FloatingInput({ id, label, type = 'text', value, onChange, icon, delay = 0, children }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  if (children) {
    return (
      <div style={{ position: 'relative', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}>
        <div style={{
          position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
          color: focused ? C.accent : C.textMuted, transition: 'color 0.2s', zIndex: 2, pointerEvents: 'none',
        }}>{icon}</div>
        <label htmlFor={id} style={{
          position: 'absolute', left: 46, zIndex: 2, pointerEvents: 'none',
          top: active ? 8 : '50%',
          transform: active ? 'translateY(0) scale(0.75)' : 'translateY(-50%) scale(1)',
          transformOrigin: 'left center', fontSize: '0.9rem',
          color: focused ? C.accent : active ? C.textSec : C.textMuted,
          transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
          fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
        }}>{label}</label>
        <select
          id={id} value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', padding: '22px 16px 8px 46px',
            background: focused ? 'rgba(141,23,35,0.05)' : C.bgInput,
            border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
            borderRadius: 12, color: C.text, fontSize: '0.9rem',
            fontFamily: "'DM Sans', sans-serif", outline: 'none',
            boxSizing: 'border-box', appearance: 'none',
            transition: 'all 0.2s', boxShadow: focused ? `0 0 0 3px ${C.accentGlow}` : 'none',
          }}
        >
          {children}
        </select>
        <div style={{
          position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
          color: C.textMuted, pointerEvents: 'none',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}>
      <div style={{
        position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
        color: focused ? C.accent : C.textMuted, transition: 'color 0.2s',
        zIndex: 2, pointerEvents: 'none', display: 'flex', alignItems: 'center',
      }}>{icon}</div>
      <label htmlFor={id} style={{
        position: 'absolute', left: 46, zIndex: 2, pointerEvents: 'none',
        top: active ? 8 : '50%',
        transform: active ? 'translateY(0) scale(0.75)' : 'translateY(-50%) scale(1)',
        transformOrigin: 'left center', fontSize: '0.9rem',
        color: focused ? C.accent : active ? C.textSec : C.textMuted,
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      }}>{label}</label>
      <input
        id={id} type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: active ? '22px 16px 8px 46px' : '16px 16px 16px 46px',
          background: focused ? 'rgba(141,23,35,0.05)' : C.bgInput,
          border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
          borderRadius: 12, color: C.text, fontSize: '0.9rem',
          fontFamily: "'DM Sans', sans-serif", outline: 'none',
          boxSizing: 'border-box', transition: 'all 0.2s',
          boxShadow: focused ? `0 0 0 3px ${C.accentGlow}` : 'none',
        }}
      />
    </div>
  );
}

export default function Register() {
  const [form, setForm] = useState({ email: '', password: '', confirm: '', role: 'student', companyName: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Veuillez remplir tous les champs obligatoires.'); return; }
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return; }
    if (form.password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    setError(''); setLoading(true);
    try {
      // await api.post('/auth/register', { email: form.email, password: form.password, role: form.role, companyName: form.companyName });
      await new Promise(r => setTimeout(r, 1200));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const roleLabels = { student: 'Étudiant', company: 'Entreprise', admin: 'Administrateur' };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,300;0,700;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulseRing { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
        @keyframes checkDraw { from { stroke-dashoffset: 50; } to { stroke-dashoffset: 0; } }
        @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.1); } 66% { transform: translate(-20px,15px) scale(0.95); } }
        @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-25px,20px) scale(0.9); } 66% { transform: translate(20px,-10px) scale(1.05); } }
        @keyframes grain { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 30% { transform: translate(3%,-1%); } 50% { transform: translate(-1%,2%); } 70% { transform: translate(2%,3%); } 90% { transform: translate(-3%,1%); } }
        .reg-btn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          background: ${C.accent}; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px ${C.accentGlow};
        }
        .reg-btn:not(:disabled):hover { background: ${C.accentHover}; transform: translateY(-1px); box-shadow: 0 8px 30px ${C.accentGlow}; }
        .reg-btn:not(:disabled):active { transform: translateY(0); }
        .reg-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        .reg-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%); pointer-events: none; }
        .role-pill {
          flex: 1; padding: 10px 8px; border-radius: 10px; border: 1.5px solid ${C.border};
          background: ${C.bgInput}; color: ${C.textMuted};
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; text-align: center;
        }
        .role-pill.active { border-color: ${C.accent}; background: ${C.accentLight}; color: ${C.accent}; box-shadow: 0 0 0 3px ${C.accentGlow}; }
        .role-pill:hover:not(.active) { border-color: rgba(255,255,255,0.15); color: ${C.textSec}; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px', position: 'relative', overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <PageBackground />

        <div style={{
          width: '100%', maxWidth: 440, background: C.bgCard,
          border: `1px solid ${C.border}`, borderRadius: 24, padding: '44px 40px',
          position: 'relative', backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
          animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
            background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
            borderRadius: '0 0 4px 4px',
          }} />

          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeIn 0.4s ease both' }}>
              <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto 24px' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(34,197,94,0.12)', border: '2px solid rgba(34,197,94,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1,
                }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14l6 6L22 8" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      strokeDasharray="50" strokeDashoffset="50"
                      style={{ animation: 'checkDraw 0.4s 0.1s ease forwards' }}
                    />
                  </svg>
                </div>
                <div style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  border: '2px solid rgba(34,197,94,0.4)',
                  animation: 'pulseRing 1s ease-out forwards',
                }} />
              </div>
              <p style={{ color: C.text, fontSize: '1.1rem', fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Compte créé !</p>
              <p style={{ color: C.textMuted, fontSize: '0.82rem' }}>Vous pouvez maintenant vous connecter.</p>
              <a href="/login" style={{
                display: 'inline-block', marginTop: 20, padding: '10px 24px',
                background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`,
                borderRadius: 10, color: C.accent, fontSize: '0.82rem', fontWeight: 600,
                textDecoration: 'none', transition: 'all 0.2s',
              }}>Se connecter →</a>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 32, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0ms both' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '5px 12px', borderRadius: 8,
                  background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 20,
                }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
                  <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Annonces de Stages
                  </span>
                </div>
                <h1 style={{
                  fontFamily: "'Fraunces', serif", fontSize: '1.9rem', fontWeight: 700,
                  color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10,
                }}>
                  Créez votre
                  <span style={{ display: 'block', color: C.accent, fontStyle: 'italic', fontWeight: 300 }}>espace.</span>
                </h1>
                <p style={{ color: C.textSec, fontSize: '0.82rem', lineHeight: 1.6 }}>
                  Rejoignez la plateforme pour accéder aux offres de stages.
                </p>
              </div>

              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Role selector */}
                <div style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 60ms both' }}>
                  <p style={{ color: C.textMuted, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                    Je suis un·e
                  </p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['student', 'company', 'admin'].map(r => (
                      <button key={r} type="button" onClick={() => set('role')(r)}
                        className={`role-pill${form.role === r ? ' active' : ''}`}>
                        {roleLabels[r]}
                      </button>
                    ))}
                  </div>
                </div>

                {form.role === 'company' && (
                  <FloatingInput id="companyName" label="Nom de l'entreprise" value={form.companyName} onChange={set('companyName')} delay={80}
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M3 7v14M21 7v14M6 10h2m-2 4h2m-2 4h2M10 3h4l2 4H8l2-4zM16 10h2m-2 4h2m-2 4h2"/></svg>}
                  />
                )}

                <FloatingInput id="email" label="Adresse e-mail" type="email" value={form.email} onChange={set('email')} delay={100}
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/></svg>}
                />

                <FloatingInput id="password" label="Mot de passe" type="password" value={form.password} onChange={set('password')} delay={160}
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                />

                <FloatingInput id="confirm" label="Confirmer le mot de passe" type="password" value={form.confirm} onChange={set('confirm')} delay={200}
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>}
                />

                {/* Password strength */}
                {form.password.length > 0 && (
                  <div style={{ animation: 'fadeIn 0.2s ease' }}>
                    <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                      {[1,2,3,4].map(i => {
                        const strength = form.password.length >= 12 ? 4 : form.password.length >= 10 ? 3 : form.password.length >= 8 ? 2 : 1;
                        const colors = { 1: C.red, 2: '#f59e0b', 3: '#22c55e', 4: C.accent };
                        return (
                          <div key={i} style={{
                            flex: 1, height: 3, borderRadius: 2,
                            background: i <= strength ? colors[strength] : 'rgba(255,255,255,0.07)',
                            transition: 'all 0.3s',
                          }} />
                        );
                      })}
                    </div>
                    <p style={{ color: C.textMuted, fontSize: '0.7rem' }}>
                      {form.password.length < 8 ? 'Trop court' : form.password.length < 10 ? 'Acceptable' : form.password.length < 12 ? 'Bon' : 'Excellent'}
                    </p>
                  </div>
                )}

                {error && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '10px 14px', borderRadius: 10,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    animation: 'fadeIn 0.2s ease both',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                    <span style={{ color: C.red, fontSize: '0.78rem' }}>{error}</span>
                  </div>
                )}

                <div style={{ marginTop: 6, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 240ms both' }}>
                  <button type="submit" className="reg-btn" disabled={loading}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Création du compte…
                      </span>
                    ) : 'Créer mon compte'}
                  </button>
                </div>
              </form>

              <div style={{
                marginTop: 28, paddingTop: 24, borderTop: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 280ms both',
              }}>
                <span style={{ color: C.textMuted, fontSize: '0.78rem' }}>Déjà un compte ?</span>
                <a href="/login" style={{ color: C.accent, fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                  Se connecter →
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}