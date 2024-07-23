// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import backgroundImage from '../assets/UI_images/LoginPage.png';

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

  /*return (
    <div>
      <h1>Login</h1>
      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleKakaoLogin}>카카오로 로그인하기</button>
      )}
    </div>
  );*/
  return (
    <Container>
      <BackgroundImage src={backgroundImage} />
      <LoginBox>
        <TextContainer>
          <Title>Boggle Boggle</Title>
          <Subtitle>Login with Kakao</Subtitle>
        </TextContainer>
        <LogInButton onClick={handleKakaoLogin}>
          <SignInText>Sign In</SignInText>
        </LogInButton>
      </LoginBox>
    </Container>
  );
};

export default Login;

// Styled Components

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(315deg, rgba(131.71, 131.71, 131.71, 0.80) 0%, rgba(169.45, 169.45, 169.45, 0.80) 50%, rgba(150.42, 150.42, 150.42, 0.80) 100%), 
              linear-gradient(0deg, rgba(235.37, 233.66, 255, 0.49) 0%, rgba(235.37, 233.66, 255, 0.49) 100%);
  background-image: url(${backgroundImage});
`;

const BackgroundImage = styled.img`
  width: 1920px;
  height: 1080px;
  left: 0;
  top: 0;
  position: no-repeat center center;
`;

const LoginBox = styled.div`
  width: 1026px;
  height: 596px;
  padding: 85px 90px;
  left: 447px;
  top: 242px;
  position: absolute;
  background: rgba(255, 255, 255, 0.10);
  border-radius: 40px;
  border: 3px solid white;
  backdrop-filter: blur(25px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  height: 180px;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  color: black;
  font-size: 65px;
  font-family: 'Avenir', sans-serif;
  font-weight: 900;
  word-wrap: break-word;
`;

const Subtitle = styled.div`
  text-align: center;
  color: black;
  font-size: 45px;
  font-family: 'Avenir', sans-serif;
  font-weight: 300;
  word-wrap: break-word;
`;

const LogInButton = styled.div`
  padding: 15px 220px;
  background: black;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SignInText = styled.div`
  color: white;
  font-size: 25px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  word-wrap: break-word;
`;