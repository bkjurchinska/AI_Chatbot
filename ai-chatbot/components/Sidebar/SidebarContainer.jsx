"use client";

import React from 'react'
import ConvoItem from './Convoitem'

const SidebarContainer = ({ conversations = [], activeChatID, setActiveChatID }) => {
  return (
    <div>
      {/* code from original html file */}
        <aside id="sidebar" className="sidebar flex flex-col w-60 min-w-[240px] border-r p-4 gap-4">
            {/* title */}
          <div className="flex items-center gap-3 pb-4 border-b">
            <span className="ai-title">NEO AI</span>
          </div>
          {/* new chat button */}
          <button className="new-chat-btn flex items-center gap-2 border text-sm font-semibold tracking-widest px-4 py-2.5 rounded-xl uppercase">
            New Chat
          </button>
          {/* conversation history */}
          <ul className="flex flex-col gap-1 flex-1 overflow-y-auto">
            <ConvoItem label="Current Session" active={true} />
            <ConvoItem label="Data Analysis #4" />
            {conversations.map((chat) => (
            <li key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`${activeChatID === chat.id ? "active" : ""} cursor-pointer px-3 py-2.5 rounded-lg border text-sm truncate transition-all`}> 
                {chat.label}
            </li>
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
