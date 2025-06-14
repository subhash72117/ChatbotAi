document.addEventListener('DOMContentLoaded', function() {
    const chatOutput = document.getElementById('chat-output');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    async function sendMessage() {
        const prompt = userInput.value.trim();
        if (prompt === '') return;

        // Display user message
        addMessageToChat(`You: ${prompt}`, 'user-message');
        userInput.value = '';

        try {
            const response = await fetch(`/ask-ai?prompt=${encodeURIComponent(prompt)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const responseText = await response.text();
            addMessageToChat(`AI: ${responseText}`, 'ai-response');
        } catch (error) {
            console.error('Error:', error);
            addMessageToChat(`Error: ${error.message}`, 'ai-response');
        }
    }

    function addMessageToChat(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = className;
        messageDiv.textContent = message;
        chatOutput.appendChild(messageDiv);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());
});