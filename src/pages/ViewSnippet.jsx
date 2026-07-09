import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { HiClipboard, HiClipboardCheck, HiArrowLeft } from 'react-icons/hi';

const ViewSnippet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('snippets')) || [];
        const found = saved.find(s => s.id === id);
        if (!found) navigate('/');
        else setSnippet(found);
    }, [id, navigate]);

    const handleCopy = () => {
        if (!snippet) return;
        navigator.clipboard.writeText(snippet.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!snippet) return <div className="p-8 text-center text-zinc-400">Loading snippet...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white mb-6 transition"
            >
                <HiArrowLeft /> Back to Dashboard
            </button>

            <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white">{snippet.title}</h1>
                        <p className="text-zinc-400 text-sm mt-1">{snippet.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs bg-indigo-900/50 text-indigo-300 border border-indigo-700/50 px-3 py-1 rounded-full uppercase font-mono">
                            {snippet.language}
                        </span>
                        <button
                            onClick={handleCopy}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition ${copied ? 'bg-emerald-600 text-white' : 'bg-zinc-700 hover:bg-zinc-600 text-zinc-200'
                                }`}
                        >
                            {copied ? <HiClipboardCheck size={16} /> : <HiClipboard size={16} />}
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                </div>

                <div className="border border-zinc-700 rounded-lg overflow-hidden bg-[#1e1e1e] p-2">
                    <Editor
                        height="400px"
                        language={snippet.language}
                        theme="vs-dark"
                        value={snippet.code}
                        options={{ readOnly: true, fontSize: 14, minimap: { enabled: false }, automaticLayout: true }}
                    />
                </div>
                <p className="text-xs text-zinc-500 mt-4 text-right">Saved on {snippet.createdAt}</p>
            </div>
        </div>
    );
}

export default ViewSnippet