import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsThinking(true);

    try {
      const response = await fetch('http://192.168.1.95:1865/message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.content };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = { role: 'assistant', content: 'Sorry, there was an error processing your request.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-messages" ref={chatMessagesRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {isThinking && <div className="thinking">Thinking...</div>}
      </div>
      <form onSubmit={sendMessage}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
              sendMessage(e);
            }
          }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatInterface;