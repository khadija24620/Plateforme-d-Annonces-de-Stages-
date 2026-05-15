import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import Offers from './pages/Offers';
import CreateOffer from './pages/CreateOffer';
import AdminDashboard from './pages/AdminDashboard';
import Apply from './pages/Apply';
import MyApplications from './pages/MyApplications';

import { useAuth } from './context/AuthContext';

function App() {
  function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<PrivateRoute><Offers /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-offer" element={<CreateOffer />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/apply/:offerId" element={<Apply />} />
        <Route path="/my-offers" element={<CreateOffer />} />
        <Route path="/my-applications" element={<MyApplications />} />
              </Routes>
    </BrowserRouter>
  );
}

export default App;