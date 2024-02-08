import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login'); 
  };

  const isAuthenticated = () => {
    return localStorage.getItem('token') ? true : false;
 };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Gestion Evenements</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {isAuthenticated()?<div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Accueil</Link>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
        </div>:<></>}
      </div>
    </nav>
  );
};

export default Navbar;
