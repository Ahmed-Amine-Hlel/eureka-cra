import { UserManager } from 'oidc-client';

const LoginPage = () => {
  const userManager = new UserManager({
    authority:
      'https://itgp.apigee.dev.echonet/auth/oauth2/v2/.well-known/openid-configuration',
    client_id: 'qStb3Z8O7GXIzB1tGmIvhFSe3LaYbBJv',
    redirect_uri: 'http://localhost:3000/callback.com',
    response_type: 'code',
    scope: 'openid',
  });

  const onLoginClick = () => {
    userManager.signinRedirect().catch(function (error) {
      console.error('Failed to login:', error);
    });
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
