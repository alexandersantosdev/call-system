import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "../../Contexts/auth";

import Logo from '../../assets/logo.png';

function SingUp() {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name !== '' && email !== '' && password !== '') {
            signUp(email, password, name);
        }
    }
    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={Logo} alt='Logo do sistema'/>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <h1>Criar conta</h1>
                    <input type='text' placeholder='Seu nome' value={name}
                           onChange={e => setName(e.target.value)}/>
                    <input type='email' placeholder='email@email.com' value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <input type='password' placeholder='*********' value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' disabled={loadingAuth}>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
                </form>
                <Link to='/'>Já possui uma conta? Entrar</Link>
            </div>
        </div>

    )
}

export default SingUp
