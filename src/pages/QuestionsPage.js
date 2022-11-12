import React, { useCallback } from 'react';
import Question from '../components/Question';
import { shuffle } from '../utils/arrayHelpers';

export default function QuestionsPage(props) {
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
  // It takes data from the API, then give them to data state
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

  function handleAnswerClick(event) {
    const chosenAns = event.target.dataset.value;
    const ques = event.target.id;

    let res = [...quizzes];

    res = res.map((quiz) => {
      if (quiz.question === ques) {
        let newAnswers = quiz.answers.map((ans) => {
          // todo: fix this
          if (ans.value === chosenAns && ans.isChosen === false) {
            // console.log(true)
            return { ...ans, isChosen: true };
          } else if (ans.value !== chosenAns && ans.isChosen === true) {
            // console.log(false)
            return { ...ans, isChosen: false };
          }

          // console.log("normal")
          return ans;
        });

        return { ...quiz, answers: newAnswers };
      } else {
        return quiz;
      }
    });

    setQuizzes(res);
  }

  // set chosen answer = true, other answers in this questions set to false
  function handleAnswerClick2(event) {
    const chosenAns = event.target.dataset.value;
    const ques = event.target.id;

    const res = quizzes.map((quiz) => {
      if (quiz.question !== ques) return quiz;

      const newAnswers = quiz.answers.map((ans) => ({
        ...ans,
        isChosen: ans.value === chosenAns,
      }));

      return { ...quiz, answers: newAnswers };
    });

    setQuizzes(res);
  }

  // leverage Javascript closure: (question, chosenAnsValue) => () => {}
  const handleAnswerClick3 = (question, chosenAnsValue) => () => {
    const index = quizzes.findIndex((q) => q.question === question);

    const quiz = quizzes[index];
    const newAnswers = quiz.answers.map((ans) => ({
      ...ans,
      isChosen: ans.value === chosenAnsValue,
    }));

    const newQuizz = { ...quiz, answers: newAnswers };

    setQuizzes([
      ...quizzes.slice(0, index),
      newQuizz,
      ...quizzes.slice(index + 1),
    ]);
  };

  return (
    <section className="questions-page" style={{ display: 'flex' }}>
      <div className="quizzes">
        {quizzes.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={handleAnswerClick3}
          />
        ))}
      </div>
      {props.showResult ? (
        <div className="quiz-result">
          <h3 className="quiz-score">You scored 3/5 correct answers</h3>
          <button className="quiz-playAgainBtn">Play again</button>
        </div>
      ) : (
        <button className="quiz-btn">Check answers</button>
      )}
    </section>
  );
}
