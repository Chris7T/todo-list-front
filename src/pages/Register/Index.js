import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegister }  from '../../services/user'
import AuthContext from '../../contexts/auth';

const Register = () => {
    const { login } = useContext(AuthContext);

    let navigate = useNavigate();
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordConfirmation, setPasswordConfirmation ] = useState('');
    const [ userRegistered, setUserRegistered ] = useState(false)
    const register = async () => {
        try {

            const response = await userRegister({
                 name, email, password, password_confirmation : passwordConfirmation
            });
            await login({email, password});
            navigate("/dashboard");
            setUserRegistered(true)
        } catch (error) {
            console.log(error);
        
      };
    }
    const backToHome = () => {
        navigate("/");
    }


    return (
        <div>
            <h1>Register</h1>
            <div>
                <div>
                    <label>
                        Name : 
                    </label>
                    <input value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>
                        Email : 
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                </div>
                <div>
                    <label>
                        Password : 
                    </label>
                    <input type = "password" value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                </div>
                <div>
                    <label>
                        Password Confirmation : 
                    </label>
                    <input type = "password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} ></input>
                </div>
                <div>
                    <button onClick={() => register()} >Register</button>
                    <button onClick={() => backToHome()}>Back</button>
                </div>
            </div>
        </div>
    )
}
export default Register;
