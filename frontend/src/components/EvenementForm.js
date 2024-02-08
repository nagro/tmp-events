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
            logo:data.logo
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
    <div className="container mt-5">
      <div className='row col-md-6 m-auto'>
        <h2 className='m-5'>{id ? 'Modifier un événement' : 'Créer un nouvel événement'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="libelle" className="form-label">Libellé</label>
          <input type="text" className="form-control" id="libelle" name="libelle" value={formData.libelle} onChange={handleChange} />
        </div>
        
        <div className="mb-3">
          <label htmlFor="lieu" className="form-label">Lieu</label>
          <input type="text" className="form-control" id="lieu" name="lieu" value={formData.lieu} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="debut" className="form-label">Date de début</label>
          <input type="date" className="form-control" id="debut" name="debut" value={formData.debut} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="fin" className="form-label">Date de fin</label>
          <input type="date" className="form-control" id="fin" name="fin" value={formData.fin} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="categorie" className="form-label">Catégorie</label>
          <input type="text" className="form-control" id="categorie" name="categorie" value={formData.categorie} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="logo" className="form-label">Logo</label>
          {formData.logo && <img src={formData.logo} alt="Logo" style={{width: "50px", height: "50px"}} />}
          <input type="file" className="form-control" id="logo" name="logo" onChange={handleFileChange} />
        </div>

        <button type="submit" className="btn btn-primary">{id ? 'Mettre à jour' : 'Créer'}</button>
      </form>
      </div>
    </div>
  );
};

export default EvenementForm;
