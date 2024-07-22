// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('kakaoId'));
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    if (kakaoId) {
      setIsLoggedIn(true);
      navigate('/main');
    }
  }, [navigate]);

  const handleKakaoLogin = () => {
    const clientId = '43981b4342c384f0da37c5299cf17d88';
    const redirectUri = 'http://localhost:3000/user/kakao/callback';
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl;
  };

  const handleLogout = () => {
    localStorage.removeItem('kakaoId');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <h1>Login</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleKakaoLogin}>카카오로 로그인하기</button>
      )}
    </div>
  );
};

export default Login;
