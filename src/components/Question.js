import React from 'react';

export default function Question({ quiz, answerStyle, handleAnswerClick, handleAnswerMouseEnter, handleAnswerMouseLeave, isSubmit }) {
  

  return (
    <div className="quiz">
      <p className="question">{quiz.question}</p>
      <div className="answers">
        {quiz.answers.map((ans) => (
          <div
            key={ans.value}
            className="answer"
            style={answerStyle(ans, isSubmit)}
            onClick={handleAnswerClick(quiz.question, ans.value)}
            onMouseEnter={handleAnswerMouseEnter}
            onMouseLeave={(event) => handleAnswerMouseLeave(event, ans)}
          >
            {ans.value}
          </div>
        ))}
      </div>
    </div>
  );
}
