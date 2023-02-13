import React from 'react';
import HistoryDetails from '../components/HistoryDetails';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  // [{name: 'name', score: 2, noQuiz: 5, date: '27/01/2023'}, {...}]
  const history = JSON.parse(localStorage.getItem('history')) || [];

  return (
    <section className="history-page">
      <p>History page</p>
      {history === [] ? (
        <img
          src="../images/illustatus.svg"
          alt="error page"
          className="error-page"
        />
      ) : (
        history.map((hItem) => (
          <Link className="hd-link">
            <HistoryDetails
              name={hItem.name}
              score={hItem.score}
              noQuiz={hItem.noQuiz}
              date={hItem.date}
            />
          </Link>
        ))
      )}
    </section>
  );
}
