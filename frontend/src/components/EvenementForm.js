import API_BASE_URL from '../config';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EvenementForm = () => {
  const [formData, setFormData] = useState({
    libelle: '',
    lieu: '',
    description: '',
    debut: '',
    fin: '',
    categorie: '',
    logo: null, 
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${API_BASE_URL}/api/evenements/${id}/`,
      {headers: {
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }})
        .then(res => {
          const data = res.data;
          setFormData({
            libelle: data.libelle,
            lieu: data.lieu,
            description: data.description,
            debut: data.debut.split('T')[0], // TODO:utiliser momentjs
            fin: data.fin.split('T')[0], 
            categorie: data.categorie,
          });
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    const config = {
      headers: { Authorization: localStorage.getItem('token')
      ? `Bearer ${localStorage.getItem('token')}`
      : null,
      'Content-Type': 'multipart/form-data' }
    };

    const method = id ? 'put' : 'post';
    const url = id ? `${API_BASE_URL}/api/evenements/${id}/` : `${API_BASE_URL}/api/evenements/`;

    axios[method](url, data, config)
      .then(() => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Libellé</label>
      <input type="text" name="libelle" value={formData.libelle} onChange={handleChange} />

      <label>Lieu</label>
      <input type="text" name="lieu" value={formData.lieu} onChange={handleChange} />

      <label>Description</label>
      <textarea name="description" value={formData.description} onChange={handleChange} />

      <label>Date de début</label>
      <input type="date" name="debut" value={formData.debut} onChange={handleChange} />

      <label>Date de fin</label>
      <input type="date" name="fin" value={formData.fin} onChange={handleChange} />

      <label>Catégorie</label>
      <input type="text" name="categorie" value={formData.categorie} onChange={handleChange} />

      <label>Logo</label>
      <input type="file" name="logo" onChange={handleFileChange} />

      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default EvenementForm;
