import { useEffect, useState } from 'react';
// import api from '../api/axios';

const C = {
  bg: '#0d0b12', bgCard: '#13101c', bgInput: '#1a1628',
  border: 'rgba(255,255,255,0.07)', borderFocus: '#8d1723',
  accent: '#8d1723', accentHover: '#a81e2d',
  accentGlow: 'rgba(141,23,35,0.35)', accentLight: 'rgba(141,23,35,0.08)',
  text: '#f0eaf8', textSec: 'rgba(240,234,248,0.55)',
  textMuted: 'rgba(240,234,248,0.3)', red: '#ef4444', success: '#22c55e',
};

// ── Mock data for preview ──────────────────────────────────────────────────────
const MOCK_OFFERS = [
  { _id: '1', title: 'Développeur Full-Stack React / Node.js', description: 'Rejoignez notre équipe tech pour travailler sur des projets innovants. Vous serez amené à développer des fonctionnalités front et back en environnement agile.', company: { companyName: 'TechCorp Solutions' }, location: 'Paris, France', type: 'Stage 6 mois', createdAt: '2024-11-15', domain: 'Développement' },
  { _id: '2', title: 'Data Scientist – NLP & Machine Learning', description: 'Stage en science des données avec focus sur le traitement du langage naturel. Vous travaillerez sur des modèles de classification et d\'analyse de sentiments.', company: { companyName: 'DataMinds AI' }, location: 'Lyon, France', type: 'Stage 5 mois', createdAt: '2024-11-12', domain: 'Data & IA' },
  { _id: '3', title: 'Designer UX/UI – Applications Mobiles', description: 'Participez à la refonte complète de nos applications mobiles iOS et Android. Maîtrise de Figma et sensibilité produit requises.', company: { companyName: 'Créativé Studio' }, location: 'Bordeaux, France', type: 'Stage 4 mois', createdAt: '2024-11-10', domain: 'Design' },
  { _id: '4', title: 'Ingénieur DevOps / Cloud AWS', description: 'Automatisation des déploiements, monitoring et sécurité cloud. Expérience souhaitée avec Docker, Kubernetes et les pipelines CI/CD.', company: { companyName: 'CloudNine Infra' }, location: 'Remote', type: 'Stage 6 mois', createdAt: '2024-11-08', domain: 'Infrastructure' },
  { _id: '5', title: 'Chargé(e) de Marketing Digital & SEO', description: 'Gestion des campagnes SEO/SEA, création de contenu, analyse des KPIs. Bonne maîtrise des outils Google Analytics et Search Console.', company: { companyName: 'GrowthHack Agency' }, location: 'Marseille, France', type: 'Stage 3 mois', createdAt: '2024-11-05', domain: 'Marketing' },
  { _id: '6', title: 'Développeur Mobile Flutter', description: 'Développement d\'une application mobile cross-platform avec Flutter/Dart. Vous intégrerez des APIs REST et travaillerez en méthodologie Scrum.', company: { companyName: 'AppFactory' }, location: 'Nantes, France', type: 'Stage 6 mois', createdAt: '2024-11-02', domain: 'Développement' },
];

const DOMAIN_COLORS = {
  'Développement': { bg: 'rgba(141,23,35,0.1)', border: 'rgba(141,23,35,0.25)', text: '#c0697a' },
  'Data & IA':     { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.25)', text: '#60a5fa' },
  'Design':        { bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.25)', text: '#c084fc' },
  'Infrastructure':{ bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#fbbf24' },
  'Marketing':     { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.25)',  text: '#4ade80' },
};

function OfferCard({ offer, index }) {
  const [hovered, setHovered] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);
  const domainStyle = DOMAIN_COLORS[offer.domain] || { bg: 'rgba(255,255,255,0.05)', border: C.border, text: C.textMuted };

  const handleApply = async () => {
    setApplying(true);
    await new Promise(r => setTimeout(r, 900));
    setApplied(true);
    setApplying(false);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#161320' : C.bgCard,
        border: `1px solid ${hovered ? 'rgba(141,23,35,0.3)' : C.border}`,
        borderRadius: 18, padding: '24px 28px',
        transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default', position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(141,23,35,0.1)` : '0 2px 12px rgba(0,0,0,0.2)',
        animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${index * 80}ms both`,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Accent top line on hover */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
        background: `linear-gradient(90deg, transparent, ${C.accent}, transparent)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.3s',
        borderRadius: '0 0 4px 4px',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
            <span style={{
              padding: '3px 10px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 700,
              letterSpacing: '0.07em', textTransform: 'uppercase',
              background: domainStyle.bg, border: `1px solid ${domainStyle.border}`,
              color: domainStyle.text,
            }}>{offer.domain}</span>
            <span style={{
              padding: '3px 10px', borderRadius: 6, fontSize: '0.68rem', fontWeight: 600,
              background: 'rgba(255,255,255,0.04)', border: `1px solid ${C.border}`,
              color: C.textMuted,
            }}>{offer.type}</span>
          </div>
          <h3 style={{
            color: C.text, fontSize: '1rem', fontWeight: 600,
            fontFamily: "'Fraunces', serif", lineHeight: 1.3, marginBottom: 4,
          }}>{offer.title}</h3>
        </div>
      </div>

      {/* Company & location */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M3 21h18M3 7v14M21 7v14M10 3h4l2 4H8l2-4zM10 12h4v9h-4z"/></svg>
          <span style={{ color: C.textSec, fontSize: '0.8rem' }}>{offer.company?.companyName}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
          <span style={{ color: C.textSec, fontSize: '0.8rem' }}>{offer.location}</span>
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: C.textMuted, fontSize: '0.82rem', lineHeight: 1.65,
        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        marginBottom: 20,
      }}>{offer.description}</p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ color: C.textMuted, fontSize: '0.72rem' }}>
          Publié le {new Date(offer.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => {}} style={{
            padding: '8px 14px', borderRadius: 8,
            background: 'transparent', border: `1px solid ${C.border}`,
            color: C.textMuted, fontSize: '0.78rem', cursor: 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = C.textSec; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; }}
          >Voir</button>
          <button onClick={handleApply} disabled={applied || applying} style={{
            padding: '8px 18px', borderRadius: 8,
            background: applied ? 'rgba(34,197,94,0.1)' : C.accentLight,
            border: `1px solid ${applied ? 'rgba(34,197,94,0.25)' : 'rgba(141,23,35,0.25)'}`,
            color: applied ? C.success : C.accent,
            fontSize: '0.78rem', fontWeight: 600, cursor: applied ? 'default' : 'pointer',
            fontFamily: "'DM Sans', sans-serif", transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            {applying ? (
              <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ animation: 'spin 0.8s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>…</>
            ) : applied ? '✓ Candidaté' : 'Postuler'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('Tous');

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        // const res = await api.get('/offers');
        // setOffers(res.data);
        await new Promise(r => setTimeout(r, 800));
        setOffers(MOCK_OFFERS);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  const domains = ['Tous', ...Array.from(new Set(MOCK_OFFERS.map(o => o.domain)))];
  const filtered = offers.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.title.toLowerCase().includes(q) || o.company?.companyName.toLowerCase().includes(q) || o.description.toLowerCase().includes(q);
    const matchDomain = selectedDomain === 'Tous' || o.domain === selectedDomain;
    return matchSearch && matchDomain;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Fraunces:ital,wght@0,300;0,700;1,300&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes orb1 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(30px,-20px) scale(1.1); } 66% { transform: translate(-20px,15px) scale(0.95); } }
        @keyframes orb2 { 0%,100% { transform: translate(0,0) scale(1); } 33% { transform: translate(-25px,20px) scale(0.9); } 66% { transform: translate(20px,-10px) scale(1.05); } }
        @keyframes grain { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-2%,-3%); } 30% { transform: translate(3%,-1%); } 50% { transform: translate(-1%,2%); } 70% { transform: translate(2%,3%); } 90% { transform: translate(-3%,1%); } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        .domain-filter {
          padding: 7px 14px; border-radius: 8px; border: 1px solid ${C.border};
          background: transparent; color: ${C.textMuted};
          font-family: 'DM Sans', sans-serif; font-size: 0.78rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
        }
        .domain-filter:hover { border-color: rgba(255,255,255,0.15); color: ${C.textSec}; }
        .domain-filter.active { background: ${C.accentLight}; border-color: rgba(141,23,35,0.3); color: ${C.accent}; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: C.bg,
        fontFamily: "'DM Sans', sans-serif", position: 'relative', overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
          <div style={{ position: 'absolute', top: '-10%', right: '5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.12) 0%, transparent 70%)', animation: 'orb1 14s ease-in-out infinite', filter: 'blur(50px)' }} />
          <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(141,23,35,0.08) 0%, transparent 70%)', animation: 'orb2 18s ease-in-out infinite', filter: 'blur(60px)' }} />
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
          {/* Header */}
          <div style={{ marginBottom: 40, animation: 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) both' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 12px', borderRadius: 8,
              background: C.accentLight, border: `1px solid rgba(141,23,35,0.2)`, marginBottom: 20,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent, animation: 'pulse 2s ease-in-out infinite' }} />
              <span style={{ color: C.accent, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Annonces de Stages
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Fraunces', serif", fontSize: '2.4rem', fontWeight: 700,
              color: C.text, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 12,
            }}>
              Offres disponibles
              <span style={{ display: 'block', color: C.accent, fontStyle: 'italic', fontWeight: 300, fontSize: '1.8rem' }}>
                pour vous.
              </span>
            </h1>
            <p style={{ color: C.textSec, fontSize: '0.88rem', lineHeight: 1.6 }}>
              {offers.length} opportunités de stages correspondant à votre profil.
            </p>
          </div>

          {/* Search & Filters */}
          <div style={{ marginBottom: 32, animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1) 100ms both' }}>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? C.accent : C.textMuted, transition: 'color 0.2s', zIndex: 2 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <input
                type="text" placeholder="Rechercher par titre, entreprise…"
                value={search} onChange={e => setSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                style={{
                  width: '100%', padding: '14px 16px 14px 46px',
                  background: searchFocused ? 'rgba(141,23,35,0.04)' : C.bgCard,
                  border: `1.5px solid ${searchFocused ? C.borderFocus : C.border}`,
                  borderRadius: 12, color: C.text, fontSize: '0.9rem',
                  fontFamily: "'DM Sans', sans-serif", outline: 'none',
                  boxSizing: 'border-box', transition: 'all 0.2s',
                  boxShadow: searchFocused ? `0 0 0 3px ${C.accentGlow}` : 'none',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {domains.map(d => (
                <button key={d} onClick={() => setSelectedDomain(d)} className={`domain-filter${selectedDomain === d ? ' active' : ''}`}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Offers Grid */}
          {loading ? (
            <div style={{ display: 'grid', gap: 16 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{
                  background: C.bgCard, border: `1px solid ${C.border}`,
                  borderRadius: 18, padding: '24px 28px', animation: 'pulse 1.5s ease-in-out infinite',
                }}>
                  <div style={{ height: 16, width: '40%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: 12 }} />
                  <div style={{ height: 22, width: '75%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: 16 }} />
                  <div style={{ height: 13, width: '90%', background: 'rgba(255,255,255,0.03)', borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ height: 13, width: '65%', background: 'rgba(255,255,255,0.03)', borderRadius: 4 }} />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', animation: 'fadeIn 0.3s ease' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" style={{ margin: '0 auto 16px', display: 'block' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <p style={{ color: C.textMuted, fontSize: '0.9rem' }}>Aucune offre ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {filtered.map((offer, i) => <OfferCard key={offer._id} offer={offer} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}