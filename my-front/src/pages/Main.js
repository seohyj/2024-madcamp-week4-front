// src/pages/Main.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Main.css'; // CSS 파일을 가져옵니다.
import styled from 'styled-components';

import backgroundImage from '../assets/UI_images/MyLog.png';
import brainImage from '../assets/buttons/Pink brain.png';
import basalImage from '../assets/buttons/basal.png';
import amygdImage from '../assets/buttons/amygl.png';
import hippoImage from '../assets/buttons/hippo.png';
import frontalImage from '../assets/buttons/frontal.png';
import medialImage from '../assets/buttons/medial.png';


import Header from '../components/Header';


function Main() {
  const [kakaoId, setKakaoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedKakaoId = localStorage.getItem('kakaoId');
    if (!storedKakaoId) {
      // navigate('/login'); // 로그인되지 않은 경우 로그인 페이지로 리디렉션
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
      <Container>
        <Header /*handleLogout={handleLogout}*/ />
        <LinkBox to="/mylog" className="brain-position">
          <img src={brainImage} alt="Brain" />
        </LinkBox>
        <LinkBox to="/brain/basal" className="basal-ganglia">
          <img src={basalImage} alt="Basal Ganglia" />
        </LinkBox>
        <LinkBox to="/brain/amygd" className="amygdala">
          <img src={amygdImage} alt="Amygdala" />
        </LinkBox>
        <LinkBox to="/brain/hippo" className="hippo">
          <img src={hippoImage} alt="Hippocampus" />
        </LinkBox>
        <LinkBox to="/brain/frontal" className="frontal-lobe">
          <img src={frontalImage} alt="Frontal Lobe" />
        </LinkBox>
        <LinkBox to="/brain/medial" className="medial">
          <img src={medialImage} alt="medial" />
        </LinkBox>
      </Container>
    </div>
  );
}

export default Main;

// Styled components

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)), 
    url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*const Header = styled.div`
  width: 100%;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 59px;
  height: 59px;
`;

const Title = styled.div`
  font-size: 25px;
  font-family: 'Avenir', sans-serif;
  font-weight: 900;
  line-height: 24px;
  color: black;
`;

const LogoutButton = styled.button`
  padding: 14px 20px;
  background: white;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
`;

const LogoutText = styled.div`
  color: #151515;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  line-height: 24px;
`;*/

const LinkBox = styled(Link)`
  position: absolute;
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: black;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: 200;
  word-wrap: break-word;
  cursor: pointer;
  text-decoration: none;

  &.brain-position {
    // 뇌
    left: center;
    bottom: 350px;
    position: center;
    width: 40%;
    height: 40%;

  }

  &.hippo {
    // 해마
    left: 400px;
    bottom: 390px;
    width: 115px;
    height: 118px;
  }

  &.basal-ganglia {
    // 기저핵
    left: 550px;
    bottom: 230px;
    width: 77px;
    height: 79px;
  }

  &.frontal-lobe {
    // 전두엽
    position: center;
    bottom: 180px;
    width: 114px;
    height: 117px;
  }

  &.amygdala {
    // 편도체
    right: 600px;
    bottom: 230px;
    width: 87px;
    height: 89px;
  }

  &.medial {
    // 내측 측두엽
    right: 400px;
    bottom: 395px;
    width: 114px;
    height: 117px;
  }

  img {
    width: 133%;
    height: 133%;
    object-fit: contain;
  }

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
`;