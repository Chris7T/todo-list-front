import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    function NotLogged(props) {
        return <div>
            <h1>Welcome ! Register your self.</h1>
            <div>
                <Link to="/login"><p>Login</p></Link>
            </div>
            <div>
                <Link to="/register"><p>Register</p></Link>
            </div>
        </div>;
      }
      
    function Logged(props) {
    return <h1>Welcome Back !</h1>;
    }

    function Verificar(props) {
        if (token) {
          return <Logged />;
        }
        return <NotLogged />;
    }

    return (
        <div>
            <h1>ToDo List</h1>
            <Verificar/>
        </div>
    )
}
export default Home;
