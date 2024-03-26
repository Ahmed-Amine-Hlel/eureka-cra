import { useEffect, useRef, useState } from 'react';
import ChatInput from './components/ChatInput';
import { getRandomPostTitle } from './api';
import { CircularProgress } from '@mui/material';
import ModeToggle from './components/ModeToggle';
import SourceDropdown from './components/SourceDropdown';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    // const botResponse = await getChatbotResponse(messageText);
    const randomPostTitle = await getRandomPostTitle();
    const botMessageId = Date.now() + 1000000;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: botMessageId, text: 'loading', sender: 'bot' },
    ]);

    // setTimeout(() => simulateBotResponse(botResponse, botMessageId), 1500);
    setTimeout(() => simulateBotResponse(randomPostTitle, botMessageId), 1500);
  };

  const simulateBotResponse = (botMessage: string, botMessageId: number) => {
    let currentMessage = '';
    let totalDelay = 0;
    const chars = botMessage.split('');

    chars.forEach((char, index) => {
      const delay = 30;
      totalDelay += delay;

      setTimeout(() => {
        currentMessage += char;
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.id === botMessageId) {
              return { ...msg, text: currentMessage.trim() };
            }
            return msg;
          });
        });

        if (index === chars.length - 1) {
          setIsLoading(false);
        }
      }, totalDelay);
    });
  };
  return (
    <div
      style={{
        background: '#F1F2F6',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <ModeToggle />
      <div
        style={{
          alignSelf: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '50%',
          flex: 1,
          justifyContent: messages.length === 0 ? 'center' : 'flex-start',
        }}
      >
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <div style={{ fontSize: '3rem' }}>Eureka</div>
          {messages.length === 0 && (
            <div style={{ fontSize: '1.25rem', marginTop: '8px' }}>
              How can I help you today?
            </div>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: messages.length === 0 ? 'center' : 'flex-start',
            gap: '16px',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 288px)',
            padding: '32px 12px',
          }}
        >
          {messages.map((message) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  background:
                    message.sender === 'user' ? '#E1E3E8' : 'transparent',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                }}
              >
                <div
                  style={{
                    padding: '6px',
                    borderRadius: '12px',
                    background:
                      message.sender === 'user' ? '#872341' : '#346751',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {message.sender === 'user' ? (
                    <PersonIcon
                      style={{ color: '#F1F2F6', fontSize: '1.75rem' }}
                    />
                  ) : (
                    <SmartToyIcon
                      style={{ color: '#F1F2F6', fontSize: '1.75rem' }}
                    />
                  )}
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    breakInside: 'avoid',
                    flexGrow: 1,
                  }}
                >
                  {message.text === 'loading' ? (
                    <CircularProgress
                      size={16}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    />
                  ) : (
                    message.text
                  )}
                </div>
              </div>
              {message.sender === 'bot' && message.text !== 'loading' && (
                <SourceDropdown />
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
