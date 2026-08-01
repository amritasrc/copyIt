import { useState } from "react";
import Editor from "@monaco-editor/react";
import { HiOutlinePlusCircle } from "react-icons/hi";

const CreateSnippet = () => {
    const [code, setCode] = useState("");

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
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-black placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Language"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-black placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />

                        <input
                            type="text"
                            placeholder="Tags (optional)"
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-black placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                        />
                    </div>

                    <textarea
                        rows={2}
                        placeholder="Description (optional)"
                        className="w-full rounded-xl border border-zinc-700 bg-zinc-100 py-3 pl-11 pr-4 text-sm text-black placeholder-zinc-500 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

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