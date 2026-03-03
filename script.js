<<<<<<< HEAD

class ChatMessage extends HTMLElement {

  static get observedAttributes() {
    return ['sender'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const sender = this.getAttribute('sender'); 
    const text   = this.textContent.trim();     
    // ai answer
    if (sender === 'ai') {
      this.innerHTML = `
        <div class="flex justify-start">
          <div class="max-w-[75%] px-5 py-4 rounded-2xl text-lg leading-relaxed"
               style="color: #00ffff; animation: message-appear 0.3s ease-out;">
            <div class="flex items-center gap-2">
              <span class="typing-indicator" style="color: #00ff88;">◉</span>
              <span>${text}</span>
            </div>
          </div>
        </div>
      `;
    // user question
    } else {
      this.innerHTML = `
        <div class="flex justify-end">
          <div class="max-w-[75%] px-5 py-4 rounded-2xl text-base leading-relaxed border"
               style="color: #ff00ff; background: rgba(255,0,255,0.1); border-color: rgba(255,0,255,0.3); box-shadow: 0 0 15px rgba(255,0,255,0.2); animation: message-appear 0.3s ease-out;">
            ${text}
          </div>
        </div>
      `;
    }
  }
}

customElements.define('chat-message', ChatMessage);


const sendBtn     = document.getElementById('send-btn');
const chatInput   = document.getElementById('chat-input');
const messageList = document.getElementById('message-list');

=======
const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messageList = document.getElementById('message-list');

// AI responses array for demo
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
const aiResponses = [
  "Neural pathways analyzed. Processing your request...",
  "Quantum algorithms suggest an optimal solution incoming.",
  "Interfacing with the digital realm to retrieve your data...",
  "Cybernetic protocols engaged. How may I enhance your experience?",
  "Matrix connection established. Your query is being processed.",
  "Digital synapses firing. Computing response parameters..."
];

<<<<<<< HEAD
const typeMessage = (element, text, callback) => {
  let index = 0;
  element.textContent = '';

=======
// Function to create typing animation
const typeMessage = (element, text, callback) => {
  let index = 0;
  element.textContent = '';
  
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
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
<<<<<<< HEAD
=======

// Function to handle sending
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
const sendMessage = () => {
  const text = chatInput.value.trim();

  if (text !== '') {
<<<<<<< HEAD
    const userMsg = document.createElement('chat-message');
    userMsg.setAttribute('sender', 'user');
    userMsg.textContent = text;
    messageList.appendChild(userMsg);

    chatInput.value = '';
    messageList.scrollTop = messageList.scrollHeight;

    setTimeout(() => {
      const aiMsg = document.createElement('chat-message');
      aiMsg.setAttribute('sender', 'ai');

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      aiMsg.textContent = randomResponse;

      messageList.appendChild(aiMsg);
=======
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
      
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
      messageList.scrollTop = messageList.scrollHeight;
    }, 1000);
  }
};

<<<<<<< HEAD
const animateButton = () => {
  sendBtn.style.transform = 'scale(0.95)';
  setTimeout(() => { sendBtn.style.transform = 'scale(1)'; }, 100);
};

=======
// Visual feedback for button
const animateButton = () => {
  sendBtn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    sendBtn.style.transform = 'scale(1)';
  }, 100);
};

// Listener 1: Click
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
sendBtn.addEventListener('click', () => {
  animateButton();
  sendMessage();
});

<<<<<<< HEAD
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
=======
// Listener 2: Enter Key
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
    animateButton();
    sendMessage();
  }
});

<<<<<<< HEAD
document.getElementById('file-upload').addEventListener('change', function () {
  if (this.files[0]) {
    const fileMsg = document.createElement('chat-message');
    fileMsg.setAttribute('sender', 'ai');
    fileMsg.textContent = `📁 File received: ${this.files[0].name} — Processing...`;
    messageList.appendChild(fileMsg);
=======
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
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
    messageList.scrollTop = messageList.scrollHeight;
  }
});

<<<<<<< HEAD
chatInput.addEventListener('focus', () => {
  document.querySelector('.input-wrapper').classList.add('focused');
});
chatInput.addEventListener('blur', () => {
  document.querySelector('.input-wrapper').classList.remove('focused');
});
=======
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
>>>>>>> 2c7cf3fc572ec9f0e360fc7c4621057d5eb53e4d
