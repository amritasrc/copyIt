import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiChevronDown, FiLogOut, FiPlus, FiSearch, FiUser } from "react-icons/fi";

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

const CreateSnippet = () => {
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("JavaScript");
    const [code, setCode] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await api.post("/snippets", {
                title,
                language,
                code,
            });

            navigate("/dashboard");
        } catch { }
    };

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
                <a
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600"
                >
                    <FiArrowLeft className="h-4 w-4" />
                    Back to dashboard
                </a>

                <div className="mt-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FiPlus className="h-5 w-5" />
                        </div>
                        <div>
                            <h1 className="text-xl font-semibold tracking-tight text-neutral-900">Create Snippet</h1>
                            <p className="text-sm text-neutral-500">Save a reusable piece of code for later.</p>
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

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                            <a
                                href="/dashboard"
                                className="inline-flex items-center justify-center rounded-md border border-stone-300 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
                            >
                                Cancel
                            </a>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                            >
                                <FiPlus className="h-4 w-4" />
                                Save Snippet
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CreateSnippet;