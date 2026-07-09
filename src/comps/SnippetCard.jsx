import { Link } from 'react-router-dom';
import { HiEye, HiTrash } from 'react-icons/hi';

const SnippetCard = ({ snippet, onDelete }) => {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col justify-between shadow-sm">
            <div>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-white truncate max-w-[70%]">{snippet.title}</h3>
                    <span className="text-xs bg-gray-700 text-indigo-300 px-2.5 py-1 rounded-full uppercase font-mono tracking-wider">
                        {snippet.language}
                    </span>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{snippet.description || 'No description provided.'}</p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-700">
                <Link
                    to={`/snippet/${snippet.id}`}
                    className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 font-medium"
                >
                    <HiEye /> View Code
                </Link>
                <button
                    onClick={() => onDelete(snippet.id)}
                    className="text-gray-500 hover:text-red-400 p-1 rounded transition"
                    title="Delete Snippet"
                >
                    <HiTrash size={18} />
                </button>
            </div>
        </div>
    );
}

export default SnippetCard