export const isAuthenticated = (): boolean => {
  const expiresAt = localStorage.getItem('expires_at');
  return (
    expiresAt !== null && parseFloat(expiresAt) > new Date().getTime() / 1000
  );
};
