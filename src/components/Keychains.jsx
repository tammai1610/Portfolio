import React, { useState } from 'react';
import { C, F } from '../theme';
import { KEYCHAINS as K } from '../data';
import { SectionLabel, BigTitle, Reveal, Photo } from './ui';

const Ring = ({ drop }) => (
  <svg width="40" height={drop} viewBox={`0 0 40 ${drop}`} aria-hidden="true">
    <circle cx="20" cy="10" r="9" fill="none" stroke={C.dust} strokeWidth="3" />
    <path d={`M20 19 V${drop}`} stroke={C.dust} strokeWidth="2" strokeDasharray="4 3" />
  </svg>
);

const S = { stroke: C.ink, strokeWidth: 3, strokeLinejoin: 'round' };

const ART = {
  vietnam: { drop: 70, svg: (
    <svg width="124" height="88" viewBox="0 0 124 88" role="img" aria-label="Vietnam flag keychain">
      <rect x="3" y="3" width="118" height="82" rx="10" fill="#DA251D" {...S} />
      <circle cx="62" cy="12" r="4" fill={C.paper} stroke={C.ink} strokeWidth="2" />
      <polygon points="62,22 67.3,37.6 83.7,37.9 70.6,47.8 75.4,63.6 62,54 48.6,63.6 53.4,47.8 40.3,37.9 56.7,37.6" fill="#FFCD00" />
    </svg>
  ) },
  aodai: { drop: 40, svg: (
    <svg width="110" height="170" viewBox="0 0 110 170" role="img" aria-label="Ao dai keychain">
      <path d="M44 8 h22 v10 l20 9 l14 46 l-13 3 l-9 -32 l-1 116 h-44 l-1 -116 l-9 32 l-13 -3 l14 -46 l20 -9 z" fill={C.card} {...S} />
      <path d="M55 70 V160" stroke={C.ink} strokeWidth="2" strokeDasharray="3 4" />
      <rect x="44" y="8" width="22" height="10" fill={C.sage} stroke={C.ink} strokeWidth="2.5" />
      <g fill={C.red}><circle cx="46" cy="96" r="5" /><circle cx="64" cy="118" r="5" /><circle cx="48" cy="140" r="4" /><circle cx="66" cy="84" r="3.5" /></g>
      <g fill={C.gold}><circle cx="46" cy="96" r="1.8" /><circle cx="64" cy="118" r="1.8" /></g>
    </svg>
  ) },
  books: { drop: 80, svg: (
    <svg width="130" height="96" viewBox="0 0 130 96" role="img" aria-label="Open book keychain">
      <path d="M6 18 Q36 6 65 20 Q94 6 124 18 V88 Q94 78 65 90 Q36 78 6 88 Z" fill="#2B4C8C" {...S} />
      <path d="M12 16 Q38 6 65 18 V82 Q38 72 12 80 Z" fill={C.card} stroke={C.ink} strokeWidth="2.5" />
      <path d="M118 16 Q92 6 65 18 V82 Q92 72 118 80 Z" fill={C.card} stroke={C.ink} strokeWidth="2.5" />
      <g stroke={C.dust} strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M22 30 Q40 25 56 31" /><path d="M22 42 Q40 37 56 43" /><path d="M22 54 Q40 49 56 55" />
        <path d="M74 31 Q90 25 108 30" /><path d="M74 43 Q90 37 108 42" />
      </g>
      <path d="M100 4 V30 l-6 -5 l-6 5 V8" fill={C.red} stroke={C.ink} strokeWidth="2" />
    </svg>
  ) },
  trails: { drop: 50, svg: (
    <svg width="134" height="134" viewBox="0 0 134 134" role="img" aria-label="Hiking trails badge keychain">
      <defs><clipPath id="trailBadge"><circle cx="67" cy="67" r="58" /></clipPath></defs>
      <circle cx="67" cy="67" r="62" fill={C.card} {...S} />
      <g clipPath="url(#trailBadge)">
        <rect width="134" height="134" fill="#B9D3E8" />
        <circle cx="104" cy="34" r="8" fill={C.gold} />
        {/* Rainier: one big snowy dome */}
        <path d="M-4 104 L44 44 L56 56 L96 104 Z" fill={C.sage} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M33 58 L44 44 L56 56 L50 60 L44 54 L38 62 Z" fill={C.card} stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
        {/* Tetons: sharp jagged peaks */}
        <path d="M58 104 L84 50 L92 66 L100 40 L112 70 L138 104 Z" fill={C.teal} stroke={C.ink} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M95 52 L100 40 L106 56 L101 52 Z" fill={C.card} />
        <rect y="100" width="134" height="40" fill={C.matcha} />
        <path d="M30 134 Q60 112 80 120 T120 106" stroke={C.gold} strokeWidth="2.5" strokeDasharray="5 5" fill="none" />
      </g>
      <circle cx="67" cy="67" r="58" fill="none" stroke={C.ink} strokeWidth="2" />
    </svg>
  ) },
  data: { drop: 64, svg: (
    <svg width="112" height="120" viewBox="0 0 112 120" role="img" aria-label="Bar chart keychain">
      <path d="M30 4 h52 l26 26 v84 h-104 v-84 z" fill={C.ink} {...S} />
      <circle cx="56" cy="20" r="5" fill={C.paper} />
      <rect x="20" y="70" width="16" height="32" rx="2" fill={C.sage} />
      <rect x="44" y="54" width="16" height="48" rx="2" fill={C.sage} />
      <rect x="68" y="40" width="16" height="62" rx="2" fill={C.gold} />
      <path d="M22 62 L50 46 L74 32 L90 24" stroke={C.card} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="22" cy="62" r="3.5" fill={C.red} /><circle cx="50" cy="46" r="3.5" fill={C.red} /><circle cx="74" cy="32" r="3.5" fill={C.red} />
    </svg>
  ) },
  meditation: { drop: 50, svg: (
    <svg width="134" height="134" viewBox="0 0 134 134" role="img" aria-label="Meditation keychain: meditating by the mountains">
      <defs><clipPath id="medBadge"><circle cx="67" cy="67" r="58" /></clipPath></defs>
      <circle cx="67" cy="67" r="62" fill={C.card} stroke={C.ink} strokeWidth="3" />
      <g clipPath="url(#medBadge)">
        <rect width="134" height="134" fill="#FBF1DC" />
        <ellipse cx="38" cy="22" rx="22" ry="5" fill="#E9A3B5" />
        <ellipse cx="84" cy="30" rx="18" ry="4.5" fill="#E9A3B5" />
        <circle cx="104" cy="44" r="10" fill={C.gold} />
        <path d="M-4 84 L28 38 L42 56 L58 30 L86 72 L104 56 L140 84 Z" fill="#3E6A9A" stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 47 L28 38 L34 46 L30 44 Z M52 39 L58 30 L64 40 L60 37 Z" fill={C.card} />
        <path d="M-4 92 Q34 70 70 86 T140 82 V140 H-4 Z" fill="#6FA86A" stroke={C.ink} strokeWidth="2" />
        <path d="M100 88 H140 V96 H100 Z" fill="#8FC1D6" />
        <path d="M16 90 l5 -18 l5 18 z M24 92 l4 -13 l4 13 z" fill={C.matcha} />
        {/* her */}
        <path d="M38 118 Q67 96 96 118 Q67 128 38 118 Z" fill="#E7A0B8" stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M54 106 Q52 86 60 80 H74 Q82 86 80 106 Z" fill={C.card} stroke={C.ink} strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M56 90 Q46 100 44 108 M78 90 Q88 100 90 108" fill="none" stroke={C.card} strokeWidth="6" strokeLinecap="round" />
        <path d="M56 90 Q46 100 44 108 M78 90 Q88 100 90 108" fill="none" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="0" opacity="0.35" />
        <circle cx="43" cy="109" r="3" fill="#E8B48E" stroke={C.ink} strokeWidth="1.4" />
        <circle cx="91" cy="109" r="3" fill="#E8B48E" stroke={C.ink} strokeWidth="1.4" />
        <path d="M64 76 h6 v6 h-6 z" fill="#E8B48E" />
        <circle cx="67" cy="66" r="11" fill="#E8B48E" stroke={C.ink} strokeWidth="2" />
        <path d="M56 65 Q57 53 67 53 Q77 53 78 65 Q74 59 67 59 Q60 59 56 65 Z" fill="#7A4A2E" stroke={C.ink} strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="67" cy="49" r="5.5" fill="#7A4A2E" stroke={C.ink} strokeWidth="1.6" />
        <path d="M61 67 q2 2 4 0 M69 67 q2 2 4 0" fill="none" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="60.5" cy="71" r="2" fill="#E99AA0" /><circle cx="73.5" cy="71" r="2" fill="#E99AA0" />
      </g>
      <circle cx="67" cy="67" r="58" fill="none" stroke={C.ink} strokeWidth="2" />
    </svg>
  ) },
  baking: { drop: 44, svg: (
    <svg width="124" height="118" viewBox="0 0 124 118" role="img" aria-label="Cake keychain">
      <path d="M54 14 q8 -12 16 0 q-8 6 -16 0z" fill={C.red} stroke={C.ink} strokeWidth="2" />
      <path d="M62 14 v8" stroke={C.matcha} strokeWidth="3" />
      <rect x="12" y="40" width="100" height="70" rx="8" fill={C.sand} {...S} />
      <rect x="12" y="72" width="100" height="10" fill={C.red} />
      <path d="M12 48 Q12 26 34 26 H90 Q112 26 112 48 Q104 58 96 48 Q88 58 80 48 Q72 58 64 48 Q56 58 48 48 Q40 58 32 48 Q24 58 12 48 Z" fill={C.card} {...S} />
      <rect x="12" y="40" width="100" height="70" rx="8" fill="none" {...S} />
    </svg>
  ) },
};

/* Trails keychain: tap to cycle badge → Rainier → Teton → badge */
const TrailsKeychain = () => {
  const [i, setI] = useState(0);
  const photo = i > 0 ? K.trails[i - 1] : null;
  return (
    <button type="button" className="keychain" onClick={() => setI((i + 1) % (K.trails.length + 1))}
      aria-label={photo ? `${photo.caption}, tap for next` : 'Trails, tap to see my hikes'}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 150, cursor: 'pointer' }}>
      <Ring drop={ART.trails.drop} />
      {photo ? (
        <Photo src={photo.src} alt={photo.caption} style={{ width: 134, height: 134, borderRadius: '50%', border: `3px solid ${C.ink}` }} />
      ) : ART.trails.svg}
      <span style={{ fontFamily: F.body, fontStyle: 'italic', fontSize: 21, marginTop: 10 }}>
        {photo ? photo.caption : K.labels.trails}
      </span>
      <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', color: C.dust, marginTop: 2 }}>TAP ME</span>
    </button>
  );
};

export const Keychains = () => (
  <section id="keychains" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px 88px', color: C.ink }}>
    <Reveal>
      <SectionLabel n="01">{K.label}</SectionLabel>
      <BigTitle>{K.title}</BigTitle>
    </Reveal>

    <div style={{ marginTop: 48 }}>
      <div style={{ height: 10, borderRadius: 5, background: C.ink }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '24px 20px', padding: '0 8px' }}>
        {K.items.map((key) => key === 'trails' ? <TrailsKeychain key={key} /> : (
          <div key={key} className="keychain" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 150 }}>
            <Ring drop={ART[key].drop} />
            {ART[key].svg}
            <span style={{ fontFamily: F.body, fontStyle: 'italic', fontSize: 21, marginTop: 10 }}>{K.labels[key]}</span>
          </div>
        ))}
      </div>
    </div>

    {/* the counter: owner's note, member card, price tags */}
    <div style={{ marginTop: 72, display: 'flex', flexWrap: 'wrap', gap: 44, alignItems: 'stretch' }}>
      <Reveal style={{ flex: '1.15 1 420px', display: 'flex' }}>
        <div style={{ position: 'relative', transform: 'rotate(-0.8deg)', flex: 1, display: 'flex' }}>
          <div style={{ position: 'absolute', top: -12, left: '50%', marginLeft: -10, width: 20, height: 20, borderRadius: '50%', background: C.red, border: `2.5px solid ${C.ink}`, zIndex: 1 }} />
          <div style={{
            background: C.card, border: `2px solid ${C.ink}`, padding: '32px 30px 28px',
            backgroundImage: `repeating-linear-gradient(0deg, transparent 0 37px, ${C.glass} 37px 38px)`,
            display: 'flex', flexDirection: 'column', gap: 12, flex: 1, justifyContent: 'center',
          }}>
            <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', color: C.dust, textTransform: 'uppercase' }}>{K.noteLabel}</span>
            <p style={{ margin: 0, fontFamily: F.hand, fontSize: 29, lineHeight: '38px' }}>{K.note}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={150} style={{ flex: '1 1 380px', display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 16, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 14, boxShadow: `6px 6px 0 ${C.sage}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', color: C.sage }}>MEMBER CARD</span>
            <span style={{ width: 34, height: 26, borderRadius: 5, background: C.gold }} />
          </div>
          <span style={{ fontFamily: F.display, fontSize: 30, lineHeight: 1.1 }}>{K.member.school}</span>
          <span style={{ fontFamily: F.body, fontSize: 17, color: C.sageDim }}>{K.member.degree}</span>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px dashed ${C.inkSoft}`, paddingTop: 12, fontFamily: F.label, fontSize: 13, fontWeight: 500 }}>
            <span>{K.member.date}</span>
            <span style={{ color: C.gold, fontWeight: 700 }}>{K.member.gpa}</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          {K.tags.map((t, i) => (
            <div key={t.title} style={{
              display: 'flex', flexDirection: 'column', gap: 6, padding: '14px 14px 14px 30px',
              background: C.sand, border: `2px solid ${C.ink}`, borderRadius: '4px 14px 14px 4px',
              position: 'relative', transform: `rotate(${[-1.5, 1.2, -0.8, 1.4][i % 4]}deg)`,
            }}>
              <span style={{ position: 'absolute', left: 9, top: '50%', marginTop: -6, width: 12, height: 12, borderRadius: '50%', background: C.paper, border: `2px solid ${C.ink}` }} />
              <span style={{ fontFamily: F.label, fontSize: 11, letterSpacing: '0.14em', fontWeight: 700 }}>{t.title}</span>
              <span style={{ fontFamily: F.body, fontSize: 15, lineHeight: 1.45, color: C.inkSoft }}>{t.body}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  </section>
);
