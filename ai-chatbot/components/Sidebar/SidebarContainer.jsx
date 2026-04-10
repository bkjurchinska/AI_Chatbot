"use client";

import React from 'react'
import ConvoItem from '../Sidebar/ConvoItem'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const SidebarContainer = () => {
  const params = useParams();
  const activeChatID = params?.id; //from [id] folder
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch conversations
  const { data: conversations = [] } = useQuery({
    queryKey: ['conversations'],
    queryFn: async () => {
      const res = await fetch('/api/all_chats_list');
      if (!res.ok) throw new Error('Failed to fetch conversations');
      return res.json();
    }
  });

  const createMutation = useMutation({
    mutationFn: async (title) => {
      const response = await fetch('/api/all_chats_list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      if (!response.ok) throw new Error('Failed to create chat');
      return response.json();
    },
    onSuccess: (newChat) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      router.push(`/UI_components/${newChat.id}`);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch('/api/all_chats_list', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
      if (!response.ok) throw new Error('Failed to delete chat');
      return response.json();
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      if (activeChatID == deletedId) {
        router.push('/');
      }
    }
  });

  const handleNewChat = () => {
    createMutation.mutate(`New Chat ${conversations.length + 1}`);
  };

  const handleDeleteChat = (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this chat?")) return;
    deleteMutation.mutate(id);
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
            <div key={chat.id} className="group relative">
              <Link href={`/UI_components/${chat.id}`}>
                <ConvoItem label={chat.title || chat.label} active={activeChatID == chat.id} />
              </Link>
              <button
                onClick={(e) => handleDeleteChat(e, chat.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 p-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                </svg>
              </button>
            </div>
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
