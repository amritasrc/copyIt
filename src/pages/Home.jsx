import { useState, useEffect } from 'react';
import SnippetCard from '../comps/SnippetCard';
import { HiSearch } from 'react-icons/hi';

const Home = () => {
  const [snippets, setSnippets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('snippets')) || [];
    setSnippets(saved);
  }, []);

  const handleDelete = (id) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    localStorage.setItem('snippets', JSON.stringify(updated));
  };

  const filteredSnippets = snippets.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Snippets</h1>
          <p className="text-zinc-400 text-sm">Manage and reuse your favorite code blocks.</p>
        </div>
        <div className="relative w-full md:w-72">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search title or language..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {filteredSnippets.length === 0 ? (
        <div className="text-center py-12 bg-zinc-800/50 rounded-xl border border-zinc-700 border-dashed">
          <p className="text-zinc-400">No snippets found. Time to create some code blocks!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <SnippetCard key={snippet.id} snippet={snippet} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home