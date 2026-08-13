import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import MenubarComponent from '../../components/menubar/Menubar.jsx';
import "./NivelAcessoList.css";
import { Panel } from 'primereact/panel';
import { useNavigate } from "react-router-dom";

export default function nivelAcessoList() {
  const navigate = useNavigate();
  const [nivelAcessoData, setnivelAcessoData] = useState({
    nivelAcessoList: null,
    filtro: null
  });

  const [valorInput, setValorInput] = useState("");
  const [resultado, setResultado] = useState([]);
  const [nivelAcessoSelecionado, setnivelAcessoSelecionado] = useState(null);
  const [visible, setVisible] = useState(false);

  const fetchnivelAcessosList = async () => {
    try {
      const res = await fetch("/nivelAcesso.json");
      const data = await res.json();

      setnivelAcessoData(prev => ({
        ...prev,
        nivelAcessoList: data.niveisAcesso || []
      }));

    } catch (err) {
      console.error("Erro ao carregar níveis de acesso JSON:", err);
    }
  };

  useEffect(() => {
    fetchnivelAcessosList();
  }, []);

  const filtros = [
    { label: "Código", value: "id" },
    { label: "Descrição", value: "descricao" },
    { label: "Listar todos", value: "todos" }
  ];

  const pesquisar = () => {
    if (!nivelAcessoData.filtro) {
      alert("Selecione um filtro antes de pesquisar.");
      return;
    }

    if (!nivelAcessoData.nivelAcessoList) return;

    const lista = nivelAcessoData.nivelAcessoList;

    if (nivelAcessoData.filtro !== "todos" && !valorInput.trim()) {
      alert("Digite algo para pesquisar.");
      return;
    }

    let filtrado = [];

    if (nivelAcessoData.filtro === "todos") {
      filtrado = lista;
    } else if (nivelAcessoData.filtro === "id") {
      filtrado = lista.filter(u =>
        String(u.id).toLowerCase().includes(valorInput.toLowerCase())
      );
    } else if (nivelAcessoData.filtro === "descricao") {
      filtrado = lista.filter(u =>
        u.descricao.toLowerCase().includes(valorInput.toLowerCase())
      );
    }

    setResultado(filtrado);
  };

  const abrirModalExcluir = (nivelAcesso) => {
    setnivelAcessoSelecionado(nivelAcesso);
    setVisible(true);
  };

  const confirmarExclusao = () => {
    if (!nivelAcessoSelecionado) return;

    const novaResultado = resultado.filter(u => u.id !== nivelAcessoSelecionado.id);
    setResultado(novaResultado);

    setVisible(false);
    setnivelAcessoSelecionado(null);
  };

  const botaoExcluirTemplate = (rowData) => (
    <Button
      label="Excluir"
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => abrirModalExcluir(rowData)}
    />
  );

  return (
    <div className="nivelAcessoList-container">
      <MenubarComponent />
      <div id="contextPanel">
        <Panel header="Níveis de Acesso">
          <div className="p-grid p-fluid" id="nivelAcessoPainel-div">
            <div className="p-col-12 p-md-6">
              <div className="p-field">
                <label htmlFor="busca">Digite sua busca</label>
                <InputText
                  id="busca"
                  value={valorInput}
                  onChange={(e) => setValorInput(e.target.value)}
                  placeholder="Digite aqui..."
                />
              </div>
            </div>

            <div className="p-col-12 p-md-6">
              <div className="p-field">
                <label htmlFor="filtro">Filtro</label>
                <Dropdown
                  id="filtro"
                  value={nivelAcessoData.filtro}
                  options={filtros}
                  onChange={(e) => setnivelAcessoData(prev => ({ ...prev, filtro: e.value }))}
                  placeholder="Selecione"
                />
              </div>
            </div>
          </div>

          <div className="p-grid">
            <div className="p-col-12">
              <div className="botoes">
                <Button label="Pesquisar" icon="pi pi-search" onClick={pesquisar} />
                <Button
                  label="Novo"
                  icon="pi pi-plus"
                  className="p-button-success"
                  onClick={() => navigate("/NivelAcessoNew")}
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="tabelanivelAcessoList">
        <DataTable
          value={resultado}
          paginator
          rows={20}
          rowsPerPageOptions={[20, 40, 60]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="Nenhum nível de acesso encontrado."
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
        >
          <Column field="id" header="Código" style={{ width: "5%" }} />
          <Column field="descricao" header="Descrição" style={{ width: "35%" }} />
          <Column header="Excluir" body={botaoExcluirTemplate} style={{ width: "5%" }} />
          <Column
            header="Editar"
            body={(rowData) => (
              <Button
                label="Editar"
                icon="pi pi-pencil"
                className="p-button-primary"
                onClick={() => navigate(`/NivelAcessoEdit/${rowData.id}`, { state: rowData })}
              />
            )}
            style={{ width: "5%" }}
          />
        </DataTable>
      </div>

      <Dialog
        header="Confirmar Exclusão"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
        footer={
          <div>
            <Button
              label="Não"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={() => setVisible(false)}
            />
            <Button
              label="Sim"
              icon="pi pi-check"
              className="p-button-danger"
              onClick={confirmarExclusao}
            />
          </div>
        }
      >
        <p>
          Deseja realmente excluir o nível de acesso{" "}
          <strong>{nivelAcessoSelecionado?.id}</strong>?
        </p>
      </Dialog>
    </div>
  );
}
