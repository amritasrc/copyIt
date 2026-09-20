import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import {
    FiArrowLeft,
    FiCalendar,
    FiCheck,
    FiClock,
    FiCode,
    FiCopy,
    FiLogOut,
    FiSearch,
    FiTerminal,
    FiTrash2,
    FiUser,
    FiEdit2,
    FiHeart,
} from "react-icons/fi";

interface Snippet {
    _id: string;
    title: string;
    code: string;
    language: string;
    createdAt: string;
    updatedAt: string;
    isFavorite: boolean;
}

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

const SnippetDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await api.get(`/snippets/${id}`);
                setSnippet(response.data.snippet);
                setFavorite(response.data.snippet.isFavorite);
            } catch {
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(snippet!.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFavorite = async () => {
        try {
            const response = await api.patch(
                `/snippets/${id}/favorite`
            );

            setFavorite(response.data.isFavorite);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Delete this snippet? This action cannot be undone.")) return;

        setDeleting(true);

        try {
            await api.delete(`/snippets/${id}`);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            setDeleting(false);
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

    if (notFound || !snippet) {
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

    const lineCount = snippet.code.split("\n").length;
    const charCount = snippet.code.length;

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

            <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    Back to dashboard
                </Link>

                <section className="mt-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-start gap-4">
                            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FiTerminal className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-semibold tracking-tight text-neutral-900 sm:text-2xl">
                                        {snippet.title}
                                    </h1>
                                    <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                                        {snippet.language}
                                    </span>
                                </div>

                                <dl className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-500">
                                    <div className="flex items-center gap-1.5">
                                        <FiCalendar className="h-4 w-4 text-neutral-400" />
                                        <dt className="sr-only">Created</dt>
                                        <dd>Created {formatDate(snippet.createdAt)}</dd>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <FiClock className="h-4 w-4 text-neutral-400" />
                                        <dt className="sr-only">Updated</dt>
                                        <dd>Updated {formatDate(snippet.updatedAt)}</dd>
                                    </div>
                                    <span className="hidden h-3.5 w-px bg-stone-200 sm:block" aria-hidden="true" />
                                    <span className="font-mono text-xs text-neutral-400">
                                        {lineCount} {lineCount === 1 ? "line" : "lines"} · {charCount} chars
                                    </span>
                                </dl>
                            </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                            >
                                {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
                                {copied ? "Copied!" : "Copy code"}
                            </button>
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <FiTrash2 className="h-4 w-4" />
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                            <Link
                                to={`/snippets/${snippet._id}/edit`}
                                className="inline-flex items-center gap-2 rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            ><FiEdit2 className="h-4 w-4" />
                                Edit
                            </Link>
                            <button
                                type="button"
                                onClick={handleFavorite}
                                className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition ${favorite
                                        ? "bg-violet-100 text-violet-600"
                                        : "bg-stone-100 text-neutral-600 hover:bg-violet-50 hover:text-violet-600"
                                    }`}
                            >
                                <FiHeart
                                    className={`h-4 w-4 ${favorite ? "fill-red-500" : ""}`}
                                />
                                Favorite
                            </button>
                        </div>
                    </div>
                </section>

                <section className="mt-6 overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-stone-50 px-5 py-3">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-sm font-medium text-neutral-700">
                                <FiTerminal className="h-4 w-4 text-neutral-400" />
                                {snippet.language}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-stone-100 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1"
                        >
                            {copied ? <FiCheck className="h-3.5 w-3.5 text-emerald-600" /> : <FiCopy className="h-3.5 w-3.5" />}
                            {copied ? "Copied!" : "Copy"}
                        </button>
                    </div>

                    <div className="overflow-x-auto bg-stone-950">
                        <pre className="min-h-40 px-5 py-4 text-sm leading-relaxed text-stone-100">
                            <code>{snippet.code}</code>
                        </pre>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SnippetDetails;