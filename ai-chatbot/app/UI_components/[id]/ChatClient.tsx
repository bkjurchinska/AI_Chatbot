'use client';

import React from 'react';
import ChatContainer from '../../../components/Chat/ChatContainer';
import { useChat, Message } from 'ai/react';

interface ChatClientProps {
  id: string;
  initialMessages: {
    id: string | number;
    sender: 'ai' | 'user';
    text: string;
  }[];
}

export default function ChatClient({ id, initialMessages }: ChatClientProps) {
  // 1. Map messages from DB to AI SDK format safely
  const memoizedInitialMessages = React.useMemo<Message[]>(() => {
    return (initialMessages || []).map((m) => ({
      id: m.id.toString(),
      role: m.sender === 'ai' ? 'assistant' : 'user',
      content: m.text || '', // Fallback to empty string
    }));
  }, [initialMessages]);

  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    body: { conversationId: id },
    initialMessages: memoizedInitialMessages,
  });

  // 2. Map messages from AI SDK back to your UI format safely
  const formattedMessages = React.useMemo(() => {
    return messages.map((m) => ({
      id: m.id,
      text: m.content || '', // Crucial: prevents .replace() error on undefined
      sender: m.role === 'assistant' ? 'ai' : 'user',
    }));
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    append({
      role: 'user',
      content: text,
    });
  };

  return (
    <ChatContainer
      messages={formattedMessages}
      onSendMessage={handleSend}
      isTyping={isLoading}
    />
  );
}
