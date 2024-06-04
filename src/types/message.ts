// export interface Message {
//   id: number;
//   text: string;
//   sender: 'user' | 'bot';
//   feedback?: 'up' | 'down' | 'selected-up' | 'selected-down' | null;
//   feedbackAnimationCompleted?: boolean;
//   feedbackReason?: string;
// }

export type Message = {
  userMessage: string;
  sources: string[];
  includedDocuments: string[];
  allDocumentsIncluded: boolean;
  userMessageId: string;
  botResponseId: string;
  botResponse: string;
  feedback?: 'selected-up' | 'selected-down';
  feedbackAnimationCompleted?: boolean;
};
