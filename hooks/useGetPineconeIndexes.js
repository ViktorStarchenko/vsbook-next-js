'use client';

import {useQuery} from "@tanstack/react-query";

export default function useGetPineconeIndexes() {

    const { data, isLoading } = useQuery({
        queryKey: ['pineconeIndexes'],
        queryFn: async () => {
            const response = await fetch(`/api/pinecone/list-indexes`);
            return response.json();
        },
    });

    return { data, isLoading };
}