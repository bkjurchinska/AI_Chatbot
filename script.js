const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messageList = document.getElementById('message-list');

// Function to handle sending
const sendMessage = () => {
  const text = chatInput.value.trim();

  if (text !== '') {
    const newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.classList.add('user-message');
    newMessage.textContent = text;

    messageList.appendChild(newMessage);
    chatInput.value = '';
    messageList.scrollTop = messageList.scrollHeight;
  }
};

// Listener 1: Click
sendBtn.addEventListener('click', sendMessage);

// Listener 2: Enter Key (Now independent)
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});