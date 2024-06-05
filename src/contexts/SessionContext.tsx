import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  getSessions,
  createSession,
  deleteSession as apiDeleteSession,
  renameSession as apiRenameSession,
  getSessionMessages as apiGetSessionMessages,
  sendMessage as apiSendMessage,
} from '../api';
import { Session } from '../types/session';
import { Message } from '../types/message';

type SessionContextType = {
  sessions: Session[];
  messages: Message[];
  addSession: (sessionName: string, initialMessage: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  renameSession: (sessionId: string, newName: string) => Promise<void>;
  loadMessages: (sessionId: string) => Promise<void>;
  sendMessage: (
    sessionId: string,
    message: string,
    includedDocuments?: string[],
    allDocumentsIncluded?: boolean
  ) => Promise<Message>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

type SessionProviderProps = {
  children: ReactNode;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await getSessions();
        const formattedSessions = data.map((session: any) => ({
          id: session.conversation_id,
          name: session.name,
          createdAt: new Date(session.creation_date),
        }));
        setSessions(formattedSessions);
      } catch (error) {
        console.error('Failed to load sessions:', error);
      }
    };

    loadSessions();
  }, []);

  const addSession = async (sessionName: string, initialMessage: string) => {
    try {
      const data = await createSession(initialMessage);
      const newSession: Session = {
        id: data.conversation_id,
        name: sessionName,
        createdAt: new Date(data.conversation_creation_date),
      };
      setSessions((prevSessions) => [newSession, ...prevSessions]);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const deleteSession = async (sessionId: string) => {
    try {
      await apiDeleteSession(sessionId);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const renameSession = async (sessionId: string, newName: string) => {
    try {
      await apiRenameSession(sessionId, newName);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId ? { ...session, name: newName } : session
        )
      );
    } catch (error) {
      console.error('Failed to rename session:', error);
    }
  };

  const loadMessages = async (sessionId: string) => {
    try {
      const data = await apiGetSessionMessages(sessionId);
      const formattedMessages = data.map((message: any) => ({
        id: message.user_message_id || message.bot_response_id,
        text: message.user_message || message.bot_response,
        sender: message.user_message ? 'user' : 'bot',
        sources: message.sources,
        includedDocuments: message.included_documents,
        allDocumentsIncluded: message.all_documents_included,
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error(
        `Failed to load messages for session with ID ${sessionId}:`,
        error
      );
    }
  };

  const sendMessage = async (
    sessionId: string,
    message: string,
    includedDocuments: string[] = [],
    allDocumentsIncluded: boolean = false
  ): Promise<Message> => {
    try {
      const newMessage = await apiSendMessage(
        sessionId,
        message,
        includedDocuments,
        allDocumentsIncluded
      );
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      return newMessage;
    } catch (error) {
      console.error(
        `Failed to send message to session with ID ${sessionId}:`,
        error
      );
      throw error;
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        messages,
        addSession,
        deleteSession,
        renameSession,
        loadMessages,
        sendMessage,
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
