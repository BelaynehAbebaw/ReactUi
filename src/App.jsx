import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthRoutes from './routes/AuthRoutes.jsx';
import AppRoutes from './routes/AppRoutes.jsx';
import LoginPage from './features/auth/pages/Login.jsx';

function App() {
  return (
    <Routes>
      {/* Default login page at / */}
      <Route path="/" element={<AuthLayout><LoginPage /></AuthLayout>} />

      {/* Auth routes (login/register) */}
      {AuthRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<AuthLayout>{route.element}</AuthLayout>}
        />
      ))}

      {/* Main app routes (dashboard) */}
      {AppRoutes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<MainLayout>{route.element}</MainLayout>}
        />
      ))}

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
