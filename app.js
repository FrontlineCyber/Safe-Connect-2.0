document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('user-input');
  const log = document.getElementById('chat-log');

  const addMessage = (text, sender = 'bot') => {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userText = input.value.trim();
    if (!userText) return;
    addMessage(userText, 'user');
    input.value = '';
    addMessage('⋯', 'bot');
    try {
      const res = await fetch('/.netlify/functions/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();
      log.lastChild.textContent = data.reply;
    } catch (err) {
      log.lastChild.textContent = `Error: ${err.message}`;
    }
  });
});
