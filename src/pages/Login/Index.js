import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    let navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassowrd] = useState('');

    const doLogin = async () => {
        await login({email, password});
        navigate("/dashboard");
    }
    const backToHome = () => {
        navigate("/");
    }
    
    return (
        <div>
            <h1>Login</h1>
            <div>
                <div>
                    <label>
                        Email : 
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <br/>
                <div>
                    <label>
                        Password : 
                    </label>
                    <input type = "password" value={password} onChange={(e) => setPassowrd(e.target.value)}></input>
                </div>
                <br/>
                <div>
                    <button onClick={() => doLogin()}>Login</button>
                    <button onClick={() => backToHome()}>Back</button>
                </div>
            </div>
        </div>
    )
}
export default Login;
