import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { Session } from '../types/session';
import { Message } from '../types/message';
import {
  getSessions,
  createSession,
  getMessages,
  sendMessage,
  renameSession as apiRenameSession,
  deleteSession,
  sendFeedback as apiSendFeedback,
} from '../api';

type SessionContextType = {
  sessions: Session[];
  messages: Message[];
  fetchMessages: (conversationId: string) => Promise<void>;
  removeSession: (sessionId: string) => void;
  renameSessionInContext: (sessionId: string, newName: string) => void;
  createSessionWithMessage: (message: string) => Promise<Message>;
  sendMessageInSession: (
    conversationId: string,
    message: string
  ) => Promise<Message>;
  sendFeedback: (
    conversationId: string,
    messageId: string,
    feedbackMessage: string,
    isPositiveFeedback: boolean
  ) => Promise<void>;
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

  const removeSession = async (sessionId: string) => {
    try {
      await deleteSession(sessionId);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session.id !== sessionId)
      );
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  const renameSessionInContext = async (sessionId: string, newName: string) => {
    try {
      const updatedSession = await apiRenameSession(sessionId, newName);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.id === sessionId
            ? { ...session, name: updatedSession.name }
            : session
        )
      );
    } catch (error) {
      console.error('Failed to rename session:', error);
    }
  };

  const createSessionWithMessage = async (
    message: string
  ): Promise<Message> => {
    try {
      const session = await createSession(message);
      const newSession: Session = {
        id: session.conversation_id,
        name: session.conversation_name,
        createdAt: new Date(session.conversation_creation_date),
      };
      setSessions((prevSessions) => [newSession, ...prevSessions]);
      const newMessage: Message = {
        userMessage: session.user_message,
        sources: session.sources,
        includedDocuments: session.included_documents,
        allDocumentsIncluded: session.all_documents_included,
        userMessageId: session.user_message_id,
        botResponseId: session.bot_response_id,
        botResponse: session.bot_response,
      };
      setMessages([newMessage]);
      return newMessage;
    } catch (error) {
      console.error('Failed to create session with message:', error);
      throw error;
    }
  };

  const fetchMessages = async (conversationId: string): Promise<void> => {
    try {
      const messages = await getMessages(conversationId);
      setMessages(
        messages.map((message: any) => ({
          userMessage: message.user_message,
          sources: message.sources,
          includedDocuments: message.included_documents,
          allDocumentsIncluded: message.all_documents_included,
          userMessageId: message.user_message_id,
          botResponseId: message.bot_response_id,
          botResponse: message.bot_response,
        }))
      );
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessageInSession = async (
    conversationId: string,
    message: string
  ): Promise<Message> => {
    try {
      const response = await sendMessage(conversationId, message);
      const newMessage: Message = {
        userMessage: response.user_message,
        sources: response.sources,
        includedDocuments: response.included_documents,
        allDocumentsIncluded: response.all_documents_included,
        userMessageId: response.user_message_id,
        botResponseId: response.bot_response_id,
        botResponse: response.bot_response,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      return newMessage;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const sendFeedback = async (
    conversationId: string,
    messageId: string,
    feedbackMessage: string,
    isPositiveFeedback: boolean
  ): Promise<void> => {
    try {
      await apiSendFeedback(
        conversationId,
        messageId,
        feedbackMessage,
        isPositiveFeedback
      );
    } catch (error) {
      console.error('Failed to send feedback:', error);
      throw error;
    }
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        messages,
        fetchMessages,
        removeSession,
        renameSessionInContext,
        createSessionWithMessage,
        sendMessageInSession,
        sendFeedback,
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
