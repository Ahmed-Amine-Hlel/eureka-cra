import { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatInput from './components/ChatInput';
import { RobotIcon, UserIcon } from './icons';

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

  const handleSendMessage = (messageText: string) => {
    setIsLoading(true);
    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
    };
    setMessages([...messages, newMessage]);

    const botMessageId = Date.now() + 1000000;
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: botMessageId, text: 'loading', sender: 'bot' },
    ]);

    setTimeout(
      () =>
        simulateBotResponse(
          'This is a simulated bot response for your message.',
          botMessageId
        ),
      2000
    );
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
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
          <div style={{ fontSize: '3rem', fontWeight: 'bold' }}>Eureka</div>
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
            <div
              key={message.id}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                padding: '8px 12px',
                borderRadius: '12px',
                background:
                  message.sender === 'user'
                    ? 'rgba(135, 35, 65, 0.25)'
                    : 'transparent',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
                maxWidth: '100%',
              }}
            >
              <div
                style={{
                  padding: '8px',
                  borderRadius: '12px',
                  background: message.sender === 'user' ? '#872341' : '#346751',
                }}
              >
                {message.sender === 'user' ? (
                  <UserIcon
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                    }}
                  />
                ) : (
                  <RobotIcon
                    style={{
                      width: '1.25rem',
                      height: '1.25rem',
                    }}
                  />
                )}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  breakInside: 'avoid',
                }}
              >
                {message.text === 'loading' ? (
                  <div
                    style={{
                      display: 'flex',
                      height: '12px',
                      width: '12px',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        animation:
                          'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
                        position: 'absolute',
                        display: 'inline-flex',
                        height: '100%',
                        width: '100%',
                        borderRadius: 'full',
                        backgroundColor: '#394e6a',
                        opacity: 0.75,
                      }}
                    ></span>
                    <span
                      style={{
                        position: 'relative',
                        display: 'inline-flex',
                        borderRadius: 'full',
                        height: '12px',
                        width: '12px',
                        backgroundColor: '#394e6a',
                      }}
                    ></span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
