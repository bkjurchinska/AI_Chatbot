const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messageList = document.getElementById('message-list');

// AI responses array for demo
const aiResponses = [
  "Neural pathways analyzed. Processing your request...",
  "Quantum algorithms suggest an optimal solution incoming.",
  "Interfacing with the digital realm to retrieve your data...",
  "Cybernetic protocols engaged. How may I enhance your experience?",
  "Matrix connection established. Your query is being processed.",
  "Digital synapses firing. Computing response parameters..."
];

// Function to create typing animation
const typeMessage = (element, text, callback) => {
  let index = 0;
  element.textContent = '';
  
  const typingInterval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 30);
};

// Function to handle sending
const sendMessage = () => {
  const text = chatInput.value.trim();

  if (text !== '') {
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('message', 'user-message');
    
    const userMessageContent = document.createElement('div');
    userMessageContent.classList.add('message-content');
    userMessageContent.textContent = text;
    
    userMessage.appendChild(userMessageContent);
    messageList.appendChild(userMessage);
    
    chatInput.value = '';
    messageList.scrollTop = messageList.scrollHeight;
    
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = document.createElement('div');
      aiMessage.classList.add('message', 'ai-message');
      
      const aiMessageContent = document.createElement('div');
      aiMessageContent.classList.add('message-content');
      
      const typingIndicator = document.createElement('span');
      typingIndicator.classList.add('typing-indicator');
      typingIndicator.textContent = '◉ ';
      
      const messageText = document.createElement('span');
      
      aiMessageContent.appendChild(typingIndicator);
      aiMessageContent.appendChild(messageText);
      aiMessage.appendChild(aiMessageContent);
      messageList.appendChild(aiMessage);
      
      // Type out random AI response
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      typeMessage(messageText, randomResponse);
      
      messageList.scrollTop = messageList.scrollHeight;
    }, 1000);
  }
};

// Visual feedback for button
const animateButton = () => {
  sendBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    sendBtn.style.transform = 'scale(1)';
  }, 100);
};

// Listener 1: Click
sendBtn.addEventListener('click', () => {
  animateButton();
  sendMessage();
});

// Listener 2: Enter Key
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    animateButton();
    sendMessage();
  }
});

// File upload handler
document.getElementById('file-upload').addEventListener('change', function() {
  if (this.files[0]) {
    // Create system message for file upload
    const fileMessage = document.createElement('div');
    fileMessage.classList.add('message', 'ai-message');
    
    const fileMessageContent = document.createElement('div');
    fileMessageContent.classList.add('message-content');
    fileMessageContent.innerHTML = `<span class="typing-indicator">📁</span> File received: <strong>${this.files[0].name}</strong> | Processing...`;
    
    fileMessage.appendChild(fileMessageContent);
    messageList.appendChild(fileMessage);
    messageList.scrollTop = messageList.scrollHeight;
  }
});

// Add glowing effect on input focus
chatInput.addEventListener('focus', () => {
  document.querySelector('.input-wrapper').classList.add('focused');
});

chatInput.addEventListener('blur', () => {
  document.querySelector('.input-wrapper').classList.remove('focused');
});

// Initial animation on load
window.addEventListener('load', () => {
  const firstMessage = document.querySelector('.ai-message .message-content');
  if (firstMessage) {
    const text = firstMessage.textContent;
    typeMessage(firstMessage, text);
  }
});
