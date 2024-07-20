// 메인 페이지
// 1) 뇌 UI -> 각 Brain Page
// 2) -> My Log
import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css'; // CSS 파일을 가져옵니다.

function Main() {
  return (
    <div className="main-container">
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
