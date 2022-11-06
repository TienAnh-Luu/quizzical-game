import React from 'react';
import IntroPage from './pages/IntroPage';
import QuestionsPage from './pages/QuestionsPage';

export default function App() {
  /* the state that determine which page should be rendered
   * -1: questions page
   *  0: intro page
   *  1: answer page (it's still question page, but the answer is declared)
   */
  const [page, setPage] = React.useState(0);

  /* the state that hold the questions data
   * data example:
   *     [
   *          {
   *              category: "Sports",
   *              type: "multiple",
   *              difficulty: "medium",
   *              question: "What national team won the 2016 edition of UEFA European Championship?",
   *              correct_answer: "Portugal",
   *              incorrect_answers: ["France", "Germany", "England"]
   *          }, ...
   *     ]
   */
  const [data, setData] = React.useState([]);

  // This block of code only run when the App start or play again
  // It takes data from the API, then give them to data state
  React.useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=21&type=multiple')
      .then((res) => res.json())
      .then((dat) => setData(dat.results));
  }, []);

  function moveToQuestionPage() {
    setPage(-1);
  }

  return (
    <main className="app">
      {page === 0 && <IntroPage handleClick={moveToQuestionPage} />}
      {data && (
        <QuestionsPage
          isRender={page === -1 || page === 1 ? true : false}
          showResult={page === 1 ? true : false}
          data={data}
          handlePlayAgainClick={moveToQuestionPage}
        />
      )}
      <img src="../images/blobsTop.png" alt="blobs" className="blobsTop" />
      <img
        src="../images/blobsBottom.png"
        alt="blobs"
        className="blobsBottom"
      />
    </main>
  );
}
