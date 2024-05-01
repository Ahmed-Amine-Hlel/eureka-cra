import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SourceAccordion from './SourceAccordion';
import { Message } from '../types/message';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MessageDisplayProps {
  message: Message;
  onFeedback: (messageId: number, feedback: 'up' | 'down') => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onFeedback,
}) => {
  const renderers: { [nodeType: string]: React.ElementType } = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={{
            ...materialDark,
            'pre[class*="language-"]': {
              ...materialDark['pre[class*="language-"]'],
              backgroundColor: '#F1F2F6',
              color: '#000',
            },
            'pre[class*="language-"] > code[class*="language-"]': {
              ...materialDark[
                'pre[class*="language-"] > code[class*="language-"]'
              ],
              backgroundColor: '#F1F2F6',
              border: 'none',
            },
            'code[class*="language-"]': {
              backgroundColor: '#F1F2F6',
              border: 'none',
            },
          }}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  //   const messageText = `well this is the code you requested
  // \`\`\`jsx
  // const ExampleComponent = () => {
  //   return (
  //     <div>
  //       <h1>Hello, World!</h1>
  //       <p>Welcome to our site.</p>
  //     </div>
  //   );
  // };
  // \`\`\`
  // `;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '10px',
          background: message.sender === 'user' ? '#E8EBEF' : 'transparent',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            padding: '6px',
            borderRadius: '100%',
            background: message.sender === 'user' ? '#2fa470' : '#0033A0',
            display: 'flex',
            alignSelf: 'flex-start',
            marginTop: '10px',
          }}
        >
          {message.sender === 'user' ? (
            <PersonIcon style={{ color: '#F1F2F6', fontSize: '1.75rem' }} />
          ) : (
            <SmartToyIcon style={{ color: '#F1F2F6', fontSize: '1.75rem' }} />
          )}
        </div>
        <div style={{ fontSize: '1rem', breakInside: 'avoid', flexGrow: 1 }}>
          {message.text === 'loading' ? (
            <CircularProgress
              size={16}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <ReactMarkdown children={message.text} components={renderers} />
          )}
        </div>
      </div>
      {message.sender === 'bot' && message.text !== 'loading' && (
        <>
          <SourceAccordion />
          {!message.feedbackAnimationCompleted && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: '8px',
                paddingLeft: '20px',
                transition: 'opacity 0.5s ease-in-out',
                opacity:
                  message.feedback && message.feedback.startsWith('selected')
                    ? 0
                    : 1,
              }}
            >
              <ThumbUpOffAltIcon
                onClick={() => onFeedback(message.id, 'up')}
                style={{
                  cursor: 'pointer',
                  marginRight: 8,
                  color:
                    message.feedback === 'selected-up' ? '#163020' : 'inherit',
                  transition: 'transform 0.5s ease',
                  transform:
                    message.feedback === 'selected-up'
                      ? 'scale(1.5)'
                      : 'scale(1)',
                }}
              />
              <ThumbDownOffAltIcon
                onClick={() => onFeedback(message.id, 'down')}
                style={{
                  cursor: 'pointer',
                  color:
                    message.feedback === 'selected-down'
                      ? '#BF3131'
                      : 'inherit',
                  transition: 'transform 0.5s ease',
                  transform:
                    message.feedback === 'selected-down'
                      ? 'scale(1.5)'
                      : 'scale(1)',
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MessageDisplay;
