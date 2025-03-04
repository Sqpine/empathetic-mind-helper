
import React, { useState } from 'react';
import { useChatContext } from '@/context/ChatContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Brain, Plus, X, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThoughtJournal: React.FC = () => {
  const { thoughts, addThought } = useChatContext();
  const [isAddingThought, setIsAddingThought] = useState(false);
  const [expandedThoughtId, setExpandedThoughtId] = useState<string | null>(null);
  
  // Form state
  const [situation, setSituation] = useState('');
  const [automaticThought, setAutomaticThought] = useState('');
  const [emotion, setEmotion] = useState('');
  const [intensity, setIntensity] = useState<number[]>([5]);
  const [evidence, setEvidence] = useState('');
  const [alternativeThought, setAlternativeThought] = useState('');
  const [newEmotion, setNewEmotion] = useState('');
  const [newIntensity, setNewIntensity] = useState<number[]>([5]);
  
  const resetForm = () => {
    setSituation('');
    setAutomaticThought('');
    setEmotion('');
    setIntensity([5]);
    setEvidence('');
    setAlternativeThought('');
    setNewEmotion('');
    setNewIntensity([5]);
  };
  
  const handleSubmit = () => {
    if (!situation || !automaticThought || !emotion || !evidence || !alternativeThought || !newEmotion) {
      return; // Prevent empty submissions
    }
    
    addThought({
      situation,
      automaticThought,
      emotion,
      intensity: intensity[0],
      evidence,
      alternativeThought,
      newEmotion,
      newIntensity: newIntensity[0]
    });
    
    resetForm();
    setIsAddingThought(false);
  };
  
  const handleCancel = () => {
    resetForm();
    setIsAddingThought(false);
  };
  
  const toggleThoughtExpansion = (id: string) => {
    setExpandedThoughtId(expandedThoughtId === id ? null : id);
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-medium">Thought Journal</CardTitle>
          </div>
          {!isAddingThought && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 border-mind-200 text-mind-500 hover:bg-mind-50 hover:text-mind-600"
              onClick={() => setIsAddingThought(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              New Entry
            </Button>
          )}
        </div>
        <CardDescription>
          Record and challenge unhelpful thoughts
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isAddingThought ? (
          <div className="space-y-4 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-harmony-700 mb-1">
                Situation
              </label>
              <Textarea
                placeholder="What happened? When and where?"
                className="input-field resize-none"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-harmony-700 mb-1">
                Automatic Thought
              </label>
              <Textarea
                placeholder="What went through your mind in that moment?"
                className="input-field resize-none"
                value={automaticThought}
                onChange={(e) => setAutomaticThought(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-harmony-700 mb-1">
                  Emotion
                </label>
                <Textarea
                  placeholder="How did you feel?"
                  className="input-field resize-none"
                  value={emotion}
                  onChange={(e) => setEmotion(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-harmony-700 mb-1">
                  Intensity (1-10)
                </label>
                <Slider
                  value={intensity}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={setIntensity}
                  className="mt-4"
                />
                <p className="text-center mt-2 text-mind-500 font-medium">{intensity[0]}</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-harmony-700 mb-1">
                Evidence Against This Thought
              </label>
              <Textarea
                placeholder="What facts contradict this thought?"
                className="input-field resize-none"
                value={evidence}
                onChange={(e) => setEvidence(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-harmony-700 mb-1">
                Alternative Thought
              </label>
              <Textarea
                placeholder="What's a more balanced way to think about this?"
                className="input-field resize-none"
                value={alternativeThought}
                onChange={(e) => setAlternativeThought(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-harmony-700 mb-1">
                  New Emotion
                </label>
                <Textarea
                  placeholder="How do you feel now?"
                  className="input-field resize-none"
                  value={newEmotion}
                  onChange={(e) => setNewEmotion(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-harmony-700 mb-1">
                  New Intensity (1-10)
                </label>
                <Slider
                  value={newIntensity}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={setNewIntensity}
                  className="mt-4"
                />
                <p className="text-center mt-2 text-mind-500 font-medium">{newIntensity[0]}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={handleCancel}
                className="border-harmony-200"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-mind-500 hover:bg-mind-600 text-white"
              >
                <Check className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {thoughts.length === 0 ? (
              <div className="text-center py-8 text-harmony-500">
                <Brain className="h-12 w-12 mx-auto mb-2 text-harmony-300" />
                <p>No thought records yet.</p>
                <p className="text-sm mt-1">Start challenging negative thoughts by creating an entry.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {thoughts.map((thought) => (
                  <div 
                    key={thought.id} 
                    className="cbt-card cursor-pointer hover:bg-harmony-50 transition-all"
                    onClick={() => toggleThoughtExpansion(thought.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-harmony-900 truncate">{thought.situation}</p>
                        <p className="text-sm text-harmony-600 truncate">{thought.automaticThought}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={(e) => {
                        e.stopPropagation();
                        toggleThoughtExpansion(thought.id);
                      }}>
                        {expandedThoughtId === thought.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    
                    {expandedThoughtId === thought.id && (
                      <div className="mt-4 space-y-3 animate-fade-in">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-harmony-500">Initial Emotion</p>
                            <p className="text-sm">{thought.emotion} ({thought.intensity}/10)</p>
                          </div>
                          <div>
                            <p className="text-xs text-harmony-500">After Reframing</p>
                            <p className="text-sm">{thought.newEmotion} ({thought.newIntensity}/10)</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-harmony-500">Evidence</p>
                          <p className="text-sm">{thought.evidence}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-harmony-500">Alternative Thought</p>
                          <p className="text-sm">{thought.alternativeThought}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-harmony-500 mb-1">Emotional Shift</p>
                          <div className="progress-bar">
                            <div 
                              className="progress-value"
                              style={{ 
                                width: `${100 - (thought.newIntensity / thought.intensity) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThoughtJournal;
