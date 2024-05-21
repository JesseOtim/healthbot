
import React, { useState } from 'react';
import { getOpenAIResponse } from '../openaiService';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            const newMessage = { text: input, sender: 'user' };
            setMessages([...messages, newMessage]);
            setInput('');

            try {
                const response = await getOpenAIResponse(input);
                setMessages((prevMessages) => [
                    ...prevMessages,
                    newMessage,
                    { text: response, sender: 'bot' },
                ]);
            } catch (error) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    newMessage,
                    { text: 'Error: Unable to fetch response', sender: 'bot' },
                ]);
            }
        }
    };

    return (
        <div>
            <div className="chat-window">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
        </div>
    );
};

export default Chatbot;
