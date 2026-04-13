"use client";

import React from 'react';
import ConvoItem from './ConvoItem';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';

const SidebarList = ({ conversations }) => {
  const params = useParams();
  const activeChatID = params?.id;
  const router = useRouter();

  const handleNewChat = async () => {
    const response = await fetch('/api/all_chats_list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title: "New Chat"})
    });

    if (response.ok) {
      const newChat = await response.json();
      router.refresh();
      router.push(`/UI_components/${newChat.id}`);
    }
  };

  const handleDeleteChat = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this chat?")) return;

    const response = await fetch('/api/all_chats_list', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });

    if (response.ok) {
      router.refresh();
      if (activeChatID == id) {
        router.push('/');
      }
    }
  };

  return (
    <aside id="sidebar" className="sidebar flex flex-col w-60 min-w-[240px] border-r p-4 gap-4 h-full">
      <div className="flex items-center gap-3 pb-4 border-b">
        <span className="ai-title">NEO AI</span>
      </div>
      <button
        className="new-chat-btn flex items-center gap-2 border text-sm font-semibold tracking-widest px-4 py-2.5 rounded-xl uppercase"
        onClick={handleNewChat}
      >
        New Chat
      </button>
      <p className="recent-label">Recent Chats</p>
      <ul className="flex flex-col gap-1 flex-1 overflow-y-auto">
        {conversations.map((chat) => (
          <div key={chat.id} className="group relative">
            <Link href={`/UI_components/${chat.id}`}>
              <ConvoItem label={chat.title} active={activeChatID == chat.id} />
            </Link>
            <button
              onClick={(e) => handleDeleteChat(e, chat.id)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 p-1"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarList;
