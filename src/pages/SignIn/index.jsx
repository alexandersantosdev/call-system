import {useContext, useState} from "react";
import {AuthContext} from "../../Contexts/auth";
import {Link} from "react-router-dom";
import './signin.css';
import Logo from '../../assets/logo.png';

function SingIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn, loadingAuth} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email !== '' && password !== '') {
            signIn(email, password);
        }
    }
    return (
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={Logo} alt='Logo do sistema'/>
                </div>
                <form method='post' onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type='email' placeholder='email@email.com' value={email}
                           onChange={e => setEmail(e.target.value)}/>
                    <input type='password' placeholder='*********' value={password}
                           onChange={e => setPassword(e.target.value)}/>
                    <button type='submit' disabled={loadingAuth}>{loadingAuth ? 'Entrando...' : 'Entrar'}</button>
                </form>
                <Link to='/register'>Criar uma conta</Link>
            </div>
        </div>

    )
}

export default SingIn
