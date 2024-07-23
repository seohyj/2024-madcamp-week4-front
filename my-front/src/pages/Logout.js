// src/pages/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('kakaoId');
    navigate('/login');
  };

  return (
    <div>
      <h2>로그아웃 페이지</h2>
      <p>정말 로그아웃 하시겠습니까?</p>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Logout;
