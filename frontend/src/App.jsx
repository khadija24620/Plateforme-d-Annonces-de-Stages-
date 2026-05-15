import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Offers from './pages/Offers';
import CreateOffer from './pages/CreateOffer';
import AdminDashboard from './pages/AdminDashboard';
import Apply from './pages/Apply';
import CompanyApplications from './pages/CompanyApplications';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Offers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/apply/:offerId" element={<Apply />} />
        <Route path="/my-offers" element={<CreateOffer />} />
        <Route path="/my-applications" element={<CompanyApplications />} />
              </Routes>
    </BrowserRouter>
  );
}

export default App;