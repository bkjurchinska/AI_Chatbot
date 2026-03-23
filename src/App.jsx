import SidebarContainer from "./components/Sidebar/SidebarContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import { fetchConversations, fetchMessages, saveMessage } from "./api/mockApi";
import { useEffect, useState } from "react";
import {API_KEY} from "../config.js";

function App() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatID, setActiveChatID] = useState("session-1");
  const [isTyping, setIsTyping] = useState(false);

  //get conversations when sidebar mounts
  useEffect(() => {
    fetchConversations().then(data => setConversations(data));
  }, []);
  //get conversations when active conversation changes
  useEffect(() => {
    fetchMessages(activeChatID).then(data => setMessages(data));
  }, [activeChatID]);

  //handle user message 
  const handleSendMessage = async (text) => {
    const userMsg = { id: Date.now(), text, sender: "user" };
    
    await saveMessage(activeChatID, userMsg); //save msg to mock API, update ui
    setMessages((prev) => [...prev, userMsg]);

    setIsTyping(true); //start the loading indicator

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_KEY}`, 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "openrouter/free", 
          "messages": [{ "role": "user", "content": text }]
        })
      });
      const data = await response.json();
      const aiText = data.choices[0].message.content;
      const aiMsg = { id: Date.now() + 1, text: aiText, sender: "ai" };
      
      await saveMessage(activeChatID, aiMsg); //save msg to mock api
      setMessages((prev) => [...prev, aiMsg]);

    } 
    catch (error) {
      console.error("AI Fetch Error:", error);
    }
    finally {
      setIsTyping(false);
    }
  };

  // const addMessage = (text, sender = "user") => {
  //   const newMessage = {
  //     id: Date.now(),
  //     text: text,
  //     sender: sender
  //   };
  //   setMessages((prev) => [...prev, newMessage]);
  // };

  return (
    <div className="flex items-center justify-center min-h-screen p-5">
      <div className="app-layout flex w-full h-[700px] rounded-2xl overflow-hidden border-2 relative">
        <SidebarContainer activeChatID={activeChatID} setActiveChatID={setActiveChatID}/>
        <ChatContainer messages={messages} onSendMessage={handleSendMessage} isTyping={isTyping}/>
      </div>
    </div>
  )
}

export default App
