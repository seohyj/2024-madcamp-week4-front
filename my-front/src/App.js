// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import Main from './pages/Main';
import MyLog from './pages/MyLog';
import WriteDiary from './pages/WriteDiary';
import Amygd from './pages/Brain/amygd';
import Basal from './pages/Brain/basal';
import Frontal from './pages/Brain/frontal';
import Hippo from './pages/Brain/hippo';
import Medial from './pages/Brain/medial';
import ScrollToTop from './components/ScrollToTop';
import './App.css';
import Login from './pages/Login';
import KakaoCallback from './KakaoCallback';

const logo = '/logo192.png';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kakaoId');
    navigate('/login');
  };

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <nav>
        <ul>
          <li><Link to="/main">Main</Link></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<><Header /><Main /></>} />
          <Route path="/mylog" element={<><Header /><MyLog /></>} />
          <Route path="/writediary" element={<><Header /><WriteDiary /></>} />
          <Route path="/brain/amygd" element={<><Header /><Amygd /></>} />
          <Route path="/brain/basal" element={<><Header /><Basal /></>} />
          <Route path="/brain/frontal" element={<><Header /><Frontal /></>} />
          <Route path="/brain/hippo" element={<><Header /><Hippo /></>} />
          <Route path="/brain/medial" element={<><Header /><Medial /></>} />
          <Route path="/user/kakao/callback" element={<KakaoCallback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
