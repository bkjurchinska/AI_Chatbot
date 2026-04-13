import React from 'react';
import { getConversations } from '@/lib/db';
import SidebarList from './SidebarList';

const SidebarContainer = async () => {
  const conversations = await getConversations();

  return (
    <SidebarList conversations={conversations} />
  );
};

export default SidebarContainer;
