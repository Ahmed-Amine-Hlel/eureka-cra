import userManager from '../utils/userManager';

const LoginPage = () => {
  const onLoginClick = async () => {
    await userManager.signinRedirect();
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F1F2F6',
    },
    button: {
      padding: '12px 30px',
      fontSize: '20px',
      color: '#fff',
      backgroundColor: '#627254',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
    },
  };

  return (
    <div style={styles.container}>
      <button style={styles.button} onClick={onLoginClick}>
        Login
      </button>
    </div>
  );
};

export default LoginPage;
