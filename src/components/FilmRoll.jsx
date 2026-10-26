import React, { useEffect, useRef, useState } from 'react';
import { C, F } from '../theme';
import { FILM } from '../data';
import { SectionLabel, BigTitle, Reveal, Photo, ArrowLink } from './ui';

const STOCK = { pro: C.sage, extra: C.gold };
const NOW = FILM.now;
const months = (ym) => { const [y, m] = ym.split('-').map(Number); return y * 12 + (m - 1); };
const span = (f) => {
  const a = months(FILM.axis.from), z = months(FILM.axis.to) + 1;
  const s = months(f.start), e = f.end ? months(f.end) + 1 : months(NOW);
  return { left: `${((s - a) / (z - a)) * 100}%`, width: `${((e - s) / (z - a)) * 100}%` };
};

const TINT = { pro: '#B9D3CF', extra: C.sand };

const Frame = React.forwardRef(({ f, active }, ref) => (
  <article ref={ref} style={{
    width: 'min(360px, 82vw)', flexShrink: 0, display: 'flex', flexDirection: 'column', background: C.film, borderLeft: '1px solid #1B2A40',
    boxShadow: active ? `inset 0 0 0 2px ${STOCK[f.type]}` : 'none', transition: 'box-shadow .3s',
  }}>
    <div className="sprockets" style={{ height: 18 }} />

    {/* the red thread: one dot per stop */}
    <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center', padding: '0 18px' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, marginTop: -1, background: C.red }} />
      <span style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', background: C.red, boxShadow: `0 0 0 4px ${C.film}, 0 0 0 5px ${C.red}` }} />
      <span style={{ position: 'relative', marginLeft: 'auto', padding: '0 8px', background: C.film, fontFamily: F.label, fontSize: 12, fontWeight: 600, color: STOCK[f.type] }}>{f.year}</span>
    </div>

    <div style={{ padding: '0 18px 20px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
      <Photo src={f.photo} alt={`${f.place}, ${f.role}`} tint={TINT[f.type]}
        style={{ height: 230, borderRadius: 4, border: `1px solid ${STOCK[f.type]}` }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 26, lineHeight: 1.1, color: C.paper }}>{f.place}</h3>
        <span style={{ fontFamily: F.body, fontSize: 16, color: C.dust }}>{f.role}</span>
        <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: STOCK[f.type] }}>{f.dates}</span>
      </div>
      <p style={{ margin: 0, fontFamily: F.body, fontStyle: 'italic', fontSize: 20, lineHeight: 1.5 }}>
        <span className="hl">{f.line}</span>
      </p>
      {f.docs && (
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 2, color: C.paper }}>
          <span style={{ fontFamily: F.label, fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', color: STOCK[f.type] }}>SEE HOW I WORKED</span>
          {f.docs.map((d) => <ArrowLink key={d.label} href={d.href} external diagonal gap={12} style={{ fontSize: 12, alignSelf: 'flex-start', borderBottomColor: 'rgba(238,240,238,0.4)' }}>{d.label}</ArrowLink>)}
        </div>
      )}
    </div>
    <div className="sprockets" style={{ height: 18 }} />
  </article>
));

/* One shared ruler for every role: overlaps, order, and what's still going all read at once */
const TimelineMap = ({ active, onPick }) => {
  const years = ['2024', '2025', '2026'];
  const today = span({ start: NOW, end: NOW }).left;
  return (
    <div style={{ maxWidth: 1240, margin: '40px auto 0', padding: '0 24px' }}>
      <div style={{ border: `1px solid ${C.inkSoft}`, borderRadius: 14, padding: '18px 20px 14px', background: 'rgba(5,11,20,0.45)' }}>
        <span style={{ fontFamily: F.label, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: C.sageDim }}>{FILM.mapLabel.toUpperCase()}</span>
        <div className="tl-grid" style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* year ruler */}
          <div style={{ display: 'grid', gridTemplateColumns: 'var(--tl-label, 150px) minmax(0, 1fr)', columnGap: 14, padding: '0 10px' }}>
            <span />
            <div style={{ position: 'relative', height: 16, fontFamily: F.label, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', color: C.dust }}>
              {years.map((y, i) => <span key={y} style={{ position: 'absolute', left: `${(i / 3) * 100}%` }}>{y}</span>)}
              <span style={{ position: 'absolute', left: today, transform: 'translateX(-50%)', color: C.gold, whiteSpace: 'nowrap' }}>{FILM.todayLabel.toUpperCase()}</span>
            </div>
          </div>

          {FILM.frames.map((f, i) => {
            const p = span(f);
            const on = active === i;
            return (
              <button key={f.place} type="button" className="tl-row" onClick={() => onPick(i)} aria-pressed={on}
                aria-label={`${f.place}, ${f.dates}. Show this frame`}
                style={{
                  display: 'grid', gridTemplateColumns: 'var(--tl-label, 150px) minmax(0, 1fr)', columnGap: 14, alignItems: 'center',
                  minHeight: 40, padding: '0 10px', borderRadius: 8, border: 'none', cursor: 'pointer', textAlign: 'left',
                  background: on ? 'rgba(238,240,238,0.08)' : 'transparent', color: 'inherit', font: 'inherit',
                }}>
                <span style={{ fontFamily: F.label, fontSize: 12, fontWeight: on ? 700 : 500, color: on ? C.paper : C.dust, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.short}</span>
                <span style={{ position: 'relative', height: 40, display: 'block' }}>
                  {[1, 2].map((k) => <span key={k} style={{ position: 'absolute', top: 0, bottom: 0, left: `${(k / 3) * 100}%`, width: 1, background: '#1B2A40' }} />)}
                  <span style={{ position: 'absolute', top: 0, bottom: 0, left: today, width: 2, marginLeft: -1, background: C.gold, opacity: 0.7 }} />
                  <span style={{
                    position: 'absolute', top: 12, bottom: 12, left: p.left, width: p.width, minWidth: 12, borderRadius: 8,
                    background: STOCK[f.type], opacity: on ? 1 : 0.55, transition: 'opacity .25s, box-shadow .25s',
                    boxShadow: on ? `0 0 0 2px ${C.paper}` : 'none',
                  }} />
                  {!f.end && (
                    <span className="tl-pulse" style={{ position: 'absolute', top: '50%', left: today, width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: '50%', background: STOCK[f.type], border: `2px solid ${C.ink}` }} />
                  )}
                  {!f.end && (
                    <span style={{ position: 'absolute', top: '50%', left: `calc(${today} + 16px)`, transform: 'translateY(-50%)', fontFamily: F.label, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: STOCK[f.type], whiteSpace: 'nowrap' }}>
                      {FILM.stillHere.toUpperCase()}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* The last frame on the roll is left blank on purpose */
const NextFrame = () => {
  const n = FILM.next;
  return (
    <article style={{ width: 'min(320px, 78vw)', flexShrink: 0, display: 'flex', flexDirection: 'column', background: C.film, borderLeft: '1px solid #1B2A40' }}>
      <div className="sprockets" style={{ height: 18 }} />
      <div style={{ position: 'relative', height: 40, display: 'flex', alignItems: 'center', padding: '0 18px' }}>
        <div style={{ position: 'absolute', left: 0, width: 40, top: '50%', height: 2, marginTop: -1, background: C.red }} />
        <span style={{ position: 'relative', width: 14, height: 14, borderRadius: '50%', border: `2px dashed ${C.gold}` }} />
        <span style={{ position: 'relative', marginLeft: 'auto', fontFamily: F.label, fontSize: 12, fontWeight: 600, color: C.gold }}>{n.year}</span>
      </div>
      <div style={{ padding: '0 18px 20px', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
        <div style={{ height: 230, borderRadius: 4, border: `2px dashed ${C.gold}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: F.display, fontSize: 64, color: C.gold, lineHeight: 1 }}>?</span>
        </div>
        <h3 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 26, lineHeight: 1.1, color: C.paper }}>{n.title}</h3>
        <p style={{ margin: 0, fontFamily: F.body, fontStyle: 'italic', fontSize: 20, lineHeight: 1.5, color: C.paper }}>{n.line}</p>
        <a href="#thanks" className="arrow-link" style={{
          marginTop: 'auto', alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 18px',
          borderRadius: 999, background: C.gold, color: C.ink, textDecoration: 'none',
          fontFamily: F.label, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>{n.cta} →</a>
      </div>
      <div className="sprockets" style={{ height: 18 }} />
    </article>
  );
};

const pill = {
  display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 44, padding: '0 18px', borderRadius: 999, cursor: 'pointer',
  fontFamily: F.label, fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
};

export const FilmRoll = () => {
  const row = useRef(null);
  const frames = useRef([]);
  const lock = useRef(null);          // the frame a click asked for, held until the slide settles
  const settle = useRef(null);
  const last = FILM.frames.length - 1; // most recent role (Micron)
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = row.current;
    if (!el) return undefined;
    const h = () => {
      setAtStart(el.scrollLeft < 20);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 20);
      if (lock.current != null) {
        // ignore the in-between frames while a click is sliding the strip
        clearTimeout(settle.current);
        settle.current = setTimeout(() => { lock.current = null; }, 180);
        return;
      }
      if (el.scrollLeft < 20) { setActive(0); return; }
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 20) { setActive(last); return; }
      // the frame whose left edge is nearest the strip's left edge
      const edge = el.scrollLeft + 24;
      let best = 0, dist = Infinity;
      frames.current.forEach((fr, i) => {
        if (!fr) return;
        const d = Math.abs(fr.offsetLeft - edge);
        if (d < dist) { dist = d; best = i; }
      });
      setActive(best);
    };
    h();
    el.addEventListener('scroll', h, { passive: true });
    window.addEventListener('resize', h);
    return () => { el.removeEventListener('scroll', h); window.removeEventListener('resize', h); clearTimeout(settle.current); };
  }, [last]);

  const pick = (i) => {
    const el = row.current, fr = frames.current[i];
    setActive(i);
    if (!el || !fr) return;
    const target = Math.min(Math.max(0, fr.offsetLeft - 24), el.scrollWidth - el.clientWidth);
    if (Math.abs(el.scrollLeft - target) < 2) return; // already there, nothing to slide
    lock.current = i;
    el.scrollTo({ left: target });
  };
  const jump = (toToday) => pick(toToday ? last : 0);

  return (
  <section id="film" style={{ padding: '96px 0 88px', background: C.ink, color: C.paper }}>
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 24px' }}>
      <Reveal>
        <SectionLabel n="03" light>{FILM.label}</SectionLabel>
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

    {/* scroll cue: where it starts, and a shortcut to today */}
    <div style={{ maxWidth: 1240, margin: '36px auto 0', padding: '0 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
      <span style={{ flex: '1 1 380px', fontFamily: F.body, fontStyle: 'italic', fontSize: 21, lineHeight: 1.45, color: C.paper }}>
        {active === last ? FILM.endLine : FILM.startLine}
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
        <button type="button" onClick={() => jump(false)} disabled={atStart && active === 0}
          style={{ ...pill, background: 'none', color: C.paper, border: `1.5px solid ${C.paper}`, opacity: atStart && active === 0 ? 0.35 : 1 }}>
          ← Where it started
        </button>
        <button type="button" onClick={() => jump(true)} disabled={active === last}
          style={{ ...pill, background: C.gold, color: C.ink, border: `1.5px solid ${C.gold}`, opacity: active === last ? 0.35 : 1 }}>
          Jump to today →
        </button>
      </div>
    </div>

    <TimelineMap active={active} onPick={pick} />

    <div style={{ position: 'relative', marginTop: 20 }}>
      <div ref={row} className="filmrow" tabIndex={0} aria-label="Film roll from 2024 to today, scroll sideways" style={{ overflowX: 'auto', padding: '0 24px 16px' }}>
        <div style={{ display: 'flex', width: 'max-content', margin: '0 auto' }}>
          {FILM.frames.map((f, i) => <Frame key={f.place} f={f} active={active === i} ref={(n) => { frames.current[i] = n; }} />)}
          <NextFrame />
        </div>
      </div>
      <div className="film-fade" aria-hidden="true" style={{ opacity: atEnd ? 0 : 1 }} />
    </div>
  </section>
  );
};
