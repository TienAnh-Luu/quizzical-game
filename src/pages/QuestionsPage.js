import React, { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Timer from "../components/Timer";
import Question from "../components/Question";
import { shuffle } from "../utils/arrayHelpers";

const FORM_STATE = {
  INITIAL: 0,
  NOT_COMPLETE: -1,
  SUBMITTED: 1,
};

const CATEGORY_NAME = {
  any: "General Knowledge Review",
  9: "General Knowledge Review",
  10: "Books Knowledge Review",
  11: "Film Knowledge Review",
  12: "Music Knowledge Review",
  13: "Musical & Theatres Review",
  14: "Television Knowledge Review",
  15: "Video Games Knowledge Review",
  16: "Board Games Knowledge Review",
  17: "Science & Nature Knowledge Review",
  18: "Computers Knowledge Review",
  19: "Mathematics Knowledge Review",
  20: "Mythology Knowledge Review",
  21: "Sports Knowledge Review",
  22: "Geography Knowledge Review",
  23: "History Knowledge Review",
  24: "Politics Knowledge Review",
  25: "Art Knowledge Review",
  26: "Celebrities Knowledge Review",
  27: "Animals Knowledge Review",
  28: "Vehicles Knowledge Review",
  29: "Comics Knowledge Review",
  30: "Gadgets Knowledge Review",
  31: "Anime & Manga Knowledge Review",
  32: "Cartoon & Animations Knowledge Review",
};

// Start with an initial value of 20 seconds
const TIME_LIMIT = 20;

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
  const { amount, category, difficulty, time } = useParams();
  const [timeLeft, setTimeLeft] = React.useState(time);

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
    const urlCate = category === "any" ? "" : `&category=${category}`;
    const urlDiff = difficulty === "any" ? "" : `&difficulty=${difficulty}`;
    const url = `https://opentdb.com/api.php?amount=${amount}${urlCate}${urlDiff}&type=multiple`;
    fetch(url)
      .then((res) => res.json())
      .then((dat) => {
        setQuizzes(
          dat.results.map((q) => ({
            question: q.question,
            answers: getShuffleAnswers(q),
          }))
        );
      })
      .catch(console.log("Cannot connect to API"));
  }, [getShuffleAnswers, amount, category, difficulty]);

  React.useEffect(() => {
    if (timeLeft <= 0 || formState === FORM_STATE.SUBMITTED) return;

    // save intervalId to clear the interval when the component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
  }, [timeLeft, formState]);

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
    if (countQuizSolved() < quizzes.length && timeLeft > 0) {
      setFormState(FORM_STATE.NOT_COMPLETE);
      console.log("Not complete");
    } else {
      const correctAns = countCorrectAnswers();
      const currentDate = new Date().toJSON().slice(0, 10);

      let history = JSON.parse(localStorage.getItem("quizHistories")) || [];
      history.push({
        id: Date.now(),
        name: CATEGORY_NAME[category],
        score: correctAns,
        noQuiz: quizzes.length,
        date: currentDate,
        details: quizzes,
      });
      localStorage.setItem("quizHistories", JSON.stringify(history));

      setFormState(FORM_STATE.SUBMITTED);
    }
  };

  if (formState !== FORM_STATE.SUBMITTED && timeLeft <= 0) {
    setFormState(FORM_STATE.SUBMITTED);
  }

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
          <Link to={"/form"}>
            <button className='quiz-btn'>Play again</button>
          </Link>
        )}
      </div>

      {time > 0 && <Timer timeLeft={timeLeft} initTime={TIME_LIMIT} />}

      <BackButton path='/form' />
    </section>
  );
}

/**TODO:
 * - fix re-render twice when loading the page
 */
