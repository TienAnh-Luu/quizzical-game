import React from 'react';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  return (
    <section className="history-page">
      <p>History page</p>
      <Link to="/questions">
        <button className="intro-startBtn">Back</button>
      </Link>
    </section>
  );
}
