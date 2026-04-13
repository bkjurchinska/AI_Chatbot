import React from 'react';
import { getMessages } from '@/lib/db';
import ChatClient from './ChatClient';

export default async function ChatPage({ params }) {
  const { id } = await params;
  const conversationId = parseInt(id);

  const messages = await getMessages(conversationId);
  const formattedMessages = messages.map((m) => ({
    id: m.id,
    text: m.content,
    sender: m.role,
    createdAt: m.createdAt,
  }));

  return (
    <ChatClient id={id} initialMessages={formattedMessages} />
  );
}
