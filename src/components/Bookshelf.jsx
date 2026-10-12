import React from 'react';
import { C, F } from '../theme';
import { SHELF } from '../data';
import { SectionLabel, BigTitle, Reveal, Photo } from './ui';

const SPINES = [
  { color: C.sage, w: 42, h: 170 }, { color: '#A88878', w: 38, h: 196 }, { color: '#7B96A6', w: 50, h: 214 },
  { color: C.dust, w: 40, h: 164 }, { color: C.matcha, w: 46, h: 206 }, { color: '#9B7D4A', w: 40, h: 182 },
  { color: C.red, w: 44, h: 200 }, { color: '#2B4C8C', w: 46, h: 178 },
];
const DISH_TILT = ['-4deg', '3deg', '-2deg', '4deg', '-3deg'];
const DISH_TINT = [C.sand, '#B9D3CF', C.glass, C.sand, '#B9D3CF'];

export const Bookshelf = () => (
  <section id="shelf" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px 88px', color: C.ink }}>
    <Reveal>
      <SectionLabel n="05">{SHELF.label}</SectionLabel>
      <BigTitle>{SHELF.title}</BigTitle>
    </Reveal>

    {/* shelf */}
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, padding: '180px 18px 0', overflowX: 'auto' }}>
        {SHELF.books.map((b, i) => {
          const s = SPINES[i % SPINES.length];
          return (
            <div key={b.title} className="spine" tabIndex={0} aria-label={`${b.title} by ${b.author}. ${b.insight}`}
              style={{
                position: 'relative', flexShrink: 0, width: s.w, height: s.h, background: s.color,
                border: `2px solid ${C.ink}`, borderRadius: '3px 3px 0 0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              <span style={{
                writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontFamily: F.label, fontSize: 11, fontWeight: 600,
                letterSpacing: '0.06em', color: C.card, whiteSpace: 'nowrap', overflow: 'hidden', maxHeight: '92%',
              }}>{b.title}</span>
              {b.now && (
                <span style={{ position: 'absolute', top: -14, left: '50%', marginLeft: -9, width: 18, height: 22, background: C.red, clipPath: 'polygon(0 0,100% 0,100% 100%,50% 75%,0 100%)' }} />
              )}
              <div className="tip" style={{
                position: 'absolute', bottom: 'calc(100% + 14px)', left: i > 4 ? 'auto' : 0, right: i > 4 ? 0 : 'auto', width: 260, zIndex: 3,
                background: C.ink, color: C.paper, padding: '14px 16px', borderRadius: 8, display: 'flex', flexDirection: 'column', gap: 6,
              }}>
                <span style={{ fontFamily: F.display, fontSize: 19 }}>{b.title}</span>
                <span style={{ fontFamily: F.body, fontSize: 14, color: C.sage, fontStyle: 'italic' }}>{b.author}</span>
                <span style={{ fontFamily: F.body, fontSize: 16, lineHeight: 1.45 }}>{b.insight}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 16, background: C.ink, borderRadius: 3 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px' }}>
        <span style={{ width: 14, height: 26, background: C.inkSoft }} />
        <span style={{ width: 14, height: 26, background: C.inkSoft }} />
      </div>
    </div>

    {/* Homemade jar + dish polaroids */}
    <div style={{ marginTop: 88, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center' }}>
      <Reveal style={{ flex: '1 1 300px', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: 160, height: 28, background: C.red, border: `3px solid ${C.ink}`, borderRadius: '6px 6px 2px 2px', backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 12px, rgba(247,248,246,0.6) 12px 20px)' }} />
        <div style={{ width: '100%', marginTop: -2, background: C.glass, border: `3px solid ${C.ink}`, borderRadius: '22px 22px 36px 36px', padding: '30px 20px 36px' }}>
          <div style={{ background: C.card, border: `2px solid ${C.ink}`, borderRadius: 10, padding: '20px 20px 18px', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'center' }}>
            <span style={{ fontFamily: F.display, fontSize: 34, lineHeight: 1 }}>{SHELF.homemade.label}</span>
            <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', color: C.dust }}>{SHELF.homemade.small}</span>
            <p style={{ margin: '6px 0 0', fontFamily: F.body, fontSize: 18, lineHeight: 1.55 }}>{SHELF.homemade.text}</p>
          </div>
        </div>
      </Reveal>

      <div style={{ flex: '999 1 420px', minWidth: 0, display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', paddingTop: 12 }}>
        {SHELF.dishes.map((d, i) => (
          <Reveal key={d.src} delay={i * 80}>
            <figure style={{
              margin: 0, width: 180, background: C.card, border: `1.5px solid ${C.ink}`, padding: '10px 10px 14px',
              transform: `rotate(${DISH_TILT[i % 5]})`, boxShadow: '0 8px 18px rgba(15,32,56,0.14)', position: 'relative',
            }}>
              <span style={{ position: 'absolute', top: -10, left: '50%', marginLeft: -24, width: 48, height: 16, background: 'rgba(237,190,92,0.75)' }} />
              <Photo src={d.src} alt={d.caption} tint={DISH_TINT[i % 5]} style={{ height: 170 }} />
              <figcaption style={{ marginTop: 10, fontFamily: F.hand, fontSize: 23, lineHeight: 1.1, textAlign: 'center' }}>{d.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
