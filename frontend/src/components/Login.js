import React, { useState } from 'react';
import axios from 'axios';

function formatError(err, fallback = 'Authentication failed') {
  if (!err) return '';
  if (typeof err === 'string') return err;
  const detail = err.response?.data?.detail ?? err.detail ?? err.message;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map((d) => (typeof d === 'string' ? d : d.msg || d.message || JSON.stringify(d))).join('; ');
  }
  if (typeof detail === 'object' && detail !== null) {
    return detail.msg || detail.message || JSON.stringify(detail);
  }
  return String(err || fallback);
}

export default function Login({ onLogin }) {
  const [operatorId, setOperatorId] = useState('admin');
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    
    const op = operatorId.trim();
    const key = accessKey.trim();
    if (!op || !key) {
      setError('Please type in your password to authenticate');
      return;
    }

    setLoading(true);
    try {
      const r = await axios.post('/api/login', {
        operator_id: op,
        access_key: key,
      });
      onLogin(r.data.token, r.data.operator_id);
    } catch (err) {
      setError(formatError(err, 'Authentication failed — check password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="glass scanlines login-card" onSubmit={submit}>
        <h1 className="gradient-title">NSA · SERENITY-Ω</h1>
        <p className="sub">SECURE ENCLAVE · PASSWORD REQUIRED</p>
        <div className="field">
          <label>OPERATOR ID</label>
          <input
            value={operatorId}
            onChange={(e) => setOperatorId(e.target.value)}
            placeholder="Enter Operator ID (e.g. admin)"
            autoComplete="username"
          />
        </div>
        <div className="field">
          <label>PASSWORD / ACCESS KEY (REQUIRED)</label>
          <input
            type="password"
            value={accessKey}
            onChange={(e) => setAccessKey(e.target.value)}
            placeholder="Type password here..."
            autoComplete="current-password"
            autoFocus
          />
        </div>
        <button type="submit" disabled={loading || !accessKey.trim()} style={{ width: '100%', marginTop: '8px' }}>
          {loading ? 'AUTHENTICATING ENCLAVE…' : 'UNLOCK TERMINAL'}
        </button>
        {error && <div className="error">{String(error)}</div>}
        <div className="hint" style={{ textAlign: 'center', marginTop: '12px' }}>
          <span>Security Clearance Level 1 · Default Password: <strong>nsa-admin</strong></span>
        </div>
      </form>
    </div>
  );
}
