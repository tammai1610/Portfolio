import React, { useEffect, useRef, useState } from 'react';
import { C, F } from '../theme';

/* Fade-up on scroll (kept from the old site) */
export const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal-on-scroll" style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .7s ease ${delay}ms, transform .7s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
};

/* "01 · KEYCHAINS · WHO I AM" */
export const SectionLabel = ({ n, children, light = false }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 12,
    fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
    color: light ? C.paper : C.ink,
  }}>
    <span style={{
      width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${light ? C.paper : C.ink}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
    }}>{n}</span>
    {children}
  </div>
);

export const BigTitle = ({ children, style = {} }) => (
  <h2 style={{
    margin: '20px 0 0', fontFamily: F.display, fontWeight: 400,
    fontSize: 'clamp(52px, 8vw, 104px)', lineHeight: 0.95, letterSpacing: '-0.02em', ...style,
  }}>{children}</h2>
);

export const Arrow = ({ size = 18, diagonal = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    {diagonal ? <path d="M7 17L17 7M8 7h9v9" /> : <path d="M4 12h15M13 6l6 6-6 6" />}
  </svg>
);

/* The "Step inside →" style link used everywhere */
export const ArrowLink = ({ href, children, gap = 40, diagonal = false, external = false, style = {} }) => (
  <a
    href={href}
    className="arrow-link"
    {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    style={{
      display: 'inline-flex', alignItems: 'center', gap, minHeight: 44,
      borderBottom: `1.5px solid currentColor`, textDecoration: 'none', color: 'inherit',
      fontFamily: F.label, fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
      ...style,
    }}
  >
    {children}<Arrow size={16} diagonal={diagonal} />
  </a>
);

/* Yellow pill button (Resume) */
export const PillButton = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" style={{
    display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '0 18px',
    borderRadius: 999, background: C.gold, border: `1.5px solid ${C.ink}`, boxShadow: `3px 3px 0 ${C.ink}`,
    color: C.ink, textDecoration: 'none',
    fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
  }}>
    {children}<Arrow size={14} diagonal />
  </a>
);

/* Image that hides itself and shows a tinted block if the file is missing */
export const Photo = ({ src, alt, tint = C.sageDim, style = {} }) => {
  const [broken, setBroken] = useState(false);
  return (
    <div style={{ background: tint, overflow: 'hidden', ...style }}>
      {!broken && (
        <img src={src} alt={alt} loading="lazy" onError={() => setBroken(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      )}
    </div>
  );
};

/* Global CSS: fonts, animations, hover states, mobile tweaks */
export const GLOBAL_CSS = `
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: ${C.paper}; }
::selection { background: ${C.gold}; }
a { color: inherit; }
.awning { background: repeating-linear-gradient(90deg, ${C.red} 0 44px, ${C.card} 44px 88px, ${C.sky} 88px 132px, ${C.card} 132px 176px); }
.airmail { background: repeating-linear-gradient(135deg, ${C.red} 0 14px, ${C.card} 14px 24px, ${C.sky} 24px 38px, ${C.card} 38px 48px); }
.sprockets { background: radial-gradient(circle at 50% 50%, ${C.paper} 0 5px, transparent 5.5px) 0 0/26px 18px repeat-x; background-color: ${C.film}; }
.hl { background: ${C.gold}; color: ${C.ink}; padding: 1px 6px; box-decoration-break: clone; -webkit-box-decoration-break: clone; }
.filmrow::-webkit-scrollbar { height: 8px; }
.filmrow::-webkit-scrollbar-thumb { background: ${C.dust}; border-radius: 4px; }

@keyframes doorL { from { transform: rotateY(0) } to { transform: rotateY(-112deg) } }
@keyframes doorR { from { transform: rotateY(0) } to { transform: rotateY(112deg) } }
@keyframes swing { 0% { rotate: -5deg } 50% { rotate: 5deg } 100% { rotate: -5deg } }
@keyframes rise  { from { opacity: 0; translate: 0 14px } to { opacity: 1; translate: 0 0 } }
.door-l { transform-origin: left center;  animation: doorL 1.8s cubic-bezier(.65,.05,.25,1) .6s forwards; }
.door-r { transform-origin: right center; animation: doorR 1.8s cubic-bezier(.65,.05,.25,1) .6s forwards; }
.sign   { transform-origin: top center; animation: swing 3.4s ease-in-out infinite; }
.after-doors { opacity: 0; animation: rise .9s ease-out 1.7s forwards; }
.keychain { transform-origin: top center; background: none; border: none; padding: 0; color: inherit; font: inherit; }
.keychain:hover { animation: swing 1.4s ease-in-out infinite; }
.sign:hover > div { background: #B23730; }
.spine { transition: translate .3s; background: none; padding: 0; font: inherit; cursor: pointer; }
.spine:hover, .spine:focus-visible, .spine[aria-pressed="true"] { translate: 0 -12px; }
.filmrow { scroll-behavior: smooth; }
.film-fade { position: absolute; top: 0; right: 0; bottom: 16px; width: 90px; pointer-events: none; background: linear-gradient(to right, rgba(15,32,56,0), ${C.ink}); transition: opacity .3s; }
.float-resume { transition: opacity .3s, translate .3s; }
.dish { width: 180px; }
@keyframes tlPulse { 0% { box-shadow: 0 0 0 0 rgba(111,168,160,.7) } 100% { box-shadow: 0 0 0 10px rgba(111,168,160,0) } }
.tl-pulse { animation: tlPulse 1.8s ease-out infinite; }
.tl-row:hover { background: rgba(238,240,238,0.06) !important; }
@media (max-width: 560px) { .tl-grid { --tl-label: 96px; } }
@media (max-width: 480px) { .dish { width: 146px; } }
.arrow-link svg { transition: translate .25s; }
.arrow-link:hover svg { translate: 4px 0; }
.nav-links a:hover { color: ${C.matcha}; }

@media (max-width: 860px) {
  .nav-links .nav-text { display: none; }
  .polaroid { position: relative !important; right: auto !important; bottom: auto !important; margin-top: 28px; order: 2; }
}
@media (prefers-reduced-motion: reduce) {
  .door-l, .door-r { display: none; }
  .sign, .keychain:hover, .tl-pulse { animation: none; }
  .after-doors { opacity: 1; animation: none; }
  .reveal-on-scroll { opacity: 1 !important; transform: none !important; }
}
`;
