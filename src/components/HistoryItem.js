import React from "react";
import { Link } from "react-router-dom";

export default function HistoryItem({
  id,
  name,
  score,
  noQuiz,
  date,
  deleteHandler,
}) {
  return (
    <section className='history-item'>
      <i
        className='fa-solid fa-xmark hd-rightSection'
        onClick={deleteHandler}
      ></i>
      <Link
        className='hd-mainSection'
        to='/history-details'
        // state={{ id: id }}
      >
        <img src='../images/ball.png' alt='png' className='hd-image' />
        <div className='hd-info'>
          <h3 className='hd-header'>QUIZ</h3>
          <h2 className='hd-name'>{name}</h2>
          <div className='hd-correctionContainer'>
            <i className='fa-solid fa-square-check hd-correctionIcon'></i>
            <div className='hd-correction'>
              Score: {score}/{noQuiz}
            </div>
          </div>
          <div className='hd-timeContainer'>
            <i className='fa-solid fa-clock-rotate-left hd-timeIcon'></i>
            <div className='hd-time'>{date}</div>
          </div>
        </div>
      </Link>
    </section>
  );
}
