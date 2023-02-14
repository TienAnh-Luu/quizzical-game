import React from "react";

export default function HistoryDetails({
  name,
  score,
  noQuiz,
  date,
  deleteHandler,
}) {
  return (
    <section className='history-details'>
      <section className='hd-leftSection'>
        <img src='../images/ball.png' alt='png' className='hd-image' />
        <div className='hd-info'>
          <h3 className='hd-header'>QUIZ</h3>
          <h2 className='hd-name'>{name}</h2>
          <div className='hd-correctionContainer'>
            <i class='fa-solid fa-square-check hd-correctionIcon'></i>
            <div className='hd-correction'>
              Score: {score}/{noQuiz}
            </div>
          </div>
          <div className='hd-timeContainer'>
            <i class='fa-solid fa-clock-rotate-left hd-timeIcon'></i>
            <div className='hd-time'>{date}</div>
          </div>
        </div>
      </section>
      <i
        className='fa-solid fa-xmark hd-rightSection'
        onClick={deleteHandler}
      ></i>
    </section>
  );
}
