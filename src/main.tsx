import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './styles/_main.scss';

import LandiePage from './views/LandiePage';
import Confess from './views/Confess';
import { I18nProvider } from './contexts/i18n-context';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandiePage />} />
          <Route path="/confess/:id" element={<Confess />} />
        </Routes>
      </Router>
      <ToastContainer />
    </I18nProvider>
  </StrictMode>,
)
