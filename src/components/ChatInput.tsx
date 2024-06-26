import React, { useState } from 'react';
import { SendIcon } from '../icons';
import SplitButton from './SplitButton';
import TextareaAutosize from '@mui/material/TextareaAutosize';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleSelect = (selectedOption: string) => {
    console.log(`Selected option: ${selectedOption}`);
    setSelectedButton(selectedOption);
  };

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
      if (!isLoading) {
        handleSubmit();
      }
    } else {
      adjustTextareaHeight(
        e as unknown as React.ChangeEvent<HTMLTextAreaElement>
      );
    }
  };

  const splitButtonOptions = [
    [],
    ['Data collection 1', 'Data collection 2', 'Data collection 3'],
    ['Document 1', 'Document 2', 'Document 3'],
    [],
  ];

  const buttons = [
    'Everything',
    'Data collection',
    'Document',
    'Model only',
  ].map((label, index) => {
    const hasSubs = label === 'Data collection' || label === 'Document';
    return (
      <SplitButton
        key={label}
        buttonLabel={label}
        options={hasSubs ? splitButtonOptions[index] : []}
        isSplit={hasSubs}
        onSelect={handleSelect}
        isSelected={!!selectedButton && selectedButton.startsWith(label)}
      />
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '20px',
        alignItems: 'center',
        marginBottom: '48px',
        width: '100%',
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
          <TextareaAutosize
            minRows={1}
            style={{
              width: '100%',
              padding: '8px 20px',
              fontSize: '14px',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              resize: 'none',
              overflow: 'hidden',
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        {buttons}
      </div>
    </div>
  );
};

export default ChatInput;
