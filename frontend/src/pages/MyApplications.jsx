import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/applications/mine')
      .then(res => setApplications(res.data))
      .catch(() => setApplications([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ padding: 40, color: '#888' }}>Chargement…</p>;

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px' }}>
      <h1 style={{ marginBottom: 24 }}>Mes candidatures</h1>

      {applications.length === 0 ? (
        <p style={{ color: '#888' }}>Vous n'avez pas encore postulé à une offre.</p>
      ) : (
        applications.map(app => (
          <div key={app._id} style={{
            border: '1px solid #e5e7eb', borderRadius: 12,
            padding: '16px 20px', marginBottom: 12,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: 4 }}>{app.offer?.title ?? '—'}</p>
                <p style={{ color: '#6b7280', fontSize: '0.82rem' }}>
                  {app.offer?.location} · {app.offer?.duration}
                </p>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                background: app.status === 'accepted' ? 'rgba(34,197,94,0.1)' : app.status === 'rejected' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                color: app.status === 'accepted' ? '#16a34a' : app.status === 'rejected' ? '#dc2626' : '#d97706',
              }}>
                {app.status === 'accepted' ? 'Acceptée' : app.status === 'rejected' ? 'Refusée' : 'En attente'}
              </span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.72rem', marginTop: 8 }}>
              Postulé le {new Date(app.createdAt).toLocaleDateString('fr-FR')}
            </p>
          </div>
        ))
      )}
    </div>
  );
}