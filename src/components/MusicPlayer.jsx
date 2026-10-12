import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { C } from '../theme';

/* Same ambient player as before, restyled for the shop. Uses /ambient.mp3 in public/. */
export const MusicPlayer = () => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audio = useRef(null);

  useEffect(() => {
    const a = new Audio('/ambient.mp3');
    a.loop = true;
    a.volume = 0.22;
    audio.current = a;
    return () => { a.pause(); a.src = ''; };
  }, []);

  useEffect(() => {
    if (!audio.current) return;
    if (playing) audio.current.play().catch(() => {});
    else audio.current.pause();
  }, [playing]);

  useEffect(() => { if (audio.current) audio.current.muted = muted; }, [muted]);

  const btn = (size) => ({
    width: size, height: size, borderRadius: '50%', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: `2px solid ${C.ink}`, boxShadow: `3px 3px 0 ${C.ink}`,
  });

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 60, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
      {playing && (
        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'} style={{ ...btn(36), background: C.card }}>
          {muted ? <VolumeX size={14} color={C.ink} /> : <Volume2 size={14} color={C.ink} />}
        </button>
      )}
      <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause shop music' : 'Play shop music'}
        style={{ ...btn(52), background: playing ? C.matcha : C.gold }}>
        {playing ? <Pause size={18} color={C.card} /> : <Play size={18} color={C.ink} />}
      </button>
    </div>
  );
};
