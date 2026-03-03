
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

const aiResponses = [
  "Neural pathways analyzed. Processing your request...",
  "Quantum algorithms suggest an optimal solution incoming.",
  "Interfacing with the digital realm to retrieve your data...",
  "Cybernetic protocols engaged. How may I enhance your experience?",
  "Matrix connection established. Your query is being processed.",
  "Digital synapses firing. Computing response parameters..."
];

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
const sendMessage = () => {
  const text = chatInput.value.trim();

  if (text !== '') {
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
      messageList.scrollTop = messageList.scrollHeight;
    }, 1000);
  }
};

const animateButton = () => {
  sendBtn.style.transform = 'scale(0.95)';
  setTimeout(() => { sendBtn.style.transform = 'scale(1)'; }, 100);
};

sendBtn.addEventListener('click', () => {
  animateButton();
  sendMessage();
});

chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    animateButton();
    sendMessage();
  }
});

document.getElementById('file-upload').addEventListener('change', function () {
  if (this.files[0]) {
    const fileMsg = document.createElement('chat-message');
    fileMsg.setAttribute('sender', 'ai');
    fileMsg.textContent = `📁 File received: ${this.files[0].name} — Processing...`;
    messageList.appendChild(fileMsg);
    messageList.scrollTop = messageList.scrollHeight;
  }
});

chatInput.addEventListener('focus', () => {
  document.querySelector('.input-wrapper').classList.add('focused');
});
chatInput.addEventListener('blur', () => {
  document.querySelector('.input-wrapper').classList.remove('focused');
});
