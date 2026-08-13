import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';
import { Slider } from 'primereact/slider';
import { Calendar } from 'primereact/calendar';
import { AutoComplete } from 'primereact/autocomplete';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import './Agendamento.css';
import MenubarComponent from "../../components/menubar/Menubar.jsx";

export default function Agendamento() {
    const stepperRef = useRef(null);
    const location = useLocation();
    const ubsSelecionada = location.state?.ubs || null;

    // Estado consolidado com pré-seleção da UBS
    const [agendamentoData, setAgendamentoData] = useState({
        unidadeSaude: ubsSelecionada || null,
        tipoConsulta: null,
        queixa: '',
        sintomas: [],
        nivelDor: 0,
        data: null,
        hora: null
    });

    const [unidades, setUnidades] = useState([]);
    const [tiposConsulta, setTiposConsulta] = useState([]);
    const [filteredUnidades, setFilteredUnidades] = useState([]);
    const [sintomasOptions, setSintomasOptions] = useState([]);

    // Carregar dados iniciais
    useEffect(() => {
        fetchUnidades();
        fetchTiposConsulta();
        fetchSintomas();
    }, []);

    // Atualizar unidade quando vier da UBS
    useEffect(() => {
        if (ubsSelecionada) {
            setAgendamentoData(prev => ({
                ...prev,
                unidadeSaude: {
                    nome: ubsSelecionada.nome,
                    cnes: ubsSelecionada.cnes,
                    endereco: ubsSelecionada.endereco,
                    cidade: ubsSelecionada.cidade,
                    uf: ubsSelecionada.uf,
                    tiposConsulta: ubsSelecionada.tiposConsulta || []
                }
            }));
        }
    }, [ubsSelecionada]);

    const fetchUnidades = async () => {
        try {
            const response = await fetch("/unidades.json");
            if (!response.ok) throw new Error("Erro ao buscar unidades");
            const data = await response.json();
            setUnidades(data.unidadesSaude || []);
        } catch (error) {
            console.error("Erro ao buscar unidades:", error);
        }
    };

    const fetchTiposConsulta = async () => {
        try {
            const response = await fetch("/unidades.json");
            if (!response.ok) throw new Error("Erro ao buscar tipos de consulta");
            const data = await response.json();
            setTiposConsulta(data.tiposConsulta || []);
        } catch (error) {
            console.error("Erro ao buscar tipos de consulta:", error);
        }
    };

    // AutoComplete normal para quem entra direto
    const searchUnidades = (event) => {
        setTimeout(() => {
            const filtered = unidades.filter(unidade => 
                unidade.nome.toLowerCase().includes(event.query.toLowerCase()) ||
                (unidade.endereco && unidade.endereco.toLowerCase().includes(event.query.toLowerCase()))
            );
            setFilteredUnidades(filtered);
        }, 250);
    };

    const updateAgendamentoData = (newData) => {
        setAgendamentoData(prev => ({ ...prev, ...newData }));
    };

    const handleFinalizarAgendamento = async () => {
        try {
            // Combinar data e hora em um único objeto Date
            let dataHoraCompleta = null;
            if (agendamentoData.data && agendamentoData.hora) {
                const data = new Date(agendamentoData.data);
                const hora = new Date(agendamentoData.hora);
                data.setHours(hora.getHours());
                data.setMinutes(hora.getMinutes());
                dataHoraCompleta = data;
            }

            // Simulação de dados para API Spring
            const dadosAgendamento = {
                unidadeId: agendamentoData.unidadeSaude?.cnes,
                tipoConsultaId: agendamentoData.tipoConsulta?.id,
                queixa: agendamentoData.queixa,
                sintomas: agendamentoData.sintomas,
                nivelDor: agendamentoData.nivelDor,
                dataHora: dataHoraCompleta
            };

            console.log('Dados para API Spring:', dadosAgendamento);
            alert('Agendamento realizado com sucesso!');
            
        } catch (error) {
            console.error('Erro ao criar agendamento:', error);
            alert('Erro ao realizar agendamento');
        }
    };

    const fetchSintomas = async () => {
        try {
            const response = await fetch("/sintomas.json");
            if (!response.ok) throw new Error("Erro ao buscar sintomas");
            const data = await response.json();
            setSintomasOptions(data.sintomas || []);
        } catch (error) {
            console.error("Erro ao carregar sintomas:", error);
        }
    };

    const handleSintomaChange = (sintomaValue) => {
        const updatedSintomas = agendamentoData.sintomas.includes(sintomaValue)
            ? agendamentoData.sintomas.filter((s) => s !== sintomaValue)
            : [...agendamentoData.sintomas, sintomaValue];
        updateAgendamentoData({ sintomas: updatedSintomas });
    };

    // Filtra tipos de consulta baseado na unidade selecionada
    const tiposDisponiveis = agendamentoData.unidadeSaude?.tiposConsulta 
        ? tiposConsulta.filter(tipo => 
              agendamentoData.unidadeSaude.tiposConsulta.includes(tipo.id))
        : [];

    return (
        <div className="app-page">
            <MenubarComponent />
            <div className="content-container">
                <Card className="agendamento-container">
                    <Stepper ref={stepperRef} className="custom-stepper" linear>
                        {/* STEP 1 - AGENDAR CONSULTA */}
                        <StepperPanel header="Agendar Consulta">
                            <div className="step-content">
                                <div className="step-header">
                                    <h2>Agendar consulta</h2>
                                    {ubsSelecionada && (
                                        <div className="ubs-pre-selecionada-info">
                                            <i className="pi pi-info-circle mr-2"></i>
                                            Unidade pré-selecionada da lista de UBS
                                        </div>
                                    )}
                                </div>

                                <div className="form-section">
                                    <label>UNIDADE DE SAÚDE</label>
                                    
                                    {ubsSelecionada ? (
                                        // Modo UBS: Campo fixo e informativo
                                        <div>
                                            <InputText
                                                value={agendamentoData.unidadeSaude?.nome}
                                                className="w-full"
                                                disabled
                                            />
                                            <small className="text-primary block mt-1">
                                                {agendamentoData.unidadeSaude?.endereco} - {agendamentoData.unidadeSaude?.cidade}
                                            </small>
                                        </div>
                                    ) : (
                                        // Modo normal: AutoComplete completo
                                        <AutoComplete
                                            value={agendamentoData.unidadeSaude}
                                            suggestions={filteredUnidades}
                                            completeMethod={searchUnidades}
                                            onChange={(e) => {
                                                updateAgendamentoData({ 
                                                    unidadeSaude: e.value,
                                                    tipoConsulta: null
                                                });
                                            }}
                                            field="nome"
                                            placeholder="Digite o nome da unidade..."
                                            className="w-full"
                                            forceSelection
                                            itemTemplate={(item) => (
                                                <div className="flex flex-column">
                                                    <div className="font-bold">{item.nome}</div>
                                                    <div className="text-sm">{item.endereco}</div>
                                                    <div className="text-sm text-color-secondary">
                                                        {item.cidade} - {item.uf}
                                                    </div>
                                                </div>
                                            )}
                                        />
                                    )}
                                </div>

                                <div className="form-section">
                                    <label>TIPO DE CONSULTA</label>
                                    <Dropdown
                                        value={agendamentoData.tipoConsulta}
                                        onChange={(e) => updateAgendamentoData({ tipoConsulta: e.value })}
                                        options={tiposDisponiveis}
                                        optionLabel="nome"
                                        placeholder={agendamentoData.unidadeSaude ? "Selecione o tipo" : "Selecione uma unidade primeiro"}
                                        className="w-full"
                                        disabled={!agendamentoData.unidadeSaude}
                                    />
                                </div>

                                <div className="form-section">
                                    <label>QUEIXA PRINCIPAL</label>
                                    <InputTextarea
                                        value={agendamentoData.queixa}
                                        onChange={(e) => updateAgendamentoData({ queixa: e.target.value })}
                                        placeholder="Descreva sua queixa principal"
                                        className="w-full"
                                        rows={4}
                                        autoResize
                                    />
                                </div>
                            </div>
                            <div className="step-actions">
                                <Button 
                                    label="Cancelar" 
                                    icon="pi pi-times"
                                    className="p-button-text" 
                                    onClick={() => window.history.back()} 
                                />
                                <Button 
                                    label="Próximo" 
                                    icon="pi pi-arrow-right" 
                                    iconPos="right"
                                    onClick={() => stepperRef.current.nextCallback()}
                                    disabled={!agendamentoData.unidadeSaude || !agendamentoData.tipoConsulta || !agendamentoData.queixa}
                                />
                            </div>
                        </StepperPanel>

                        {/* STEP 2 - SINTOMAS */}
                        <StepperPanel header="Busca Ativa">
                            <div className="step-content">

                            <div className="form-section">
  <label>SINTOMAS</label>
  <div className="sintomas-grid">
    {sintomasOptions.map(sintoma => (
      <div key={sintoma.value} className="sintoma-item">
        <Checkbox
          inputId={sintoma.value}
          checked={agendamentoData.sintomas.includes(sintoma.value)}
          onChange={() => handleSintomaChange(sintoma.value)}
        />
        <label htmlFor={sintoma.value} className="ml-2">
          {sintoma.label}
        </label>
      </div>
    ))}
  </div>
</div>    <div className="form-section">
                                    <label>NÍVEL DE DOR (Escala 1-10)</label>
                                    <div className="pain-level-container">
                                        <Slider
                                            value={agendamentoData.nivelDor}
                                            onChange={(e) => updateAgendamentoData({ nivelDor: e.value })}
                                            min={1}
                                            max={10}
                                            step={1}
                                            className="w-full"
                                        />
                                        <div className="pain-labels">
                                            <span>1 - Leve</span>
                                            <span>5 - Moderada</span>
                                            <span>10 - Intensa</span>
                                        </div>
                                        {agendamentoData.nivelDor > 0 && (
                                            <div className="current-pain-level">
                                                Nível atual: <strong>{agendamentoData.nivelDor}/10</strong>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="step-actions">
                                <Button 
                                    label="Voltar" 
                                    icon="pi pi-arrow-left"
                                    className="p-button-secondary" 
                                    onClick={() => stepperRef.current.prevCallback()} 
                                />
                                <Button 
                                    label="Próximo" 
                                    icon="pi pi-arrow-right" 
                                    iconPos="right"
                                    onClick={() => stepperRef.current.nextCallback()}
                                />
                            </div>
                        </StepperPanel>

                        {/* STEP 3 - CONFIRMAR DADOS */}
                        <StepperPanel header="Confirmar Dados">
                            <div className="step-content">
                                <div className="step-header">
                                    <p>Revise todas as informações antes de confirmar</p>
                                </div>

                                <div className="confirm-section">
                                    <h4>DADOS DO AGENDAMENTO</h4>
                                    {agendamentoData.unidadeSaude && (
                                        <p><strong>Unidade de Saúde:</strong> {agendamentoData.unidadeSaude.nome}</p>
                                    )}
                                    {agendamentoData.tipoConsulta && (
                                        <p><strong>Tipo de Consulta:</strong> {agendamentoData.tipoConsulta.nome}</p>
                                    )}
                                    {agendamentoData.queixa && (
                                        <p><strong>Queixa Principal:</strong> {agendamentoData.queixa}</p>
                                    )}
                                    {agendamentoData.sintomas.length > 0 && (
                                        <p><strong>Sintomas:</strong> {agendamentoData.sintomas.map(s => 
                                            sintomasOptions.find(opt => opt.value === s)?.label || s
                                        ).join(', ')}</p>
                                    )}
                                    {agendamentoData.nivelDor > 0 && (
                                        <p><strong>Nível de Dor:</strong> {agendamentoData.nivelDor}/10</p>
                                    )}
                                </div>

                                <div className="form-section">
                                    <label>Data e hora da sua consulta</label>
                                    <div className="datetime-container">
                                        <div className="date-time-field">
                                            <label>Data</label>
                                            <Calendar
                                                value={agendamentoData.data}
                                                onChange={(e) => updateAgendamentoData({ data: e.value })}
                                                dateFormat="dd/mm/yy"
                                                placeholder="Selecione a data"
                                                className="w-full"
                                                minDate={new Date()}
                                            />
                                        </div>
                                        <div className="date-time-field">
                                            <label>Hora</label>
                                            <Calendar
                                                value={agendamentoData.hora}
                                                onChange={(e) => updateAgendamentoData({ hora: e.value })}
                                                timeOnly
                                                placeholder="Selecione a hora"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="step-actions">
                                <Button 
                                    label="Cancelar" 
                                    icon="pi pi-times"
                                    className="p-button-text" 
                                    onClick={() => window.history.back()} 
                                />
                                <div>
                                    <Button 
                                        label="Voltar" 
                                        icon="pi pi-arrow-left"
                                        className="p-button-secondary mr-2" 
                                        onClick={() => stepperRef.current.prevCallback()}
                                    />    
                                    <Button
                                        label="Confirmar Agendamento"
                                        icon="pi pi-check" 
                                        iconPos="right"
                                        onClick={handleFinalizarAgendamento}
                                        disabled={!agendamentoData.data || !agendamentoData.hora}
                                    />
                                </div>
                            </div>
                        </StepperPanel>

</Stepper>

</Card>

</div>

</div>

);

}                                    