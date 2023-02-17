import { React, useEffect, useState } from "react";
import HistoryItem from "../components/HistoryItem";
import { deleteById } from "../utils/arrayHelpers";

export default function HistoryPage() {
  // [{name: 'name', score: 2, noQuiz: 5, date: '27/01/2023'}, {...}]
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")));
  }, []);

  const deleteHandler = (id) => {
    const newHistory = deleteById(id, history);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <section className='history-page'>
      {history && history.length > 0 ? (
        history.map((hItem) => (
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
    </section>
  );
}
