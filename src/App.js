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

  function moveToQuestionPage() {
    setPage(-1);
  }

  return (
    <main className="app">
      {page === 0 && <IntroPage handleClick={moveToQuestionPage} />}
      {page !== 0 && (
        <QuestionsPage handlePlayAgainClick={moveToQuestionPage} />
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
