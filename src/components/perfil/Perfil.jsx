// import React, { useState, useEffect } from 'react';
// import MenubarComponent from '../menubar/Menubar.jsx';
// import './Perfil.css';

// export default function Perfil() {
//     const [userData, setUserData] = useState({
//         id: '',
//         nome: '',
//         email: '',
//         telefone: '',
//         dataNascimento: '',
//         genero: ''
//     });

//     const [editMode, setEditMode] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [message, setMessage] = useState('');

//     // Opções simples para gênero
//     const generoOptions = [
//         { value: '', label: 'Selecione...' },
//         { value: 'MASCULINO', label: 'Masculino' },
//         { value: 'FEMININO', label: 'Feminino' },
//         { value: 'OUTRO', label: 'Outro' },
//         { value: 'NAO_INFORMAR', label: 'Prefiro não informar' }
//     ];

//     // FETCH - Buscar dados do usuário do backend (igual ao Search)
//     const fetchUserData = async () => {
//         setLoading(true);
//         try {
//             // Simulando o ID do usuário logado (na prática viria do contexto/JWT)
//             const userId = localStorage.getItem('userId') || 1;

//             const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`);

//             if (!response.ok) {
//                 throw new Error('Erro ao carregar dados do usuário');
//             }

//             const userFromBackend = await response.json();

//             // Transformar dados do backend para o frontend
//             setUserData({
//                 id: userFromBackend.id || '',
//                 nome: userFromBackend.nome || '',
//                 email: userFromBackend.email || '',
//                 telefone: userFromBackend.telefone || '',
//                 dataNascimento: userFromBackend.dataNascimento || '',
//                 genero: userFromBackend.genero || ''
//             });

//         } catch (error) {
//             console.error('Erro ao buscar dados:', error);
//             setMessage('Erro ao carregar perfil');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // UPDATE - Salvar alterações no backend (igual ao Search faz fetch)
//     const handleSave = async () => {
//         setLoading(true);
//         try {
//             const userId = localStorage.getItem('userId') || 1;

//             const response = await fetch(`http://localhost:8080/api/usuarios/${userId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData)
//             });

//             if (!response.ok) {
//                 throw new Error('Erro ao atualizar perfil');
//             }

//             const updatedUser = await response.json();

//             setUserData(updatedUser);
//             setEditMode(false);
//             setMessage('Perfil atualizado com sucesso!');

//             // Limpar mensagem após 3 segundos
//             setTimeout(() => setMessage(''), 3000);

//         } catch (error) {
//             console.error('Erro ao salvar:', error);
//             setMessage('Erro ao salvar alterações');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Cancelar edição
//     const handleCancel = () => {
//         // Recarregar dados originais
//         fetchUserData();
//         setEditMode(false);
//         setMessage('');
//     };

//     // Handle input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     // Buscar dados quando componente montar
//     useEffect(() => {
//         fetchUserData();
//     }, []);

//     return (
//         <div className="app-page">
//             <MenubarComponent />

//             <div className="content-container">
//                 <div className="main-card perfil-container">
//                     <h2 className="page-title">Perfil do Usuário</h2>

//                     {message && (
//                         <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
//                             {message}
//                         </div>
//                     )}

//                     {loading && !editMode ? (
//                         <div className="loading">
//                             <div className="spinner"></div>
//                             <p>Carregando dados...</p>
//                         </div>
//                     ) : (
//                         <div className="form-section">
//                             {/* Avatar/ Foto */}
//                             <div className="field-container">
//                                 <label className="field-label">Foto do Perfil</label>
//                                 <div className="avatar-preview">
//                                     <div className="avatar-placeholder">
//                                         {userData.nome ? userData.nome.charAt(0).toUpperCase() : 'U'}
//                                     </div>
//                                 </div>
//                                 {editMode && (
//                                     <input 
//                                         type="file" 
//                                         accept="image/*"
//                                         className="file-input"
//                                         onChange={(e) => {
//                                             // Aqui você implementaria o upload da foto
//                                             console.log('Foto selecionada:', e.target.files[0]);
//                                         }}
//                                     />
//                                 )}
//                             </div>

//                             {/* Nome */}
//                             <div className="field-container">
//                                 <label className="field-label">
//                                     Nome Completo
//                                 </label>
//                                 <input
//                                     type="text"
//                                     name="nome"
//                                     value={userData.nome}
//                                     onChange={handleInputChange}
//                                     disabled={!editMode}
//                                     className="form-input"
//                                     placeholder="Digite seu nome completo"
//                                     required
//                                 />
//                             </div>

//                             {/* Email */}
//                             <div className="field-container">
//                                 <label className="field-label">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={userData.email}
//                                     onChange={handleInputChange}
//                                     disabled={!editMode}
//                                     className="form-input"
//                                     placeholder="seu.email@exemplo.com"
//                                     required
//                                 />
//                             </div>

//                             {/* Telefone */}
//                             <div className="field-container">
//                                 <label className="field-label">
//                                     Telefone
//                                 </label>
//                                 <input
//                                     type="tel"
//                                     name="telefone"
//                                     value={userData.telefone}
//                                     onChange={handleInputChange}
//                                     disabled={!editMode}
//                                     className="form-input"
//                                     placeholder="(11) 99999-9999"
//                                 />
//                             </div>

//                             {/* Data de Nascimento */}
//                             <div className="field-container">
//                                 <label className="field-label">
//                                     Data de Nascimento
//                                 </label>
//                                 <input
//                                     type="date"
//                                     name="dataNascimento"
//                                     value={userData.dataNascimento}
//                                     onChange={handleInputChange}
//                                     disabled={!editMode}
//                                     className="form-input"
//                                 />
//                             </div>

//                             {/* Gênero */}
//                             <div className="field-container">
//                                 <label className="field-label">
//                                     Gênero
//                                 </label>
//                                 <select
//                                     name="genero"
//                                     value={userData.genero}
//                                     onChange={handleInputChange}
//                                     disabled={!editMode}
//                                     className="form-select"
//                                 >
//                                     {generoOptions.map(option => (
//                                         <option key={option.value} value={option.value}>
//                                             {option.label}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>

//                             {/* Botões */}
//                             <div className="button-group">
//                                 {editMode ? (
//                                     <>
//                                         <button 
//                                             type="button"
//                                             className="secondary-button"
//                                             onClick={handleCancel}
//                                             disabled={loading}
//                                         >
//                                             Cancelar
//                                         </button>
//                                         <button 
//                                             type="button"
//                                             className="primary-button"
//                                             onClick={handleSave}
//                                             disabled={loading}
//                                         >
//                                             {loading ? 'Salvando...' : 'Salvar Alterações'}
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <button 
//                                         type="button"
//                                         className="primary-button"
//                                         onClick={() => setEditMode(true)}
//                                     >
//                                         Editar
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }