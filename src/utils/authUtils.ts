export const isAuthenticated = (): boolean => {
  const expiresAt = localStorage.getItem('expires_at');
  console.log('expiresAt', expiresAt);

  if (expiresAt) {
    const expiresAtTimestamp = new Date(expiresAt).getTime() / 1000;
    console.log('expiresAtTimestamp', expiresAtTimestamp);

    const currentDate = new Date().getTime() / 1000;
    console.log('currentDate', currentDate);

    return expiresAtTimestamp > currentDate;
  }

  return false;
};
