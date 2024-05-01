import React from 'react';
import userManager from '../utils/userManager';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const onLoginClick = async () => {
    await userManager.signinRedirect();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Eureka</div>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Sign In</h1>
        <button className={styles.button} onClick={onLoginClick}>
          Sign in with my SSO
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
