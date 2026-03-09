import {sendMessage} from './api.js';
import {appendMessage} from './chat.js';

const msgList = document.getElementById('message-list');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

//keeping track of chats
let msgHistory = [];

async function handleSend()
{
    //read input value
    const userText = chatInput.value.trim();
    //if input empty
    if(!userText) return;
    //clear the field
    chatInput.value = "";
    //appending user message bubble
    appendMessage(msgList, 'user', userText);
    msgHistory.push({role: "user", content: userText});

    const contentSpan = appendMessage(msgList, 'assistant', "");

    try{
        const fullAIResponse = await sendMessage(msgHistory, (chunk) => {
            contentSpan.innerText = contentSpan.innerText + chunk;
            msgList.scrollTop = msgList.scrollHeight;
        });
        //track conversation history
        msgHistory.push({role: "assistant", content: fullAIResponse});
    }
    catch (error)
    {
        console.error("Streaming failed:", error);
        contentSpan.innerText = "Error: Could not connect to neural network.";
    }
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keydown', (e)=> {
    if(e.key === 'Enter' && !e.shiftKey) 
    {
        e.preventDefault();
        handleSend();
    }
});