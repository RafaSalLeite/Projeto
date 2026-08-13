import { useState, useEffect } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Dropdown } from 'primereact/dropdown'
import { InputMask } from 'primereact/inputmask'
import { Panel } from 'primereact/panel'
import { Link, useNavigate } from 'react-router-dom'
import './Cadastro.css'

// export default function UsuarioNew() {
//     const [nome, setNome] = useState('')
//     const [email, setEmail] = useState('')
//     const [senha, setSenha] = useState('')
//     const [telefone, setTelefone] = useState('')
    const [funcao, setFuncao] = useState(null)
    const [nivelAcesso, setNivelAcesso] = useState(null)
    const [funcoes, setFuncoes] = useState([])
    const [niveisAcesso, setNiveisAcesso] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // Carregar funções e níveis de acesso
    useEffect(() => {
        const buscarDadosIniciais = async () => {
            try {
                // Buscar funções
                const responseFuncoes = await fetch('/api/funcoes')
                if (responseFuncoes.ok) {
                    const dataFuncoes = await responseFuncoes.json()
                    setFuncoes(dataFuncoes)
                }

                // Buscar níveis de acesso
                const responseNiveis = await fetch('/api/niveis-acesso')
                if (responseNiveis.ok) {
                    const dataNiveis = await responseNiveis.json()
                    setNiveisAcesso(dataNiveis)
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
                // Fallback para desenvolvimento
                setFuncoes([
                    { id: 1, descricao: "Paciente" },
                    { id: 2, descricao: "Atendente" },
                    { id: 3, descricao: "Administrador" }
                ])

                setNiveisAcesso([
                    { id: "1", descricao: "paciente" },
                    { id: "2", descricao: "atendente" },
                    { id: "3", descricao: "administrador" },
                    { id: "4", descricao: "coordenador" },
                    { id: "5", descricao: "estagiario" }
                ])
            }
        }

        buscarDadosIniciais()
    }, [])

    const handleCadastro = async () => {
        if (!nome || !email || !senha || !telefone || !funcao || !nivelAcesso) {
            alert('Por favor, preencha todos os campos.')
            return
        }

        if (senha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.')
            return
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido.')
            return
        }

        setIsLoading(true)

        try {
            // Dados para enviar ao backend
            const userData = {
                nome: nome.trim(),
                email: email.toLowerCase().trim(),
                senha: senha,
                telefone: telefone.trim(),
                funcao: funcao,
                nivelAcesso: nivelAcesso
            }

            console.log('Enviando dados para cadastro:', userData)

            const response = await fetch('/cadastro/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            })

            if (response.ok) {
                const resultado = await response.json()
                console.log('Cadastro realizado com sucesso:', resultado)
                alert('Cadastro realizado com sucesso!')
                navigate('/login')
            } else {
                const errorData = await response.json()
                alert(errorData.message || 'Erro ao realizar cadastro.')
            }
        } catch (error) {
            console.error('Erro no cadastro:', error)

            if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                console.log('Backend não disponível, usando mock response para testes')
                alert('Cadastro realizado com sucesso! (Modo de desenvolvimento)')
                navigate('/login')
                return
            }

            alert('Erro ao realizar cadastro. Tente novamente.')
        } finally {
            setIsLoading(false)
        }
    }

    // Função Cancelar - Igual ao do agendamento
    const handleCancelar = () => {
        navigate(-1) // Volta para página anterior
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCadastro()
        }
    }

    return (
        <div className="page-container">
            <div id="div-img">
                <img src="/a.png" id="logo-img"/>
            </div>

            <Card className="form-card">
                <h2 className="form-title">Cadastro de Usuário</h2>

                <Panel header="Dados do Usuário">
                    {/* Input Nome acima das divs */}
                    <div className="field mb-4">
                        <span className="p-float-label">
                            <InputText
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                className="w-full"
                            />
                            <label htmlFor="nome">Nome Completo</label>
                        </span>
                    </div>

                    <div className="form-split">
                        {/* Div Esquerda */}
                        <div className="form-left">
                            <div className="field mb-3">
                                <span className="p-float-label">
                                    <InputMask
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                        mask="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                        placeholder="exemplo@email.com"
                                        className="w-full"
                                    />
                                    <label htmlFor="email">Email</label>
                                </span>
                            </div>

                            <div className="field mb-3">
                                <label>FUNÇÃO</label>
                                <Dropdown
                                    value={funcao}
                                    onChange={(e) => setFuncao(e.value)}
                                    options={funcoes}
                                    optionLabel="descricao"
                                    placeholder="Selecione a função"
                                    className="w-full"
                                />
                            </div>
                        </div>

                        {/* Div Direita */}
                        <div className="form-right">
                            <div className="field mb-3">
                                <span className="p-float-label">
                                    <Password
                                        id="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        toggleMask
                                        feedback={false}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                        className="w-full"
                                    />
                                    <label htmlFor="senha">Senha</label>
                                </span>
                            </div>

                            <div className="field mb-3">
                                <span className="p-float-label">
                                    <InputMask
                                        id="telefone"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={isLoading}
                                        mask="(99) 99999-9999"
                                        placeholder="(11) 99999-9999"
                                        className="w-full"
                                    />
                                    <label htmlFor="telefone">Telefone</label>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nível de Acesso - Abaixo das divs */}
                    <div className="field mb-4">
                        <label>NÍVEL DE ACESSO</label>
                        <Dropdown
                            value={nivelAcesso}
                            onChange={(e) => setNivelAcesso(e.value)}
                            options={niveisAcesso}
                            optionLabel="descricao"
                            placeholder="Selecione o nível de acesso"
                            className="w-full"
                            filter
                            filterBy="descricao"
                        />
                    </div>

                    {/* Botões de Ação - Igual ao agendamento */}
                    <div className="step-actions">
                        <Button 
                            label="Cancelar" 
                            icon="pi pi-times"
                            className="p-button-text" 
                            onClick={handleCancelar}
                            disabled={isLoading}
                        />
                        <Button
                            label={isLoading ? "Cadastrando..." : "Cadastrar"}
                            className="primary-button"
                            onClick={handleCadastro}
                            disabled={isLoading || !funcao || !nivelAcesso}
                        />
                    </div>

                    <p className="redirect-text mt-3">
                        Já tem conta? <Link to="/login">Faça login</Link>
                    </p>
                </Panel>
            </Card>
        </div>
    )
}