import React from 'react';
import { Link } from 'react-router-dom';

export default function IntroPage() {
  return (
    <section className="intro-page">
      <h1 className="intro-title">Quizzical</h1>
      <p className="intro-desc">Welcome to the quizzical game</p>
      <Link to="/questions">
        <button className="intro-startBtn">Start quiz</button>
      </Link>
    </section>
  );
}
