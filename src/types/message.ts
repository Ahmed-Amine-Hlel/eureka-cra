export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: string[];
  includedDocuments?: string[];
  allDocumentsIncluded?: boolean;
  feedbackReason?: string;
  feedback?: 'selected-up' | 'selected-down';
  feedbackAnimationCompleted?: boolean;
};
