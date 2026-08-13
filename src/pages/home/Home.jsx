import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import MenubarComponent from '../../components/menubar/Menubar.jsx';
import BannerComponent from '../../components/banner/Banner.jsx';
import './Home.css';

export default function Home() {
    const navigate = useNavigate();
    const [hospitaisProximos, setHospitaisProximos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const fetchHospitaisProximos = async () => {
        setLoading(true);
        try {
            const hospitais = await HealthService.buscarProximos(-23.5505, -46.6333, 10, 8); // Busca 8 para ter 2 slides
            setHospitaisProximos(hospitais);
        } catch (error) {
            console.error('Erro ao buscar hospitais:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospitaisProximos();
    }, []);

    const handleVerTodos = () => {
        navigate('/agendamento');
    };

    // Agrupa hospitais em slides de 4
    const slides = [];
    for (let i = 0; i < hospitaisProximos.length; i += 4) {
        slides.push(hospitaisProximos.slice(i, i + 4));
    }

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <div className="app-page">
            <MenubarComponent />

            
            {/* Banner Section */}
            <div className="banner-section">
                <BannerComponent />
            </div>

            {/* Welcome Card */}
            <div className="content-container">
                <Card className="main-card">
                    <Card className="home-welcome-card">
                        <p className="welcome-text">
                            Sistema integrado com dados oficiais do CNES. 
                            Encontre hospitais, UBS e unidades de saúde com informações reais.
                        </p>

                        <Button 
                            label="Começar Agendamento" 
                            className="primary-button read-more-button"
                            onClick={() => navigate('/welcome')}
                        />
                    </Card>

                    {/* Hospitais Próximos Section - CARROSSEL */}
                    <div className="hospitais-section">
                        <div className="section-header">
                            <h4 className="home-section-title">
                                🏥 Hospitais por perto 
                                <span style={{fontSize: '0.8rem', color: '#666', marginLeft: '10px'}}>
                                    (Dados CNES)
                                </span>
                            </h4>

                            <Button 
                                label="Ver tudo" 
                                className="ver-tudo-button"
                                onClick={handleVerTodos}
                            />
                        </div>

                        {loading ? (
                            <div className="loading-hospitais">
                                <i className="pi pi-spin pi-spinner"></i>
                                <p>Carregando hospitais...</p>
                            </div>
                        ) : (
                            <div className="carrossel-container">
                                {slides.length > 1 && (
                                    <button className="carrossel-btn carrossel-btn-prev" onClick={prevSlide}>
                                        <i className="pi pi-chevron-left"></i>
                                    </button>
                                )}

                                <div className="carrossel-slide">
                                    {slides[currentSlide]?.map(hospital => (
                                        <Card key={hospital.codigo_cnes} className="hospital-card-carrossel">
                                            <div className="hospital-card-content">
                                                <h5>{hospital.nome_fantasia}</h5>
                                                <p className="hospital-info">
                                                    <strong>Município:</strong> {hospital.municipio_nome} - {hospital.uf_sigla}
                                                </p>
                                                <p className="hospital-info">
                                                    <strong>Natureza:</strong> {hospital.natureza_juridica}
                                                </p>
                                                <p className="hospital-info">
                                                    <strong>Status:</strong> 
                                                    <span className={`status ${hospital.status === 'ATIVO' ? 'ativo' : 'inativo'}`}>
                                                        {hospital.status}20
                                                    </span>
                                                </p>
                                                <p className="hospital-info">
                                                    <strong>CEP:</strong> {hospital.cep}
                                                </p>
                                                <div className="hospital-actions">
                                                    <Button 
                                                        label="Agendar" 
                                                        className="primary-button small-button"
                                                        onClick={() => navigate('/agendamento')}
                                                    />
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>

                                {slides.length > 1 && (
                                    <button className="carrossel-btn carrossel-btn-next" onClick={nextSlide}>
                                        <i className="pi pi-chevron-right"></i>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Indicadores do carrossel */}
                        {slides.length > 1 && (
                            <div className="carrossel-indicators">
                                {slides.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${index === currentSlide ? 'active' : ''}`}
                                        onClick={() => setCurrentSlide(index)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}