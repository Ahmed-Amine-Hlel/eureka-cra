import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { useSessions } from '../contexts/SessionContext';
import ModeToggle from './ModeToggle';
import { useState, MouseEvent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBoxIcon from '@mui/icons-material/AddBox';

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

  //   console.log('currentSessionId', currentSessionId);

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
        width: 270,
        backgroundColor: '#EEEEEE',
        color: 'black',
        overflow: 'auto',
      }}
    >
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
        <>
          <IconButton
            style={{
              backgroundColor: '#F1F2F6 ',
              margin: '15px',
              alignSelf: 'flex-end',
            }}
            onClick={handleNewSession}
          >
            <AddBoxIcon />
          </IconButton>
          <List
            style={{
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {sessions.map((session) => (
              <ListItemButton
                key={session.id}
                onClick={() => console.log('Session selected:', session.id)}
                //   sx={{
                //     backgroundColor:
                //       session.id === currentSessionId ? '#D6DBF5' : 'inherit',
                //   }}
                divider={true}
              >
                <ListItemText
                  primary={session.name}
                  primaryTypographyProps={{ fontSize: '0.875rem' }}
                />

                <IconButton onClick={(event) => openMenu(event, session.id)}>
                  <MoreHorizIcon style={{ color: 'black' }} />
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </>
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
