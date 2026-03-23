import MsgItem from "./MsgItem";
import ChatInput from "./ChatInput";
import MessageList from "./MsgList";
 
 const ChatContainer = ({ messages, onSendMessage, isTyping }) => {
   return (
     <div className="flex flex-col flex-1 overflow-hidden chat-area">
      <div className="flex items-center justify-between px-6 py-5 border-b border-cyan-400/30 flex-shrink-0 backdrop-blur-md">
        <strong className="chat-title text-white text-lg tracking-wide" style={{fontFamily: 'Orbitron, monospace'}}>Current Session</strong>
      </div>
      <MessageList messages={messages} isTyping={isTyping}/>
      <ChatInput onSendMessage={onSendMessage}/>
    </div>
   )
 }
 
 export default ChatContainer
 