import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../services/authService';
import { setAuth } from '../../../store/authSlice';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
        console.log(email)
      const data = await LoginUser(email, password);
      dispatch(setAuth(data)); // save token & user info in redux
      localStorage.setItem('token', data.token); // persist login
      navigate('/dashboard'); // redirect after login
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
