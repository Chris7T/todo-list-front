import React , { useContext} from 'react';
import AuthContext from '../../contexts/auth';
import { Navigate } from 'react-router-dom';

const Error = () => {
    const { token } = useContext(AuthContext);
    if (token) {
        return <Navigate  to="/dashboard" />;
    }

    return (
        <Navigate  to="/" />
    )
}
export default Error;
