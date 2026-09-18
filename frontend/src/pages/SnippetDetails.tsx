import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

interface Snippet {
    _id: string;
    title: string;
    code: string;
    language: string;
    createdAt: string;
}

const SnippetDetails = () => {
    const { id } = useParams();

    const [snippet, setSnippet] = useState<Snippet | null>(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                console.log("Token:", localStorage.getItem("token"));
                const response = await api.get(`/snippets/${id}`);

                console.log(response.data);

                setSnippet(response.data.snippet);
            } catch (error) {
                console.error(error);
            }
        };

        fetchSnippet();
    }, [id]);

    if (!snippet) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{snippet.title}</h1>

            <p>{snippet.language}</p>

            <pre>
                <code>{snippet.code}</code>
            </pre>
        </div>
    );
};

export default SnippetDetails;