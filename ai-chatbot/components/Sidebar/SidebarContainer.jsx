import React from 'react';
import { getConversations } from '@/lib/db';
import SidebarList from './SidebarList';
import { unstable_noStore as noStore } from 'next/cache';

const SidebarContainer = async () => {
  noStore();
  const conversations = await getConversations();

  return (
    <SidebarList conversations={conversations} />
  );
};

export default SidebarContainer;
