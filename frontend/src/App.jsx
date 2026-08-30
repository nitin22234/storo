import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Services from './pages/Services';
import Cities from './pages/Cities';
// import Events from './pages/Events';
import BecomePartner from './pages/BecomePartner';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import FindStorage from './pages/FindStorage';
import Profile from './pages/Profile';
import PartnerDashboard from './pages/PartnerDashboard';
import PaymentBilling from './pages/PaymentBilling';
import Notifications from './pages/Notifications';
import Locations from './pages/Locations';
import Support from './pages/Support';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Animated Routes Wrapper with AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<PageTransition><Home /></PageTransition>} />
        <Route path='/about-us' element={<PageTransition><AboutUs /></PageTransition>} />
        <Route path='/services' element={<PageTransition><Services /></PageTransition>} />
        <Route path='/cities' element={<PageTransition><Cities /></PageTransition>} />
        <Route path='/find-storage' element={<PageTransition><FindStorage /></PageTransition>} />
        {/* <Route path='/events' element={<PageTransition><Events /></PageTransition>} /> */}
        <Route path='/become-partner' element={<PageTransition><BecomePartner /></PageTransition>} />
        <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
        <Route path='/signup' element={<PageTransition><Signup /></PageTransition>} />
        <Route path='/forgot-password' element={<PageTransition><ForgotPassword /></PageTransition>} />
        <Route path='/reset-password/:token' element={<PageTransition><ResetPassword /></PageTransition>} />
        <Route path='/booking' element={<ProtectedRoute><PageTransition><Booking /></PageTransition></ProtectedRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><PageTransition><Dashboard /></PageTransition></ProtectedRoute>} />
        <Route path='/partner-dashboard' element={<ProtectedRoute><PageTransition><PartnerDashboard /></PageTransition></ProtectedRoute>} />
        <Route path='/admin-dashboard' element={<ProtectedRoute><PageTransition><AdminDashboard /></PageTransition></ProtectedRoute>} />
        <Route path='/profile' element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
        <Route path='/payment-billing' element={<ProtectedRoute><PageTransition><PaymentBilling /></PageTransition></ProtectedRoute>} />
        <Route path='/notifications' element={<ProtectedRoute><PageTransition><Notifications /></PageTransition></ProtectedRoute>} />
        <Route path='/locations' element={<PageTransition><Locations /></PageTransition>} />
        <Route path='/support' element={<PageTransition><Support /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
