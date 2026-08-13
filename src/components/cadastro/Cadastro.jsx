import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Link, useNavigate } from 'react-router-dom'
import './Cadastro.css'

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleCadastro = async () => {
        if (!nome || !email || !senha) {
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
                senha: senha
            }

            console.log('Enviando dados para cadastro:', userData)

            // Simulação de requisição para o backend Spring
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
                navigate('/login') // Redireciona para login após cadastro
            } else {
                const errorData = await response.json()
                alert(errorData.message || 'Erro ao realizar cadastro.')
            }
        } catch (error) {
            console.error('Erro no cadastro:', error)

            // Fallback: Simulação de sucesso para testes
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

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleCadastro()
        }
    }

    return (
        <div id="page-container">
            <div id="div-img">
                <img src="/a.png" id="logo-img"/>
            </div>

            <Card id="form-card">
                <h2 id="form-title">
                    Cadastro
                </h2>
                <div id="form-content">
                    <span className="p-float-label">
                        <InputText
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <label htmlFor="nome">Nome Completo</label>
                    </span>

                    <span className="p-float-label">
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <label htmlFor="email">Email</label>
                    </span>

                    <span className="p-float-label">
                        <Password
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            toggleMask
                            feedback={false}
                            onKeyPress={handleKeyPress}
                            disabled={isLoading}
                        />
                        <label htmlFor="senha">Senha</label>
                    </span>

                    <Button
                        label={isLoading ? "Cadastrando..." : "Cadastrar"}
                        id="primary-button"
                        onClick={handleCadastro}
                        disabled={isLoading}
                    />

                    <p id="redirect-text">
                        Já tem conta? <Link to="/login">Faça login</Link>
                    </p>
                </div>
            </Card>
        </div>

    );
}