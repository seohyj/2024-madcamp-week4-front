// src/pages/Main.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Main.css'; // CSS 파일을 가져옵니다.

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

  const handleLogout = () => {
    localStorage.removeItem('kakaoId');
    setKakaoId(null);
    navigate('/login');
  };

  return (
    <div className="main-container">
      <header>
        <nav>
          <ul>
            {kakaoId ? (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className="link-box">
        <Link to="/mylog">My Log</Link>
      </div>
      <div className="link-box">
        <Link to="/brain/frontal">Frontal Lobe</Link>
      </div>
      <div className="link-row">
        <div className="link-box">
          <Link to="/brain/hippo">Hippocampus</Link>
        </div>
        <div className="link-box">
          <Link to="/brain/amygd">Amygdaloid</Link>
        </div>
      </div>
      <div className="link-row">
        <div className="link-box">
          <Link to="/brain/hippo">Hippocampus</Link>
        </div>
        <div className="link-box">
          <Link to="/brain/basal">Basal Ganglia</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
