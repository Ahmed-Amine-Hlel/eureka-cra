import { useEffect, useRef, useState } from 'react';
import ChatInput from './components/ChatInput';
import { getRandomPostTitle } from './api';
import ModeToggle from './components/ModeToggle';
import FeedbackDialog from './components/FeedbackDialog';
import { Message } from './types/message';
import MessageDisplay from './components/MessageDisplay';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'up' | 'down' | null>(null);

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<number | null>(
    null
  );
  const [feedbackReason, setFeedbackReason] = useState('');
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

    // simulateBotResponse(botResponse, botMessageId);
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

  const handleFeedback = (messageId: number, feedback: 'up' | 'down') => {
    openFeedbackDialog(messageId, feedback);
  };

  const openFeedbackDialog = (messageId: number, feedback: 'up' | 'down') => {
    setFeedbackDialogOpen(true);
    setFeedbackMessageId(messageId);
    setFeedbackType(feedback);
  };

  const handleFeedbackReasonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFeedbackReason(event.target.value);
  };

  const handleFeedbackSubmit = () => {
    if (feedbackMessageId != null && feedbackType != null) {
      const feedbackValue = `selected-${feedbackType}` as
        | 'selected-up'
        | 'selected-down';

      setMessages(
        messages.map((message) =>
          message.id === feedbackMessageId
            ? {
                ...message,
                feedbackReason,
                feedback: feedbackValue,
                feedbackAnimationCompleted: false,
              }
            : message
        )
      );

      setFeedbackDialogOpen(false);
      setFeedbackReason('');
      setFeedbackMessageId(null);
      setFeedbackType(null);

      setTimeout(() => {
        setMessages(
          messages.map((message) =>
            message.id === feedbackMessageId
              ? { ...message, feedbackAnimationCompleted: true }
              : message
          )
        );
      }, 800);
    }
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
            <MessageDisplay message={message} onFeedback={handleFeedback} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <FeedbackDialog
        open={feedbackDialogOpen}
        feedbackReason={feedbackReason}
        onClose={() => {
          setFeedbackDialogOpen(false);
          setFeedbackReason('');
          setFeedbackMessageId(null);
          setFeedbackType(null);
        }}
        onSubmit={handleFeedbackSubmit}
        onReasonChange={handleFeedbackReasonChange}
      />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;
