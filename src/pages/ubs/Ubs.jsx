import React, { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import MenubarComponent from "../../components/menubar/Menubar.jsx";
import "./Ubs.css";

export default function UBSDataView() {
    const [ubsList, setUbsList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("/unidades.json")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar unidades");
                return res.json();
            })
            .then((data) => {
                setUbsList(data.unidadesSaude || []);
            })
            .catch((err) => console.error("Erro ao carregar unidades:", err));
    }, []);

    const handleAgendar = (ubs) => {
        navigate("/agendamento", {
            state: {
                ubs: {
                    nome: ubs.nome,
                    cnes: ubs.cnes,
                    endereco: ubs.endereco,
                    cidade: ubs.cidade,
                    uf: ubs.uf,
                    tiposConsulta: ubs.tiposConsulta || []
                }
            }
        });
    };

    // Template de cada UBS
    const itemTemplate = (ubs, index) => {
        return (
            <div className="col-12" key={index}>
                <div className="ubs-item">
                    <div className="ubs-nome">
                        {ubs.nome}
                    </div>

                    <div className="ubs-endereco">
                        {ubs.endereco}
                    </div>

                    <div className="ubs-cidade">
                        {ubs.cidade} - {ubs.uf}
                    </div>

                    <div className="ubs-btn-wrapper">
                        <Button 
                            label="Agendar" 
                            icon="pi pi-calendar" 
                            className="p-button-sm"
                            onClick={() => handleAgendar(ubs)}
                        />
                    </div>
                </div>
            </div>
        );
    };

    // Lista completa
    const listTemplate = (items) => {
        if (!items || items.length === 0) {
            return (
                <div className="p-4 text-center">
                    Nenhuma UBS encontrada.
                </div>
            );
        }
        return <div className="grid grid-nogutter">{items.map(itemTemplate)}</div>;
    };

    return (
        <div>
            <MenubarComponent />
            <div className="card p-3">
                <h2 className="text-center mb-3">Unidades de Saúde (UBS)</h2>

                <DataView
                    value={ubsList}
                    listTemplate={listTemplate}
                    paginator
                    rows={5}  
                    // Ideal para mobile
                />
            </div>
        </div>
    );
}