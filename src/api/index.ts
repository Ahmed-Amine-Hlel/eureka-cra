import axios from 'axios';
import { refreshTokenIfNeeded } from '../utils/authService';

interface ChatbotApiResponse {
  bot_response: string;
}

const chatbotApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
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

export const getChatbotResponse = async (
  messageText: string,
  conversationHistory?: string
): Promise<string> => {
  try {
    const response = await chatbotApi.post<ChatbotApiResponse>(
      '/chatbot/send-message',
      {
        message: messageText,
        conversation_history: conversationHistory,
      }
    );

    const botResponse = response.data.bot_response;
    return botResponse || 'Sorry, I did not understand that.';
  } catch (error) {
    console.error('Error communicating with the chatbot:', error);
    return 'There was an error processing your request.';
  }
};
