import React from 'react';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';
import AuthLayout from '../../../layouts/AuthLayout';

const Login = () => {
  const { login, loading, error } = useAuth();

  return (
    <AuthLayout>
      {/* showRegisterLink = true will display "Don't have an account?" */}
      <AuthForm onSubmit={login} isLoading={loading} error={error} showRegisterLink={true} />
    </AuthLayout>
  );
};

export default Login;
