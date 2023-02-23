import { React, useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import HistoryItem from "../components/HistoryItem";
import { deleteById } from "../utils/arrayHelpers";

export default function HistoryPage() {
  // [{name: 'name', score: 2, noQuiz: 5, date: '27/01/2023'}, {...}]
  const [quizHistories, setQuizHistories] = useState([]);
  useEffect(() => {
    setQuizHistories(JSON.parse(localStorage.getItem("quizHistories")));
  }, []);

  const deleteHandler = (id) => {
    const newQuizHistories = deleteById(id, quizHistories);
    localStorage.setItem("quizHistories", JSON.stringify(newQuizHistories));
    setQuizHistories(newQuizHistories);
  };

  return (
    <section className='quiz-history-page'>
      {quizHistories && quizHistories.length > 0 ? (
        quizHistories.map((hItem) => (
          <HistoryItem
            key={hItem.id}
            id={hItem.id}
            name={hItem.name}
            score={hItem.score}
            noQuiz={hItem.noQuiz}
            date={hItem.date}
            deleteHandler={() => deleteHandler(hItem.id)}
          />
        ))
      ) : (
        <img
          src='../images/illustatus.svg'
          alt='error page'
          className='error-page'
        />
      )}
      <BackButton path='/form' />
    </section>
  );
}
