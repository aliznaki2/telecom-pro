import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authBg from '../assets/auth-bg.png';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 4) {
      setError('Le mot de passe doit contenir au moins 4 caractères');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.fullName }));
    navigate('/');
  };

  const update = (field, value) => setFormData({ ...formData, [field]: value });

  return (
    <div className="auth-page">
      <div className="auth-illustration">
        <img src={authBg} alt="Telecom Network" />
        <div className="auth-illustration-overlay"></div>
        <div className="auth-illustration-content">
          <h2>Rejoignez TelecomPro</h2>
          <p>Créez votre compte et accédez à la plateforme de gestion télécom la plus avancée.</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-container animate-slide-up">
          <h1>Créer un compte</h1>
          <p className="auth-subtitle">Commencez gratuitement en quelques secondes.</p>

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

          <form onSubmit={handleSignup}>
            <div className="form-field">
              <label className="form-label">Nom complet</label>
              <input
                className="form-input"
                value={formData.fullName}
                onChange={e => update('fullName', e.target.value)}
                placeholder="Votre nom et prénom"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Adresse email</label>
              <input
                className="form-input"
                type="email"
                value={formData.email}
                onChange={e => update('email', e.target.value)}
                placeholder="email@exemple.com"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label">Mot de passe</label>
              <div className="password-wrapper">
                <input
                  className="form-input"
                  type={showPwd ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Au moins 4 caractères"
                  required
                  style={{ paddingRight: 42 }}
                />
                <button type="button" className="password-toggle" onClick={() => setShowPwd(!showPwd)}>
                  <i className={`fas ${showPwd ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">Confirmer le mot de passe</label>
              <input
                className="form-input"
                type="password"
                value={formData.confirmPassword}
                onChange={e => update('confirmPassword', e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
              />
            </div>

            <button type="submit" className="btn-primary-gradient" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: 8 }}>
              <i className="fas fa-user-plus"></i>
              Créer mon compte
            </button>
          </form>

          <div className="auth-divider">ou</div>

          <p style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Déjà un compte ?{' '}
            <span className="auth-link" onClick={() => navigate('/login')}>Se connecter</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
