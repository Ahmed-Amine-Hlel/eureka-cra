import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from '@mui/material';
import { useSessions } from '../contexts/SessionContext';
import ModeToggle from './ModeToggle';
import { useState, MouseEvent } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface SidebarProps {
  handleNewSession: () => void;
  handleSessionDelete: (sessionId: string) => void;
  sidebarOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleNewSession,
  handleSessionDelete,
  sidebarOpen,
}) => {
  const { sessions, deleteSession, renameSession } = useSessions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [newSessionName, setNewSessionName] = useState<string>('');

  const openMenu = (
    event: MouseEvent<HTMLButtonElement>,
    sessionId: string
  ) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setCurrentSessionId(sessionId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentSessionId(null);
  };

  const handleDelete = () => {
    if (currentSessionId) {
      deleteSession(currentSessionId);
      handleSessionDelete(currentSessionId);
      handleClose();
    }
  };

  const handleDoubleClick = (sessionId: string, sessionName: string) => {
    setEditingSessionId(sessionId);
    setNewSessionName(sessionName);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSessionName(event.target.value);
  };

  const handleNameSubmit = (
    event: React.KeyboardEvent<HTMLDivElement>,
    sessionId: string
  ) => {
    if (event.key === 'Enter') {
      if (newSessionName.trim() === '') {
        setNewSessionName(
          sessions.find((session) => session.id === sessionId)?.name || ''
        );
      } else {
        renameSession(sessionId, newSessionName);
      }
      setEditingSessionId(null);
    }
  };

  const handleBlur = (sessionId: string) => {
    if (newSessionName.trim() === '') {
      setNewSessionName(
        sessions.find((session) => session.id === sessionId)?.name || ''
      );
    } else {
      renameSession(sessionId, newSessionName);
    }
    setEditingSessionId(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: sidebarOpen ? '270px' : '0',
        backgroundColor: '#EEEEEE',
        color: 'black',
        overflow: 'hidden',
        transition: 'width 0.3s ease, opacity 0.3s ease',
        opacity: sidebarOpen ? 1 : 0,
        visibility: sidebarOpen ? 'visible' : 'hidden',
      }}
    >
      {sidebarOpen && (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            padding="15px"
          >
            <Typography
              variant="h6"
              style={{
                flexGrow: 1,
                textAlign: 'start',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              New Chat
            </Typography>
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
          </Box>
          <List
            style={{
              overflowY: 'auto',
              flex: 1,
              width: '100%',
            }}
          >
            {sessions.map((session) => (
              <ListItemButton
                key={session.id}
                onClick={() => console.log('Session selected:', session.id)}
                divider={true}
                style={{ width: '100%' }}
              >
                {editingSessionId === session.id ? (
                  <TextField
                    value={newSessionName}
                    onChange={handleNameChange}
                    onKeyDown={(event) => handleNameSubmit(event, session.id)}
                    onBlur={() => handleBlur(session.id)}
                    autoFocus
                    fullWidth
                  />
                ) : (
                  <ListItemText
                    primary={session.name}
                    primaryTypographyProps={{ fontSize: '0.875rem' }}
                    onDoubleClick={() =>
                      handleDoubleClick(session.id, session.name)
                    }
                  />
                )}
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
