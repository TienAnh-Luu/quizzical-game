import { React, useEffect, useState } from "react";
import HistoryDetails from "../components/HistoryDetails";
import { Link } from "react-router-dom";
import { deleteById } from "../utils/arrayHelpers";

export default function HistoryPage() {
  // [{name: 'name', score: 2, noQuiz: 5, date: '27/01/2023'}, {...}]
  const [history, setHistory] = useState([]);
  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("history")));
  }, []);

  const deleteHandler = (id) => {
    console.log(history);
    console.log("/n/n");
    const newHistory = deleteById(id, history);
    console.log(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  return (
    <section className='history-page'>
      {history && history.length > 0 ? (
        history.map((hItem) => (
          <Link className='hd-link'>
            <HistoryDetails
              name={hItem.name}
              score={hItem.score}
              noQuiz={hItem.noQuiz}
              date={hItem.date}
              deleteHandler={() => deleteHandler(hItem.id)}
            />
          </Link>
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
