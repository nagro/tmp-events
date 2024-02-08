import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EvenementsList from './components/EvenementsList';
import EvenementForm from './components/EvenementForm';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EvenementsList />} />
        <Route path="/evenement/new" element={<EvenementForm />} />
        <Route path="/evenement/edit/:id" element={<EvenementForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
