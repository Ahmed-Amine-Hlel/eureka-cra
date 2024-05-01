import React, { useState } from 'react';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import userManager from '../utils/userManager';

interface ModeToggleProps {}

const ModeToggle: React.FC<ModeToggleProps> = () => {
  const [mode, setMode] = useState<'user' | 'admin'>('user');

  const handleModeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMode: 'user' | 'admin' | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expires_at');
      await userManager.signoutRedirect();
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
      <IconButton
        onClick={handleLogout}
        style={{ color: 'gray', margin: '10px' }}
      >
        <LogoutIcon />
      </IconButton>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="User mode"
        size="small"
      >
        <ToggleButton value="user" aria-label="User">
          User
        </ToggleButton>
        <ToggleButton value="admin" aria-label="Admin">
          Admin
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ModeToggle;
