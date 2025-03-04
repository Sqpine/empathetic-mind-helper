import React from 'react';
import { useChatContext, MoodType } from '@/context/ChatContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smile, Frown, SmileIcon, MehIcon, FrownIcon, ThumbsDown, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const MoodTracker: React.FC = () => {
  const { currentMood, setCurrentMood, moodHistory } = useChatContext();
  
  // Only keep the last 7 days of mood history
  const recentMoods = moodHistory
    .filter(entry => {
      const now = new Date();
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      return entry.timestamp > sevenDaysAgo;
    })
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  const moodOptions: Array<{ value: MoodType; icon: React.ReactNode; label: string }> = [
    { value: 'great', icon: <ThumbsUp className="h-6 w-6" />, label: 'Great' },
    { value: 'good', icon: <SmileIcon className="h-6 w-6" />, label: 'Good' },
    { value: 'neutral', icon: <MehIcon className="h-6 w-6" />, label: 'Okay' },
    { value: 'low', icon: <FrownIcon className="h-6 w-6" />, label: 'Low' },
    { value: 'bad', icon: <ThumbsDown className="h-6 w-6" />, label: 'Bad' }
  ];
  
  // Calculate percentages for the mood chart
  const moodCounts = {
    great: 0,
    good: 0,
    neutral: 0,
    low: 0,
    bad: 0
  };
  
  recentMoods.forEach(entry => {
    moodCounts[entry.mood]++;
  });
  
  const totalEntries = recentMoods.length;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Mood Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <p className="text-sm text-harmony-600 mb-4">How are you feeling right now?</p>
          
          <div className="flex justify-between gap-2 mb-6">
            {moodOptions.map((option) => (
              <button
                key={option.value}
                className={cn(
                  "mood-indicator",
                  currentMood === option.value && "active"
                )}
                onClick={() => setCurrentMood(option.value)}
                aria-label={`Set mood to ${option.label}`}
              >
                <span className={cn(
                  "text-harmony-500",
                  currentMood === option.value && "text-mind-600"
                )}>
                  {option.icon}
                </span>
              </button>
            ))}
          </div>
          
          {totalEntries > 0 && (
            <div className="mt-6">
              <p className="text-sm text-harmony-600 mb-2">Your mood over time</p>
              
              <div className="space-y-2">
                {Object.entries(moodCounts).map(([mood, count]) => {
                  const percentage = (count / totalEntries) * 100;
                  return (
                    <div key={mood} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="capitalize text-harmony-700">{mood}</span>
                        <span className="text-harmony-500">{percentage.toFixed(0)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-value"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
