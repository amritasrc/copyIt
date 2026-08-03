import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  HiArrowLeft,
  HiOutlineClipboardCopy,
  HiPencil,
  HiTrash,
} from "react-icons/hi";

import snippetService from "../lib/config"; 

const ViewSnippet = () => {
  const { id } = useParams();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const data = await snippetService.getSnippet(id);
        setSnippet(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!snippet) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Snippet not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-100 px-6 py-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">

          <div>
            <Link
              to="/"
              className="mb-3 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-black"
            >
              <HiArrowLeft />
              Back
            </Link>

            <h1 className="text-3xl font-bold text-zinc-900">
              {snippet.title}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-full border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                {snippet.language}
              </span>
            </div>

            {snippet.description && (
              <p className="mt-4 max-w-3xl text-zinc-600">
                {snippet.description}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigator.clipboard.writeText(snippet.code)}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-zinc-50"
            >
              <HiOutlineClipboardCopy />
              Copy
            </button>

            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition hover:bg-zinc-50"
            >
              <HiPencil />
              Edit
            </button>

            <button
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
            >
              <HiTrash />
              Delete
            </button>
          </div>

        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-300 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-5 py-3">
            <span className="font-medium text-zinc-700">
              Source Code
            </span>

            <span className="text-xs uppercase tracking-wider text-zinc-500">
              Read Only
            </span>
          </div>

          <Editor
            height="600px"
            language={(snippet.language || "javascript").toLowerCase()}
            value={snippet.code || ""}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              padding: {
                top: 16,
                bottom: 16,
              },
            }}
          />

        </div>
      </div>
    </div>
  );
};

export default ViewSnippet;