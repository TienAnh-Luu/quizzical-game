import React from "react";
import Question from "../components/Question";
// import { useLocation } from "react-router-dom";

export default function HistoryDetailsPage({ id = 1676447910170 }) {
  // const { location } = useLocation();
  // console.log(location.state.id);

  const history = JSON.parse(localStorage.getItem("history")) || [];
  const itemToRender = history.filter((item) => item.id === id)[0];
  console.log(itemToRender);

  return (
    <section className='history-details-page'>
      <div className='quizzes'>
        {itemToRender.details.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={() => {}}
            isSubmit={true}
          />
        ))}
      </div>
    </section>
  );
}
