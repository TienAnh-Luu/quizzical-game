import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IntroPage from './pages/IntroPage';
import QuestionsPage from './pages/QuestionsPage';

export default function App() {
  return (
    <main className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IntroPage />} />
          <Route path='/questions' element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>

      <img src="../images/blobsTop.png" alt="blobs" className="blobsTop" />
      <img
        src="../images/blobsBottom.png"
        alt="blobs"
        className="blobsBottom"
      />
    </main>
  );
}
