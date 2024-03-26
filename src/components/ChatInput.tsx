import React, { useState } from 'react';
import { SendIcon } from '../icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event?: React.FormEvent) => {
    event?.preventDefault();
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const adjustTextareaHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    } else {
      adjustTextareaHeight(
        e as unknown as React.ChangeEvent<HTMLTextAreaElement>
      );
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '48px',
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            border: '1px solid #222831',
            borderRadius: '16px',
            backgroundColor: 'transparent',
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              padding: '8px 20px',
              fontSize: '16px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'inherit',
              fontWeight: 600,
            }}
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: 'transparent',
              border: 'none',
              padding: '12px 16px',
              cursor: isLoading ? 'default' : 'pointer',
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            <SendIcon
              style={{
                width: '24px',
                height: '24px',
                fill: '#222831',
              }}
            />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
