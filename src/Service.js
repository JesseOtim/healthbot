// src/openaiService.js
import axios from 'axios';

const API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Replace with the appropriate endpoint

export const getOpenAIResponse = async (prompt) => {
    try {
        const response = await axios.post(
            API_URL,
            {
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error fetching data from OpenAI:', error);
        throw new Error('Failed to fetch response from OpenAI');
    }
};
