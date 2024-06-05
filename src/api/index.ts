import axios from 'axios';
import { refreshTokenIfNeeded } from '../utils/authService';
import { Message } from '../types/message';

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

const chatbotApi = axios.create({
  baseURL: API_BASE_URL,
});

chatbotApi.interceptors.request.use(
  async (config) => {
    try {
      await refreshTokenIfNeeded();
      const accessToken = localStorage.getItem('access_token');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (error) {
      console.error('Failed to refresh token', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fetch all sessions (Conversations)
export const getSessions = async () => {
  try {
    const response = await chatbotApi.get('/chatbot/conversations');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    throw error;
  }
};

// Create a new session (conversation) with the first message
export const createSession = async (message: string) => {
  try {
    const response = await chatbotApi.post('/chatbot/conversations', {
      message,
      included_documents: [],
      all_documents_included: false,
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
};

// Get conversation by ID
export const getSessionById = async (conversationId: string) => {
  try {
    const response = await chatbotApi.get(
      `/chatbot/conversations/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch session with ID ${conversationId}:`, error);
    throw error;
  }
};

// Rename a conversation
export const renameSession = async (
  conversationId: string,
  newName: string
) => {
  try {
    const response = await chatbotApi.patch(
      `/chatbot/conversations/${conversationId}`,
      { name: newName }
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to rename session with ID ${conversationId}:`, error);
    throw error;
  }
};

// Delete a conversation
export const deleteSession = async (conversationId: string) => {
  try {
    const response = await chatbotApi.delete(
      `/chatbot/conversations/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to delete session with ID ${conversationId}:`, error);
    throw error;
  }
};

// Get conversation messages
export const getSessionMessages = async (conversationId: string) => {
  try {
    const response = await chatbotApi.get(
      `/chatbot/conversations/${conversationId}/messages`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch messages for session with ID ${conversationId}:`,
      error
    );
    throw error;
  }
};

// Send message and get bot response
export const sendMessage = async (
  conversationId: string,
  message: string,
  includedDocuments: string[] = [],
  allDocumentsIncluded: boolean = false
): Promise<Message> => {
  try {
    const response = await chatbotApi.post(
      `/chatbot/conversations/${conversationId}/messages`,
      {
        message,
        included_documents: includedDocuments,
        all_documents_included: allDocumentsIncluded,
      }
    );
    const data = response.data;
    return {
      id: data.user_message_id || data.bot_response_id,
      text: data.user_message || data.bot_response,
      sender: data.user_message ? 'user' : 'bot',
      sources: data.sources,
      includedDocuments: data.included_documents,
      allDocumentsIncluded: data.all_documents_included,
    };
  } catch (error) {
    console.error(
      `Failed to send message to session with ID ${conversationId}:`,
      error
    );
    throw error;
  }
};
