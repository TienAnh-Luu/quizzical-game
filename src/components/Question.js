import React from 'react';

export default function Question({ quiz, handleAnswerClick }) {
  const backgroundColorStyle = (answer) => ({
    backgroundColor: answer.isChosen ? '#D6DBF5' : 'unset',
  });

  return (
    <div className="quiz">
      <p className="question">{quiz.question}</p>
      <div className="answers">
        {quiz.answers.map((ans) => (
          <div
            key={ans.value}
            className="answer"
            style={backgroundColorStyle(ans)}
            onClick={handleAnswerClick(quiz.question, ans.value)}
          >
            {ans.value}
          </div>
        ))}
      </div>
    </div>
  );
}
