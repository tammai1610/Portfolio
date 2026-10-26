import React, { useState } from 'react';
import { C, F } from '../theme';
import { SHELF } from '../data';
import { SectionLabel, BigTitle, Reveal, Photo } from './ui';

const SPINES = [
  { color: C.sage, w: 42, h: 170 }, { color: '#A88878', w: 38, h: 196 }, { color: '#7B96A6', w: 50, h: 214 },
  { color: C.dust, w: 40, h: 164 }, { color: C.matcha, w: 46, h: 206 }, { color: '#9B7D4A', w: 40, h: 182 },
  { color: C.red, w: 44, h: 200 }, { color: '#2B4C8C', w: 46, h: 178 },
];
const STACK_W = [92, 84, 96, 78, 88, 82, 90, 86];
const STACK_X = [2, 6, 0, 9, 3, 7, 1, 5];
const DISH_TILT = ['-4deg', '3deg', '-2deg', '4deg', '-3deg'];
const DISH_TINT = [C.sand, '#B9D3CF', C.glass, C.sand, '#B9D3CF'];

export const Bookshelf = () => {
  const [active, setActive] = useState(0);
  const book = SHELF.books[active];
  const spine = SPINES[active % SPINES.length];

  return (
    <section id="shelf" style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 24px 88px', color: C.ink }}>
      <Reveal>
        <SectionLabel n="06">{SHELF.label}</SectionLabel>
        <BigTitle>{SHELF.title}</BigTitle>
      </Reveal>

      {/* one shelf on the left, the takeaway panel on the right */}
      <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end' }}>
        <div style={{ flex: '999 1 480px', minWidth: 0, maxWidth: 640 }}>
          {/* books lie flat in a stack, so every title reads left to right */}
          <div role="group" aria-label="Books, tap one for its takeaway"
            style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'flex-start', gap: 0, padding: '0 12px' }}>
            {SHELF.books.map((b, i) => {
              const s = SPINES[i % SPINES.length];
              const on = active === i;
              return (
                <button key={b.title} type="button" className="book-flat" aria-pressed={on}
                  aria-label={`${b.title} by ${b.author}`}
                  onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
                  style={{
                    position: 'relative', width: `${STACK_W[i % STACK_W.length]}%`, minHeight: 44, marginLeft: `${STACK_X[i % STACK_X.length]}%`,
                    marginTop: -2, background: s.color, color: C.card, border: `2px solid ${C.ink}`, borderRadius: '3px 6px 6px 3px',
                    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 14px', textAlign: 'left', cursor: 'pointer',
                    fontFamily: F.label, fontSize: 13, fontWeight: 600, letterSpacing: '0.02em',
                    translate: on ? '14px 0' : '0 0', transition: 'translate .25s',
                    boxShadow: on ? `0 0 0 3px ${C.gold}` : 'none', zIndex: on ? 2 : 1,
                  }}>
                  <span style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.title}</span>
                  {b.now && <span aria-hidden="true" style={{ flexShrink: 0, width: 12, height: 22, marginRight: -4, background: C.gold, border: `1.5px solid ${C.ink}`, clipPath: 'polygon(0 0,100% 0,100% 100%,50% 75%,0 100%)' }} />}
                </button>
              );
            })}
          </div>
          <div style={{ height: 16, background: C.ink, borderRadius: 3, marginTop: -2 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 30px' }}>
            <span style={{ width: 14, height: 26, background: C.inkSoft }} />
            <span style={{ width: 14, height: 26, background: C.inkSoft }} />
          </div>
          <p style={{ margin: '12px 0 0', fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', color: C.dust }}>{SHELF.panelHint.toUpperCase()}</p>
        </div>

        {/* takeaway panel */}
        <div aria-live="polite" style={{
          flex: '1 1 320px', maxWidth: 440, alignSelf: 'center', background: C.card, border: `2px solid ${C.ink}`,
          borderRadius: 12, boxShadow: `6px 6px 0 ${spine.color}`, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: C.matcha }}>{SHELF.panelLabel}</span>
            {book.now && (
              <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: C.ink, background: C.gold, padding: '3px 8px', borderRadius: 999 }}>READING NOW</span>
            )}
          </div>
          <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 30, lineHeight: 1.1 }}>{book.title}</h3>
          <span style={{ fontFamily: F.body, fontStyle: 'italic', fontSize: 17, color: C.muted }}>{book.author}</span>
          <p style={{ margin: '6px 0 0', fontFamily: F.body, fontSize: 20, lineHeight: 1.5 }}>
            {book.now ? book.insight : <span className="hl">{book.insight}</span>}
          </p>
        </div>
      </div>

      {/* Homemade jar + dish polaroids, 3 then 2 */}
      <div style={{ marginTop: 88, display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'center' }}>
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

        <div style={{ flex: '0 1 616px', display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', paddingTop: 12 }}>
          {SHELF.dishes.map((d, i) => (
            <Reveal key={d.src} delay={i * 80}>
              <figure className="dish" style={{
                margin: 0, background: C.card, border: `1.5px solid ${C.ink}`, padding: '10px 10px 14px',
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
};
