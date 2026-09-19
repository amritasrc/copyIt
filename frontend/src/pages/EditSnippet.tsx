import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { FiArrowLeft, FiChevronDown, FiCode, FiEdit2, FiLogOut, FiSearch, FiUser } from "react-icons/fi";

const languageOptions = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "Go",
    "Rust",
    "HTML",
    "CSS",
    "JSON",
    "SQL",
    "Other",
];

const EditSnippet = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await api.get(`/snippets/${id}`);

                setTitle(response.data.snippet.title);
                setLanguage(response.data.snippet.language);
                setCode(response.data.snippet.code);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSaving(true);

        try {
            await api.patch(`/snippets/${id}`, {
                title,
                language,
                code,
            });

            navigate(`/snippets/${id}`);
        } catch {
            setError("Could not save your changes. Please try again.");
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-indigo-600" />
                    <p className="text-sm text-neutral-500">Loading snippet...</p>
                </div>
            </div>
        );
    }

    if (notFound) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
                <div className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FiCode className="h-6 w-6" />
                    </div>
                    <h1 className="mt-5 text-lg font-semibold text-neutral-900">Snippet not found</h1>
                    <p className="mt-1.5 text-sm text-neutral-500">
                        This snippet may have been deleted or you don&apos;t have access to it.
                    </p>
                    <Link
                        to="/dashboard"
                        className="mt-6 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                    >
                        <FiArrowLeft className="h-4 w-4" />
                        Back to dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100">
            <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <img src="/favicon.png" alt="CopyIt" className="h-8 w-8 rounded-full" />
                        <span className="text-lg font-semibold tracking-tight text-neutral-900">CopyIt</span>
                    </div>

                    <div className="ml-auto flex items-center gap-2 sm:gap-3">
                        <div className="relative hidden md:block">
                            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            <input
                                type="search"
                                placeholder="Search snippets..."
                                className="w-48 rounded-md border border-stone-200 bg-stone-50 py-1.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 lg:w-60"
                            />
                        </div>
                        <button
                            type="button"
                            aria-label="Search"
                            className="rounded-md p-2 text-neutral-500 transition-colors hover:bg-stone-100 hover:text-neutral-900 md:hidden"
                        >
                            <FiSearch className="h-5 w-5" />
                        </button>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                            <FiUser className="h-4 w-4" />
                        </div>
                        <button
                            type="button"
                            className="flex items-center gap-1.5 rounded-md p-2 text-neutral-500 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            <FiLogOut className="h-4 w-4" />
                            <span className="hidden text-sm font-medium lg:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    to={`/snippets/${id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    Back to snippet
                </Link>

                <div className="mt-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FiEdit2 className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Edit Snippet</h1>
                            <p className="text-sm text-neutral-500">Update this reusable piece of code.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                autoComplete="off"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Debounce a function"
                                aria-required="true"
                                className="w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>

                        <div>
                            <label htmlFor="language" className="mb-1.5 block text-sm font-medium text-neutral-700">
                                Language
                            </label>
                            <div className="relative">
                                <select
                                    id="language"
                                    name="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full appearance-none rounded-md border border-stone-300 bg-white px-3 py-2 pr-10 text-sm text-neutral-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                >
                                    {languageOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                            </div>
                        </div>

                        <div>
                            <div className="mb-1.5 flex items-center justify-between">
                                <label htmlFor="code" className="block text-sm font-medium text-neutral-700">
                                    Code
                                </label>
                                <span className="font-mono text-xs text-neutral-400">{`{ }`}</span>
                            </div>
                            <div className="overflow-hidden rounded-md border border-stone-300 bg-stone-950 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20">
                                <textarea
                                    id="code"
                                    name="code"
                                    required
                                    rows={12}
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="// Paste or write your code here..."
                                    aria-required="true"
                                    className="w-full resize-y bg-transparent px-3 py-2 font-mono text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <Link
                                to={`/snippets/${id}`}
                                className="inline-flex items-center justify-center rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FiEdit2 className="h-4 w-4" />
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default EditSnippet;