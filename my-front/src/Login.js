// src/Login.js
import React from 'react';

function Login() {
  const handleKakaoLogin = () => {
    window.location.href = 'https://kauth.kakao.com/oauth/authorize?client_id=43981b4342c384f0da37c5299cf17d88&redirect_uri=http://localhost:3000/user/kakao/callback&response_type=code';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <button onClick={handleKakaoLogin}>Login with Kakao</button>
    </div>
  );
}

export default Login;
