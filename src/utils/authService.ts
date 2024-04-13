import userManager from './userManager';

export const refreshTokenIfNeeded = async (): Promise<void> => {
  const expiresAt = localStorage.getItem('expires_at');
  const refreshToken = localStorage.getItem('refresh_token');

  if (!expiresAt || !refreshToken) {
    throw new Error('Authentication data missing');
  }

  const currentTime = new Date().getTime() / 1000;

  if (currentTime > parseFloat(expiresAt)) {
    try {
      const user = await userManager.signinSilent({
        refresh_token: refreshToken,
      });

      if (user.access_token && user.refresh_token && user.expires_at) {
        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('refresh_token', user.refresh_token);
        localStorage.setItem('expires_at', user.expires_at.toString());
      } else {
        throw new Error('Failed to retrieve authentication tokens');
      }
    } catch (error) {
      console.error('Error refreshing token', error);
      throw error;
    }
  }
};
