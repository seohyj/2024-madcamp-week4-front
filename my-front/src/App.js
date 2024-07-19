import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import MyLog from './pages/MyLog';
import WriteDiary from './pages/WriteDiary';
import Amygd from './pages/Brain/amygd';
import Basal from './pages/Brain/basal';
import Frontal from './pages/Brain/frontal';
import Hippo from './pages/Brain/hippo';
import Medial from './pages/Brain/medial';
import ScrollToTop from './components/ScrollToTop';
import './App.css';

const logo = '/logo192.png';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav>
            <ul>
              <li><Link to="/">Main</Link></li>
              <li><Link to="/mylog">My Log</Link></li>
              <li><Link to="/brain/amygd">Amygdala</Link></li>
              <li><Link to="/brain/basal">Basal</Link></li>
              <li><Link to="/brain/frontal">Frontal</Link></li>
              <li><Link to="/brain/hippo">Hippocampus</Link></li>
              <li><Link to="/brain/medial">Medial</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mylog" element={<MyLog />} />
            <Route path="/writediary" element={<WriteDiary />} />
            <Route path="/brain/amygd" element={<Amygd />} />
            <Route path="/brain/basal" element={<Basal />} />
            <Route path="/brain/frontal" element={<Frontal />} />
            <Route path="/brain/hippo" element={<Hippo />} />
            <Route path="/brain/medial" element={<Medial />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
