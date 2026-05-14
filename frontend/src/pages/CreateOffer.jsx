import { useState } from 'react';
import api from '../api/axios';

export default function CreateOffer() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await api.post('/offers', {
        title,
        description
      });

      alert('Offre créée');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Créer une offre</h1>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Titre"
          onChange={(e) => setTitle(e.target.value)}
        />

        <br /><br />

        <textarea
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Créer
        </button>
      </form>
    </div>
  );
}