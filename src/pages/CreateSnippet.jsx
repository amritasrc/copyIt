import { useState } from "react";
import Editor from "@monaco-editor/react";
import { HiOutlinePlusCircle } from "react-icons/hi";

const CreateSnippet = () => {
    const [code, setCode] = useState("");

    const languages = [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "C++",
        "C",
        "C#",
        "Go",
        "Rust",
        "PHP",
        "Ruby",
        "Swift",
        "Kotlin",
        "Dart",
        "SQL",
        "HTML",
        "CSS",
        "Bash",
        "JSON",
        "YAML",
    ];

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

                        <div className="space-y-2">
                            <label
                                htmlFor="language"
                                className="text-sm font-medium text-zinc-700"
                            >
                                Language
                            </label>

                            <select
                                id="language"
                                defaultValue=""
                                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition-colors duration-200 focus:border-zinc-900"
                            >
                                <option value="" disabled>
                                    Select a language
                                </option>

                                {languages.map((language) => (
                                    <option
                                        key={language}
                                        value={language.toLowerCase().replace(/\s+/g, "-")}
                                    >
                                        {language}
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
                    <div className="overflow-hidden rounded-lg border border-zinc-300">
                        <Editor
                            height="320px"
                            defaultLanguage="javascript"
                            value={code || "//Paste your code snippet here..."}
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
                            className="rounded-lg bg-indigo-500 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-600"
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