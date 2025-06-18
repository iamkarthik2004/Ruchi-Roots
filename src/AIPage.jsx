import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './App.module.css';

function AIPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');

    // Placeholder for Google Gemini AI API call
    // Replace with actual API integration when available
    const aiResponse = {
      sender: 'ai',
      text: `This is a placeholder response. You asked about: "${input}". For a real AI response, integrate the Google Gemini API with your API key and endpoint.`,
    };

    // Example of how to integrate Gemini AI (commented out):
    /*
    try {
      const response = await fetch('https://api.gemini.ai/v1/chat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer YOUR_GEMINI_API_KEY`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `Provide a recipe-related response for: ${input}`,
        }),
      });
      const data = await response.json();
      aiResponse = { sender: 'ai', text: data.response };
    } catch (error) {
      aiResponse = { sender: 'ai', text: 'Error connecting to AI service.' };
    }
    */

    setMessages((prev) => [...prev, aiResponse]);
  };

  return (
    <>
      <header>
        <nav className={styles.nav}>
          <h1>Ruchi Roots 💚🌴</h1>
          <div className={styles.navIcons}>
            <Link to="/" className={styles.aiLink}>
              <i className="fas fa-home"></i> Home
            </Link>
          </div>
        </nav>
      </header>
      <main>
        <section className={styles.chatContainer}>
          <h2>Chat with AI about Recipes</h2>
          <div className={styles.chatBox}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className={styles.chatForm}>
            <input
              type="text"
              placeholder="Ask about recipes..."
              className={styles.chatInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className={styles.chatBtn}>
              Send
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

export default AIPage;