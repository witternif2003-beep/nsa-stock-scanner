import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('nsa_token'));
  const [operator, setOperator] = useState(() => localStorage.getItem('nsa_operator'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('nsa_token', token);
    } else {
      localStorage.removeItem('nsa_token');
    }
    if (operator) {
      localStorage.setItem('nsa_operator', operator);
    } else {
      localStorage.removeItem('nsa_operator');
    }
  }, [token, operator]);

  const login = useCallback(async (operatorId, accessKey) => {
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/login', {
        operator_id: operatorId,
        access_key: accessKey,
      });
      setToken(res.data.token);
      setOperator(res.data.operator_id);
      return res.data;
    } catch (err) {
      const msg = err.response?.data?.detail || 'Authentication failed';
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setOperator(null);
    localStorage.removeItem('nsa_token');
    localStorage.removeItem('nsa_operator');
  }, []);

  return { token, operator, login, logout, error, loading };
}

export default useAuth;
