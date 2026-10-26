import React, { useEffect, useState } from 'react';
import { C, F } from '../theme';
import { NAV, LINKS, SHOPFRONT as S } from '../data';
import { ArrowLink, PillButton, Photo } from './ui';

/* Sticky top bar: name, 7-dot scroll progress, shelf links, Resume */
export const TopBar = () => {
  const [dots, setDots] = useState(1);
  useEffect(() => {
    const h = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setDots(Math.min(7, Math.floor((max > 0 ? window.scrollY / max : 0) * 7) + 1));
    };
    window.addEventListener('scroll', h);
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(238,240,238,0.94)', borderBottom: '1px solid #DDE1DD' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: C.ink }}>
          <span style={{ display: 'flex', gap: 5, alignItems: 'center' }} aria-hidden="true">
            {[...Array(7)].map((_, i) => (
              <span key={i} style={{
                width: i < dots ? 7 : 5, height: i < dots ? 7 : 5, borderRadius: '50%',
                background: i < dots ? C.matcha : C.sageDim, transition: 'all .4s ease',
              }} />
            ))}
          </span>
          <span style={{ fontFamily: F.display, fontSize: 22 }}>{S.name}</span>
        </a>
        <nav aria-label="Shop shelves" className="nav-links" style={{
          display: 'flex', alignItems: 'center', gap: 22, marginLeft: 'auto',
          fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.ink,
        }}>
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="nav-text" style={{ textDecoration: 'none', padding: '12px 0' }}>{label}</a>
          ))}
          <PillButton href={LINKS.resume}>Resume</PillButton>
        </nav>
      </div>
    </div>
  );
};

const Door = ({ side }) => {
  const left = side === 'left';
  return (
    <div className={left ? 'door-l' : 'door-r'} aria-hidden="true" style={{
      position: 'absolute', top: 0, [left ? 'left' : 'right']: 0, width: '50%', height: '100%',
      background: C.matcha, border: `4px solid ${C.ink}`,
      borderRadius: left ? '160px 0 0 10px' : '0 160px 10px 0',
      padding: '70px 22px 30px', display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      <div style={{ flex: 1, border: `3px solid ${C.ink}`, borderRadius: left ? '110px 0 0 0' : '0 110px 0 0', background: C.teal }} />
      <div style={{ height: 110, border: `3px solid ${C.ink}`, background: C.teal }} />
      <div style={{
        position: 'absolute', [left ? 'right' : 'left']: 16, top: '54%', width: 12, height: 12,
        borderRadius: '50%', background: C.gold, border: `2px solid ${C.ink}`,
      }} />
    </div>
  );
};

export const Shopfront = () => {
  const scallops = [C.red, C.card, C.sky, C.card];
  return (
    <header id="top">
      <div className="awning" style={{ height: 64, borderBottom: `3px solid ${C.ink}` }} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: -2, overflow: 'hidden' }}>
        {[...Array(18)].map((_, i) => (
          <div key={i} style={{
            width: 88, height: 28, flexShrink: 0, borderRadius: '0 0 44px 44px',
            background: scallops[i % 4], border: `3px solid ${C.ink}`, borderTop: 'none',
          }} />
        ))}
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 24px 72px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* hanging sign */}
        <a className="sign" href={LINKS.resume} target="_blank" rel="noreferrer" 
          aria-label="Open to work: open my resume"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18, textDecoration: 'none', cursor: 'pointer' }}>
          <svg width="120" height="34" viewBox="0 0 120 34" aria-hidden="true">
            <path d="M60 2 L14 32 M60 2 L106 32" stroke={C.ink} strokeWidth="2" fill="none" />
            <circle cx="60" cy="3" r="3" fill={C.ink} />
          </svg>
          <div style={{
            background: C.red, color: C.card, border: `3px solid ${C.ink}`, borderRadius: 8,
            padding: '8px 22px 6px', marginTop: -3, display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontFamily: F.display, fontSize: 32, letterSpacing: '0.1em', lineHeight: 1 }}>{S.signTop}</span>
            <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', marginTop: 3 }}>{S.signBottom}</span>
          </div>
        </a>

        {/* shop window */}
        <div style={{ position: 'relative', width: '100%', perspective: 1800 }}>
          <div style={{
            border: `4px solid ${C.ink}`, borderRadius: '160px 160px 10px 10px', background: C.glass,
            padding: '80px 28px 64px', display: 'flex', flexDirection: 'column', alignItems: 'center',
            textAlign: 'center', boxShadow: `10px 10px 0 ${C.ink}`, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, marginLeft: -1.5, background: 'rgba(15,32,56,0.08)' }} />

            {/* polaroid taped to the glass */}
            <div className="after-doors polaroid" style={{
              position: 'absolute', right: '3%', bottom: 30, transform: 'rotate(6deg)',
              background: C.card, padding: '8px 8px 22px', border: `1.5px solid ${C.ink}`,
              boxShadow: '0 6px 14px rgba(15,32,56,0.18)',
            }}>
              <div style={{ position: 'absolute', top: -10, left: '50%', marginLeft: -22, width: 44, height: 16, background: 'rgba(237,190,92,0.7)' }} />
              <Photo src={S.photo} alt="Tam Mai" style={{ width: 92, height: 92 }} />
            </div>

            <div className="after-doors" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, maxWidth: 680, color: C.ink }}>
              <span style={{ fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.matcha }}>{S.label}</span>
              <h1 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 'clamp(72px, 12vw, 152px)', lineHeight: 0.88, letterSpacing: '-0.02em' }}>{S.title}</h1>
              <p style={{ margin: '6px 0 0', fontFamily: F.body, fontStyle: 'italic', fontSize: 'clamp(21px, 2.6vw, 28px)', lineHeight: 1.35 }}>{S.tagline}</p>
            </div>
          </div>
          <Door side="left" />
          <Door side="right" />
        </div>

        <div style={{ marginTop: 48, color: C.ink }}>
          <ArrowLink href="#keychains" gap={48}>{S.cta}</ArrowLink>
        </div>
      </div>
    </header>
  );
};
