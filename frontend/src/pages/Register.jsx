import { useState } from 'react';
import api from '../api/axios';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/auth/register', form);

      alert('Compte créé');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <br /><br />

        <select
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="student">Étudiant</option>
          <option value="company">Entreprise</option>
          <option value="admin">Admin</option>
        </select>

        <br /><br />

        <button type="submit">
          Créer compte
        </button>
      </form>
    </div>
  );
}