import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;