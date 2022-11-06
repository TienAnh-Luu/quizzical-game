import React from 'react';

export default function IntroPage(props) {
  const displayStyle = {
    display: 'flex',
  };

  return (
    <section className="intro-page" style={displayStyle}>
      <h1 className="intro-title">Quizzical</h1>
      <p className="intro-desc">Welcome to the quizzical game</p>
      <button className="intro-startBtn" onClick={props.handleClick}>
        Start quiz
      </button>
    </section>
  );
}
