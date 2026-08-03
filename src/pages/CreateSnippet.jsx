import { useState } from "react";
import Editor from "@monaco-editor/react";
import { HiOutlinePlusCircle } from "react-icons/hi";
import languages from "../lib/languages";

const CreateSnippet = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-100 px-4">
      <div className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-5 flex items-center gap-2">
          <HiOutlinePlusCircle className="h-5 w-5 text-indigo-500" />
          <div>
            <h1 className="text-xl font-semibold text-zinc-900">
              Create Snippet
            </h1>
            <p className="text-sm text-zinc-500">
              Save a reusable code snippet.
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="text-sm font-medium text-zinc-700"
              >
                Title
              </label>

              <input
                id="title"
                type="text"
                placeholder="e.g. Debounce Function"
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:border-zinc-900"
              />
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label
                htmlFor="language"
                className="text-sm font-medium text-zinc-700"
              >
                Language
              </label>

              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors duration-200 focus:border-zinc-900"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-zinc-700"
              >
                Description
              </label>

              <textarea
                id="description"
                rows={4}
                placeholder="Write a short description..."
                className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors duration-200 focus:border-zinc-900"
              />
            </div>
          </div>

          {/* Monaco Editor */}
          <div className="relative overflow-hidden rounded-lg border border-zinc-300">
            {!code && (
              <div className="pointer-events-none absolute left-14 top-2 z-10 text-sm text-zinc-500">
                // Paste your code snippet here...
              </div>
            )}

            <Editor
              height="320px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                automaticLayout: true,
                padding: {
                  top: 12,
                  bottom: 12,
                },
              }}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white hover:bg-purple-700"
            >
              Save Snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSnippet;
