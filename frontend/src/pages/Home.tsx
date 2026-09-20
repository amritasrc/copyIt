import { Link } from "react-router-dom";
import {
    FiBookmark,
    FiCheckCircle,
    FiCode,
    FiFolder,
    FiGrid,
    FiHeart,
    FiLogIn,
    FiSearch,
    FiShield,
    FiTerminal,
    FiUserPlus,
    FiZap,
} from "react-icons/fi";

const features = [
    {
        label: "Store code snippets",
        description: "Drop in a title, language, and your code. Keep everything in one place.",
        icon: FiCode,
        tint: "bg-indigo-50 text-indigo-600",
    },
    {
        label: "Search & organize",
        description: "Find anything instantly with search, folders, and helpful tags.",
        icon: FiSearch,
        tint: "bg-sky-50 text-sky-600",
    },
    {
        label: "Save your favorites",
        description: "Bookmark the snippets you reach for most and keep them close.",
        icon: FiHeart,
        tint: "bg-violet-50 text-violet-600",
    },
];

const highlights = [
    {
        label: "Quick snippets",
        description: "Create and edit snippets in seconds as you code.",
        icon: FiZap,
        tint: "bg-indigo-50 text-indigo-600",
    },
    {
        label: "Favorites",
        description: "Star the pieces of code you use again and again.",
        icon: FiBookmark,
        tint: "bg-violet-50 text-violet-600",
    },
    {
        label: "Organized",
        description: "Group your code by language and keep a tidy library.",
        icon: FiFolder,
        tint: "bg-sky-50 text-sky-600",
    },
    {
        label: "Private & secure",
        description: "Your snippets live behind your own account.",
        icon: FiShield,
        tint: "bg-emerald-50 text-emerald-600",
    },
];

const Home = () => {
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
                        <a
                            href="#features"
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            Features
                        </a>
                        <a
                            href="#about"
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            About
                        </a>
                    </nav>

                    <div className="ml-auto flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:bg-stone-100 hover:text-neutral-900"
                        >
                            <FiLogIn className="h-4 w-4" />
                            Sign in
                        </Link>

                        <Link
                            to="/signup"
                            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                        >
                            <FiUserPlus className="h-4 w-4" />
                            Sign up
                        </Link>
                    </div>
                </div>
            </header>

            <main>
                <section
                    id="about"
                    className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
                >
                    <div className="mx-auto max-w-3xl text-center">
                        <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                            Your code, organized
                        </span>

                        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
                            Keep your code snippets{" "}
                            <span className="text-indigo-600">organized</span>,
                            searchable, and ready to use.
                        </h1>

                        <p className="mt-6 text-lg text-neutral-500">
                            CopyIt is your personal library for the code you
                            want to keep. Save snippets, favorite what matters,
                            and bring them back the moment you need them — all
                            from a clean, simple workspace.
                        </p>

                        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <Link
                                to="/signup"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 sm:w-auto"
                            >
                                <FiUserPlus className="h-4 w-4" />
                                Get started for free
                            </Link>

                            <Link
                                to="/login"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-stone-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 sm:w-auto"
                            >
                                <FiLogIn className="h-4 w-4" />
                                Sign in to CopyIt
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section
                    id="features"
                    className="border-y border-stone-200 bg-white"
                >
                    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                        <h2 className="text-center text-sm font-semibold uppercase tracking-wide text-neutral-500">
                            What you can do
                        </h2>

                        <div className="mt-8 grid gap-4 md:grid-cols-3">
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div
                                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${feature.tint}`}
                                    >
                                        <feature.icon className="h-5 w-5" />
                                    </div>

                                    <h3 className="mt-4 text-base font-semibold text-neutral-900">
                                        {feature.label}
                                    </h3>

                                    <p className="mt-1.5 text-sm text-neutral-500">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Highlights */}
                <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {highlights.map((highlight) => (
                            <div
                                key={highlight.label}
                                className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <div
                                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${highlight.tint}`}
                                >
                                    <highlight.icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-4 text-base font-semibold text-neutral-900">
                                    {highlight.label}
                                </h3>

                                <p className="mt-1.5 text-sm text-neutral-500">
                                    {highlight.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-4 lg:grid-cols-2">
                        <div className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                            <FiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                            <div>
                                <h3 className="text-base font-semibold text-neutral-900">
                                    A code reference you can trust
                                </h3>

                                <p className="mt-1.5 text-sm text-neutral-500">
                                    Stop hunting through old projects or browser
                                    history. Keep the exact snippet you worked
                                    out, in a place you can always find it.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
                            <FiTerminal className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />

                            <div>
                                <h3 className="text-base font-semibold text-neutral-900">
                                    Ready to use, wherever you code
                                </h3>

                                <p className="mt-1.5 text-sm text-neutral-500">
                                    Copy a snippet straight from the details
                                    page and paste it into your editor. Simple,
                                    fast, and out of your way.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-14 rounded-xl bg-neutral-900 px-6 py-12 text-center shadow-sm sm:px-12">
                        <FiCode className="mx-auto h-8 w-8 text-indigo-400" />

                        <p className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                            Ready to keep your best code?
                        </p>

                        <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-400">
                            Create an account and start building your personal
                            snippet library in minutes.
                        </p>

                        <Link
                            to="/signup"
                            className="mt-8 inline-flex items-center gap-2 rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                        >
                            <FiUserPlus className="h-4 w-4" />
                            Create your account
                        </Link>
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

export default Home;