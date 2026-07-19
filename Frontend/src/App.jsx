import React from 'react';
import AppRoutes from './AppRoutes';
import "./style.scss"
import Login from './Features/auth/pages/Login';
import { AuthProvider } from "./Features/auth/auth.context.jsx"


const App = () => {
  return (
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>

    
  );
}

export default App;
