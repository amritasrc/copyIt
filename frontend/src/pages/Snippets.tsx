import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCode, FiPlus, FiSearch } from "react-icons/fi";
import api from "../api/axios";

interface Snippet {
    _id: string;
    title: string;
    code: string;
    language: string;
    createdAt: string;
    isFavorite: boolean;
}

const Snippets = () => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const response = await api.get("/snippets");
                setSnippets(response.data.snippets);
            } catch {
            } finally {
                setLoading(false);
            }
        };

        fetchSnippets();
    }, []);

    const filteredSnippets = snippets.filter(
        (snippet) =>
            snippet.title.toLowerCase().includes(search.toLowerCase()) ||
            snippet.language.toLowerCase().includes(search.toLowerCase()) ||
            snippet.code.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100">
                <p className="text-sm text-neutral-500">
                    Loading snippets...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100">
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600"
                        >
                            <FiArrowLeft className="h-4 w-4" />
                            Back to Dashboard
                        </Link>

                        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-900">
                            All Snippets
                        </h1>

                        <p className="mt-2 text-sm text-neutral-500">
                            Browse and manage your entire snippet collection.
                        </p>
                    </div>

                    <Link
                        to="/create"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                    >
                        <FiPlus className="h-4 w-4" />
                        Create Snippet
                    </Link>
                </div>

                <div className="relative mt-8">
                    <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                    <input
                        type="search"
                        placeholder="Search snippets..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-lg border border-stone-200 bg-white py-2.5 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>

                <div className="mt-6 space-y-3">
                    {filteredSnippets.length === 0 ? (
                        <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 text-center shadow-sm">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiCode className="h-6 w-6" />
                            </div>

                            {snippets.length === 0 ? (
                                <>
                                    <h2 className="mt-5 text-base font-semibold text-neutral-900">
                                        No snippets yet
                                    </h2>

                                    <p className="mt-1.5 text-sm text-neutral-500">
                                        Create your first snippet to start your
                                        collection.
                                    </p>

                                    <Link
                                        to="/create"
                                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                    >
                                        <FiPlus className="h-4 w-4" />
                                        Create your first snippet
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <h2 className="mt-5 text-base font-semibold text-neutral-900">
                                        No matching snippets
                                    </h2>

                                    <p className="mt-1.5 text-sm text-neutral-500">
                                        Try a different search term.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        filteredSnippets.map((snippet) => (
                            <Link
                                key={snippet._id}
                                to={`/snippets/${snippet._id}`}
                                className="block rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="font-semibold text-neutral-900">
                                        {snippet.title}
                                    </h2>

                                    <span className="shrink-0 rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                                        {snippet.language}
                                    </span>
                                </div>

                                <p className="mt-3 line-clamp-3 font-mono text-sm text-neutral-500">
                                    {snippet.code}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Snippets;