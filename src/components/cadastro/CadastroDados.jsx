import { useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Link } from 'react-router-dom'
import './Cadastro.css'

export default function Cadastro() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const handleCadastro = () => {
        // TODO: Integrar com backend Spring
        console.log('Cadastro:', { nome, email, senha });
    }

    return (
        <div id="formcadastro">
            <div id="card-form">
                <form onSubmit={handleCadastro}>
                    <div id="formgroup">
                        <div id="formesquerdo">

                        </div>
                        <div id="formdireito">

                        </div>
                    </div>
                    <div className="formbtt">

                    </div>
                </form>
            </div>
        </div>
    );
}