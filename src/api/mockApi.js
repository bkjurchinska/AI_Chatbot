let conversations = [
  { id: "session-1", label: "Current Session" },
  { id: "session-2", label: "Data Analysis #4" }
];

let messagesData = {
  "session-1": [
    { id: 1, text: "Welcome to NEO AI. How can I help?", sender: "ai" },
    { id: 2, text: "Testing mock API", sender: "user" }
  ],
  "session-2": [
    { id: 3, text: "Data analysis complete. Results ready.", sender: "ai" }
  ]
};

export const fetchConversations = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...conversations]), 400); 
  });
};

export const fetchMessages = (chatId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...(messagesData[chatId] || [])]), 400);
  });
};

export const saveMessage = (chatId, message) => {
  return new Promise((resolve) => {
    if (!messagesData[chatId]) messagesData[chatId] = [];
    messagesData[chatId].push(message);
    resolve(message);
  });
};