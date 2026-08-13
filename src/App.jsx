import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import Cadastro from './components/cadastro/Cadastro.jsx'
import CadastroDados from './components/cadastro/CadastroDados.jsx'
import Home from './pages/home/Home.jsx'
import Welcome from './components/welcome/Welcome.jsx'
//import Perfil from './components/perfil/Perfil.jsx'
import Agendamento from './pages/agendamento/Agendamento.jsx'
import UsuarioList from './pages/usuarios/UsuarioList.jsx'
import DoencaList from './pages/doencas/DoencaList.jsx'
import NivelAcessoList from './pages/nivelAcesso/NivelAcessoList.jsx'
import UsuarioNew from './pages/usuarios/UsuarioNew.jsx'
import Ubs from './pages/ubs/Ubs.jsx'
import Admin from './pages/admin/Admin.jsx'
import Sobre from './pages/sobre/Sobre.jsx'
import NivelAcessoEdit from './pages/nivelAcesso/NivelAcessoEdit.jsx'
import UsuarioEdit from './pages/usuarios/UsuarioEdit.jsx'
import NivelAcessoNew from './pages/nivelAcesso/NivelAcessoNew.jsx'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/agendamento" element={<Agendamento />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-dados" element={<CadastroDados />} />
            <Route path="/home" element={<Home />} />
            {/* <Route path="/perfil" element={<Perfil />} /> */}
             <Route path="/Welcome" element={<Welcome/>} />
            <Route path="/usuarioList" element={<UsuarioList/>} />
            <Route path="/doencaList" element={<DoencaList/>} />
            <Route path="/nivelAcessoList" element={<NivelAcessoList/>} />
            <Route path="/usuarioNew" element={<UsuarioNew/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/ubs" element={<Ubs/>} />
            <Route path="/sobre" element={<Sobre/>} />
            <Route path="/nivelAcessoEdit/:id" element={<NivelAcessoEdit/>} />
            <Route path="/usuarioEdit/:id" element={<UsuarioEdit/>} />
            <Route path="/nivelAcessoNew" element={<NivelAcessoNew/>} />
        </Routes>
    )
}

export default App;