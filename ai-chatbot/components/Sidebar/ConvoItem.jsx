"use client";

import React from 'react'

const ConvoItem = ({ label, active = false}) => {
  return (
    <li className={`${active ? "current-session active" : "recent-chat"} px-3 py-2.5 rounded-lg text-sm truncate border`}>
        {label}
    </li>
  )
}

export default ConvoItem
