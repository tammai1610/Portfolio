import React, { useState } from 'react';
import { C, F } from '../theme';
import { QUIESCENT as Q } from '../data';
import { SectionLabel, Reveal, ArrowLink, Arrow, Photo } from './ui';

/* The live prototype, framed like a browser window. Click "Try it here" to use it in place. */
const LivePreview = () => {
  const [live, setLive] = useState(false);
  return (
    <div style={{ background: C.card, border: `3px solid ${C.ink}`, borderRadius: 14, boxShadow: `10px 10px 0 ${C.ink}`, overflow: 'hidden' }}>
      <div style={{ height: 38, background: C.glass, borderBottom: `2px solid ${C.ink}`, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px' }}>
        {[C.red, C.gold, C.sage].map((c) => <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c, border: `1.5px solid ${C.ink}` }} />)}
        <span style={{
          flex: 1, minWidth: 0, margin: '0 10px', height: 24, borderRadius: 12, background: C.card, border: `1px solid ${C.sageDim}`,
          display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: F.label, fontSize: 12, color: C.muted,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>readhub-demo.netlify.app</span>
        <a href={Q.embed} target="_blank" rel="noreferrer" aria-label="Open the prototype in a new tab" style={{ color: C.ink, display: 'inline-flex', padding: 6 }}>
          <Arrow size={16} diagonal />
        </a>
      </div>
      <div style={{ position: 'relative', aspectRatio: '16 / 10', maxWidth: '100%', background: C.sageDim }}>
        {live ? (
          <iframe src={Q.embed} title="Quiescent live prototype" loading="lazy"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, background: C.card }} />
        ) : (
          <>
            <Photo src={Q.image} alt="Quiescent library screen" tint={C.sageDim} style={{ position: 'absolute', inset: 0 }} />
            <button type="button" onClick={() => setLive(true)} style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 52, padding: '0 26px', borderRadius: 999, cursor: 'pointer',
              background: C.gold, color: C.ink, border: `2px solid ${C.ink}`, boxShadow: `4px 4px 0 ${C.ink}`,
              fontFamily: F.label, fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="currentColor" /></svg>
              Try it here
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export const Quiescent = () => (
  <section id="quiescent" style={{ background: C.matcha, color: C.paper, padding: '96px 24px 104px' }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <Reveal>
        <SectionLabel n="02" light>{Q.label}</SectionLabel>
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', gap: '12px 28px' }}>
          <h2 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 'clamp(60px, 10vw, 132px)', lineHeight: 0.9, letterSpacing: '-0.02em' }}>{Q.name}.</h2>
          <span style={{
            marginBottom: 14, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 999,
            background: C.gold, color: C.ink, fontFamily: F.label, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.red }} />{Q.status}
          </span>
        </div>
        <p style={{ margin: '18px 0 0', fontFamily: F.body, fontStyle: 'italic', fontSize: 'clamp(22px, 2.6vw, 30px)' }}>{Q.tagline}</p>
      </Reveal>

      <Reveal style={{ marginTop: 44 }}>
        <LivePreview />
      </Reveal>

      <p style={{ margin: '40px 0 0', fontFamily: F.body, fontSize: 20, lineHeight: 1.5, color: C.paper }}>{Q.role}</p>

      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {Q.caseStudy.map((c, i) => { const hot = c.title === 'Insight'; return (
          <Reveal key={c.title} delay={i * 60}>
            <article style={{
              height: '100%', background: c.title === 'Insight' ? C.gold : C.card, color: C.ink, border: `2px solid ${C.ink}`,
              borderRadius: 12, padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: hot ? C.ink : C.matcha }}>
                0{i + 1} · {c.title.toUpperCase()}
              </span>
              <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 25, lineHeight: 1.15 }}>{c.head}</h3>
              {c.body && <p style={{ margin: 0, fontFamily: F.body, fontSize: 18, lineHeight: 1.5 }}>{c.body}</p>}
              {c.chips && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {c.chips.map((x) => (
                    <span key={x} style={{ fontFamily: F.label, fontSize: 12, fontWeight: 600, padding: '5px 10px', borderRadius: 999, border: `1.5px solid ${C.ink}`, background: C.paper }}>{x}</span>
                  ))}
                </div>
              )}
              {c.bullets && (
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {c.bullets.map((x) => (
                    <li key={x} style={{ display: 'flex', gap: 10, alignItems: 'baseline', fontFamily: F.body, fontSize: 18, lineHeight: 1.4 }}>
                      <span aria-hidden="true" style={{ flexShrink: 0, width: 8, height: 8, borderRadius: '50%', background: C.red, transform: 'translateY(-1px)' }} />{x}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </Reveal>
        ); })}
      </div>

      <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: '12px 32px' }}>
        {Q.links.map((l) => <ArrowLink key={l.label} href={l.href} external diagonal gap={16}>{l.label}</ArrowLink>)}
      </div>
    </div>
  </section>
);
