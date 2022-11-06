import React from 'react';
import Question from '../components/Question';

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

  React.useEffect(() => {
    setQuizzes(
      props.data.map((q) => ({
        question: q.question,
        answers: getShuffleAnswers(q),
      }))
    );
  }, [props.data]);

  function displayStyle(isShow) {
    return { display: isShow ? 'flex' : 'none' };
  }

  // This func randomly reaarange the array
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function getShuffleAnswers(q) {
    let anss = [];

    anss = anss.concat(q.incorrect_answers); // take the incorrect answers
    anss.push(q.correct_answer); // take the correct answer

    // turn answer to object that contain more information
    // then shuffle the array of answers
    anss = shuffle(
      anss.map((ans) => ({
        value: ans,
        isChosen: false,
        isCorrect: q.correct_answer === ans,
      }))
    );

    return anss;
  }

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
    console.log(quizzes);
  }

  const quizElements = quizzes.map((quiz) => {
    return (
      <Question
        key={quiz.question}
        quiz={quiz}
        handleAnswerClick={(event) => handleAnswerClick(event)}
      />
    );
  });

  return (
    <section className="questions-page" style={displayStyle(props.isRender)}>
      <div className="quizzes">{quizElements}</div>
      <div className="quiz-result" style={displayStyle(props.showResult)}>
        <h3 className="quiz-score">You scored 3/5 correct answers</h3>
        <button className="quiz-playAgainBtn">Play again</button>
      </div>
      <button className="quiz-btn" style={displayStyle(!props.showResult)}>
        Check answers
      </button>
    </section>
  );
}
