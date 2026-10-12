import React from 'react';
import { C, F } from '../theme';
import { FILM } from '../data';
import { SectionLabel, BigTitle, Reveal, Photo } from './ui';

const STOCK = { pro: C.sage, extra: C.gold };
const TINT = { pro: '#B9D3CF', extra: C.sand };

const Frame = ({ f }) => (
  <article style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', background: C.film, borderLeft: '1px solid #1B2A40' }}>
    <div className="sprockets" style={{ height: 18 }} />

    {/* the red thread: one dot per stop */}
    <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1, background: C.red }} />
      <span style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', background: C.red, boxShadow: `0 0 0 4px ${C.film}, 0 0 0 5px ${C.red}` }} />
      <span style={{ position: 'relative', marginLeft: 'auto', padding: '0 8px', background: C.film, fontFamily: F.label, fontSize: 12, fontWeight: 600, color: STOCK[f.type] }}>{f.year}</span>
    </div>

    <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
      <Photo src={f.photo} alt={`${f.place}, ${f.role}`} tint={TINT[f.type]}
        style={{ height: 190, borderRadius: 4, border: `1px solid ${STOCK[f.type]}` }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 23, lineHeight: 1.1, color: C.paper }}>{f.place}</h3>
        <span style={{ fontFamily: F.body, fontSize: 15, color: C.dust }}>{f.role}</span>
        <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: STOCK[f.type] }}>{f.dates}</span>
      </div>
      <p style={{ margin: 0, fontFamily: F.body, fontStyle: 'italic', fontSize: 19, lineHeight: 1.5 }}>
        <span className="hl">{f.line}</span>
      </p>
    </div>
    <div className="sprockets" style={{ height: 18 }} />
  </article>
);

export const FilmRoll = () => (
  <section id="film" style={{ padding: '96px 0 88px', background: C.ink, color: C.paper }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      <Reveal>
        <SectionLabel n="02" light>{FILM.label}</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <BigTitle>{FILM.title}</BigTitle>
          <div style={{
            display: 'flex', gap: 20, marginLeft: 'auto', paddingBottom: 12, flexWrap: 'wrap',
            fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: 3, background: C.sage }} />Professional</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 14, height: 14, borderRadius: 3, background: C.gold }} />Extracurricular</span>
          </div>
        </div>
      </Reveal>
    </div>

    <div className="filmrow" tabIndex={0} aria-label="Film roll, scroll sideways" style={{ overflowX: 'auto', marginTop: 48, padding: '0 24px 16px' }}>
      <div style={{ display: 'flex', width: 'max-content', margin: '0 auto' }}>
        {FILM.frames.map((f) => <Frame key={f.place} f={f} />)}
      </div>
    </div>
  </section>
);
