import React from 'react';
import { C, F } from '../theme';
import { THANKS as T, LINKS } from '../data';
import { SectionLabel, Reveal, ArrowLink, PillButton } from './ui';

export const ThankYou = () => (
  <section id="thanks" style={{ background: C.glass, padding: '96px 24px 104px', color: C.ink }}>
    <div style={{ maxWidth: 1240, margin: '0 auto' }}>
      <SectionLabel n="06">{T.label}</SectionLabel>
      <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 56 }}>
        <Reveal style={{ flex: '999 1 520px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <h2 style={{ margin: 0, fontFamily: F.display, fontWeight: 400, fontSize: 'clamp(48px, 7.5vw, 100px)', lineHeight: 0.98, letterSpacing: '-0.02em' }}>
            {T.title[0]}<br />{T.title[1]}
          </h2>
          <p style={{ margin: 0, maxWidth: 560, fontFamily: F.body, fontSize: 21, lineHeight: 1.6 }}>{T.body}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px 36px', alignItems: 'center' }}>
            <ArrowLink href={LINKS.email}>{T.cta}</ArrowLink>
            <ArrowLink href={LINKS.linkedin} external diagonal gap={12}>LinkedIn</ArrowLink>
            <ArrowLink href={LINKS.github} external diagonal gap={12}>GitHub</ArrowLink>
            <PillButton href={LINKS.resume}>Resume</PillButton>
          </div>
        </Reveal>

        {/* gift box with a tag */}
        <svg width="260" height="280" viewBox="0 0 280 300" aria-hidden="true" style={{ flex: '0 0 auto', margin: '0 auto' }}>
          <rect x="40" y="130" width="200" height="150" rx="6" fill={C.matcha} stroke={C.ink} strokeWidth="3" />
          <rect x="28" y="100" width="224" height="42" rx="6" fill={C.teal} stroke={C.ink} strokeWidth="3" />
          <rect x="126" y="100" width="28" height="180" fill={C.red} stroke={C.ink} strokeWidth="3" />
          <path d="M140 100 C110 60 70 64 82 92 C90 108 124 104 140 100 Z" fill={C.red} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
          <path d="M140 100 C170 60 210 64 198 92 C190 108 156 104 140 100 Z" fill={C.red} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
          <circle cx="140" cy="100" r="10" fill={C.red} stroke={C.ink} strokeWidth="3" />
          <path d="M150 104 C176 130 200 160 214 186" stroke={C.ink} strokeWidth="2" fill="none" />
          <g transform="rotate(-14 222 210)">
            <path d="M196 188 h52 v58 h-52 l-12 -29 z" fill={C.gold} stroke={C.ink} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="198" cy="217" r="4" fill={C.glass} stroke={C.ink} strokeWidth="2" />
            <path d="M210 208 h28 M210 220 h22 M210 232 h26" stroke={C.ink} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
          </g>
        </svg>
      </div>
    </div>
  </section>
);
