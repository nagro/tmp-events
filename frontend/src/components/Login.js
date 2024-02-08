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
    <form onSubmit={handleSubmit}>
      <label>Nom d'utilisateur</label>
      <input type="text" name="username" value={credentials.username} onChange={handleChange} />

      <label>Mot de passe</label>
      <input type="password" name="password" value={credentials.password} onChange={handleChange} />

      <button type="submit">Connexion</button>
    </form>
  );
};

export default Login;
