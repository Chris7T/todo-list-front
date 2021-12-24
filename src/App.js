import AppRoutes from './routes';
import { AuthProvider } from './contexts/auth';

const App =() => {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  );
}

export default App;
