import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import TaskManager from './components/TaskManager';
import WebBrowser from './components/WebBrowser';
import Notes from './components/Notes';
import PomodoroTimer from './components/PomodoroTimer';
import RuneScapeLink from './components/RuneScapeLink';
import './App.css';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<'tasks' | 'web' | 'notes' | 'runescape'>('tasks');

  return (
    <div className="app">
      <div className="sidebar">
        <div className="mode-buttons">
          <button onClick={() => setActiveView('tasks')}>Todo</button>
          <button onClick={() => setActiveView('web')}>Web</button>
          <button onClick={() => setActiveView('notes')}>Notes</button>
          <button onClick={() => setActiveView('runescape')}>RuneScape</button>
        </div>
        <ChatInterface />
      </div>
      <div className="main-content">
        {activeView === 'tasks' && <TaskManager />}
        {activeView === 'web' && <WebBrowser />}
        {activeView === 'notes' && <Notes />}
        {activeView === 'runescape' && <RuneScapeLink />}
      </div>
      <div className="status-bar">
        <PomodoroTimer />
      </div>
    </div>
  );
};

export default App;