import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Session = {
  id: string;
  name: string;
  createdAt: Date;
};

type SessionContextType = {
  sessions: Session[];
  addSession: (sessionName: string) => void;
  deleteSession: (sessionId: string) => void;
  renameSession: (sessionId: string, newName: string) => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  const addSession = (sessionName: string) => {
    const newSession: Session = {
      id: `session-${Date.now()}`,
      name: sessionName,
      createdAt: new Date(),
    };
    setSessions((prevSessions) => [newSession, ...prevSessions]);
  };

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

  return (
    <SessionContext.Provider
      value={{ sessions, addSession, deleteSession, renameSession }}
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
