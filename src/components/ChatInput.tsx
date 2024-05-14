import React, { useState } from 'react';
import { SendIcon } from '../icons';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Autocomplete, Button, Chip, TextField } from '@mui/material';
import styled from '@emotion/styled';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

interface ButtonStates {
  Everything: boolean;
  'Data collection': string[];
  Document: string[];
  'Model only': boolean;
  [key: string]: boolean | string[];
}

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderRadius: '30px',
    },
  },
});

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [dataCollection, setDataCollection] = useState<string[]>([]);
  const [document, setDocument] = useState<string[]>([]);

  const [buttonStates, setButtonStates] = useState<ButtonStates>({
    Everything: true,
    'Data collection': [],
    Document: [],
    'Model only': false,
  });

  const handleButtonToggle = (buttonLabel: keyof ButtonStates) => {
    setButtonStates((prev) => ({
      ...prev,
      [buttonLabel]: !prev[buttonLabel],
    }));
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
            borderRadius: '25px',
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
          width: '100%',
        }}
      >
        <Button
          onClick={() => handleButtonToggle('Everything')}
          variant="contained"
          sx={{
            backgroundColor: buttonStates.Everything ? '#344955' : '#289D73',
            color: '#F1F2F6',
            '&:hover': {
              backgroundColor: buttonStates.Everything ? '#2E434E' : '#249E6B',
            },
            borderRadius: '30px',
            padding: '0.5rem 1.5rem',
            boxShadow: 'none',
            border: '1px solid transparent',
          }}
        >
          Everything
        </Button>
        <Autocomplete
          multiple
          id="tags-data-collection"
          options={[
            'Data collection 1',
            'Data collection 2',
            'Data collection 3',
          ]}
          value={dataCollection}
          onChange={(event, newValue) => setDataCollection(newValue)}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <CustomTextField
              {...params}
              variant="outlined"
              label="Data Collection"
              placeholder="Add more"
            />
          )}
          style={{ width: '25%' }}
        />
        <Autocomplete
          multiple
          id="tags-document"
          options={['Document 1', 'Document 2', 'Document 3']}
          value={document}
          onChange={(_event, newValue) => setDocument(newValue)}
          renderTags={(value: string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <CustomTextField
              {...params}
              variant="outlined"
              label="Document"
              placeholder="Add more"
            />
          )}
          style={{ width: '25%' }}
        />
        <Button
          onClick={() => handleButtonToggle('Model only')}
          variant="contained"
          sx={{
            backgroundColor: buttonStates['Model only'] ? '#344955' : '#289D73',
            color: '#F1F2F6',
            '&:hover': {
              backgroundColor: buttonStates['Model only']
                ? '#2E434E'
                : '#249E6B',
            },
            borderRadius: '30px',
            padding: '0.5rem 1.5rem',
            boxShadow: 'none',
            border: '1px solid transparent',
          }}
        >
          Model Only
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
