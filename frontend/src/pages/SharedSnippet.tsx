import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiCheck, FiCode, FiCopy } from "react-icons/fi";
import api from "../api/axios";

interface Snippet {
    title: string;
    code: string;
    language: string;
    createdAt: string;
}

const SharedSnippet = () => {
    const { shareId } = useParams();

    const [snippet, setSnippet] = useState<Snippet | null>(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await api.get(
                    `/snippets/share/${shareId}`
                );

                setSnippet(response.data.snippet);
            } catch (error) {
                console.error(error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchSnippet();
    }, [shareId]);

    const handleCopy = async () => {
        if (!snippet) return;

        await navigator.clipboard.writeText(snippet.code);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100">
                <p className="text-sm text-neutral-500">
                    Loading snippet...
                </p>
            </div>
        );
    }

    if (notFound || !snippet) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
                <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-stone-200 text-neutral-500">
                        <FiCode className="h-6 w-6" />
                    </div>

                    <h1 className="mt-5 text-xl font-semibold text-neutral-900">
                        Snippet not found
                    </h1>

                    <p className="mt-2 text-sm text-neutral-500">
                        This shared snippet may no longer exist.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100 px-4 py-8 sm:px-6 lg:px-8">
            <main className="mx-auto max-w-5xl">
                <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-stone-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <FiCode className="h-5 w-5 text-indigo-600" />

                                <span className="text-sm font-medium text-indigo-600">
                                    CopyIt
                                </span>
                            </div>

                            <h1 className="mt-2 text-xl font-semibold text-neutral-900">
                                {snippet.title}
                            </h1>

                            <span className="mt-2 inline-block rounded-md bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
                                {snippet.language}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500"
                        >
                            {copied ? (
                                <>
                                    <FiCheck className="h-4 w-4" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <FiCopy className="h-4 w-4" />
                                    Copy code
                                </>
                            )}
                        </button>
                    </div>

                    <pre className="overflow-x-auto bg-neutral-950 p-6 text-sm leading-6 text-neutral-100">
                        <code>{snippet.code}</code>
                    </pre>
                </div>
            </main>
        </div>
    );
};

export default SharedSnippet;