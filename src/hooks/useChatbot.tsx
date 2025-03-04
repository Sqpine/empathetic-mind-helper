
import { useState, useEffect, useCallback } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { getResponseForMessage } from '@/utils/cbtTechniques';

export const useChatbot = () => {
  const { addMessage, setIsTyping } = useChatContext();
  const [userInput, setUserInput] = useState('');
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const simulateTyping = useCallback((text: string) => {
    return new Promise<void>((resolve) => {
      setIsTyping(true);
      
      // Calculate a realistic typing delay (roughly 30-70ms per character, with variance)
      const baseDelay = 1000; // Initial thinking time
      const perCharDelay = Math.min(
        3000, // Cap the total delay at 3 seconds 
        baseDelay + text.length * 30 + Math.random() * 500
      );
      
      setTimeout(() => {
        setIsTyping(false);
        addMessage(text, 'bot');
        resolve();
      }, perCharDelay);
    });
  }, [addMessage, setIsTyping]);

  const handleSendMessage = useCallback(async () => {
    if (!userInput.trim()) return;
    
    const trimmedInput = userInput.trim();
    setUserInput('');
    setIsInputDisabled(true);
    
    // Add user message immediately
    addMessage(trimmedInput, 'user');
    
    try {
      // Get chatbot response
      const response = await getResponseForMessage(trimmedInput);
      
      // Simulate typing for response
      await simulateTyping(response);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      await simulateTyping("I'm sorry, I'm having trouble processing that right now. Could you try again or phrase it differently?");
    } finally {
      setIsInputDisabled(false);
    }
  }, [userInput, addMessage, simulateTyping]);

  return {
    userInput,
    setUserInput,
    handleSendMessage,
    isInputDisabled
  };
};
