import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
    FiBell,
    FiBookmark,
    FiChevronRight,
    FiCode,
    FiFileText,
    FiFolder,
    FiGrid,
    FiHeart,
    FiLogOut,
    FiPlus,
    FiSearch,
    FiTerminal,
    FiUser,
} from "react-icons/fi";
import { logout } from "../utils/auth";

const navItems = [
    { label: "Dashboard", active: true },
    { label: "Snippets", active: false },
    { label: "Favorites", active: false },
];

const quickActions = [
    {
        label: "Create a snippet",
        description: "Drop in a title, language, and your code.",
        icon: FiPlus,
        tint: "bg-indigo-50 text-indigo-600",
    },
    {
        label: "Save your best code",
        description: "Keep the snippets you reach for most.",
        icon: FiBookmark,
        tint: "bg-violet-50 text-violet-600",
    },
    {
        label: "Organize your workflow",
        description: "Group snippets into folders and tags.",
        icon: FiFolder,
        tint: "bg-sky-50 text-sky-600",
    },
];

interface Snippet {
    _id: string;
    title: string;
    code: string;
    language: string;
    createdAt: string;
    isFavorite: boolean;
}

const Dashboard = () => {
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const response = await api.get("/snippets");

                console.log(response.data);

                setSnippets(response.data.snippets);
            } catch (error) {
                console.error(error);
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

    // Dashboard statistics
    const totalSnippets = snippets.length;

    const uniqueLanguages = new Set(
        snippets.map((snippet) => snippet.language)
    ).size;

    const favoriteSnippets = snippets.filter(
        (snippet) => snippet.isFavorite
    ).length;

    const recentlyAdded =
        snippets.length > 0
            ? new Date(
                Math.max(
                    ...snippets.map((snippet) =>
                        new Date(snippet.createdAt).getTime()
                    )
                )
            ).toLocaleDateString()
            : "—";

    const dashboardStats = [
        {
            id: "total",
            label: "Total Snippets",
            value: totalSnippets.toString(),
            hint:
                totalSnippets === 0
                    ? "Start building your collection"
                    : "Snippets in your collection",
            icon: FiCode,
            tint: "bg-indigo-50 text-indigo-600",
        },
        {
            id: "favorites",
            label: "Favorites",
            value: favoriteSnippets.toString(),
            hint:
                favoriteSnippets === 0
                    ? "Star snippets you love"
                    : "Snippets you've favorited",
            icon: FiHeart,
            tint: "bg-violet-50 text-violet-600",
        },
        {
            id: "languages",
            label: "Languages",
            value: uniqueLanguages.toString(),
            hint: "Languages you're using",
            icon: FiTerminal,
            tint: "bg-sky-50 text-sky-600",
        },
        {
            id: "recent",
            label: "Recently Added",
            value: recentlyAdded,
            hint:
                snippets.length > 0
                    ? "Latest snippet added"
                    : "Latest snippet will appear",
            icon: FiFileText,
            tint: "bg-emerald-50 text-emerald-600",
        },
    ];

    return (
        <div className="min-h-screen bg-stone-100">
            <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95">
                <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <img
                            src="/favicon.png"
                            alt="CopyIt"
                            className="h-8 w-8 rounded-full"
                        />

                        <span className="text-lg font-semibold tracking-tight text-neutral-900">
                            CopyIt
                        </span>
                    </div>

                    <span
                        className="hidden h-6 w-px bg-stone-200 sm:block"
                        aria-hidden="true"
                    />

                    <nav className="hidden items-center gap-1 sm:flex">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${item.active
                                    ? "bg-indigo-50 text-indigo-600"
                                    : "text-neutral-600 hover:bg-stone-100 hover:text-neutral-900"
                                    }`}
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="ml-auto flex items-center gap-2 sm:gap-3">
                        <div className="relative hidden md:block">
                            <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

                            <input
                                type="search"
                                placeholder="Search snippets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
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

                        <button
                            type="button"
                            aria-label="Notifications"
                            className="rounded-md p-2 text-neutral-500 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            <FiBell className="h-5 w-5" />
                        </button>

                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-700">
                            <FiUser className="h-4 w-4" />
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="flex items-center gap-1.5 rounded-md p-2 text-neutral-500 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            <FiLogOut className="h-4 w-4" />

                            <span className="hidden text-sm font-medium lg:inline">
                                Logout
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                    <div>
                        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                            Good evening 👋
                        </span>

                        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                            Welcome back to{" "}
                            <span className="text-indigo-600">CopyIt</span>
                        </h1>

                        <p className="mt-3 max-w-lg text-base text-neutral-500">
                            Keep your code snippets organized, searchable, and
                            ready to use.
                        </p>
                    </div>

                    <Link
                        to="/create"
                        className="inline-flex shrink-0 items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                    >
                        <FiPlus className="h-4 w-4" />
                        Create Snippet
                    </Link>
                </section>

                {/* Overview */}
                <section className="mt-10">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        Overview
                    </h2>

                    <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {dashboardStats.map((stat) => (
                            <div
                                key={stat.id}
                                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div
                                    className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.tint}`}
                                >
                                    <stat.icon className="h-4 w-4" />
                                </div>

                                <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-neutral-900">
                                    {stat.value}
                                </p>

                                <p className="mt-1 text-sm font-medium text-neutral-700">
                                    {stat.label}
                                </p>

                                <p className="mt-1 text-xs text-neutral-500">
                                    {stat.hint}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="mt-10">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        Quick actions
                    </h2>

                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                        {quickActions.map((action) => (
                            <a
                                key={action.label}
                                href="#"
                                className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${action.tint}`}
                                >
                                    <action.icon className="h-5 w-5" />
                                </div>

                                <div className="mt-4 flex items-center gap-1">
                                    <p className="text-sm font-semibold text-neutral-900">
                                        {action.label}
                                    </p>

                                    <FiChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                                </div>

                                <p className="mt-1 text-sm text-neutral-500">
                                    {action.description}
                                </p>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Recent Snippets */}
                <section className="mt-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
                            Recent Snippets
                        </h2>

                        <a
                            href="#"
                            className="text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600"
                        >
                            View all
                        </a>
                    </div>

                    <div className="mt-4 space-y-3">
                        {filteredSnippets.length === 0 ? (
                            <div className="rounded-xl border border-stone-200 bg-white px-6 py-12 shadow-sm">
                                <div className="mx-auto max-w-md text-center">
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                        <FiCode className="h-6 w-6" />
                                    </div>

                                    {snippets.length === 0 ? (
                                        <>
                                            <h3 className="mt-5 text-base font-semibold text-neutral-900">
                                                No snippets yet
                                            </h3>

                                            <p className="mt-1.5 text-sm text-neutral-500">
                                                Your saved code snippets will
                                                appear here.
                                            </p>

                                            <div className="mt-6">
                                                <Link
                                                    to="/create"
                                                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-500"
                                                >
                                                    <FiPlus className="h-4 w-4" />
                                                    Create your first snippet
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="mt-5 text-base font-semibold text-neutral-900">
                                                No matching snippets
                                            </h3>

                                            <p className="mt-1.5 text-sm text-neutral-500">
                                                Try a different search term.
                                            </p>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            filteredSnippets.map((snippet) => (
                                <Link
                                    key={snippet._id}
                                    to={`/snippets/${snippet._id}`}
                                    className="block rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-neutral-900">
                                            {snippet.title}
                                        </h3>

                                        <span className="rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                                            {snippet.language}
                                        </span>
                                    </div>

                                    <p className="mt-3 line-clamp-2 font-mono text-sm text-neutral-500">
                                        {snippet.code}
                                    </p>
                                </Link>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between border-t border-stone-200 pt-6">
                    <div className="flex items-center gap-2">
                        <FiGrid className="h-4 w-4 text-indigo-600" />

                        <span className="text-xs text-neutral-500">
                            CopyIt — your code, organized.
                        </span>
                    </div>

                    <span className="font-mono text-xs text-neutral-400">
                        {"{ }"}
                    </span>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;