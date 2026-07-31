import React, { useState } from 'react';
import { X, Settings, RotateCcw, Save, Key, HelpCircle, Heart, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CustomizeDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { config, updateConfig, resetConfig } = useApp();
  const [activeTab, setActiveTab] = useState<'creds' | 'questions' | 'wishes' | 'memories'>('creds');
  
  // Local state form buffers
  const [username, setUsername] = useState(config.credentials.username);
  const [password, setPassword] = useState(config.credentials.password);
  const [girlfriendName, setGirlfriendName] = useState(config.girlfriendName);
  const [questions, setQuestions] = useState(config.questions);
  const [wishes, setWishes] = useState(config.wishes);
  const [memories, setMemories] = useState(config.memories);

  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    updateConfig({
      girlfriendName,
      credentials: { username, password },
      questions,
      wishes,
      memories,
    });
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all content and credentials to default?')) {
      resetConfig();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-rose-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 animate-spin-slow" />
            <h2 className="font-bold text-lg">Customize Website Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-rose-50 border-b border-rose-100 p-1 gap-1 text-xs font-semibold text-rose-800">
          <button
            onClick={() => setActiveTab('creds')}
            className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'creds' ? 'bg-white text-rose-600 shadow-xs' : 'hover:bg-rose-100/50'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            Login & Info
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'questions' ? 'bg-white text-rose-600 shadow-xs' : 'hover:bg-rose-100/50'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Questions
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'wishes' ? 'bg-white text-rose-600 shadow-xs' : 'hover:bg-rose-100/50'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Wishes
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`flex-1 py-2 px-2 rounded-md flex items-center justify-center gap-1 transition-colors ${
              activeTab === 'memories' ? 'bg-white text-rose-600 shadow-xs' : 'hover:bg-rose-100/50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Photos
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm text-slate-700">
          {savedToast && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg text-xs font-semibold flex items-center gap-2">
              <span>✨ Settings saved successfully!</span>
            </div>
          )}

          {activeTab === 'creds' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Girlfriend's Name / Nickname
                </label>
                <input
                  type="text"
                  value={girlfriendName}
                  onChange={e => setGirlfriendName(e.target.value)}
                  className="w-full px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-rose-50/70 border border-rose-200/60 rounded-xl space-y-3">
                <h3 className="font-bold text-rose-900 text-xs uppercase tracking-wide">
                  Login Credentials
                </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Password
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'questions' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Customize the 4 romantic questions & answers shown on the `/questions` route:
              </p>
              {questions.map((q, idx) => (
                <div key={q.id} className="p-3 border border-rose-200 rounded-xl bg-rose-50/30 space-y-2">
                  <span className="text-xs font-bold text-rose-700">Question {idx + 1}</span>
                  <input
                    type="text"
                    value={q.title}
                    onChange={e => {
                      const updated = [...questions];
                      updated[idx].title = e.target.value;
                      setQuestions(updated);
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs"
                    placeholder="Question Title"
                  />
                  <div>
                    <label className="block text-[10px] text-slate-500 font-semibold mb-0.5">
                      Correct Answer
                    </label>
                    <input
                      type="text"
                      value={q.correctAnswer}
                      onChange={e => {
                        const updated = [...questions];
                        updated[idx].correctAnswer = e.target.value;
                        setQuestions(updated);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wishes' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Customize the romantic wishes on the `/wishes` page:
              </p>
              {wishes.map((w, idx) => (
                <div key={w.id} className="p-3 border border-rose-200 rounded-xl bg-rose-50/30 space-y-2">
                  <input
                    type="text"
                    value={w.title}
                    onChange={e => {
                      const updated = [...wishes];
                      updated[idx].title = e.target.value;
                      setWishes(updated);
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs font-bold"
                  />
                  <textarea
                    rows={2}
                    value={w.content}
                    onChange={e => {
                      const updated = [...wishes];
                      updated[idx].content = e.target.value;
                      setWishes(updated);
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Easily update memory image URLs and titles:
              </p>
              {memories.map((m, idx) => (
                <div key={m.id} className="p-3 border border-rose-200 rounded-xl bg-rose-50/30 space-y-2">
                  <input
                    type="text"
                    value={m.title}
                    onChange={e => {
                      const updated = [...memories];
                      updated[idx].title = e.target.value;
                      setMemories(updated);
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs font-bold"
                    placeholder="Memory Title"
                  />
                  <input
                    type="text"
                    value={m.url}
                    onChange={e => {
                      const updated = [...memories];
                      updated[idx].url = e.target.value;
                      setMemories(updated);
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-rose-200 rounded-md text-xs font-mono text-slate-600"
                    placeholder="Image URL"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 rounded-lg flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-lg shadow-md shadow-rose-500/20 flex items-center justify-center gap-1.5 transition-all transform active:scale-98"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
