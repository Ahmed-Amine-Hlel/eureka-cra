import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import SourceAccordion from './SourceAccordion';
import { Message } from '../types/message';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

interface MessageDisplayProps {
  message: Message;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
}

const MessageDisplay: React.FC<MessageDisplayProps> = ({
  message,
  onFeedback,
}) => {
  const [copied, setCopied] = useState(false);

  const renderers: { [nodeType: string]: React.ElementType } = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');

      return !inline && match ? (
        <div style={{ position: 'relative' }}>
          <CopyToClipboard text={codeString} onCopy={() => setCopied(true)}>
            <Tooltip
              title={copied ? 'Copied!' : 'Copy to clipboard'}
              arrow
              onClose={() => setCopied(false)}
            >
              <ContentCopyIcon
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  cursor: 'pointer',
                  color: '#555',
                  zIndex: 1,
                }}
              />
            </Tooltip>
          </CopyToClipboard>
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
            {codeString}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: message.userMessageId ? 'flex-end' : 'flex-start',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          padding: message.userMessageId ? '0 12px' : '8px 12px',
          borderRadius: '10px',
          background: message.userMessageId ? '#E8EBEF' : '#F1F2F6',
          maxWidth: '60%',
          flexGrow: 1,
        }}
      >
        {message.botResponseId && (
          <div
            style={{
              padding: '6px',
              borderRadius: '100%',
              background: '#0033A0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-start',
            }}
          >
            <SmartToyIcon style={{ color: '#F1F2F6', fontSize: '1.75rem' }} />
          </div>
        )}
        <div style={{ fontSize: '1rem', flex: 1 }}>
          {message.botResponse === 'loading' ? (
            <CircularProgress
              size={16}
              style={{ display: 'flex', alignItems: 'center' }}
            />
          ) : (
            <ReactMarkdown
              children={message.botResponse}
              components={renderers}
            />
          )}
        </div>
      </div>
      {message.botResponseId && message.botResponse !== 'loading' && (
        <>
          <SourceAccordion sources={message.sources} />
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
                onClick={() => onFeedback(message.userMessageId, 'up')}
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
                onClick={() => onFeedback(message.userMessageId, 'down')}
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
