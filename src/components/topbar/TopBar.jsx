import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopBar.css';

export default function TopBar({ toggleTopBar }) {
  const navigate = useNavigate();

  return (
    <div>
      {/* Fundo escuro (clica fora fecha) */}
      <div className="overlay" onClick={toggleTopBar}></div>

      {/* Menu lateral com animação */}
      <div className="topbar-container slide-in">
        {/* Ícone de fechar */}
        <i
          className="pi pi-bars close-icon"
          onClick={toggleTopBar}
          title="Fechar menu"
        ></i>

        <div className="hero-section">
     

          <div className="icon-item" onClick={() => navigate('/agendamento')}>
            <div className="icon-circle">
              <i className="pi pi-heart"></i>
            </div>
            <span>Agendamento</span>
          </div>

          <div className="icon-item" onClick={() => navigate('/ubs')}>
            <div className="icon-circle">
              <i className="pi pi-building"></i>
            </div>
            <span>UBS</span>
          </div>

        {/* 
        <div className="icon-item" onClick={() => navigate('/perfil')}>
            <div className="icon-circle">
              <i className="pi pi-user-plus"></i>
            </div>
            <span>Perfil</span>
          </div>
        
         */}
        


          <div className="icon-item" onClick={() => navigate('/admin')}>
            <div className="icon-circle">
              <i className="pi pi-user-plus"></i>
            </div>
            <span>Admin</span>
          </div>

          <div className="icon-item" onClick={() => navigate('/sobre')}>
            <div className="icon-circle">
              <i className="pi pi-info-circle"></i>
            </div>
            <span>Sobre nós</span>
          </div>

          
        </div>
      </div>
    </div>
  );
}
