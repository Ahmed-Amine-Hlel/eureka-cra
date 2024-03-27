import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SourceAccordion from './SourceAccordion';
import { Message } from '../types/message';

interface MessageDisplayProps {
  message: Message;
  onFeedback: (messageId: number, feedback: 'up' | 'down') => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onFeedback,
}) => {
  return (
    <div key={message.id} style={{ display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '10px',
          background: message.sender === 'user' ? '#E1E3E8' : 'transparent',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          maxWidth: '100%',
        }}
      >
        <div
          style={{
            padding: '6px',
            borderRadius: '12px',
            background: message.sender === 'user' ? '#872341' : '#346751',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
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
            message.text
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
