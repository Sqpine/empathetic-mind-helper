
import React from 'react';
import { ChatProvider } from '@/context/ChatContext';
import Header from '@/components/Header';
import ChatInterface from '@/components/ChatInterface';
import MoodTracker from '@/components/MoodTracker';
import ThoughtJournal from '@/components/ThoughtJournal';
import { cbtExercises } from '@/utils/cbtTechniques';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HeartPulse, Brain, Info } from 'lucide-react';

const Index = () => {
  return (
    <ChatProvider>
      <div className="min-h-screen bg-gradient-to-br from-harmony-50 to-mind-50">
        <Header />
        
        <main className="pt-20 pb-10 px-4 max-w-screen-xl mx-auto">
          <div className="text-center mb-8 animate-fade-up">
            <div className="relative inline-block">
              <span className="inline-block px-3 py-1 bg-mind-100 text-mind-600 rounded-full text-xs font-medium mb-2 animate-pulse-slow">
                Your Empathetic CBT Companion
              </span>
            </div>
            <h2 className="text-3xl font-medium text-harmony-900 mb-2">Welcome to MindHelper</h2>
            <p className="text-harmony-600 max-w-xl mx-auto">
              A supportive space to process your thoughts, track your moods, and practice cognitive behavioral techniques.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
            <div className="lg:col-span-2 h-[600px]">
              <ChatInterface />
            </div>
            
            <div className="space-y-6">
              <MoodTracker />
              <ThoughtJournal />
            </div>
          </div>
          
          <div className="mt-10 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <h3 className="text-xl font-medium text-harmony-900 mb-4 text-center">
              CBT Techniques & Exercises
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cbtExercises.map((exercise, index) => (
                <Card key={exercise.id} className="cbt-card overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">
                      {exercise.title}
                    </CardTitle>
                    <CardDescription>
                      {exercise.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 text-sm">
                      {exercise.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mind-100 text-mind-600 text-xs">
                            {i + 1}
                          </span>
                          <span className="text-harmony-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-mind-200 text-mind-600 hover:bg-mind-50 hover:text-mind-700"
                    >
                      Try This Exercise
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center text-harmony-600 text-sm animate-fade-up" style={{ animationDelay: '300ms' }}>
            <p className="flex items-center justify-center gap-1">
              <Info className="h-4 w-4" />
              <span>This is a CBT-based support tool, not a replacement for professional mental health care.</span>
            </p>
          </div>
        </main>
      </div>
    </ChatProvider>
  );
};

export default Index;
