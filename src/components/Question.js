import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';

export default function Question({ quiz, handleAnswerClick, handleAnswerHover, isSubmit }) {
  const answerStyle = (answer) => {
    
    let bgc = ""
    let border = '0.8px solid #4d5b9e'
    if (!isSubmit && answer.isChosen) { // haven't been submitted yet and this ans is chosen
      bgc = "#d6dbf5"
      border = "none"
    } else if (!isSubmit && !answer.isChosen) { // haven't been submitted yet and this ans isn't chosen
      bgc = "unset"
    } else if (isSubmit && answer.isCorrect) { // have been submitted and this ans is correct
      bgc = "#94d7a2"
      border = "none"
    } else if (isSubmit && !answer.isCorrect && answer.isChosen) { // have been submitted and this ans is incorrect and it is chosen
      bgc = "#f8bcbc"
      border = "none"
    } else if (isSubmit && !answer.isCorrect && !answer.isChosen) { // have been submitted and this ans is incorrect and it isn't chosen
      bgc = "unset"
    }

    return {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      boxSizing: 'border-box',
      border: border,
      borderRadius: '8px',
      marginRight: '13px',
      padding: '4px 16px',
      backgroundColor: bgc,
      cursor: 'pointer',
      transition: 'border 0.15s, background-color 0.15s'
    }
  };

  return (
    <div className="quiz">
      <p className="question">{quiz.question}</p>
      <div className="answers">
        {quiz.answers.map((ans) => (
          <div
            key={ans.value}
            className="answer"
            style={answerStyle(ans)}
            onClick={handleAnswerClick(quiz.question, ans.value)}
            onMouseEnter={handleAnswerHover}
          >
            {ans.value}
          </div>
        ))}
      </div>
    </div>
  );
}
