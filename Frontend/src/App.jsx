import React from 'react';
import AppRoutes from './AppRoutes';
import "./style.scss"
import { AuthProvider } from "./Features/auth/auth.context"
import { PostContextProvider } from "./Features/post/post.context"

const App = () => {
  return (
      <AuthProvider>
        <PostContextProvider>
          <AppRoutes />
        </PostContextProvider>
      </AuthProvider>
  );
}

export default App;