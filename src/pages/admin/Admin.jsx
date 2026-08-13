import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom'
import MenubarComponent from '../../components/menubar/Menubar.jsx';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { Toast } from 'primereact/toast';
import "./Admin.css";

export default function Admin() {
  const navigate = useNavigate()
  const usuarioMenu = useRef(null)
  const nivelAcessoMenu = useRef(null)
  const toast = useRef(null)

  const [showUsuarioMenu, setShowUsuarioMenu] = useState(false)
  const [showNivelAcessoMenu, setShowNivelAcessoMenu] = useState(false)

  const usuarioMenuItems = [
    {
      label: 'Novo Usuário',
      icon: 'pi pi-user-plus',
      command: () => {
        navigate('/usuarioNew')
      }
    },
    {
      label: 'Listar Usuários',
      icon: 'pi pi-list',
      command: () => {
        navigate('/usuarioList')
      }
    }
  ]

  const nivelAcessoMenuItems = [
    {
      label: 'Novo Nível de Acesso',
      icon: 'pi pi-plus',
      command: () => {
        navigate('/nivelAcessoNew')
      }
    },
    {
      label: 'Listar Níveis de Acesso',
      icon: 'pi pi-list',
      command: () => {
        navigate('/nivelAcessoList')
      }
    }
  ]

  // Fecha os menus quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (usuarioMenu.current && !usuarioMenu.current.contains(event.target)) {
        setShowUsuarioMenu(false)
      }
      if (nivelAcessoMenu.current && !nivelAcessoMenu.current.contains(event.target)) {
        setShowNivelAcessoMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div id="containerAdmin">
      <MenubarComponent />
      <Toast ref={toast} />
      <div id="divContainerAdmin">
        <div id="botoesAdmin">
          
          {/* Botão Usuário com Hover Menu */}
          <div 
            className="menu-container"
            ref={usuarioMenu}
            onMouseEnter={() => setShowUsuarioMenu(true)}
            onMouseLeave={() => setShowUsuarioMenu(false)}
          >
            <Button 
              label="Usuário" 
              icon="pi pi-users" 
              className="p-button-primary menu-button" 
              onClick={() => navigate('/usuarioList')}
            />
            {showUsuarioMenu && (
              <div className="custom-menu">
                {usuarioMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="menu-item"
                    onClick={item.command}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botão Nível de Acesso com Hover Menu */}
          <div 
            className="menu-container"
            ref={nivelAcessoMenu}
            onMouseEnter={() => setShowNivelAcessoMenu(true)}
            onMouseLeave={() => setShowNivelAcessoMenu(false)}
          >
            <Button 
              label="Nível de Acesso" 
              icon="pi pi-shield" 
              className="p-button-help menu-button" 
              onClick={() => navigate('/nivelAcessoList')}
            />
            {showNivelAcessoMenu && (
              <div className="custom-menu">
                {nivelAcessoMenuItems.map((item, index) => (
                  <div
                    key={index}
                    className="menu-item"
                    onClick={item.command}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}