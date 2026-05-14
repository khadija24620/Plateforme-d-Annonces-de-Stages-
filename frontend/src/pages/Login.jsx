import { useState } from 'react';
import api from '../api/axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);

      localStorage.setItem(
        'user',
        JSON.stringify(res.data.user)
      );

      alert('Connexion réussie');
    } catch (err) {
      alert(err.response?.data?.error || 'Erreur');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}