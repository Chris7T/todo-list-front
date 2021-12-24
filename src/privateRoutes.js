import React from 'react';

import { BrowserRouter, Route, Routes, Redirect } from 'react-router-dom';

import Dashboard from './pages/Dashboard/Index';
import Error from './pages/Error/Index';

const PrivateRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path ="/dashboard" element={<Dashboard/>}/>
            <Route path ="*" element={<Error/>}/>
        </Routes>
    </BrowserRouter>
)
export default PrivateRoutes;