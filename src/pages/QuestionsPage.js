import React, { useCallback } from "react";
import { Link } from "react-router-dom";

import Question from "../components/Question";
import { shuffle } from "../utils/arrayHelpers";

const FORM_STATE = {
  INITIAL: 0,
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

  const [formState, setFormState] = React.useState(FORM_STATE.INITIAL);
  // const [noCorrectAnswers, setNoCorrectAnswers] = React.useState(0);

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
    fetch("https://opentdb.com/api.php?amount=5&category=21&type=multiple")
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
    if (formState === FORM_STATE.SUBMITTED) return;

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
    const qzs = [...quizzes];
    return qzs.filter(
      (quiz) => quiz.answers.filter((ans) => ans.isChosen).length > 0
    ).length;
  };

  const countCorrectAnswers = () => {
    const qzs = [...quizzes];
    return qzs.filter(
      (quiz) =>
        quiz.answers.filter((ans) => ans.isChosen && ans.isCorrect).length > 0
    ).length;
  };

  const handleSubmit = () => {
    if (countQuizSolved() < quizzes.length) {
      setFormState(FORM_STATE.NOT_COMPLETE);
      console.log("Not complete");
    } else {
      const correctAns = countCorrectAnswers();
      const currentDate = new Date().toJSON().slice(0, 10);

      let history = JSON.parse(localStorage.getItem("history")) || [];
      history.push({
        id: Date.now(),
        name: "Sport Review",
        score: correctAns,
        noQuiz: quizzes.length,
        date: currentDate,
        details: quizzes,
      });
      localStorage.setItem("history", JSON.stringify(history));

      setFormState(FORM_STATE.SUBMITTED);
    }
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <section className='questions-page' style={{ display: "flex" }}>
      <div className='quizzes'>
        {quizzes.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={handleAnswerClick3}
            isSubmit={formState === FORM_STATE.SUBMITTED}
          />
        ))}
      </div>

      {formState === FORM_STATE.NOT_COMPLETE && (
        <h3 className='quiz-warning'>
          Complete all quizzes to see the result!!!
        </h3>
      )}

      {formState === FORM_STATE.SUBMITTED && (
        <h3 className='quiz-score'>
          You scored {countCorrectAnswers()}/{quizzes.length} correct answers
        </h3>
      )}

      <div className='quiz-btns'>
        {formState !== FORM_STATE.SUBMITTED && (
          <button className='quiz-btn' onClick={handleSubmit}>
            Check answers
          </button>
        )}
        <Link to='/history'>
          <button className='quiz-btn' onClick={() => {}}>
            See History
          </button>
        </Link>
        {formState === FORM_STATE.SUBMITTED && (
          <button className='quiz-btn' onClick={handlePlayAgain}>
            Play again
          </button>
        )}
      </div>
    </section>
  );
}

/**TODO:
 * - fix re-render twice when loading the page
 */
