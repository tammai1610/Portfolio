import React, { useEffect, useState } from 'react';
import { C } from '../theme';
import { LINKS } from '../data';
import { PillButton } from './ui';

/* A Resume button that stays in the corner once you scroll past the shopfront */
export const FloatingResume = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > window.innerHeight * 0.8);
    h();
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <div className="float-resume" aria-hidden={!show} style={{
      position: 'fixed', left: 24, bottom: 24, zIndex: 60,
      opacity: show ? 1 : 0, translate: show ? '0 0' : '0 12px', pointerEvents: show ? 'auto' : 'none',
      background: C.paper, borderRadius: 999,
    }}>
      <PillButton href={LINKS.resume}>Resume</PillButton>
    </div>
  );
};
