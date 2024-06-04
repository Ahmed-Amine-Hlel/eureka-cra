import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Session } from '../types/session';
import { createSession, getSessions } from '../api';

type SessionContextType = {
  sessions: Session[];
  deleteSession: (sessionId: string) => void;
  renameSession: (sessionId: string, newName: string) => void;
  createSessionWithMessage: (message: string) => Promise<void>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const sessions = await getSessions();
        setSessions(
          sessions.map((session: any) => ({
            id: session.conversation_id,
            name: session.name,
            createdAt: new Date(session.creation_date),
          }))
        );
      } catch (error) {
        console.error('Failed to fetch sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  const deleteSession = (sessionId: string) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId)
    );
  };

  const renameSession = (sessionId: string, newName: string) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === sessionId ? { ...session, name: newName } : session
      )
    );
  };

  const createSessionWithMessage = async (message: string) => {
    try {
      const session = await createSession(message);
      const newSession: Session = {
        id: session.conversation_id,
        name: session.conversation_name,
        createdAt: new Date(session.conversation_creation_date),
      };
      setSessions((prevSessions) => [newSession, ...prevSessions]);
    } catch (error) {
      console.error('Failed to create session with message:', error);
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        deleteSession,
        renameSession,
        createSessionWithMessage,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessions = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSessions must be used within a SessionProvider');
  }
  return context;
};
