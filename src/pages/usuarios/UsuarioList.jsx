import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import MenubarComponent from '../../components/menubar/Menubar.jsx';
import "./UsuarioList.css";
import { Panel } from 'primereact/panel';
import { useNavigate } from "react-router-dom"; 
export default function UsuarioList() {
  const handleNovoUsuario = () => {
    navigate("/usuarioNew"); // Navega para a tela de usernew
  };
  const navigate = useNavigate();
  const [usuarioData, setUsuarioData] = useState({
    usuarioList: null,
    filtro: null
  });

  const [valorInput, setValorInput] = useState("");
  const [resultado, setResultado] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [visible, setVisible] = useState(false);

  const usuarioList = async () => {
    try {
      const response = await fetch("/usuarios.json");
      if (!response.ok) throw new Error("Erro ao carregar usuários");
      const baseData = await response.json();
      const adicionados = JSON.parse(localStorage.getItem("medscanUsuarios") || "[]");
      const removidos = JSON.parse(localStorage.getItem("medscanUsuariosRemovidos") || "[]");
      const edicoes = JSON.parse(localStorage.getItem("medscanUsuariosEdicoes") || "{}");
      const dados = [...baseData, ...adicionados]
        .filter((usuario) => !removidos.includes(String(usuario.id)))
        .map((usuario) => ({ ...usuario, ...(edicoes[String(usuario.id)] || {}) }));
      localStorage.setItem("medscanUsuariosCache", JSON.stringify(dados));
      setUsuarioData((prev) => ({ ...prev, usuarioList: dados }));
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    }
  };

  useEffect(() => {
    usuarioList();
  }, []);

  const filtros = [
    { label: "Código", value: "id" },
    { label: "Usuário", value: "nome" },
    { label: "Listar todos", value: "todos" }
  ];
  
  const pesquisar = () => {
    if (!usuarioData.filtro) {
      alert("Selecione um filtro antes de pesquisar.");
      return;
    }

    if (!usuarioData.usuarioList) return;

    const lista = usuarioData.usuarioList;

    if (usuarioData.filtro !== "todos" && !valorInput.trim()) {
      alert("Digite algo para pesquisar.");
      return;
    }

    let filtrado = [];

    if (usuarioData.filtro === "todos") {
      filtrado = lista;
    } else if (usuarioData.filtro === "id") {
      filtrado = lista.filter(u => 
        String(u.id).toLowerCase().includes(valorInput.toLowerCase())
      );
    } else if (usuarioData.filtro === "nome") {
      filtrado = lista.filter(u =>
        u.nome.toLowerCase().includes(valorInput.toLowerCase())
      )}
    setResultado(filtrado);
  };

  const abrirModalExcluir = (usuario) => {
    setUsuarioSelecionado(usuario);
    setVisible(true);
  };

  //fetch delete usuario - descomentar quando o backend estiver pronto
  // const confirmarExclusao = async () => {
  //   if (!usuarioSelecionado) return;

  //   try {
  //     const response = await fetch("/MedScan/usuario/excluir", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         id: usuarioSelecionado.id  // <-- manda o ID para excluir
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error("Erro ao excluir usuário no servidor");
  //     }

  //     const resultadoBackend = await response.json();

  //     // Se o backend confirmou OK
  //     if (resultadoBackend.sucesso === true) {

  //       // remove da lista local
  //       const novaLista = resultado.filter(
  //         (u) => u.id !== usuarioSelecionado.id
  //       );

  //       setResultado(novaLista);
  //       setVisible(false);
  //       setUsuarioSelecionado(null);

  //     } else {
  //       alert("Erro ao excluir: " + resultadoBackend.mensagem);
  //     }

  //   } catch (error) {
  //     console.error("Erro ao excluir:", error);
  //     alert("Não foi possível excluir o usuário.");
  //   }
  // };


   // esse tem q remover com o try fetch methodo delet aqui??? aqui deleta da linha atual, isso funciona pra deletar mesmo?
  const confirmarExclusao = () => {
    if (!usuarioSelecionado) return;

   
    const novaResultado = resultado.filter(u => u.id !== usuarioSelecionado.id);
     const removidos = JSON.parse(localStorage.getItem("medscanUsuariosRemovidos") || "[]");
     localStorage.setItem(
       "medscanUsuariosRemovidos",
       JSON.stringify([...new Set([...removidos, String(usuarioSelecionado.id)])])
     );
    setResultado(novaResultado);

    setVisible(false);
    setUsuarioSelecionado(null);
  };

  const botaoExcluirTemplate = (rowData) => (
    <Button
      label="Excluir"
      icon="pi pi-trash"
      className="p-button-danger"
      onClick={() => abrirModalExcluir(rowData)}
    />
  );

  // Função para o botão editar
  const botaoEditarTemplate = (rowData) => {
    return (
      <Button
        label="Editar"
        icon="pi pi-pencil"
        className="p-button-warning"
        onClick={() => navigate(`/usuarioEdit/${rowData.id}`)}
      />
    );
  };

  const nivelAcessoTemplate = (rowData) => {
    return rowData.NivelAcesso?.descricao || "N/A";
  };

  return (
    
    <div className="usuarioList-container">
      <MenubarComponent />
      <div id="contextPanel">
        <Panel header="Pesquisar Usuários" >
          <div className="p-grid p-fluid" id="usuarioPainel-div">
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
                  value={usuarioData.filtro}
                  options={filtros}
                  onChange={(e) => setUsuarioData(prev => ({ ...prev, filtro: e.value }))}
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
                <Button 
                  label="Novo" 
                  icon="pi pi-plus" 
                  className="p-button-success" 
 onClick={handleNovoUsuario}
                />
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="tabelaUsuarioList">
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
          <Column field="nome" header="Usuário" style={{ width: "25%" }} />
          <Column field="email" header="Email" style={{ width: "25%" }} />
          <Column header="Nível de Acesso" body={nivelAcessoTemplate} style={{ width: "20%" }} />
          <Column header="Editar" body={botaoEditarTemplate} style={{ width: "10%" }} />
          <Column header="Excluir" body={botaoExcluirTemplate} style={{ width: "10%" }} />
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
          Deseja realmente excluir o usuário <strong>{usuarioSelecionado?.nome}</strong>?
        </p>
      </Dialog>
    </div>
  );
}