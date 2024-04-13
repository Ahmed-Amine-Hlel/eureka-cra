import React, { useState } from 'react';
import { IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

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

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
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
      <IconButton
        onClick={handleLogout}
        style={{ color: 'gray', margin: '10px' }}
      >
        <LogoutIcon />
      </IconButton>
    </div>
  );
};

export default ModeToggle;
