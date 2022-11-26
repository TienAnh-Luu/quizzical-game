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
  const [isSubmit, setIsSubmit] = React.useState(false);

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

  const handleAnswerHover = (event) => {
    // if (!isSubmit) {
    //   event.target.style.backgroundColor = "#d6dbf5"
    //   event.target.style.border = "none"
    // }
  }

  const countCorrectAnswers = () => {
    let count = 0
    const qzs = [...quizzes]

    qzs.map(quiz => {
      quiz.answers.map(ans => {
        if (ans.isChosen && ans.isCorrect) {
          count++
        }
        return ans
      })
      return quiz
    })

    return count
  }

  const handleSubmit = () => {
    setIsSubmit(oldIsSubmit => !oldIsSubmit)
  }

  return (
    <section className="questions-page" style={{ display: 'flex' }}>
      <div className="quizzes">
        {quizzes.map((quiz) => (
          <Question
            key={quiz.question}
            quiz={quiz}
            handleAnswerClick={handleAnswerClick3}
            handleAnswerHover={handleAnswerHover}
            isSubmit={isSubmit}
          />
        ))}
      </div>
      {isSubmit ? (
        <div className="quiz-result">
          <h3 className="quiz-score">You scored {countCorrectAnswers()}/{quizzes.length} correct answers</h3>
          {/* <button className="quiz-playAgainBtn">Play again</button> */}
        </div>
      ) : (
        <button className="quiz-btn" onClick={handleSubmit}>Check answers</button>
      )}
    </section>
  );
}
