'use client';

import React from 'react';
import ChatContainer from '../../../components/Chat/ChatContainer';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface ChatProps {
  id: string;
  initialMessages: string[];
}

export default function ChatClient({ id, initialMessages }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: messages } = useQuery({
    queryKey: ['messages', id],
    queryFn: async () => {
      const res = await fetch(`/api/messages?conversationId=${id}`);
      return res.json();
    },
    initialData: initialMessages,
  });

  const sendMutation = useMutation({
    mutationFn: async (text) => {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, conversationId: id }),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', id] });
      router.refresh();
    },
  });

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMutation.mutate(text);
  };

  return (
    <ChatContainer
      messages={initialMessages}
      onSendMessage={handleSend}
      isTyping={sendMutation.isPending}
    />
  );
}
