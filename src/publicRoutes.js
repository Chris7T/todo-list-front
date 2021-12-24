import React from 'react';

import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';
import Login from './pages/Login/Index';
import Home from './pages/Home/Index'
import Register from './pages/Register/Index';
import Error from './pages/Error/Index';

const PublicRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path ="/login" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path ="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>
)
export default PublicRoutes;