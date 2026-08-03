import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { HiArrowLeft, HiSave } from "react-icons/hi";
import snippetService from "../lib/config";
import languages from "../lib/languages";

const EditSnippet = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        language: "javascript",
        code: "",
        tags: "",
    });

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const snippet = await snippetService.getSnippet(id);

                if (snippet) {
                    setFormData({
                        title: snippet.title,
                        description: snippet.description || "",
                        language: snippet.language,
                        code: snippet.code,
                        tags: snippet.tags || "",
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [id]);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        await snippetService.updateSnippet(id, formData);

        navigate(`/snippet/${id}`);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-100 px-6 py-8">
            <div className="mx-auto max-w-6xl">

                <Link
                    to={`/snippet/${id}`}
                    className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-black"
                >
                    <HiArrowLeft />
                    Back
                </Link>

                <h1 className="mb-8 text-3xl font-bold text-zinc-900">
                    Edit Snippet
                </h1>

                <form onSubmit={handleSave} className="space-y-6">

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">
                                Title
                            </label>

                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700">
                                Language
                            </label>

                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                            >
                                {languages.map((lang) => (
                                    <option key={lang.value} value={lang.value}>
                                        {lang.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">
                            Description
                        </label>

                        <textarea
                            rows={3}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-900"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-700">
                            Code
                        </label>

                        <div className="overflow-hidden rounded-lg border border-zinc-300">
                            <Editor
                                height="500px"
                                language={formData.language}
                                value={formData.code}
                                onChange={(value) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        code: value || "",
                                    }))
                                }
                                theme="vs-dark"
                                options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    wordWrap: "on",
                                    automaticLayout: true,
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">

                        <Link
                            className="rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium hover:bg-zinc-50"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
                        >
                            <HiSave />
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default EditSnippet;