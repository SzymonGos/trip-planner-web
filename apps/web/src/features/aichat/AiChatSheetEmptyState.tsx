import { MessageCircle } from 'lucide-react';
import React from 'react';

export const AiChatSheetEmptyState = () => (
  <div className="text-center text-muted-foreground py-8" data-testid="ai-chat-sheet-empty-state">
    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
    <p>Ready to plan your next trip?</p>
    <p className="text-sm mt-2">Tell me your vision and I&apos;ll help you plan it, shape it, and make it happen.</p>
  </div>
);
