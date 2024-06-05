import { useEffect, useRef, useState } from 'react';
import { createSession } from '../api';
import MessageDisplay from '../components/MessageDisplay';
import FeedbackDialog from '../components/FeedbackDialog';
import ChatInput from '../components/ChatInput';
import userManager from '../utils/userManager';
import { useSessions } from '../contexts/SessionContext';
import Sidebar from '../components/Sidebar';
import Footer from '../layout/Footer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Message } from '../types/message';

function HomePage() {
  useEffect(() => {
    userManager
      .signinRedirectCallback()
      .then(function (user) {
        if (
          user &&
          user.access_token &&
          user.refresh_token &&
          user.expires_at
        ) {
          localStorage.setItem('access_token', user.access_token);
          localStorage.setItem('refresh_token', user.refresh_token);
          localStorage.setItem('expires_at', user.expires_at.toString());
        } else {
          throw new Error('Failed to retrieve authentication tokens');
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }, []);

  const {
    addSession,
    deleteSession,
    loadMessages,
    sendMessage: sendSessionMessage,
  } = useSessions();
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'up' | 'down' | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackMessageId, setFeedbackMessageId] = useState<string | null>(
    null
  );
  const [feedbackReason, setFeedbackReason] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadSessionMessages = async (sessionId: string) => {
    try {
      await loadMessages(sessionId);
    } catch (error) {
      console.error('Failed to load session messages:', error);
    }
  };

  const handleSessionSelect = (sessionId: string) => {
    setCurrentSessionId(sessionId);
    loadSessionMessages(sessionId);
  };

  const handleSendMessage = async (messageText: string) => {
    setIsLoading(true);
    let botResponse;

    if (!currentSessionId) {
      const timestamp = new Date().toLocaleString();
      const sessionName = `Eureka ${timestamp}`;
      const sessionData = await createSession(messageText);
      await addSession(sessionName, messageText);
      setCurrentSessionId(sessionData.conversation_id);
      botResponse = sessionData.bot_response;
    } else {
      const newMessage = await sendSessionMessage(
        currentSessionId,
        messageText
      );
      botResponse = newMessage.text;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
    };
    setMessages([...messages, userMessage]);

    const botMessageId = (Date.now() + 1000000).toString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: botMessageId, text: 'loading', sender: 'bot' },
    ]);

    simulateBotResponse(botResponse, botMessageId);
  };

  const simulateBotResponse = (botMessage: string, botMessageId: string) => {
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

  const handleNewSession = () => {
    setMessages([]);
    setCurrentSessionId(null);
  };

  const handleSessionDelete = async (sessionId: string) => {
    await deleteSession(sessionId);
    if (sessionId === currentSessionId) {
      setMessages([]);
      setCurrentSessionId(null);
    }
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    openFeedbackDialog(messageId, feedback);
  };

  const openFeedbackDialog = (messageId: string, feedback: 'up' | 'down') => {
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
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <Sidebar
        handleNewSession={handleNewSession}
        handleSessionDelete={handleSessionDelete}
        handleSessionSelect={handleSessionSelect}
        sidebarOpen={sidebarOpen}
      />
      <div
        style={{
          background: '#fff',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <IconButton
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute',
            top: '10px',
            left: sidebarOpen ? '290px' : '10px',
            transition: 'left 0.3s ease',
          }}
        >
          <MenuIcon />
        </IconButton>
        <div
          style={{
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '85%',
            overflow: 'auto',
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
              padding: '32px 12px',
            }}
          >
            {messages.map((message) => (
              <MessageDisplay
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
              />
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
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
