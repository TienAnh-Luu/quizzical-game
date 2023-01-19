import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  answerButton: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',

    borderRadius: '8px',
    marginRight: '13px',
    padding: '4px 16px',

    transition: 'border 0.15s, background-color 0.15s',
    border: '0.8px solid #4d5b9e',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#d6dbf5',
      border: 'none',
      padding: '4.8px 16.8px',
    },
  },
  chosenAnswer: {
    backgroundColor: '#d6dbf5',
  },
  correctAnswer: {
    backgroundColor: '#94d7a2',
    border: 'none',
  },
  incorrectAnswer: {
    backgroundColor: '#f8bcbc',
    border: 'none',
  },
});

const answerStateClass = (classes, ans, isSubmit) => {
  if (!isSubmit) {
    if (ans.isChosen) return classes.chosenAnswer;
  }

  if (isSubmit) {
    if (ans.isCorrect) return classes.correctAnswer;
    if (ans.isChosen && !ans.isCorrect) return classes.incorrectAnswer;
  }
};

export default function Question({
  quiz,
  handleAnswerClick,
  handleAnswerMouseEnter,
  handleAnswerMouseLeave,
  isSubmit,
}) {
  const classes = useStyles();
  return (
    <div className="quiz">
      <p className="question">{quiz.question}</p>
      <div className="answers">
        {quiz.answers.map((ans) => (
          <div
            key={ans.value}
            className={`${classes.answerButton} ${answerStateClass(
              classes,
              ans,
              isSubmit
            )} `}
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
