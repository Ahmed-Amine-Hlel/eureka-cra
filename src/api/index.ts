import axios from 'axios';
import { refreshTokenIfNeeded } from '../utils/authService';

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
    const response = await chatbotApi.get(
      `${API_BASE_URL}/chatbot/conversations`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    throw error;
  }
};

// Fetch messages for a specific session (conversation)
export const getMessages = async (conversationId: string) => {
  try {
    const response = await chatbotApi.get(
      `/chatbot/conversations/${conversationId}/messages`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    throw error;
  }
};

// Create a new session (conversation)
export const createSession = async (message: string) => {
  try {
    const response = await chatbotApi.post(
      `${API_BASE_URL}/chatbot/conversations`,
      {
        message,
        included_documents: [],
        all_documents_included: false,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
};

// Send a message in a specific session (conversation)
export const sendMessage = async (conversationId: string, message: string) => {
  try {
    const response = await chatbotApi.post(
      `/chatbot/conversations/${conversationId}/messages`,
      {
        message,
        included_documents: [],
        all_documents_included: false,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to send message:', error);
    throw error;
  }
};

// Rename a session (conversation)
export const renameSession = async (conversationId: string, name: string) => {
  try {
    const response = await chatbotApi.patch(
      `/chatbot/conversations/${conversationId}`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to rename session:', error);
    throw error;
  }
};

// Delete a session (conversation)
export const deleteSession = async (conversationId: string) => {
  try {
    const response = await chatbotApi.delete(
      `/chatbot/conversations/${conversationId}`
    );
    return response.data;
  } catch (error) {
    console.error('Failed to delete session:', error);
    throw error;
  }
};
