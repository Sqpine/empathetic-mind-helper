
import React, { useEffect, useRef } from 'react';
import { MessageType } from '@/context/ChatContext';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll the message into view when it appears
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(message.timestamp);

  // Format message content to handle line breaks
  const formattedContent = message.content.split('\n').map((line, i) => (
    <React.Fragment key={i}>
      {line}
      {i < message.content.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div 
      ref={messageRef}
      className={cn(
        "mb-4 flex gap-2",
        message.sender === 'user' ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          message.sender === 'user' ? "user-message" : "bot-message",
          message.sender === 'user' ? "animate-slide-in-left" : "animate-slide-in-right"
        )}
      >
        <div className="mb-1">
          {formattedContent}
        </div>
        <div className={cn(
          "text-xs opacity-50 text-right",
          message.sender === 'user' ? "text-mind-600" : "text-harmony-600"
        )}>
          {formattedTime}
        </div>
      </div>
    </div>
  );
};

export default Message;
