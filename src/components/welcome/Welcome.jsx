import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import './Welcome.css';

function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/cadastro');
  };

  return (
    <div className="page-container"> 
      <Card className="form-card">
        <div className="welcome-logo-container">
          <Image 
            src="./a.png" 
            alt="MEDSCAN" 
            width="120" 
            height="auto"
          />
        </div>

        <div className="welcome-text-container">
          <h1 className="welcome-title">
            Vamos dar início ao login!
          </h1>
          <p className="welcome-subtitle">
            Agende consultas em poucos cliques
          </p>
        </div>

        <div className="buttons-container">
          <Button 
            label="Login" 
            onClick={handleLogin}
            className="login-btn-primary p-button-rounded"
          />
          <Button 
            label="Cadastre-se" 
            onClick={handleRegister}
            className="register-btn-outline p-button-rounded p-button-outlined"
          />
        </div>
      </Card>
    </div>
  );
}

export default Welcome;