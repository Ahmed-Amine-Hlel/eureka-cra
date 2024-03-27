export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  feedback?: 'up' | 'down' | 'selected-up' | 'selected-down' | null;
  feedbackAnimationCompleted?: boolean;
  feedbackReason?: string;
}
