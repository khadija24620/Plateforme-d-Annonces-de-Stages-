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

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}
function App() {
  function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/" />;
  return children;
}

function CompanyRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== 'company' && user.role !== 'admin') return <Navigate to="/" />;
  return children;
}
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                element={<PrivateRoute><Offers /></PrivateRoute>} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/create-offer"    element={<CompanyRoute><CreateOffer /></CompanyRoute>} />
        <Route path="/admin"           element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/apply/:offerId"  element={<PrivateRoute><Apply /></PrivateRoute>} />
        <Route path="/my-applications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;