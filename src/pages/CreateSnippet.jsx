import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import Home from './Home';

const LANGUAGES = ['javascript', 'typescript', 'html', 'css', 'python', 'cpp', 'json', 'markdown'];

const CreateSnippet = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// paste or type your code here...');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return alert('Title and Code are required!');

    const newSnippet = {
      id: Date.now().toString(),
      title,
      description,
      language,
      code,
      createdAt: new Date().toLocaleDateString()
    };

    const existing = JSON.parse(localStorage.getItem('snippets')) || [];
    localStorage.setItem('snippets', JSON.stringify([newSnippet, ...existing]));
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Create New Snippet</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-zinc-400 mb-1">Title</label>
            <input 
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              placeholder="e.g., Quick Sort Algorithm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Language</label>
            <select 
              value={language} onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition capitalize"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Description (Optional)</label>
          <textarea 
            value={description} onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition h-20 resize-none"
            placeholder="What does this snippet do?"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-2">Code Editor</label>
          <div className="border border-zinc-700 rounded-lg overflow-hidden bg-[#1e1e1e] p-2">
            <Editor
              height="350px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{ fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <button 
            type="button" onClick={() => navigate('/')}
            className="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 cursor-pointer rounded-lg text-sm transition"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-500 cursor-pointer text-white rounded-lg text-sm font-medium transition"
          >
            Save Snippet
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSnippet