import React, { useState, useEffect, Component } from 'react';
import Login from './components/Login';
import Terminal from './components/Terminal';

function safeGetStorage(key) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn('localStorage read error:', e);
  }
  return null;
}

function safeSetStorage(key, val) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (val) window.localStorage.setItem(key, val);
      else window.localStorage.removeItem(key);
    }
  } catch (e) {
    console.warn('localStorage write error:', e);
  }
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('Terminal runtime error:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      const msg = typeof this.state.error?.message === 'string'
        ? this.state.error.message
        : typeof this.state.error === 'string'
        ? this.state.error
        : 'Session reset required';
      return (
        <div className="login-wrap">
          <div className="glass scanlines login-card" style="text-align: center;">
            <h1 className="gradient-title">ENCLAVE RECOVERY</h1>
            <p className="sub" style={{ color: '#ff3d71', marginTop: '10px' }}>{msg}</p>
            <button
              onClick={() => {
                safeSetStorage('nsa_token', null);
                safeSetStorage('nsa_operator', null);
                window.location.reload();
              }}
              style={{ marginTop: '16px' }}
            >
              RESTART ENCLAVE
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [token, setToken] = useState(() => safeGetStorage('nsa_token'));
  const [operator, setOperator] = useState(() => safeGetStorage('nsa_operator'));

  useEffect(() => {
    safeSetStorage('nsa_token', token);
    safeSetStorage('nsa_operator', operator);
  }, [token, operator]);

  return (
    <ErrorBoundary>
      {token ? (
        <Terminal
          token={token}
          operator={operator}
          onLogout={() => {
            setToken(null);
            setOperator(null);
            safeSetStorage('nsa_token', null);
            safeSetStorage('nsa_operator', null);
          }}
        />
      ) : (
        <Login
          onLogin={(t, op) => {
            setToken(t);
            setOperator(op);
            safeSetStorage('nsa_token', t);
            safeSetStorage('nsa_operator', op);
          }}
        />
      )}
    </ErrorBoundary>
  );
}
