
import React, { useRef, useEffect } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { useChatbot } from '@/hooks/useChatbot';
import Message from './Message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Smile, Brain } from 'lucide-react';

const ChatInterface: React.FC = () => {
  const { messages, isTyping } = useChatContext();
  const { userInput, setUserInput, handleSendMessage, isInputDisabled } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isInputDisabled) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-harmony-100">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-mind-100 flex items-center justify-center">
            <Brain className="h-5 w-5 text-mind-600" />
          </div>
          <div>
            <h2 className="font-semibold text-harmony-900">MindHelper</h2>
            <p className="text-xs text-harmony-600">Your supportive CBT companion</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 mb-4">
            <div className="bot-message flex items-center h-8 px-4">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-mind-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-mind-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
                <div className="w-2 h-2 bg-mind-400 rounded-full animate-pulse" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element for auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-harmony-100 p-4">
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="icon"
            className="rounded-full w-10 h-10 border-harmony-200 text-harmony-600 hover:text-mind-500 hover:border-mind-300"
          >
            <Smile className="h-5 w-5" />
          </Button>
          
          <Input
            ref={inputRef}
            className="input-field flex-grow"
            placeholder="Type your message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isInputDisabled}
          />
          
          <Button 
            variant="default"
            size="icon"
            className="rounded-full w-10 h-10 bg-mind-500 hover:bg-mind-600 text-white"
            onClick={handleSendMessage}
            disabled={isInputDisabled || !userInput.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
