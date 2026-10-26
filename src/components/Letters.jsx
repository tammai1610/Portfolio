import React, { useState } from 'react';
import { C, F } from '../theme';
import { LETTERS as L } from '../data';
import { SectionLabel, BigTitle, Reveal, ArrowLink } from './ui';

const TILTS = ['-1deg', '1.2deg'];

/* Postage stamp with the company logo. Falls back to the company name if the logo file is missing. */
const LogoStamp = ({ l }) => {
  const [ok, setOk] = useState(true);
  return (
    <div style={{
      width: 116, height: 78, background: C.card, border: `1.5px dashed ${C.ink}`, transform: 'rotate(3deg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px 12px',
      boxShadow: `0 0 0 4px ${C.card}`,
    }}>
      {ok && l.logo
        ? <img src={l.logo} alt={l.company} onError={() => setOk(false)} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        : <span style={{ fontFamily: F.display, fontSize: 15, lineHeight: 1.1, textAlign: 'center' }}>{l.company}</span>}
    </div>
  );
};
const POST = [{ c: C.matcha, t: '-1.5deg' }, { c: C.gold, t: '1deg' }, { c: C.red, t: '-0.5deg' }];

export const Letters = () => (
  <section id="letters" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px 88px', color: C.ink }}>
    <Reveal>
      <SectionLabel n="04">{L.label}</SectionLabel>
      <BigTitle>{L.title}</BigTitle>
    </Reveal>

    <div style={{ marginTop: 52, display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'center' }}>
      {L.letters.map((l, i) => (
        <Reveal key={l.no} delay={i * 120} style={{ flex: '1 1 440px', maxWidth: 560 }}>
          <article className="airmail" style={{ padding: 12, boxShadow: '8px 10px 0 rgba(15,32,56,0.12)', transform: `rotate(${TILTS[i % 2]})`, height: '100%' }}>
            <div style={{ background: C.glass, padding: '28px 30px 24px', display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em' }}>LETTER NO. {l.no}</span>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexShrink: 0 }}>
                  {l.badge && (
                    <span title={l.badge} style={{
                      width: 84, height: 84, borderRadius: '50%', border: `1.5px solid ${C.red}`, color: C.red,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', transform: 'rotate(-10deg)',
                      fontFamily: F.label, fontSize: 7.5, fontWeight: 700, letterSpacing: '0.06em', lineHeight: 1.5, textTransform: 'uppercase',
                      boxShadow: `inset 0 0 0 4px ${C.glass}, inset 0 0 0 5px rgba(200,66,59,0.45)`,
                    }}>★<br />Exceeds<br />Expectations</span>
                  )}
                  <LogoStamp l={l} />
                </div>
              </div>
              <p style={{ margin: 0, fontFamily: F.body, fontStyle: 'italic', fontSize: 22, lineHeight: 1.55, flex: 1 }}>
                <span className="hl">“{l.quote}”</span>
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: F.display, fontSize: 22 }}>{l.name}</span>
                <span style={{ fontFamily: F.body, fontSize: 15, color: C.muted }}>{l.title} · {l.org}</span>
              </div>
              <ArrowLink href={l.pdf} external diagonal gap={0}
                style={{ justifyContent: 'space-between', borderBottom: 'none', borderTop: `1.5px solid ${C.ink}`, paddingTop: 6 }}>
                Open letter
              </ArrowLink>
            </div>
          </article>
        </Reveal>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '72px 0 32px' }}>
      <div style={{ flex: 1, height: 1, background: C.sageDim }} />
      <span style={{ fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.18em' }}>{L.teamLabel}</span>
      <div style={{ flex: 1, height: 1, background: C.sageDim }} />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 28 }}>
      {L.postcards.map((p, i) => (
        <Reveal key={p.name} delay={i * 100}>
          <div style={{
            background: C.card, border: `2px solid ${C.ink}`, padding: '22px 22px 18px', height: '100%',
            display: 'flex', flexDirection: 'column', gap: 14, transform: `rotate(${POST[i].t})`, boxShadow: `5px 5px 0 ${POST[i].c}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: C.dust }}>POSTCARD</span>
              <span style={{ width: 30, height: 36, border: `1.5px dashed ${POST[i].c}` }} />
            </div>
            <p style={{ margin: 0, fontFamily: F.body, fontStyle: 'italic', fontSize: 19, lineHeight: 1.5, flex: 1 }}>“{p.quote}”</p>
            <span style={{ fontFamily: F.body, fontSize: 15, color: C.muted, borderTop: `1px dashed ${C.sageDim}`, paddingTop: 10 }}>
              {p.name} · {p.role} · Micron
            </span>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);
