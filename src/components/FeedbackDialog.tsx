import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

interface FeedbackDialogProps {
  open: boolean;
  feedbackReason: string;
  onClose: () => void;
  onSubmit: () => void;
  onReasonChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  open,
  feedbackReason,
  onClose,
  onSubmit,
  onReasonChange,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-container': {
          '& .MuiPaper-root': {
            borderRadius: '20px',
            width: '100%',
            maxWidth: '35rem',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: '#DEE8E0',
          marginBottom: '1rem',
          fontSize: '1rem',
          color: '#000',
          fontWeight: 'bold',
          padding: '1.5rem',
        }}
      >
        Feedback Reason
      </DialogTitle>
      <DialogContent sx={{ margin: '1rem' }}>
        <TextField
          autoFocus
          margin="dense"
          id="feedback"
          label="Feedback Reason"
          type="text"
          fullWidth
          variant="outlined"
          value={feedbackReason}
          onChange={onReasonChange}
        />
      </DialogContent>
      <DialogActions
        sx={{
          padding: '1rem 1.5rem 1.5rem 1.5rem',
          borderTop: '1px solid gray',
        }}
      >
        <Button onClick={onClose} sx={{ color: '#496e98' }}>
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          sx={{
            color: 'white',
            backgroundColor: '#2fa470',
            '&:hover': { backgroundColor: '#27895e' },
            padding: '0.5rem 1rem',
          }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
