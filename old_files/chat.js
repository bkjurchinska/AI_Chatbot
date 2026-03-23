export function appendMessage(cont, role, text = "")
{
    const wrapper = document.createElement('div');
    wrapper.className = `flex w-full ${role === 'user' ? 'justify-end' : 'justify-start'}`;

    const msgDiv = document.createElement('div');
    // cyan colour for user and purple for chat
    const bgColor = role === 'user' ? 'bg-cyan-900/30' : 'bg-purple-900/20';
    const borderColor = role === 'user' ? 'border-cyan-500/50' : 'border-purple-500/50';
    const roundCorner = role === 'user' ? 'rounded-l-2xl rounded-br-2xl' : 'rounded-r-2xl rounded-bl-2xl';

    msgDiv.className = `message p-4 border ${bgColor} ${borderColor} ${roundCorner} text-white max-w-[80%] shadow-lg overflow-hidden`;
    msgDiv.innerHTML = `<span class="content leading-relaxed">${text}</span>`;
       
    wrapper.appendChild(msgDiv);
    cont.appendChild(wrapper);
    cont.scrollTop = cont.scrollHeight;
    return msgDiv.querySelector('.content');
}