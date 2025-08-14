'use client';

import {useQuery} from "@tanstack/react-query";

export default function useGetPineconeEmbeddings({indexName, indexHost = "", namespace = "", queryText}) {

    const { data, isLoading } = useQuery({
        queryKey: ['embeddingResult', queryText],
        queryFn: async () => {
            if (!queryText || !indexName) return [];
            const response = await fetch("/api/pinecone/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // body: JSON.stringify({ namespace: "example-namespace", queryText })
                body: JSON.stringify({
                    indexName,
                    indexHost,
                    namespace,
                    queryText })
            });
            const data = await response.json();
            return data || {};
        },
        enabled: !!queryText && !!indexName // The query is executed only if `queryText` is present.
    });

    return { data, isLoading }
}