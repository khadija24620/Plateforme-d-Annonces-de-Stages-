import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await api.get('/offers');
        setOffers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des offres</h1>

      {offers.map((offer) => (
        <div
          key={offer._id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px'
          }}
        >
          <h3>{offer.title}</h3>

          <p>{offer.description}</p>

          <p>
            Entreprise :
            {' '}
            {offer.company?.companyName}
          </p>
        </div>
      ))}
    </div>
  );
}