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

function FloatingInput({ id, label, type = 'text', value, onChange, icon, delay = 0 }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}>
      {icon && (
        <div style={{
          position: 'absolute', left: 16, top: active ? 18 : '50%',
          transform: active ? 'none' : 'translateY(-50%)',
          color: focused ? C.accent : C.textMuted, transition: 'all 0.2s',
          zIndex: 2, pointerEvents: 'none', display: 'flex', alignItems: 'center',
        }}>{icon}</div>
      )}
      <label htmlFor={id} style={{
        position: 'absolute', left: icon ? 46 : 16, zIndex: 2, pointerEvents: 'none',
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
          width: '100%', padding: active ? `22px ${icon ? '16px' : '16px'} 8px ${icon ? '46px' : '16px'}` : `16px 16px 16px ${icon ? '46px' : '16px'}`,
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

function FloatingTextarea({ id, label, value, onChange, delay = 0, rows = 5 }) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div style={{ position: 'relative', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}>
      <label htmlFor={id} style={{
        position: 'absolute', left: 16, zIndex: 2, pointerEvents: 'none',
        top: active ? 10 : 16,
        fontSize: active ? '0.68rem' : '0.9rem',
        color: focused ? C.accent : active ? C.textSec : C.textMuted,
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      }}>{label}</label>
      <textarea
        id={id} value={value} rows={rows}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: active ? '28px 16px 12px' : '16px',
          background: focused ? 'rgba(141,23,35,0.05)' : C.bgInput,
          border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
          borderRadius: 12, color: C.text, fontSize: '0.9rem',
          fontFamily: "'DM Sans', sans-serif", outline: 'none',
          boxSizing: 'border-box', resize: 'vertical', lineHeight: 1.65,
          transition: 'all 0.2s', boxShadow: focused ? `0 0 0 3px ${C.accentGlow}` : 'none',
        }}
      />
      <div style={{
        position: 'absolute', bottom: 12, right: 14,
        color: value.length > 450 ? C.accent : C.textMuted,
        fontSize: '0.7rem', pointerEvents: 'none', transition: 'color 0.2s',
      }}>{value.length}/500</div>
    </div>
  );
}

function FloatingSelect({ id, label, value, onChange, options, delay = 0 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: 'relative', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both` }}>
      <label htmlFor={id} style={{
        position: 'absolute', left: 16, zIndex: 2, pointerEvents: 'none',
        top: value ? 8 : '50%',
        transform: value ? 'translateY(0) scale(0.75)' : 'translateY(-50%) scale(1)',
        transformOrigin: 'left center', fontSize: '0.9rem',
        color: focused ? C.accent : value ? C.textSec : C.textMuted,
        transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
        fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      }}>{label}</label>
      <select
        id={id} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%', padding: value ? '22px 36px 8px 16px' : '16px 36px 16px 16px',
          background: focused ? 'rgba(141,23,35,0.05)' : C.bgInput,
          border: `1.5px solid ${focused ? C.borderFocus : C.border}`,
          borderRadius: 12, color: value ? C.text : 'transparent', fontSize: '0.9rem',
          fontFamily: "'DM Sans', sans-serif", outline: 'none',
          boxSizing: 'border-box', appearance: 'none', cursor: 'pointer',
          transition: 'all 0.2s', boxShadow: focused ? `0 0 0 3px ${C.accentGlow}` : 'none',
        }}
      >
        <option value="" disabled />
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', color: C.textMuted, pointerEvents: 'none' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </div>
  );
}

export default function CreateOffer() {
  const [form, setForm] = useState({ title: '', description: '', location: '', duration: '', domain: '', contractType: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) { setError('Le titre et la description sont requis.'); return; }
    if (form.description.length > 500) { setError('La description est trop longue (max 500 caractères).'); return; }
    setError(''); setLoading(true);
    try {
      // await api.post('/offers', form);
      await new Promise(r => setTimeout(r, 1200));
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const domainOptions = [
    { value: 'Développement', label: 'Développement' },
    { value: 'Data & IA', label: 'Data & IA' },
    { value: 'Design', label: 'Design' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Autre', label: 'Autre' },
  ];
  const durationOptions = [
    { value: '1 mois', label: '1 mois' },
    { value: '2 mois', label: '2 mois' },
    { value: '3 mois', label: '3 mois' },
    { value: '4 mois', label: '4 mois' },
    { value: '5 mois', label: '5 mois' },
    { value: '6 mois', label: '6 mois' },
  ];
  const contractOptions = [
    { value: 'Stage', label: 'Stage' },
    { value: 'Alternance', label: 'Alternance' },
    { value: 'CDD', label: 'CDD' },
  ];

  const filled = Object.values(form).filter(Boolean).length;
  const total = Object.keys(form).length;

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
        .create-btn {
          width: 100%; padding: 15px; border: none; border-radius: 12px;
          background: ${C.accent}; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
          font-weight: 600; letter-spacing: 0.04em; cursor: pointer;
          position: relative; overflow: hidden;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          box-shadow: 0 4px 20px ${C.accentGlow};
        }
        .create-btn:not(:disabled):hover { background: ${C.accentHover}; transform: translateY(-1px); box-shadow: 0 8px 30px ${C.accentGlow}; }
        .create-btn:not(:disabled):active { transform: translateY(0); }
        .create-btn:disabled { cursor: not-allowed; opacity: 0.7; }
        .create-btn::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%); pointer-events: none; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: C.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px', position: 'relative', overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '5%', right: '10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.15) 0%, transparent 70%)', animation: 'orb1 13s ease-in-out infinite', filter: 'blur(45px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.1) 0%, transparent 70%)', animation: 'orb2 16s ease-in-out infinite', filter: 'blur(55px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{
          width: '100%', maxWidth: 520, background: C.bgCard,
          border: `1px solid ${C.border}`, borderRadius: 24, padding: '44px 40px',
          position: 'relative', backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
          animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        }}>
          {/* Top line */}
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
              <p style={{ color: C.text, fontSize: '1.1rem', fontWeight: 600, marginBottom: 8, fontFamily: "'Fraunces', serif" }}>Offre publiée !</p>
              <p style={{ color: C.textMuted, fontSize: '0.82rem', marginBottom: 24 }}>Votre offre est maintenant visible par les candidats.</p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button onClick={() => { setSuccess(false); setForm({ title: '', description: '', location: '', duration: '', domain: '', contractType: '' }); }} style={{
                  padding: '10px 20px', borderRadius: 10, background: C.accentLight,
                  border: `1px solid rgba(141,23,35,0.2)`, color: C.accent,
                  fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
                }}>Nouvelle offre</button>
                <a href="/offers" style={{ padding: '10px 20px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`, color: C.textSec, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', transition: 'all 0.2s' }}>Voir les offres →</a>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div style={{ marginBottom: 32, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 0ms both' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 12px', borderRadius: 8, background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 20 }}>
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
                  <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Annonces de Stages</span>
                </div>
                <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: '1.9rem', fontWeight: 700, color: C.text, lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: 10 }}>
                  Nouvelle
                  <span style={{ display: 'block', color: C.accent, fontStyle: 'italic', fontWeight: 300 }}>offre de stage.</span>
                </h1>
                <p style={{ color: C.textSec, fontSize: '0.82rem', lineHeight: 1.6 }}>Publiez une offre et trouvez le talent qu'il vous faut.</p>

                {/* Progress bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: C.textMuted, fontSize: '0.7rem' }}>Complétude du formulaire</span>
                    <span style={{ color: C.accent, fontSize: '0.7rem', fontWeight: 600 }}>{Math.round((filled / total) * 100)}%</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                    <div style={{ height: '100%', background: C.accent, borderRadius: 2, width: `${(filled / total) * 100}%`, transition: 'width 0.4s cubic-bezier(0.4,0,0.2,1)', boxShadow: `0 0 8px ${C.accentGlow}` }} />
                  </div>
                </div>
              </div>

              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <FloatingInput id="title" label="Titre du poste" value={form.title} onChange={set('title')} delay={80}
                  icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 120ms both` }}>
                  <FloatingSelect id="domain" label="Domaine" value={form.domain} onChange={set('domain')} options={domainOptions} />
                  <FloatingSelect id="contractType" label="Type de contrat" value={form.contractType} onChange={set('contractType')} options={contractOptions} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 160ms both` }}>
                  <FloatingSelect id="duration" label="Durée" value={form.duration} onChange={set('duration')} options={durationOptions} />
                  <FloatingInput id="location" label="Lieu" value={form.location} onChange={set('location')}
                    icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>}
                  />
                </div>

                <FloatingTextarea id="description" label="Description du poste" value={form.description} onChange={set('description')} delay={200} rows={5} />

                {error && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', animation: 'fadeIn 0.2s ease both' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg>
                    <span style={{ color: C.red, fontSize: '0.78rem' }}>{error}</span>
                  </div>
                )}

                <div style={{ marginTop: 6, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 240ms both' }}>
                  <button type="submit" className="create-btn" disabled={loading}>
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                        Publication…
                      </span>
                    ) : 'Publier l\'offre'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}