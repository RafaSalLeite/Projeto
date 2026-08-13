import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import { Panel } from "primereact/panel";
import MenubarComponent from "../../components/menubar/Menubar.jsx";
import "./UsuarioNew.css";
import { useNavigate } from "react-router-dom";

export default function UsuarioNew() {

    // STATES SEPARADOS
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [senha, setSenha] = useState("");

    const [funcao, setFuncao] = useState(null);
    const [nivelAcesso, setNivelAcesso] = useState(null);

    const [funcoes, setFuncoes] = useState([]);
    const [niveis, setNiveis] = useState([]);

    const navigate = useNavigate();
    const irParaUsuarioList = () => {
        navigate("/UsuarioList"); 
    };

    useEffect(() => {
        carregarFuncoesENiveis();
    }, []);

    const carregarFuncoesENiveis = async () => {
        try {
            const response = await fetch("/nivelAcesso.json");
            if (!response.ok) throw new Error("Erro ao carregar níveis de acesso");
            const data = await response.json();
            setFuncoes(data.funcoes || []);
            setNiveis(data.niveisAcesso || []);
        } catch (error) {
            console.error("Erro ao carregar dados locais:", error);
        }
    };

    const niveisFiltrados = funcao
        ? niveis.filter((nivel) =>
            nivel.Funcoes?.descricao?.toLowerCase() === funcao.descricao.toLowerCase()
        )
        : [];
    
    const handleSalvar = () => {
        if (!nome.trim() || !email.trim() || !senha || !funcao || !nivelAcesso) {
            alert("Preencha todos os campos antes de salvar.");
            return;
        }

        const novosUsuarios = JSON.parse(localStorage.getItem("medscanUsuarios") || "[]");
        const usuariosBase = JSON.parse(localStorage.getItem("medscanUsuariosCache") || "[]");
        const maiorId = [...usuariosBase, ...novosUsuarios].reduce(
            (maior, usuario) => Math.max(maior, Number(usuario.id) || 0),
            0
        );
        const novoUsuario = {
            id: String(maiorId + 1),
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            telefone,
            senha,
            NivelAcesso: {
                id: nivelAcesso.id,
                descricao: nivelAcesso.descricao
            }
        };

        localStorage.setItem(
            "medscanUsuarios",
            JSON.stringify([...novosUsuarios, novoUsuario])
        );
        alert("Usuário cadastrado com sucesso!");
        navigate("/usuarioList");
    };

    const limparCampos = () => {
        setNome("");
        setEmail("");
        setTelefone("");
        setSenha("");
        setFuncao(null);
        setNivelAcesso(null);
    };

    return (
        <div id="div-usuarioNew">

            <MenubarComponent />

            <div id="telaNovoUsuario">
                <Panel header="Novo Usuário">
                    
                    <div id="panelNovoUsuario">

                        {/* NOME */}
                        <div className="field mb-3">
                            <span className="p-float-label">
                                <InputText
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    className="w-full"
                                />
                                <label>Nome</label>
                            </span>
                        </div>

                        <div id="rowNovoPanel">

                            {/* ESQUERDA */}
                            <div id="esquerdaNovo">

                                {/* Email */}
                                <div className="field mb-3">
                                    <span className="p-float-label">
                                        <InputText
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full"
                                        />
                                        <label>Email</label>
                                    </span>
                                </div>

                                {/* Função */}
                                <div className="field mb-3">
                                    <span className="p-float-label">
                                        <Dropdown
                                            value={funcao}
                                            options={funcoes}
                                            onChange={(e) => {
                                                setFuncao(e.value);
                                                setNivelAcesso(null);
                                            }}
                                            optionLabel="descricao"
                                            className="w-full"
                                            placeholder="Selecione a função"
                                        />
                                        <label>Função</label>
                                    </span>
                                </div>

                            </div>

                            {/* DIREITA */}
                            <div id="direitaNovo">

                                {/* Senha */}
                                <div className="field mb-3">
                                    <span className="p-float-label">
                                        <Password
                                            value={senha}
                                            onChange={(e) => setSenha(e.target.value)}
                                            toggleMask
                                            className="w-full"
                                        />
                                        <label>Senha</label>
                                    </span>
                                </div>

                                {/* Telefone */}
                                <div className="field mb-3">
                                    <span className="p-float-label">
                                        <InputMask
                                            mask="(99) 99999-9999"
                                            value={telefone}
                                            onChange={(e) => setTelefone(e.target.value)}
                                            className="w-full"
                                        />
                                        <label>Telefone</label>
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* NÍVEL */}
                        <div className="field mb-3">
                            <span className="p-float-label">
                                <Dropdown
                                    value={nivelAcesso}
                                    options={niveisFiltrados}
                                    onChange={(e) => setNivelAcesso(e.value)}
                                    optionLabel="descricao"
                                    className="w-full"
                                    disabled={!funcao}
                                    placeholder={
                                        funcao
                                            ? "Selecione o nível"
                                            : "Selecione uma função primeiro"
                                    }
                                />
                                <label>Nível de Acesso</label>
                            </span>
                        </div>

                        {/* BOTÕES */}
                        <div className="flex justify-content-between mt-4">

                            <button
                                className="p-button p-button-secondary"
                                type="button"
                                onClick={irParaUsuarioList}
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
    );
}