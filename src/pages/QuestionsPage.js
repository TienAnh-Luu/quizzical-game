import React, { useCallback } from 'react';

import Question from '../components/Question';
import { shuffle } from '../utils/arrayHelpers';

const FORM_STATE = {
  IN_PROGRESS: 0,
  NOT_COMPLETE: -1,
  SUBMITTED: 1,
};

export default function QuestionsPage() {
  /**
   * This is how quizzes state looks like:
   * {
   *      question: "...",
   *      answers: [
   *          {
   *              value: "...",
   *              isChosen: true/false
   *              isCorrect: true/false
   *          },
   *          {...}, {...}
   *      ]
   * }
   */
  const [quizzes, setQuizzes] = React.useState([]);

  const [formState, setFormState] = React.useState(FORM_STATE.IN_PROGRESS);
  const [noCorrectAnswers, setNoCorrectAnswers] = React.useState(0);

  const getShuffleAnswers = useCallback((q) => {
    const anss = [...q.incorrect_answers, q.correct_answer];

    const mappedAnss = anss.map((ans) => ({
      value: ans,
      isChosen: false,
      isCorrect: q.correct_answer === ans,
    }));

    return shuffle(mappedAnss);
  }, []);

  // This block of code only run when the App start or play again
  // It takes data from the API, then give them to quizzes state
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=21&type=multiple')
      .then((res) => res.json())
      .then((dat) => {
        setQuizzes(
          dat.results.map((q) => ({
            question: q.question,
            answers: getShuffleAnswers(q),
          }))
        );
      });
  }, [getShuffleAnswers]);

  // leverage Javascript closure: (question, chosenAnsValue) => () => {}
  const handleAnswerClick3 = (question, chosenAnsValue) => () => {
    const index = quizzes.findIndex((q) => q.question === question);

    const quiz = quizzes[index];
    const newAnswers = quiz.answers.map((ans) => ({
      ...ans,
      isChosen: ans.value === chosenAnsValue,
    }));

    const newQuiz = { ...quiz, answers: newAnswers };

    setQuizzes([
      ...quizzes.slice(0, index),
      newQuiz,
      ...quizzes.slice(index + 1),
    ]);
  };

  const countQuizSolved = () => {
    let count = 0;
    const qzs = [...quizzes];

    qzs.map((quiz) => {
      quiz.answers.map((ans) => {
        if (ans.isChosen) {
          count++;
        }
        return ans;
      });
      return quiz;
    });

    return count;
  };

  const countCorrectAnswers = () => {
    let count = 0;
    const qzs = [...quizzes];

    qzs.map((quiz) => {
      quiz.answers.map((ans) => {
        if (ans.isChosen && ans.isCorrect) {
          count++;
        }
        return ans;
      });
      return quiz;
    });

    return count;
  };

  const handleSubmit = () => {
    if (countQuizSolved() < quizzes.length) {
      setFormState(FORM_STATE.NOT_COMPLETE);
    } else {
      setFormState(FORM_STATE.SUBMITTED);
      setNoCorrectAnswers(countCorrectAnswers());
    }
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <section className="questions-page" style={{ display: 'flex' }}>
      <div className="quizzes">
        {quizzes.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={handleAnswerClick3}
            isSubmit={formState === FORM_STATE.SUBMITTED}
          />
        ))}
      </div>
      {formState === FORM_STATE.SUBMITTED && (
        <div className="quiz-result">
          <h3 className="quiz-score">
            You scored {noCorrectAnswers}/{quizzes.length} correct answers
          </h3>
          <button className="quiz-playAgainBtn" onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
      )}
      {formState === FORM_STATE.NOT_COMPLETE && (
        <h3 className="quiz-warning">
          Complete all quizzes to see the result!!!
        </h3>
      )}
      {formState !== FORM_STATE.SUBMITTED && (
        <button className="quiz-btn" onClick={handleSubmit}>
          Check answers
        </button>
      )}
    </section>
  );
}

/**TODO:
 * - fix re-render twice when loading the page
 */
