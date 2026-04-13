'use client';

import React from 'react';
import ChatContainer from '../../../components/Chat/ChatContainer';
import { useChat } from 'ai/react';

export default function ChatClient({
  id,
  initialMessages,
}: {
  id: string;
  initialMessages: any[];
}) {
  const { messages, append, isLoading } = useChat({
    api: '/api/chat',
    body: { conversationId: id },
    initialMessages: initialMessages.map((m: any) => ({
      id: m.id.toString(),
      role: m.sender === 'ai' ? 'assistant' : 'user',
      content: m.text,
    })),
  });

  const formattedMessages = messages.map((m: any) => ({
    id: isNaN(parseInt(m.id)) ? m.id : parseInt(m.id),
    text: m.content,
    sender: m.role === 'assistant' ? 'ai' : 'user',
  }));

  const handleSend = (text: string) => {
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
