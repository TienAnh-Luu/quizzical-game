import React from "react";
import Question from "../components/Question";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";

export default function HistoryDetailsPage() {
  const { id } = useParams();
  const history = JSON.parse(localStorage.getItem("quizHistories")) || [];
  const itemToRender = history.filter((item) => item.id == id)[0];

  if (!history) return <div>Loading</div>;

  if (!itemToRender) return <div>History not found</div>;

  return (
    <section className='history-details-page'>
      <div className='quizzes' style={{ pointerEvents: "none" }}>
        {itemToRender.details.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={() => {}}
            isSubmit={true}
          />
        ))}
      </div>
      <BackButton path='/history' />
    </section>
  );
}
