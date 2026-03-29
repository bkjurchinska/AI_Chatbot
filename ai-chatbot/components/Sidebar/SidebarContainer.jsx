"use client";

import React, { use, useEffect, useState } from 'react'
import ConvoItem from '../Sidebar/ConvoItem'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const SidebarContainer = () => {
  const [conversations, setConversations] = useState([]);
  const params = useParams();
  const activeChatID = params?.id; //from [id] folder
  const router = useRouter();

  useEffect(()  => {
    fetch('/api/all_chats_list')
    .then(res => res.json())
    .then(data => setConversations(data));
  }, []);

  const handleNewChat = async () => {
    const response = await fetch('/api/all_chats_list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ title: `New Chat ${conversations.length + 1}` })
    });
    if (response.ok) {
      const newChat = await response.json();
      setConversations([...conversations, newChat]);
      router.push(`/UI_components/${newChat.id}`);
    }
  };

  return (
    <div>
      {/* code from original html file */}
        <aside id="sidebar" className="sidebar flex flex-col w-60 min-w-[240px] border-r p-4 gap-4">
            {/* title */}
          <div className="flex items-center gap-3 pb-4 border-b">
            <span className="ai-title">NEO AI</span>
          </div>
          {/* new chat button */}
          <button className="new-chat-btn flex items-center gap-2 border text-sm font-semibold tracking-widest px-4 py-2.5 rounded-xl uppercase"
            onClick={handleNewChat}>
            New Chat
          </button>
          <p className="recent-label">Recent Chats</p>
          {/* conversation history */}
          <ul className="flex flex-col gap-1 flex-1 overflow-y-auto">
            {conversations.map((chat) => (
              <Link key={chat.id} href={`/UI_components/${chat.id}`}>
                <ConvoItem label={chat.title || chat.label} active={activeChatID === chat.id} />
              </Link>
        ))}
          </ul>
          {/* settings */}
          <div className="settings-cont gap-4 pt-4 border-t text-lg flex">
            <i className="fa fa-cog"></i>
            <i className="fa fa-user-circle"></i>
          </div>
        </aside>
    </div>
  )
}

export default SidebarContainer
