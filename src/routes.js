import React, { useContext } from 'react';

 import PrivateRoutes from './privateRoutes';
 import PublicRoutes from './publicRoutes';
 import AuthContext from './contexts/auth';

 const AppRoutes = () => {
   let { token } = useContext(AuthContext);
   return token ? <PrivateRoutes/> : <PublicRoutes/>;
}
 export default AppRoutes