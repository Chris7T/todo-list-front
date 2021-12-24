import React, { createContext, useContext, useState } from 'react';
import { Redirect, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { userLogin, userLogout} from '../services/user'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
      localStorage.getItem('token') ? localStorage.getItem('token') : null
    );


    async function login(data)  {
      try{
        const response = await userLogin(data);
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      }
      catch(e){
        console.log(e);
      }
      
    }
    async function logout() {
      try{
        const response = await userLogout()
        setToken(null);
        localStorage.clear();
      }
      catch(e){
        console.log(e);
      }
    }

    return (
      <AuthContext.Provider value={{ token: token, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
   };

export default AuthContext;