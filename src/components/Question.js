import React from 'react';

export default function Question(props) {
  // this state is only used for rerender purpose
  // (don't care about the value, when it change, the component is rerendered)
  const [rerender, setRerender] = React.useState(false);

  const backgroundColorStyle = (answer) => ({
    backgroundColor: answer.isChosen ? '#D6DBF5' : 'unset',
  });

  return (
    <div className="quiz">
      <p className="question">{props.quiz.question}</p>
      <div className="answers">
        {props.quiz.answers.map((ans) => {
          return (
            <div
              className="answer"
              id={props.quiz.question}
              data-value={ans.value}
              key={ans.value}
              style={backgroundColorStyle(ans)}
              onClick={props.handleAnswerClick}
            >
              {ans.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
