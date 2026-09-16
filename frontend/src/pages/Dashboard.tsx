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

const navItems = [
  { label: "Dashboard", active: true },
  { label: "Snippets", active: false },
  { label: "Favorites", active: false },
];

const stats = [
  { id: "total", label: "Total Snippets", value: "0", hint: "Start building your collection", icon: FiCode, tint: "bg-indigo-50 text-indigo-600" },
  { id: "favorites", label: "Favorites", value: "0", hint: "Star snippets you love", icon: FiHeart, tint: "bg-violet-50 text-violet-600" },
  { id: "languages", label: "Languages", value: "0", hint: "Track what you save", icon: FiTerminal, tint: "bg-sky-50 text-sky-600" },
  { id: "recent", label: "Recently Added", value: "—", hint: "Latest snippet will appear", icon: FiFileText, tint: "bg-emerald-50 text-emerald-600" },
];

const quickActions = [
  { label: "Create a snippet", description: "Drop in a title, language, and your code.", icon: FiPlus, tint: "bg-indigo-50 text-indigo-600" },
  { label: "Save your best code", description: "Keep the snippets you reach for most.", icon: FiBookmark, tint: "bg-violet-50 text-violet-600" },
  { label: "Organize your workflow", description: "Group snippets into folders and tags.", icon: FiFolder, tint: "bg-sky-50 text-sky-600" },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="sticky top-0 z-10 border-b border-stone-200 bg-white/95">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="CopyIt" className="h-8 w-8 rounded-full" />
            <span className="text-lg font-semibold tracking-tight text-neutral-900">CopyIt</span>
          </div>

          <span className="hidden h-6 w-px bg-stone-200 sm:block" aria-hidden="true" />

          <nav className="hidden items-center gap-1 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  item.active
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
              className="flex items-center gap-1.5 rounded-md p-2 text-neutral-500 transition-colors hover:bg-stone-100 hover:text-neutral-900"
            >
              <FiLogOut className="h-4 w-4" />
              <span className="hidden text-sm font-medium lg:inline">Logout</span>
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
              Welcome back to <span className="text-indigo-600">CopyIt</span>
            </h1>
            <p className="mt-3 max-w-lg text-base text-neutral-500">
              Keep your code snippets organized, searchable, and ready to use.
            </p>
          </div>

          <button
            type="button"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            <FiPlus className="h-4 w-4" />
            Create Snippet
          </button>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Overview</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.tint}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <p className="mt-4 font-mono text-2xl font-semibold tracking-tight text-neutral-900">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-neutral-700">{stat.label}</p>
                <p className="mt-1 text-xs text-neutral-500">{stat.hint}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">Quick actions</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href="#"
                className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${action.tint}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="mt-4 flex items-center gap-1">
                  <p className="text-sm font-semibold text-neutral-900">{action.label}</p>
                  <FiChevronRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600" />
                </div>
                <p className="mt-1 text-sm text-neutral-500">{action.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-900">Recent Snippets</h2>
            <a href="#" className="text-sm font-medium text-neutral-500 transition-colors hover:text-indigo-600">
              View all
            </a>
          </div>

          <div className="mt-4 rounded-xl border border-stone-200 bg-white px-6 py-12 shadow-sm">
            <div className="mx-auto max-w-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FiCode className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-center text-base font-semibold text-neutral-900">No snippets yet</h3>
              <p className="mt-1.5 text-center text-sm text-neutral-500">
                Your saved code snippets will appear here.
              </p>

              <div className="mt-6 overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
                <div className="flex items-center gap-1.5 border-b border-stone-200 bg-white px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
                  <span className="ml-2 font-mono text-xs text-neutral-400">untitled-snippet.ts</span>
                </div>
                <div className="space-y-2 px-4 py-4 font-mono text-xs text-neutral-400">
                  <div className="h-2.5 w-2/3 rounded bg-stone-200" />
                  <div className="h-2.5 w-1/2 rounded bg-stone-200" />
                  <div className="h-2.5 w-3/4 rounded bg-stone-200" />
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
                >
                  <FiPlus className="h-4 w-4" />
                  Create your first snippet
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-t border-stone-200 pt-6">
          <div className="flex items-center gap-2">
            <FiGrid className="h-4 w-4 text-indigo-600" />
            <span className="text-xs text-neutral-500">CopyIt — your code, organized.</span>
          </div>
          <span className="font-mono text-xs text-neutral-400">{`{ }`}</span>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;