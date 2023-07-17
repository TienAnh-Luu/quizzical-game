import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import FormPage from "./pages/FormPage";
import QuestionsPage from "./pages/QuestionsPage";
import HistoryPage from "./pages/HistoryPage";
import HistoryDetailsPage from "./pages/HistoryDetailsPage";

export default function App() {
  return (
    <main className='app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IntroPage />} />
          <Route path='/form' element={<FormPage />} />
          <Route
            path='/questions/:amount/:category/:difficulty/:time'
            element={<QuestionsPage />}
          />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='/history-details/:id' element={<HistoryDetailsPage />} />
        </Routes>
      </BrowserRouter>

      <img src='../images/blobsTop.png' alt='blobs' className='blobsTop' />
      <img
        src='../images/blobsBottom.png'
        alt='blobs'
        className='blobsBottom'
      />
    </main>
  );
}
