import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './Menubar.css';
import TopBar from '../topbar/TopBar.jsx';

export default function Menubar() {
  const navigate = useNavigate();
  const [isTopBarVisible, setTopBarVisible] = useState(false);

  const toggleTopBar = () => {
    setTopBarVisible(!isTopBarVisible);
};

  return (
    <header className="menubar-container">
      {/* Logo (leva à Home) */}
      <div className="logo" onClick={() => navigate('/home')}>
        <img src="a.png" alt="Logo" className="logo-img" />
      </div>

      {/* Ícone para abrir menu lateral */}
      <i
        className="pi pi-bars menu-icon"
        onClick={toggleTopBar}
        title="Abrir menu"
        style={{ display: isTopBarVisible ? 'none' : 'inline-block' }}
      ></i>

      {/* TopBar lateral */}
      {isTopBarVisible && <TopBar toggleTopBar={toggleTopBar} />}
    </header>
  );
}
