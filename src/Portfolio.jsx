import React from 'react';
import { C, F, FONTS_URL } from './theme';
import { GLOBAL_CSS } from './components/ui';
import { TopBar, Shopfront } from './components/Shopfront';
import { Keychains } from './components/Keychains';
import { Quiescent } from './components/Quiescent';
import { FloatingResume } from './components/FloatingResume';
import { FilmRoll } from './components/FilmRoll';
import { Letters } from './components/Letters';
import { Magnets } from './components/Magnets';
import { Bookshelf } from './components/Bookshelf';
import { ThankYou } from './components/ThankYou';
import { MusicPlayer } from './components/MusicPlayer';

const Portfolio = () => (
  <div style={{ minHeight: '100vh', background: C.paper, color: C.ink, fontFamily: F.body, fontSize: 18, overflowX: 'hidden' }}>
    <link rel="stylesheet" href={FONTS_URL} />
    <style>{GLOBAL_CSS}</style>

    <TopBar />
    <Shopfront />
    <main>
      <Keychains />
      <Quiescent />
      <FilmRoll />
      <Letters />
      <Magnets />
      <Bookshelf />
      <ThankYou />
    </main>
    <footer className="awning" style={{ height: 18 }} />
    <FloatingResume />
    <MusicPlayer />
  </div>
);

export default Portfolio;
