import { Loader2 } from 'lucide-react';
import React from 'react';

export const AiChatLoading = () => (
  <div className="flex justify-start">
    <div className="bg-muted rounded-lg px-4 py-2 flex items-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      <span className="text-sm text-muted-foreground">Thinking...</span>
    </div>
  </div>
);
