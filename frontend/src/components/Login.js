import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_BASE_URL}/api/token/`, credentials)
      .then(res => {
        localStorage.setItem('token', res.data.access);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-3">Connexion</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              <input type="text" className="form-control" id="username" name="username" value={credentials.username} onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn-secondary">Connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
