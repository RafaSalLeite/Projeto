// src/components/home/Sobre.jsx
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Tag } from 'primereact/tag';
import MenubarComponent from "../../components/menubar/Menubar.jsx";
import { useNavigate } from 'react-router-dom';
import './Sobre.css';

export default function Sobre() {
    const navigate = useNavigate();
    
    const features = [
        { icon: "pi pi-database", text: "Dados Oficiais do CNES" },
        { icon: "pi pi-map-marker", text: "Localização Precisa" },
        { icon: "pi pi-clock", text: "Agendamento Digital" },
        { icon: "pi pi-shield", text: "Informações Verificadas" }
    ];

    const FeatureBadge = ({ feature }) => (
        <div className="feature-badge" key={feature.text}>
            <i className={feature.icon}></i>
            <span>{feature.text}</span>
        </div>
    );

    return (
        <div className="app-page">
            <MenubarComponent />

            <div className="content-container">
                {/* Hero Section */}
                <Card className="hero-card">
                    <div className="hero-content">
                        <div className="hero-text">
                            <Badge value="ODS 3 - Saúde e Bem-Estar" className="ods-badge"></Badge>
                            <h1 className="hero-title">Sobre o MedScan</h1>
                            <p className="hero-subtitle">
                                Transformando o acesso à saúde através da tecnologia
                            </p>
                        </div>
                        <div className="hero-graphic">
                            <div className="floating-elements">
                                <div className="floating-card card-1">
                                    <i className="pi pi-heart"></i>
                                    <span> Saúde</span>
                                </div>
                                <div className="floating-card card-2">
                                    <i className="pi pi-mobile"></i>
                                    <span> Acesso</span>
                                </div>
                                <div className="floating-card card-3">
                                    <i className="pi pi-shield"></i>
                                    <span> Confiança</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Missão Section */}
                <Card className="mission-card">
                    <div className="mission-header">
                        <i className="pi pi-bullseye mission-icon"></i>
                        <h2>Nossa Missão</h2>
                    </div>
                    <Divider />
                    <div className="mission-content">
                        <p className="mission-text">
                            O MedScan nasceu com a missão de tornar o acesso à informação em saúde mais simples, 
                            confiável e transparente. Integrado diretamente aos dados oficiais do CNES, nosso 
                            sistema oferece uma pesquisa precisa de hospitais, UBS e diversas unidades de saúde 
                            em todo o país.
                        </p>
                        
                        <div className="features-grid">
                            {features.map((feature, index) => (
                                <FeatureBadge feature={feature} key={index} />
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Valores Section */}
                <Card className="values-card">
                    <h2>No Que Acreditamos</h2>
                    <div className="values-grid">
                        <div className="value-item">
                            <div className="value-icon">
                                <i className="pi pi-search"></i>
                            </div>
                            <h4>Transparência</h4>
                            <p>Acreditamos que encontrar atendimento não deve ser difícil. Por isso, reunimos em um único lugar dados atualizados, completos e verificados, ajudando cidadãos, profissionais e gestores a tomarem decisões mais seguras.</p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">
                                <i className="pi pi-users"></i>
                            </div>
                            <h4>Acesso Universal</h4>
                            <p>Trabalhamos para que cada pessoa tenha acesso rápido e real às informações de que precisa — porque saúde começa com clareza.</p>
                        </div>
                        <div className="value-item">
                            <div className="value-icon">
                                <i className="pi pi-thumbs-up"></i>
                            </div>
                            <h4>Simplicidade</h4>
                            <p>Construímos uma plataforma voltada para o agendamento digital, buscando facilitar o acesso à saúde e reduzir a sobrecarga em atendimentos presenciais.</p>
                        </div>
                    </div>
                </Card>

                {/* CTA Section */}
                <Card className="cta-card">
                    <div className="cta-content">
                        <h2>Pronto para Começar?</h2>
                        <p>Agende sua consulta de forma simples e rápida</p>
                        <Button 
                            label="Começar Agendamento" 
                            className="primary-button cta-button"
                            icon="pi pi-calendar"
                            onClick={() => navigate('/welcome')}
                        />
                    </div>
                </Card>
            </div>
        </div>
    );
}