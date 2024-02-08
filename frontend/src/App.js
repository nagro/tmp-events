import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EvenementsList from './components/EvenementsList';
import EvenementForm from './components/EvenementForm';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute component={EvenementsList} />} />
          <Route path="/evenement/new" element={<PrivateRoute component={EvenementForm} />} />
          <Route path="/evenement/edit/:id" element={<PrivateRoute component={EvenementForm} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
