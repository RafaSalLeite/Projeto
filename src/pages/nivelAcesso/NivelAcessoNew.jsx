import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Panel } from "primereact/panel";
import MenubarComponent from "../../components/menubar/Menubar.jsx";
import { useNavigate } from "react-router-dom";

import "./NivelAcessoNew.css";

export default function NivelAcessoNew() {
  const [descricao, setDescricao] = useState("");

  const navigate = useNavigate();

  const irParaNivelAcessoList = () => {
    navigate("/NivelAcessoList");
  };

  const handleSalvar = async () => {
    if (!descricao.trim()) {
      alert("Informe a descrição do nível.");
      return;
    }
    const novos = JSON.parse(localStorage.getItem("medscanNiveisAcesso") || "[]");
    const base = JSON.parse(localStorage.getItem("medscanNiveisAcessoCache") || "[]");
    const maiorId = [...base, ...novos].reduce(
      (maior, item) => Math.max(maior, Number(item.id) || 0),
      0
    );
    novos.push({ id: String(maiorId + 1), descricao: descricao.trim() });
    localStorage.setItem("medscanNiveisAcesso", JSON.stringify(novos));
    alert("Nível de acesso criado com sucesso!");
    navigate("/nivelAcessoList");
  };

  return (
   <div id="menu">
      <MenubarComponent />
  
    <div id="div-nivelAcessoNew">

     

      <div id="containerNivelNew">
        <Panel header="Novo Nível de Acesso">

          <div id="panelNivelNew">

            {/* DESCRIÇÃO */}
            <div className="field mb-3">
              <span className="p-float-label">
                <InputText
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  className="w-full"
                />
                <label>Descrição do Nível</label>
              </span>
            </div>

            {/* BOTÕES */}
            <div className="buttons">
              <button
                className="p-button p-button-secondary"
                type="button"
                onClick={irParaNivelAcessoList}
              >
                Cancelar
              </button>

              <button
                className="p-button p-button-primary"
                type="button"
                onClick={handleSalvar}
              >
                Salvar
              </button>
            </div>

          </div>

        </Panel>
      </div>
  </div>
    </div>
  );
}
