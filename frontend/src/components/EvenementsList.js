import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';


const EvenementsList = () => {
  const [evenements, setEvenements] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/evenements/`,
    {headers: {
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }}
      )
      .then(res => {
        setEvenements(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Liste des Événements</h2>
      <ul>
        {evenements.map(evenement => (
          <li key={evenement.id}>{evenement.libelle} - {evenement.lieu}</li>
        ))}
      </ul>
    </div>
  );
};

export default EvenementsList;
