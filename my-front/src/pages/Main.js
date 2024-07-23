// src/pages/Main.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const [kakaoId, setKakaoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (!storedKakaoId) {
      navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
    } else {
      setKakaoId(storedKakaoId);
    }
  }, [navigate]);

  return (
    <div className="main-container">
      
      <main>
        <h1>Main Page</h1>
        <ul>
          <li><Link to="/mylog">My Log</Link></li>
          <li><Link to="/brain/frontal">Frontal Lobe</Link></li>
          <li><Link to="/brain/hippo">Hippocampus</Link></li>
          <li><Link to="/brain/amygd">Amygdaloid</Link></li>
          <li><Link to="/brain/basal">Basal Ganglia</Link></li>
          <li><Link to="/brain/medial">Medial</Link></li>
        </ul>
      </main>
    </div>
  );
}

export default Main;
