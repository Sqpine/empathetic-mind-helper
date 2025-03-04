
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export type MoodType = 'great' | 'good' | 'neutral' | 'low' | 'bad';

export type ThoughtType = {
  id: string;
  situation: string;
  automaticThought: string;
  emotion: string;
  intensity: number;
  evidence: string;
  alternativeThought: string;
  newEmotion: string;
  newIntensity: number;
  createdAt: Date;
};

type ChatContextType = {
  messages: MessageType[];
  addMessage: (content: string, sender: 'user' | 'bot') => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  currentMood: MoodType;
  setCurrentMood: (mood: MoodType) => void;
  moodHistory: Array<{ mood: MoodType; timestamp: Date }>;
  thoughts: ThoughtType[];
  addThought: (thought: Omit<ThoughtType, 'id' | 'createdAt'>) => void;
  clearChat: () => void;
};

// Create context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Create the provider component
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<MoodType>('neutral');
  const [moodHistory, setMoodHistory] = useState<Array<{ mood: MoodType; timestamp: Date }>>([]);
  const [thoughts, setThoughts] = useState<ThoughtType[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedMoodHistory = localStorage.getItem('moodHistory');
    const savedThoughts = localStorage.getItem('thoughts');

    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        // Convert string timestamps back to Date objects
        const messagesWithDateObjects = parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    } else {
      // Initial welcome message
      setMessages([
        {
          id: '1',
          content: "Hello, I'm MindHelper, your supportive companion. How are you feeling today?",
          sender: 'bot',
          timestamp: new Date()
        }
      ]);
    }

    if (savedMoodHistory) {
      try {
        const parsedMoodHistory = JSON.parse(savedMoodHistory);
        const moodHistoryWithDateObjects = parsedMoodHistory.map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp)
        }));
        setMoodHistory(moodHistoryWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved mood history:', error);
      }
    }

    if (savedThoughts) {
      try {
        const parsedThoughts = JSON.parse(savedThoughts);
        const thoughtsWithDateObjects = parsedThoughts.map((thought: any) => ({
          ...thought,
          createdAt: new Date(thought.createdAt)
        }));
        setThoughts(thoughtsWithDateObjects);
      } catch (error) {
        console.error('Error parsing saved thoughts:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (moodHistory.length > 0) {
      localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    }
  }, [moodHistory]);

  useEffect(() => {
    if (thoughts.length > 0) {
      localStorage.setItem('thoughts', JSON.stringify(thoughts));
    }
  }, [thoughts]);

  // Update mood history when current mood changes
  useEffect(() => {
    setMoodHistory(prev => [...prev, { mood: currentMood, timestamp: new Date() }]);
  }, [currentMood]);

  // Add a new message
  const addMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  // Add a new thought record
  const addThought = (thought: Omit<ThoughtType, 'id' | 'createdAt'>) => {
    const newThought: ThoughtType = {
      ...thought,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    setThoughts(prev => [...prev, newThought]);
  };

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        content: "Hello, I'm MindHelper, your supportive companion. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  // Context value
  const value = {
    messages,
    addMessage,
    isTyping,
    setIsTyping,
    currentMood,
    setCurrentMood,
    moodHistory,
    thoughts,
    addThought,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Create a hook for using the chat context
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
