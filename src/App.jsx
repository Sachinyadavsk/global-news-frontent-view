import React from 'react'
import Navbar from './component/layout/Navbar';
import { Routes, Route, useLocation } from "react-router-dom";
import Register from './component/pages/Register';
import Home from './component/pages/Home';
import Login from './component/pages/Login.jsx';
import Contact from './component/pages/Contact.jsx';
import ClientApp from "./client-dashboard/App";
import AdminApp from "./admin-dashboard/App";
import ProtectedRoute from "./shared/ProtectedRoute.jsx";
import AdminRoute from "./shared/AdminRoute.jsx";
import About from './component/pages/About.jsx';
import DetailsPost from './component/pages/DetailsPost.jsx';
import Footer from './component/pages/Footer.jsx';
import News from './component/pages/News.jsx';
import CategoryPage from './component/pages/CategoryPage.jsx';

const App = () => {
  const location = useLocation();

  // Hide navbar on admin & dashboard
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news/:slug" element={<DetailsPost />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        
        {/* Client */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <ClientApp />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminApp />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
