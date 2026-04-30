"use client";

import { useParams } from "next/navigation";
import ChatContainer from "../../../components/Chat/ChatContainer";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function ChatPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch messages
  const { data: messages = [] } = useQuery({
    queryKey: ["messages", id],
    queryFn: async () => {
      if (!id) return [];
      const res = await fetch(`/api/messages?conversationId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch messages");
      return res.json();
    },
    enabled: !!id,
  });

  // Send message mutation
  const sendMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, conversationId: id }),
      });
      if (!response.ok) throw new Error("Failed to send message");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMutation.mutate(text);
  };

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={handleSend}
      isTyping={sendMutation.isPending}
    />
  );
}
