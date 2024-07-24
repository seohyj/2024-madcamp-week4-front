// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
import Login from './pages/Login'; // Login 경로 수정
import Logout from './pages/Logout'; // Logout 경로 수정
import KakaoCallback from './KakaoCallback'; // KakaoCallback 페이지 추가

//const logo = '/logo192.png';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header className="App-header">
          <nav>
            <ul>
              <li><Link to="/">Main</Link></li>
              <li><Link to="/main">Main</Link></li> {/* Main 링크 추가 */}
              <li><Link to="/mylog">My Log</Link></li>
              <li><Link to="/brain/amygd">Amygdala</Link></li>
              <li><Link to="/brain/basal">Basal</Link></li>
              <li><Link to="/brain/frontal">Frontal</Link></li>
              <li><Link to="/brain/hippo">Hippocampus</Link></li>
              <li><Link to="/brain/medial">Medial</Link></li>
              <li><Link to="/login">Login</Link></li> {/* Login 링크 추가 */}
              <li><Link to="/logout">Logout</Link></li> {/* Logout 링크 추가 */}
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} /> {/* Main 라우트 추가 */}
            <Route path="/mylog" element={<MyLog />} />
            <Route path="/writediary" element={<WriteDiary />} />
            <Route path="/brain/amygd" element={<Amygd />} />
            <Route path="/brain/basal" element={<Basal />} />
            <Route path="/brain/frontal" element={<Frontal />} />
            <Route path="/brain/hippo" element={<Hippo />} />
            <Route path="/brain/medial" element={<Medial />} />
            <Route path="/login" element={<Login />} /> {/* Login 라우트 추가 */}
            <Route path="/logout" element={<Logout />} /> {/* Logout 라우트 추가 */}
            <Route path="/user/kakao/callback" element={<KakaoCallback />} /> {/* KakaoCallback 라우트 추가 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
