// 기저핵
import React from 'react';
import axios from 'axios';
import backgroundImage from '../../assets/UI_images/LoginPage.png'
import Header from '../../components/Header';
import styled from 'styled-components';

function Basal() {
  return (
    <div>
      <Container>
        <Header />
      <h1>Basal Ganglia Page</h1>
      <p>기저핵</p>
      </Container>
    </div>
  );
}

export default Basal;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1)), url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

