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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Feedback Reason</DialogTitle>
      <DialogContent>
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
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDialog;
