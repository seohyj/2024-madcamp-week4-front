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


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로컬 저장소에서 kakaoId 삭제
    localStorage.removeItem('kakaoId');

    // 카카오 로그아웃 API 호출
    const clientId = '43981b4342c384f0da37c5299cf17d88'; // 여기에 클라이언트 ID를 입력하세요
    const redirectUri = 'http://localhost:3000/login'; // 로그아웃 후 리디렉션할 URL
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`;
    window.location.href = kakaoLogoutUrl;
  };
  return (
    <header className="App-header">
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
