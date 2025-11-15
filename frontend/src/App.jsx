import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutPage from './pages/LayoutPage'
import ProfilePage from './pages/ProfilePage'
import ReviewPage from './pages/ReviewPage'
import Homepage from './pages/Homepage'
import SearchPage from './pages/SearchPage'
import { jwtDecode } from 'jwt-decode'

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const expiry = decoded.exp * 1000; // convert to ms
        const timeout = expiry - Date.now();

        if (timeout > 0) {
          setTimeout(() => {
            localStorage.removeItem('token');
            toast.info("Session expired. Please login again.");
            window.location.reload(); // or navigate to login
          }, timeout);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        localStorage.removeItem('token'); // invalid token
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LayoutPage />}>
          <Route index element={<Homepage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="review" element={<ReviewPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
