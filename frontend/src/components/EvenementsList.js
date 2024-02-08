import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import TruncatedText from './TruncatedText';


const EvenementsList = () => {
  const [evenements, setEvenements] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [eventIdToDelete, setEventIdToDelete] = useState(null);

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

  const promptDelete = (id) => {
    setShowModal(true);
    setEventIdToDelete(id);
  };  

  const hideModal = () => {
    setShowModal(false);
    setEventIdToDelete(null);
  };
  
  const handleDelete = () => {
    axios.delete(`${API_BASE_URL}/api/evenements/${eventIdToDelete}/`, {
      headers: {
        Authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : null,
      }
    })
    .then(() => {
      // raffraichir l'interface utilisateur
      setEvenements(evenements.filter(evenement => evenement.id !== eventIdToDelete));
      hideModal();
    })
    .catch(err => console.log(err));
  };

  
  return (<>{showModal && (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Êtes-vous sûr de vouloir supprimer cet événement ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Supprimer
        </Button>
      </Modal.Footer>
    </Modal>
  )}
    <div  className="container mt-5">
      <h2>Liste des Événements</h2>
      <Link to="/evenement/new" className="btn btn-success mb-3">Créer un événement</Link>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Logo</th>
            <th scope="col">Libellé</th>
            <th scope="col">Description</th>
            <th scope="col">Lieu</th>
            <th scope="col">Début</th>
            <th scope="col">Fin</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {evenements.map((evenement, index) => (
            <tr key={evenement.id}>
              <th scope="row">{index + 1}</th>
              <td>
                {evenement.logo && <img src={evenement.logo} alt="Logo" style={{width: "50px", height: "50px"}} />}
              </td>
              <td>{evenement.libelle}</td>
              {/* <td><TruncatedText text={evenement.description} maxLength={60} /></td> */}
              <td>{evenement.lieu}</td>
              <td>{new Date(evenement.debut).toLocaleDateString()}</td>
              <td>{new Date(evenement.fin).toLocaleDateString()}</td>
              <td>
                <Link to={`/evenement/edit/${evenement.id}`} className="btn btn-sm btn-secondary me-2">Modifier</Link>
                <button onClick={() => promptDelete(evenement.id)} className="btn btn-sm btn-danger">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
  );
};

export default EvenementsList;
