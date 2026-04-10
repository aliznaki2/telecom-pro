import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authBg from '../assets/auth-bg.png';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    if (email === 'admin@telecom.com' && password === '1234') {
      localStorage.setItem('user', JSON.stringify({ email }));
      navigate('/');
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <img src={authBg} alt="Telecom Network" />
        <div className="auth-illustration-overlay"></div>
        <div className="auth-illustration-content">
          <h2>TelecomPro</h2>
          <p>Plateforme de gestion télécom professionnelle — Gérez vos abonnés, forfaits et factures en un seul endroit.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container animate-slide-up">
          <h1>Connexion</h1>
          <p className="auth-subtitle">Bienvenue ! Connectez-vous pour continuer.</p>

          {error && (
            <div style={{
              padding: '10px 16px',
              background: 'rgba(244,63,94,0.1)',
              border: '1px solid rgba(244,63,94,0.2)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-rose)',
              fontSize: '0.85rem',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              <i className="fas fa-circle-exclamation"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-field">
              <label className="form-label">Adresse email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@telecom.com"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Mot de passe</label>
              <div className="password-wrapper">
                <input
                  className="form-input"
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  required
                  style={{ paddingRight: 42 }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPwd(!showPwd)}
                >
                  <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginBottom: 20 }}>
              <span className="auth-link" style={{ fontSize: '0.82rem' }}>Mot de passe oublié ?</span>
            </div>

            <button type="submit" className="btn-primary-gradient" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
              <i className="fas fa-right-to-bracket"></i>
              Se connecter
            </button>
          </form>

          <div className="auth-divider">ou</div>

          <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Pas encore de compte ?{' '}
            <span className="auth-link" onClick={() => navigate('/signup')}>Créer un compte</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
