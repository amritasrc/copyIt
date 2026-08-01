import { useState, useEffect } from "react";
import supabase from "../lib/supabase";
import SnippetCard from "../comps/SnippetCard";
import { HiSearch, HiCode, HiOutlinePlusCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl border border-zinc-700 bg-zinc-800 p-5">
    <div className="mb-3 flex items-start justify-between">
      <div className="h-5 w-3/5 rounded bg-zinc-700" />
      <div className="h-4 w-16 rounded-full bg-zinc-700" />
    </div>
    <div className="mb-4 space-y-2">
      <div className="h-3 w-full rounded bg-zinc-700" />
      <div className="h-3 w-4/5 rounded bg-zinc-700" />
    </div>
    <div className="h-20 rounded-lg bg-zinc-700" />
    <div className="mt-4 flex items-center justify-between border-t border-zinc-700 pt-3">
      <div className="h-4 w-20 rounded bg-zinc-700" />
      <div className="h-4 w-4 rounded bg-zinc-700" />
    </div>
  </div>
);

const Home = () => {

  const authStatus = useSelector((state) => state.auth.status);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getSnippets = async () => {
      setLoading(true);
      setError(null);
      const { data: snippets, error } = await supabase
        .from("snippets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setData(snippets || []);
      }
      setLoading(false);
    };

    getSnippets();
  }, []);

  const filtered = data.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.language?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto grid place-items-center min-h-screen bg-zinc-100 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
          <HiCode className="h-4 w-4" />
          Your personal code snippet vault
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-black sm:text-4xl">
          Welcome to <span className="text-indigo-400">CopyIt</span>
        </h1>
        <p className="mx-auto mb-6 max-w-lg text-base text-zinc-600">
          Save, organize, and quickly access your frequently used code snippets
          — all in one place.
        </p>

        {/* Search Bar */}
        <div className="relative mx-auto max-w-md">
          <HiSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search snippets by title, language, or description…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-black placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="mx-auto max-w-6xl">
        {!authStatus ? (
          <div className="rounded-xl border border-zinc-700 bg-zinc-200 p-12 text-center">
            <HiCode className="mx-auto mb-4 h-12 w-12 text-indigo-400" />
            <h2 className="text-2xl font-semibold text-black">
              Login to view your snippets
            </h2>
            <p className="mt-2 text-zinc-600">
              Please log in to access your saved code snippets.
            </p>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-800 bg-red-900/30 p-8 text-center">
            <p className="text-lg font-medium text-red-400">
              Failed to load snippets
            </p>
            <p className="mt-1 text-sm text-red-300">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 p-12 text-center">
            <HiOutlinePlusCircle className="mx-auto mb-3 h-12 w-12 text-zinc-600" />
            <p className="text-lg font-medium text-zinc-400">
              {search ? "No snippets match your search" : "No snippets yet"}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {search
                ? "Try a different keyword."
                : "Create your first snippet to get started."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <SnippetCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                lang={item.language}
                code={item.code}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home;
