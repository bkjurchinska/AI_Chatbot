"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ChatContainer from "../../../components/Chat/ChatContainer";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  //fetch messages
  useEffect(() => {
    if (!id) return;
    setMessages([]); //clear old msgs when switching sessions

    fetch(`/api/messages?userId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMessages(Array.isArray(data) ? data : []); //make sure data is an array
      })
      .catch((err) => console.error("Failed to fetch messages", err));
  }, [id]);

  const handleSend = async (text: string) => {
    //make sure no empty messages are sent
    console.log("Sending message:", text);
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((prev) => [...(Array.isArray(prev) ? prev : []), userMsg]);
    setIsTyping(true);
    ///calling server side api
    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId: id }),
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const aiMsg = await response.json();

      if (aiMsg && aiMsg.text) {
        setMessages((prev) => [...(Array.isArray(prev) ? prev : []), aiMsg]);
      } else console.error("Response error", aiMsg);
    } catch (error) {
      console.error("Error in sending message", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ChatContainer
      messages={messages}
      onSendMessage={handleSend}
      isTyping={isTyping}
    />
  );
}
