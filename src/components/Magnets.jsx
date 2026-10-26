import React from 'react';
import { C, F } from '../theme';
import { MAGNETS as M } from '../data';
import { SectionLabel, BigTitle, Reveal, ArrowLink, Photo } from './ui';

const STYLE = [
  { magnet: C.red, shape: '50%', tilt: '-1.5deg' },
  { magnet: '#2B4C8C', shape: '10px', tilt: '1.5deg' },
  { magnet: C.matcha, shape: '50% 50% 8px 8px', tilt: '-1deg' },
];

/* Type-only cover art, so these two projects need no image files */
const ObservatoryPoster = () => (
  <div style={{ height: 160, background: C.ink, color: C.paper, padding: '16px 18px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      {[...Array(60)].map((_, i) => {
        const x = (i % 12) * 26 + 14, y = Math.floor(i / 12) * 22 + 14;
        const lit = [3, 8, 15, 22, 27, 33, 41, 46, 52].includes(i);
        return <circle key={i} cx={x} cy={y} r={lit ? 3.5 : 2} fill={lit ? C.gold : C.inkSoft} />;
      })}
    </svg>
    <span style={{ position: 'relative', fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: C.sage }}>BLS · O*NET · IPUMS</span>
    <span style={{ position: 'relative', fontFamily: F.display, fontSize: 30, lineHeight: 0.95 }}>AI Displacement<br /><em style={{ color: C.gold }}>Observatory</em></span>
  </div>
);

const FinPulsePoster = () => (
  <div style={{ height: 160, background: C.gold, color: C.ink, padding: '16px 18px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em' }}>1.15M ROWS · 26 FEATURES</span>
    <svg viewBox="0 0 300 50" width="100%" height="50" aria-hidden="true" style={{ position: 'absolute', left: 0, top: 54 }}>
      <path d="M0 30 H90 L104 30 L114 8 L126 46 L136 18 L146 30 H200 L210 22 L220 30 H300" fill="none" stroke={C.red} strokeWidth="3" strokeLinejoin="round" />
    </svg>
    <span style={{ fontFamily: F.display, fontSize: 40, lineHeight: 0.9 }}>FinPulse<span style={{ color: C.red }}>.</span></span>
  </div>
);

const ShopPoster = () => (
  <div style={{ height: 160, background: C.glass, color: C.ink, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 18 }}>
    <div className="awning" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 34, borderBottom: `2px solid ${C.ink}` }} />
    <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: C.matcha }}>A LITTLE SOUVENIR SHOP</span>
    <span style={{ fontFamily: F.display, fontSize: 46, lineHeight: 1 }}>Tam's</span>
  </div>
);

export const Magnets = () => (
  <section id="magnets" style={{ background: C.gold, padding: '96px 24px', color: C.ink }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel n="05">{M.label}</SectionLabel>
        <BigTitle>{M.title}</BigTitle>
      </Reveal>

      <div style={{ marginTop: 60, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '52px 32px' }}>
        {M.projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <div style={{ position: 'relative', transform: `rotate(${STYLE[i].tilt})`, height: '100%' }}>
              <div style={{
                position: 'absolute', top: -20, left: '50%', marginLeft: -22, width: 44, height: 44, zIndex: 1,
                borderRadius: STYLE[i].shape, background: STYLE[i].magnet, border: `3px solid ${C.ink}`, boxShadow: `0 4px 0 ${C.ink}`,
              }} />
              <article style={{
                background: C.card, border: `2px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}`,
                padding: '34px 20px 18px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%',
              }}>
                {p.poster === 'shop' ? <ShopPoster />
                  : p.poster === 'observatory' ? <ObservatoryPoster />
                  : p.poster === 'finpulse' ? <FinPulsePoster />
                  : <Photo src={p.image} alt={`${p.name} screen`} tint={C.sand} style={{ height: 160 }} />}
                {p.status && (
                  <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: C.red, textTransform: 'uppercase' }}>● {p.status}</span>
                )}
                <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 28, lineHeight: 1.1 }}>{p.name}</h3>
                <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.muted }}>
                  {p.meta} · {p.dates}
                </span>
                <p style={{ margin: 0, fontFamily: F.body, fontSize: 18, lineHeight: 1.5, flex: 1 }}>{p.line}</p>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {p.links.map((l) => (
                    <ArrowLink key={l.label} href={l.href} external gap={24} style={{ fontSize: 12 }}>{l.label}</ArrowLink>
                  ))}
                </div>
              </article>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
