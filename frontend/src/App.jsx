import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Offers from './pages/Offers'
import CreateOffer from './pages/CreateOffer'
import AdminDashboard from './pages/AdminDashboard'
import Apply from './pages/Apply'
import MyApplications from './pages/MyApplications'
import MyOffers from './pages/MyOffers'
import { useAuth } from './context/AuthContext'

const NO_NAV_ROUTES = ['/login', '/register']

function Layout() {
  const location = useLocation()
  const showNav = !NO_NAV_ROUTES.includes(location.pathname)
  return <>{showNav && <Navbar />}</>
}

function PrivateRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'admin') return <Navigate to="/" />
  return children
}

function CompanyRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'company' && user.role !== 'admin') return <Navigate to="/" />
  return children
}

function StudentRoute({ children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.role !== 'student') return <Navigate to="/" />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/"                element={<PrivateRoute><Offers /></PrivateRoute>} />
        <Route path="/create-offer"    element={<CompanyRoute><CreateOffer /></CompanyRoute>} />
        <Route path="/admin"           element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/apply/:offerId"  element={<StudentRoute><Apply /></StudentRoute>} />
        <Route path="/my-applications" element={<StudentRoute><MyApplications /></StudentRoute>} />
        <Route path="/my-offers"       element={<CompanyRoute><MyOffers /></CompanyRoute>} />
        {/* Redirect inconnu */}
        <Route path="*"                element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App