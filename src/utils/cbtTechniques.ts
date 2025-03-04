
// Possible user message categories
type MessageCategory = 
  | 'greeting'
  | 'mood_positive'
  | 'mood_negative'
  | 'anxiety'
  | 'depression'
  | 'stress'
  | 'sleep'
  | 'general_question'
  | 'gratitude'
  | 'thought_distortion'
  | 'suicidal'
  | 'abuse'
  | 'substance'
  | 'unknown';

// CBT techniques
export const cbtTechniques = {
  cognitiveRestructuring: {
    name: 'Cognitive Restructuring',
    description: 'Identifying and challenging irrational or negative thoughts and replacing them with balanced, rational thoughts.',
    steps: [
      'Identify the negative thought.',
      'Examine the evidence for and against this thought.',
      'Consider alternative perspectives.',
      'Generate a balanced thought that takes all evidence into account.'
    ],
    example: 'Instead of thinking "I always fail at everything," consider "I've had some setbacks, but I've also had successes in the past."'
  },
  
  behavioralActivation: {
    name: 'Behavioral Activation',
    description: 'Engaging in positive and rewarding activities to improve mood and energy levels.',
    steps: [
      'Make a list of activities that have brought you joy or a sense of accomplishment in the past.',
      'Schedule these activities into your daily routine.',
      'Start with small, manageable activities.',
      'Notice and acknowledge how you feel before and after the activity.'
    ],
    example: 'Taking a short walk, calling a friend, or completing a small creative project.'
  },
  
  exposureTechnique: {
    name: 'Gradual Exposure',
    description: 'Gradually facing fears and anxiety-provoking situations to reduce avoidance behaviors.',
    steps: [
      'Create a hierarchy of feared situations from least to most anxiety-provoking.',
      'Start with the least anxiety-provoking situation.',
      'Practice relaxation techniques to manage anxiety.',
      'Gradually work your way up the hierarchy as your anxiety decreases.'
    ],
    example: 'If you have social anxiety, start by saying hello to one person, then gradually work up to participating in group conversations.'
  },
  
  mindfulness: {
    name: 'Mindfulness Practice',
    description: 'Focusing attention on the present moment without judgment.',
    steps: [
      'Find a quiet space where you won\'t be disturbed.',
      'Focus on your breath or bodily sensations.',
      'When your mind wanders, gently bring your attention back to the present.',
      'Practice observing thoughts without judgment or attachment.'
    ],
    example: 'Spending 5 minutes focusing on your breath, or mindfully eating a meal by paying attention to the tastes, textures, and sensations.'
  },
  
  problemSolving: {
    name: 'Structured Problem-Solving',
    description: 'A systematic approach to addressing specific problems and challenges.',
    steps: [
      'Clearly define the problem.',
      'Brainstorm possible solutions without judging them.',
      'Evaluate the pros and cons of each solution.',
      'Choose and implement the most appropriate solution.',
      'Review the outcome and adjust as needed.'
    ],
    example: 'If you\'re overwhelmed at work, identify specific stressors, list possible solutions like delegating tasks, then evaluate which solution is most feasible.'
  }
};

// Helper functions for response generation
const getRandomElement = <T,>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Detect potential crisis situations
const detectCrisis = (message: string): boolean => {
  const crisisKeywords = [
    'suicide', 'kill myself', 'end my life', 'don\'t want to live',
    'want to die', 'harm myself', 'hurt myself'
  ];
  
  return crisisKeywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
};

// Message categorization
const categorizeMessage = (message: string): MessageCategory => {
  message = message.toLowerCase();
  
  // Check for crisis situations first
  if (detectCrisis(message)) {
    return 'suicidal';
  }
  
  if (message.match(/^(hi|hello|hey|greetings)/)) {
    return 'greeting';
  }
  
  if (message.match(/(happy|good|great|excellent|amazing|wonderful|fantastic|glad|positive)/)) {
    return 'mood_positive';
  }
  
  if (message.match(/(sad|down|unhappy|depressed|awful|terrible|hopeless|bad|miserable|low)/)) {
    return 'mood_negative';
  }
  
  if (message.match(/(anxiety|anxious|nervous|worry|panic|phobia|scared|frightened|fear)/)) {
    return 'anxiety';
  }
  
  if (message.match(/(depressed|depression|hopeless|empty|numb|pointless|worthless)/)) {
    return 'depression';
  }
  
  if (message.match(/(stress|stressed|overwhelmed|pressure|burden|burnout)/)) {
    return 'stress';
  }
  
  if (message.match(/(sleep|insomnia|tired|fatigue|exhausted|rest|dream|nightmare)/)) {
    return 'sleep';
  }
  
  if (message.match(/(thank|grateful|appreciate|gratitude)/)) {
    return 'gratitude';
  }
  
  if (message.match(/(always|never|everyone|nobody|everything|nothing|should|must|can't|catastrophe)/)) {
    return 'thought_distortion';
  }
  
  if (message.match(/(abuse|hurt|hit|violence|threat|threaten|unsafe)/)) {
    return 'abuse';
  }
  
  if (message.match(/(alcohol|drug|substance|addiction|hooked|withdrawal)/)) {
    return 'substance';
  }
  
  if (message.includes('?')) {
    return 'general_question';
  }
  
  return 'unknown';
};

// Crisis resources
const crisisResources = [
  "If you're having thoughts of suicide, please reach out for immediate help:",
  "• National Suicide Prevention Lifeline: 988 or 1-800-273-8255",
  "• Crisis Text Line: Text HOME to 741741",
  "• 911 or go to your nearest emergency room",
  "Remember, you don't have to face these feelings alone. Professional help is available, and they can provide the support you need right now."
].join('\n');

// Response templates
const responseTemplates = {
  greeting: [
    "Hello! It's nice to connect with you. How are you feeling today?",
    "Hi there! I'm here to support you. How has your day been going?",
    "Hello! I'm your supportive companion. What brings you here today?"
  ],
  
  mood_positive: [
    "I'm glad to hear you're feeling positive! What's contributed to your good mood?",
    "That's wonderful to hear. Acknowledging positive emotions is just as important as addressing challenges. What's been going well for you?",
    "It's great that you're feeling good. Would you like to explore ways to maintain this positive state?"
  ],
  
  mood_negative: [
    "I'm sorry to hear you're feeling down. Would you like to talk about what might be contributing to these feelings?",
    "It sounds like you're going through a difficult time. Sometimes identifying specific thoughts behind these feelings can help us address them. Would you like to try that?",
    "When we're feeling low, our thoughts often become more negative. Could you share what's been going through your mind recently?"
  ],
  
  anxiety: [
    "Anxiety can be really challenging. One technique that might help is deep breathing. Would you like to try a quick breathing exercise together?",
    "When anxiety takes hold, our thoughts often race to worst-case scenarios. Could you share what specifically is causing you worry right now?",
    "Anxiety often involves physical sensations as well as worried thoughts. Are you noticing any physical symptoms like tension or rapid heartbeat?"
  ],
  
  depression: [
    "Depression can make even small tasks feel overwhelming. Is there one small, manageable activity you might try today?",
    "When we're depressed, we often lose interest in things we used to enjoy. Have you noticed this happening for you?",
    "Depression often involves negative thoughts about yourself, the world, or the future. Have you noticed any patterns in your thoughts lately?"
  ],
  
  stress: [
    "Stress can build up without us realizing it. What are some signs that tell you you're feeling stressed?",
    "Managing stress often starts with identifying its sources. What situations or responsibilities feel most overwhelming right now?",
    "Taking breaks is essential when dealing with stress. Is there a small way you could build in a moment of calm today?"
  ],
  
  sleep: [
    "Sleep troubles can significantly impact our mental well-being. Have you noticed any patterns with your sleep difficulties?",
    "Creating a consistent sleep routine can help. What does your current bedtime routine look like?",
    "Sometimes racing thoughts keep us awake. Would you like to explore some relaxation techniques that might help with falling asleep?"
  ],
  
  general_question: [
    "That's a thoughtful question. While I can offer CBT-based perspectives, it's important to remember that I'm designed to support, not replace professional guidance.",
    "I appreciate your curiosity. I can share some CBT perspectives on this, though remember that everyone's experience is unique.",
    "Great question. I can offer some thoughts based on CBT principles, which focus on how our thoughts, feelings, and behaviors connect."
  ],
  
  gratitude: [
    "You're very welcome. I'm here to support you whenever you need it.",
    "I'm glad our conversation has been helpful. Expressing gratitude is actually a positive practice for mental well-being.",
    "You're welcome. Recognizing moments of appreciation, even small ones, can be a powerful tool for shifting perspective."
  ],
  
  thought_distortion: [
    "I noticed some language that might reflect all-or-nothing thinking. In CBT, we try to find the middle ground between extremes. How might a more balanced perspective look?",
    "Words like 'always' and 'never' can trap us in rigid thinking patterns. Could there be exceptions to this situation?",
    "That sounds like it might involve some 'should' statements, which can create unrealistic expectations. What would happen if you replaced 'should' with 'could' or 'would like to'?"
  ],
  
  suicidal: crisisResources,
  
  abuse: [
    "I'm concerned about what you've shared. Your safety is important. If you're in immediate danger, please call emergency services at 911.",
    "Thank you for trusting me with this information. No one deserves to experience abuse. The National Domestic Violence Hotline (1-800-799-7233) has trained advocates available 24/7.",
    "What you're describing sounds very difficult. It's important that you know there are resources available to help. Would you like me to share some options for support?"
  ],
  
  substance: [
    "Struggles with substances can be complex. The SAMHSA National Helpline (1-800-662-4357) offers free, confidential support for individuals and families facing substance use disorders.",
    "Thank you for sharing this. Many people find that talking to a professional specializing in substance use can provide valuable support. Would you like information about resources?",
    "That sounds challenging. Recovery often involves both addressing the substance use itself and the underlying feelings or situations connected to it. Have you been able to identify any patterns or triggers?"
  ],
  
  unknown: [
    "Thank you for sharing. Could you tell me more about how this has been affecting your thoughts and feelings?",
    "I appreciate you opening up. How have these experiences been impacting your day-to-day life?",
    "I'm here to support you. Would it help to explore some coping strategies related to what you're experiencing?"
  ]
};

// Main function to get response for a user message
export const getResponseForMessage = async (message: string): Promise<string> => {
  // Categorize the message
  const category = categorizeMessage(message);
  
  // Get appropriate response templates for the category
  const templates = responseTemplates[category];
  
  // Return a random response from the templates
  return getRandomElement(templates);
};

// CBT exercises
export const cbtExercises = [
  {
    id: 'thought-record',
    title: 'Thought Record',
    description: 'Identify and challenge negative thoughts by examining evidence and developing balanced alternatives.',
    steps: [
      'Describe the situation that triggered your emotions',
      'Identify your automatic thoughts and emotions',
      'Find evidence that supports and contradicts your thoughts',
      'Develop a balanced alternative thought',
      'Rate how you feel after considering the balanced thought'
    ]
  },
  {
    id: 'behavioral-activation',
    title: 'Activity Planning',
    description: 'Schedule positive activities to improve your mood and energy levels.',
    steps: [
      'List activities that have brought you joy or accomplishment',
      'Rate each activity for pleasure and mastery',
      'Schedule specific times for these activities',
      'Track your mood before and after completing each activity',
      'Reflect on what you learned from the experience'
    ]
  },
  {
    id: 'breathing-exercise',
    title: 'Deep Breathing',
    description: 'Practice controlled breathing to reduce anxiety and promote relaxation.',
    steps: [
      'Find a comfortable position and close your eyes',
      'Breathe in slowly through your nose for 4 counts',
      'Hold your breath for 2 counts',
      'Exhale slowly through your mouth for 6 counts',
      'Repeat for 5-10 cycles, focusing only on your breath'
    ]
  },
  {
    id: 'gratitude-practice',
    title: 'Gratitude Journal',
    description: 'Cultivate positive emotions by regularly acknowledging things you're grateful for.',
    steps: [
      'Each day, write down 3 things you're grateful for',
      'Include why each thing matters to you',
      'Try to find new things each day, even small details',
      'Notice how focusing on gratitude affects your mood',
      'Review your entries weekly to recognize positive patterns'
    ]
  },
  {
    id: 'progressive-relaxation',
    title: 'Progressive Muscle Relaxation',
    description: 'Reduce physical tension by systematically tensing and relaxing muscle groups.',
    steps: [
      'Find a quiet space where you won't be disturbed',
      'Starting with your feet, tense the muscles for 5-10 seconds',
      'Release the tension and notice the feeling of relaxation',
      'Progress upward through each muscle group in your body',
      'End with a few moments of mindful awareness of your relaxed state'
    ]
  }
];
