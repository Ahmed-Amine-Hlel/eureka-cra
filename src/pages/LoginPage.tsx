import React from 'react';
import userManager from '../utils/userManager';

const LoginPage = () => {
  const onLoginClick = async () => {
    await userManager.signinRedirect();
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to continue</p>
        <button style={styles.button} onClick={onLoginClick}>
          Login
        </button>
        <p style={styles.ssoText}>Use your company SSO to log in.</p>
      </div>
    </div>
  );
};

export default LoginPage;

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F1F2F6',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px',
  },
  title: {
    fontSize: '24px',
    color: '#333333',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666666',
    marginBottom: '20px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '20px',
    color: '#FFFFFF',
    backgroundColor: '#627254',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    outline: 'none',
  },
  ssoText: {
    marginTop: '20px',
    fontSize: '12px',
    color: '#888888',
  },
};
