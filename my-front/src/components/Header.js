import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImage from '../assets/UI_images/brainLogo.png';

const HeaderContainer = styled.div`
  width: 100%;
  height: 7vh;
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
  width: 49px;
  height: 49px;
`;

const Title = styled.div`
  font-size: 23px;
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
  font-size: 15px;
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

  //Header export 할 때 이거 넣어줘야함.

  /*const handleLogout = () => {
    // 로컬 저장소에서 kakaoId 삭제
    localStorage.removeItem('kakaoId');

    // 카카오 로그아웃 API 호출
    const clientId = '43981b4342c384f0da37c5299cf17d88'; // 여기에 클라이언트 ID를 입력하세요
    const redirectUri = 'http://localhost:3000/login'; // 로그아웃 후 리디렉션할 URL
    const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${redirectUri}`;
    window.location.href = kakaoLogoutUrl;
  };*/
