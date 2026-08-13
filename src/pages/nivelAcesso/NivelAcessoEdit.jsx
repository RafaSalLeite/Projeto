import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { Button } from "primereact/button";
import "./NivelAcessoEdit.css";
import MenubarComponent from "../../components/menubar/Menubar";

export default function NivelAcessoEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nivel, setNivel] = useState({ id: Number(id), descricao: "" });
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarNivelEBuscarCategorias();
  }, [id]);


  const carregarJSON = async (path) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error("Erro ao carregar " + path);
    return res.json();
  };


  const carregarNivelEBuscarCategorias = async () => {
    try {
      setLoading(true);

      // Carrega JSONs locais
      const nivelData = await carregarJSON("/nivelAcesso.json");
      const categoriasData = await carregarJSON("/categoriaNivelAcesso.json");
      const tipoData = await carregarJSON("/tipoNivelAcesso.json");

      // Localiza nível pelo ID
      const nivelEncontrado = nivelData.niveisAcesso.find(
        (n) => Number(n.id) === Number(id)
      );

      setNivel(nivelEncontrado || { id: Number(id), descricao: "" });

      // Categorias relacionadas ao nível (via tipoNivelAcesso.json)
      const categoriasPermitidas = tipoData.tipoNivelAcesso
        .filter((t) => Number(t.nivelacessoid) === Number(id))
        .map((t) =>
          categoriasData.categoriaNivelAcesso.find(
            (c) => Number(c.id) === Number(t.categorianivelacessoid)
          )
        )
        .filter(Boolean);

      setCategorias(categoriasPermitidas);
    } catch (error) {
      console.error("Erro ao carregar JSONs:", error);
    } finally {
      setLoading(false);
    }
  };


  const selecionarCategoria = async (categoria) => {
    setLoading(true);

    try {
      const tipoData = await carregarJSON("/tipoNivelAcesso.json");
      const configData = await carregarJSON("/configNivelAcesso.json");

      // Se existe relação entre nível + categoria (permitido)
      const permitido = tipoData.tipoNivelAcesso.some(
        (t) =>
          Number(t.nivelacessoid) === Number(id) &&
          Number(t.categorianivelacessoid) === Number(categoria.id)
      );

      // Configurações filtradas pela categoria
      const configuracoes = configData.configNivelAcesso
        .filter(
          (cfg) =>
            Number(cfg.categoria_nivel_acessoid) === Number(categoria.id)
        )
        .map((cfg) => ({
          id: cfg.id,
          nome: cfg.descricao,
          valor: cfg.status === 1,
        }));

      setCategoriaSelecionada({
        ...categoria,
        permitido,
        configuracoes,
      });
    } catch (error) {
      console.error("Erro ao carregar detalhes da categoria:", error);
    } finally {
      setLoading(false);
    }
  };


  const toggleConfiguracao = (configId) => {
    setCategoriaSelecionada((prev) => ({
      ...prev,
      configuracoes: prev.configuracoes.map((c) =>
        Number(c.id) === Number(configId)
          ? { ...c, valor: !c.valor }
          : c
      ),
    }));
  };


  const salvar = async () => {
    setSaving(true);

    const dadosParaSalvar = {
      nivel,
      categorias,
      categoriaSelecionada,
    };

    console.log("SALVANDO →", dadosParaSalvar);

    await new Promise((resolve) => setTimeout(resolve, 800));

    alert("Configurações salvas com sucesso!");
    setSaving(false);
    navigate(-1);
  };


  const cancelar = () => navigate(-1);


  if (loading) {
    return (
      <div className="nivelAcessoEdit-container">
        <MenubarComponent />
        <div className="edit-wrapper">
          <Card className="config-card">Carregando...</Card>
        </div>
      </div>
    );
  }


  return (
    <div className="nivelAcessoEdit-container">
      <MenubarComponent />

      <div className="edit-wrapper">

        {/* MENU DE CATEGORIAS */}
        <div className="categoria-menu">
          <h3>Categorias</h3>

          {categorias.map((cat) => (
            <div
              key={cat.id}
              className={`categoria-item ${
                categoriaSelecionada?.id === cat.id ? "active" : ""
              }`}
              onClick={() => selecionarCategoria(cat)}
            >
              <span>{cat.descricao}</span>
            </div>
          ))}

          <div className="botoes">
            <Button
              label={saving ? "Salvando..." : "Salvar"}
              onClick={salvar}
              disabled={saving}
              className="btn-salvar"
            />
            <Button
              label="Cancelar"
              onClick={cancelar}
              className="btn-cancelar"
              disabled={saving}
            />
          </div>
        </div>

        {/* CARD PRINCIPAL */}
        <Card className="config-card">
          <div className="card-header">
            <h2>Editar Nível de Acesso</h2>

            <div className="nivel-info">
              <strong>ID:</strong> {nivel.id} |
              <strong style={{ marginLeft: "10px" }}>Descrição:</strong>

              <InputText
                value={nivel.descricao}
                onChange={(e) =>
                  setNivel({ ...nivel, descricao: e.target.value })
                }
                style={{ marginLeft: "10px", width: "200px" }}
              />
            </div>
          </div>

          {/* DETALHES DA CATEGORIA */}
          {categoriaSelecionada && (
            <div className="categoria-detalhes">
              <div className="categoria-header">
                <h3>{categoriaSelecionada.descricao}</h3>
              </div>

              <div className="configuracoes">
                <h4>Configurações:</h4>

                {categoriaSelecionada.configuracoes?.map((config) => (
                  <div key={config.id} className="config-item">
                    <span>{config.nome}</span>

                    <InputSwitch
                      checked={config.valor}
                      onChange={() => toggleConfiguracao(config.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
