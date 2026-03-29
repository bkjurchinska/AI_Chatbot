"use client";

import React from 'react'

const MsgItem = ({ text, sender }) => {
    const alignment = sender === 'ai' ? 'self-start' : 'self-end';
  return (
    <div className={`message p-4 rounded-xl ${alignment} text-white max-w-[80%]`}>
        {text}
    </div>
  );
}

export default MsgItem
