import {useQuery} from "@tanstack/react-query";

export function useGetEmbeddingClient({queryText}) {

    // API request to get embedding results
    const { data = {}, isLoading } = useQuery({
        queryKey: ['embeddingResult', queryText],
        queryFn: async () => {
            if (!queryText) return [];
            const response = await fetch("/api/pinecone/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ namespace: "example-namespace", queryText })
                body: JSON.stringify({ namespace: "", queryText })
            });
            const data = await response.json();
            return data || {};
        },
        enabled: !!queryText // The query is executed only if `queryText` is present.
    });

    return { data, isLoading }
}