import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import "./UsuarioEdit.css";
import MenubarComponent from "../../components/menubar/Menubar";

const UsuarioEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [nivelAcessos, setNivelAcessos] = useState([]);

  //nivel de acesso
  useEffect(() => {
    const carregarNivelAcesso = async () => {
      try {
        const response = await fetch("/nivelAcesso.json");
        const data = await response.json();
        setNivelAcessos(data.niveisAcesso || []);
      } catch (error) {
        console.error("Erro ao carregar níveis de acesso:", error);
      }
    };
    carregarNivelAcesso();
  }, []);


    useEffect(() => {
        const carregarUsuario = async () => {
            try {
                const response = await fetch("/usuarios.json");
                if (!response.ok) throw new Error("Erro ao carregar usuários");
                const baseData = await response.json();
                const adicionados = JSON.parse(localStorage.getItem("medscanUsuarios") || "[]");
                const edicoes = JSON.parse(localStorage.getItem("medscanUsuariosEdicoes") || "{}");
                const encontrado = [...baseData, ...adicionados]
                    .find((item) => String(item.id) === String(id));
                if (encontrado) {
                    setUsuario({ ...encontrado, ...(edicoes[String(id)] || {}) });
                }
            } catch (error) {
                console.error("Erro ao carregar usuário:", error);
            }
        };
        carregarUsuario();
    }, [id]);

  //nivel de acesso
  useEffect(() => {
    if (usuario && nivelAcessos.length > 0) {
      const nivelCorrigido = nivelAcessos.find(
        (n) => String(n.id) === String(usuario.NivelAcesso?.id)
      );
      if (nivelCorrigido) {
        setUsuario((prev) => ({
          ...prev,
          NivelAcesso: nivelCorrigido
        }));
      }
    }
  }, [usuario, nivelAcessos]);

  const salvarUsuario = () => {
    const edicoes = JSON.parse(localStorage.getItem("medscanUsuariosEdicoes") || "{}");
    edicoes[String(id)] = usuario;
    localStorage.setItem("medscanUsuariosEdicoes", JSON.stringify(edicoes));
    alert("Usuário salvo com sucesso!");
    navigate("/UsuarioList");
  };

  if (!usuario) return <p>Carregando usuário...</p>;

  return (
    <div className="menu">
      <MenubarComponent />
      <div className="usuario-edit">
        <h2>Editar Usuário: {usuario.nome}</h2>

        <div className="field">
          <label htmlFor="nome">Nome</label>
          <InputText
            id="nome"
            value={usuario.nome}
            onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            value={usuario.email}
            onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="telefone">Telefone</label>
          <InputText
            id="telefone"
            value={usuario.telefone}
            onChange={(e) => setUsuario({ ...usuario, telefone: e.target.value })}
          />
        </div>

        <div className="field">
          <label htmlFor="nivel">Nível de Acesso</label>
          <Dropdown
            id="nivel"
            value={usuario.NivelAcesso}
            options={nivelAcessos}
            optionLabel="descricao"
            onChange={(e) => setUsuario({ ...usuario, NivelAcesso: e.value })}
          />
        </div>

        <div className="botoes">
          <button onClick={() => navigate("/UsuarioList")}>Cancelar</button>
          <button onClick={salvarUsuario}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default UsuarioEdit;
