import axios from 'axios';
// import axios, { AxiosResponse } from 'axios';

// ===================================================================================================

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getRandomPostTitle = async (): Promise<string> => {
  try {
    const response = await api.get('/posts');
    const posts = response.data;
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      return posts[randomIndex].title;
    } else {
      return 'No posts found.';
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return 'There was an error processing your request.';
  }
};

// ===================================================================================================

// interface ChatbotApiResponse {
//   bot_response: string;
// }

// const chatbotApi = axios.create({
//   baseURL: 'https://the.chatbot.api/',
//   headers: {
//     'X-Api-Key': process.env.CHATBOT_API_KEY,
//   },
// });

// export const getChatbotResponse = async (
//   messageText: string,
//   conversationHistory?: string
// ): Promise<string> => {
//   try {
//     const response: AxiosResponse<ChatbotApiResponse> = await chatbotApi.post(
//       '/chatbot/send-message',
//       {
//         message: messageText,
//         conversation_history: conversationHistory,
//       }
//     );

//     const botResponse = response.data.bot_response;
//     return botResponse || 'Sorry, I did not understand that.';
//   } catch (error) {
//     console.error('Error communicating with the chatbot:', error);
//     return 'There was an error processing your request.';
//   }
// };
