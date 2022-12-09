import React, { useCallback } from 'react';
import Question from '../components/Question';
import { shuffle } from '../utils/arrayHelpers';

const answerStyle = (answer, isSubmit) => {
  let bgc = '';
  let border = '0.8px solid #4d5b9e';
  if (isSubmit !== 1 && answer.isChosen) {
    // haven't been submitted yet and this ans is chosen
    bgc = '#d6dbf5';
    border = 'none';
  } else if (isSubmit !== 1 && !answer.isChosen) {
    // haven't been submitted yet and this ans isn't chosen
    bgc = 'unset';
  } else if (isSubmit === 1 && answer.isCorrect) {
    // have been submitted and this ans is correct
    bgc = '#94d7a2';
    border = 'none';
  } else if (isSubmit === 1 && !answer.isCorrect && answer.isChosen) {
    // have been submitted and this ans is incorrect and it is chosen
    bgc = '#f8bcbc';
    border = 'none';
  } else if (isSubmit === 1 && !answer.isCorrect && !answer.isChosen) {
    // have been submitted and this ans is incorrect and it isn't chosen
    bgc = 'unset';
  }

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    border: border,
    borderRadius: '8px',
    marginRight: '13px',
    padding: '4px 16px',
    backgroundColor: bgc,
    cursor: isSubmit === 1 ? 'default' : 'pointer',
    transition: 'border 0.15s, background-color 0.15s',
  };
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

  /**
   * -1: press submit button when the form haven't been completed yet
   *  0: in progress
   *  1: submitted
   */
  const [isSubmit, setIsSubmit] = React.useState(0);

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

  const handleAnswerMouseEnter = (event) => {
    if (isSubmit !== 1) {
      event.target.style.backgroundColor = '#d6dbf5';
      event.target.style.border = 'none';
    }
  };

  const handleAnswerMouseLeave = (event, answer) => {
    if (isSubmit !== 1) {
      if (answer.isChosen) {
        event.target.style.backgroundColor = '#d6dbf5';
        event.target.style.border = 'none';
      } else {
        event.target.style.backgroundColor = 'unset';
        event.target.style.border = '0.8px solid #4d5b9e';
      }
    }
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
      setIsSubmit(-1);
    } else {
      setIsSubmit(1);
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
            answerStyle={(answer, isSubmit) => answerStyle(answer, isSubmit)}
            handleAnswerClick={handleAnswerClick3}
            handleAnswerMouseEnter={handleAnswerMouseEnter}
            handleAnswerMouseLeave={(event, answer) =>
              handleAnswerMouseLeave(event, answer)
            }
            isSubmit={isSubmit}
          />
        ))}
      </div>
      {isSubmit === 1 && (
        <div className="quiz-result">
          <h3 className="quiz-score">
            You scored {countCorrectAnswers()}/{quizzes.length} correct answers
          </h3>
          <button className="quiz-playAgainBtn" onClick={handlePlayAgain}>
            Play again
          </button>
        </div>
      )}
      {isSubmit === -1 && (
        <h3 className="quiz-warning">
          Complete all quizzes to see the result!!!
        </h3>
      )}
      {isSubmit !== 1 && (
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
