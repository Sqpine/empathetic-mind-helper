
import React from 'react';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md border-b border-harmony-100 shadow-soft z-10">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-mind-500 text-white w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-soft">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-harmony-900">MindHelper</h1>
            <p className="text-xs text-harmony-600">CBT-based emotional support</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
