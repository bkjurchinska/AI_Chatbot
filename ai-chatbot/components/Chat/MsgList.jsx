"use client";

import React from 'react';
import MessageItem from './MsgItem';

const MessageList = ({ messages, isTyping }) => {
  return (
    <div id="message-list" className="flex-1 overflow-y-auto flex flex-col gap-4 p-6">
      {messages.map((msg) => (
        <MessageItem key={msg.id} text={msg.text} sender={msg.sender} />
      ))}

      {/* loading indicator */}
      {isTyping && (
        <div className="indicator_cont flex justify-start">
            <div className="typing_indicator px-4 py-2 text-sm rounded-2xl animate-pulse">
                NEO AI is thinking...
            </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;