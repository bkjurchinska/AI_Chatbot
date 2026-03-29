'use client';

import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    // make sure not to send empty messages
    if (inputValue.trim() === '') return;
    onSendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      id="input-area"
      className="input-area flex-shrink-0 flex items-end gap-4 px-6 py-5 backdrop-blur-md"
    >
      <label
        htmlFor="file-upload"
        className="attach-btn text-xl p-2 flex-shrink-0"
      >
        <i className="fa fa-paperclip"></i>
        <input type="file" id="file-upload" className="hidden" />
      </label>
      <div className="input-wrapper flex-1 relative">
        <textarea
          id="chat-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="1"
          placeholder="Ask NeoAI"
          className="w-full px-5 py-3.5 rounded-3xl text-base resize-none leading-relaxed"
        ></textarea>
      </div>
      <button
        id="send-btn"
        onClick={handleSend}
        className="flex-shrink-0 gap-2 px-6 py-3.5 rounded-3xl font-black text-sm tracking-wide relative"
      >
        <span className="send-icon">➤</span>
      </button>
    </div>
  );
};

export default ChatInput;
