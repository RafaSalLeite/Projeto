import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import MenubarComponent from '../../components/menubar/Menubar.jsx';
import "./DoencaList.css";
import { Panel } from 'primereact/panel';

export default function doencaList() {
  const [doencaData, setdoencaData] = useState({
    doencaList: null,
    filtro: null
  });

  const [valorInput, setValorInput] = useState("");
  const [resultado, setResultado] = useState([]);
  const [doencaSelecionado, setdoencaSelecionado] = useState(null);
  const [visible, setVisible] = useState(false);

  const fetchdoencasList = async () => {
    try {
      const response = await fetch("/doencas.json");
      if (!response.ok) {
        throw new Error("Erro ao listar doenças");
      }

      const baseData = await response.json();
      const removidas = JSON.parse(localStorage.getItem("medscanDoencasRemovidas") || "[]");
      const data = baseData.filter((doenca) => !removidas.includes(String(doenca.id)));

      setdoencaData(prev => ({
        ...prev,
        doencaList: data
      }));

    } catch (err) {
      console.error("Erro ao carregar lista de doenças:", err);
    }
  };

  useEffect(() => {
    fetchdoencasList();
  }, []);

  const filtros = [
    { label: "Id", value: "id" },
    { label: "Cid", value: "cid"},
    { label: "Nome", value: "nomeDoenca" },
    { label: "Listar todos", value: "todos" }
  ];

  const pesquisar = () => {
    if (!doencaData.filtro) {
      alert("Selecione um filtro antes de pesquisar.");
      return;
    }

    if (!doencaData.doencaList) return;

    const lista = doencaData.doencaList;

    if (doencaData.filtro !== "todos" && !valorInput.trim()) {
      alert("Digite algo para pesquisar.");
      return;
    }

    let filtrado = [];

    if (doencaData.filtro === "todos") {
      filtrado = lista;
    } else if (doencaData.filtro === "id") {
      filtrado = lista.filter(u => 
        String(u.id).toLowerCase().includes(valorInput.toLowerCase())
      );
    } else if (doencaData.filtro === "cid"){
      filtrado = lista.filter(u =>
        u.cid.toLowerCase().includes(valorInput.toLowerCase())
      )}else if (doencaData.filtro === "nomeDoenca") {
      filtrado = lista.filter(u =>
        u.nomeDoenca.toLowerCase().includes(valorInput.toLowerCase())
      );
    } 
    setResultado(filtrado);
  };

  const abrirModalExcluir = (doenca) => {
    setdoencaSelecionado(doenca);
    setVisible(true);
  };

  // fetch delete doenca - descomentar quando o backend estiver pronto
  const confirmarExclusao = async () => {
    if (!doencaSelecionado) return;

    try {
      const novaResultado = resultado.filter(u => u.id !== doencaSelecionado.id);
      const novaLista = (doencaData.doencaList || []).filter(
        (doenca) => doenca.id !== doencaSelecionado.id
      );
      const removidas = JSON.parse(localStorage.getItem("medscanDoencasRemovidas") || "[]");
      localStorage.setItem(
        "medscanDoencasRemovidas",
        JSON.stringify([...new Set([...removidas, String(doencaSelecionado.id)])])
      );
      setResultado(novaResultado);
      setdoencaData((prev) => ({ ...prev, doencaList: novaLista }));

      setVisible(false);
      setdoencaSelecionado(null);

    } catch (error) {
      console.error("Erro ao excluir doença local:", error);
      alert("Não foi possível excluir a doença.");
    }
  };

  
  // esse tem q remover com o try fetch methodo delet aqui??? aqui deleta da linha atual, isso funciona pra deletar mesmo?

  // const confirmarExclusao = () => {
  //   if (!doencaSelecionado) return;

    
  //   const novaResultado = resultado.filter(u => u.id !== doencaSelecionado.id);
  //   setResultado(novaResultado);

  //   setVisible(false);
  //   setdoencaSelecionado(null);
  // };

  const botaoExcluirTemplate = (rowData) => (
    <Button
      label="Excluir"
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => abrirModalExcluir(rowData)}
    />
  );

  const nivelAcessoTemplate = (rowData) => {
    return rowData.NivelAcesso?.descricao || "N/A";
  };

  return (

    <div className="doencaList-container">
      <MenubarComponent />
      <div id="contextPanel">
        <Panel header="Pesquisar Doenças" >
          <div className="p-grid p-fluid" id="doencaPainel-div">
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
                  value={doencaData.filtro}
                  options={filtros}
                  onChange={(e) => setdoencaData(prev => ({ ...prev, filtro: e.value }))}
                  placeholder="Selecione"
                />
              </div>
            </div>
          </div>
          <div className="p-grid">
            <div className="p-col-12">
              <div className="botoes">
                <Button 
                  label="Pesquisar" 
                  icon="pi pi-search" 
                  onClick={pesquisar} 
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="tabeladoencaList">
        { /* tabela aqui */ }
        <DataTable
          value={resultado}
          paginator
          rows={20}
          rowsPerPageOptions={[20, 40, 60]}
          tableStyle={{ minWidth: "50rem" }}
          emptyMessage="Nenhum usuário encontrado."
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros"
        >
          <Column field="id" header="Código" style={{ width: "5%" }} />

           <Column field="cid" header="Cid" style={{ width: "10%" }} />
          <Column field="nomeDoenca" header="Nome da Doença" style={{ width: "35%" }} />
          <Column 
            header="Excluir" 
            body={botaoExcluirTemplate} 
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
          Deseja realmente excluir a doença <strong>{doencaSelecionado?.nomeDoenca}</strong>?
        </p>
      </Dialog>
    </div>
  );
}