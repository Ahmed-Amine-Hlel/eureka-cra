import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useSessions } from '../contexts/SessionContext';
import ModeToggle from './ModeToggle';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useState, MouseEvent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface SidebarProps {
  handleNewSession: () => void;
  handleSessionDelete: (sessionId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleNewSession,
  handleSessionDelete,
}) => {
  const { sessions, deleteSession } = useSessions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const openMenu = (
    event: MouseEvent<HTMLButtonElement>,
    sessionId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentSessionId(sessionId);
  };

  const handleClose = () => {
    console.log('Menu closed');
    setAnchorEl(null);
    setCurrentSessionId(null);
  };

  const handleDelete = () => {
    console.log('Deleting session ID:', currentSessionId);
    if (currentSessionId) {
      deleteSession(currentSessionId);
      handleSessionDelete(currentSessionId);
      handleClose();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: 260,
        backgroundColor: '#EEEEEE',
        color: 'black',
        overflow: 'auto',
      }}
    >
      <IconButton
        style={{
          backgroundColor: '#F1F2F6 ',
          margin: '15px',
          alignSelf: 'flex-end',
        }}
        onClick={handleNewSession}
      >
        <OpenInNewIcon />
      </IconButton>

      {sessions.length === 0 ? (
        <div
          style={{
            overflowY: 'auto',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          No sessions yet
        </div>
      ) : (
        <List
          style={{
            overflowY: 'auto',
            flex: 1,
          }}
        >
          {sessions.map((session) => (
            <ListItem key={session.id}>
              <ListItemText primary={session.name} />

              <IconButton onClick={(event) => openMenu(event, session.id)}>
                <MoreHorizIcon style={{ color: 'black' }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem>Rename</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <ModeToggle />
    </div>
  );
};

export default Sidebar;
