import { Link } from "react-router-dom";
import { HiEye, HiTrash } from "react-icons/hi";

const SnippetCard = ({ id, title, description, lang, code, onDelete }) => {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-zinc-700 bg-zinc-800 p-5 shadow-sm transition hover:border-indigo-500 hover:shadow-lg">
      <div>
        <div className="mb-2 flex items-start justify-between">
          <h3 className="max-w-[70%] truncate text-lg font-semibold text-white">
            {title}
          </h3>

          <span className="rounded-full bg-zinc-700 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-indigo-300">
            {lang}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-zinc-400">
          {description || "No description provided."}
        </p>

        <pre className="overflow-x-auto rounded-lg bg-zinc-900 p-3 text-sm text-zinc-300">
          <code>{code}</code>
        </pre>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-700 pt-3">
        <Link
          to={`/snippet/${id}`}
          className="flex items-center gap-1 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          <HiEye />
          View Code
        </Link>

        {onDelete && (
          <button
            onClick={() => onDelete(id)}
            className="rounded p-1 text-zinc-500 transition hover:text-red-400"
            title="Delete Snippet"
          >
            <HiTrash size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SnippetCard;
