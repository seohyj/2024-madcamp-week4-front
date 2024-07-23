import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImage from '../assets/UI_images/brainLogo.png';

const HeaderContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  //background-color: coral;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 50px;
  padding-right: 50px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: fit-content;
  //background-color: aliceblue;
  gap: 20px;
  align-items: center;

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
  margin-right: 50px;
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
  font-weight: 800;
  line-height: 24px;
`;

const Header = ({ handleLogout }) => {
    return (
      <HeaderContainer>
        <LogoContainer>
            <LogoLink to="/Main">
            <Logo src={logoImage} alt="Logo" />
            </LogoLink>
            <Title>Boggle Boggle</Title>
        </LogoContainer>
        <LogoutButton onClick={handleLogout}>
          <LogoutText>Log Out</LogoutText>
        </LogoutButton>
      </HeaderContainer>
    );
  };
  
  export default Header;
