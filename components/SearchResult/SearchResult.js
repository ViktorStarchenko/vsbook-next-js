'use client'

import {useState, useEffect} from 'react';
import PostsListClient from "../posts-list-client/PostsListClient";
import {useQuery} from "@tanstack/react-query";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";


export default function SearchResult({searchBar}) {
    const [queryText, setQueryText] = useState(searchBar || null);
    // console.log("SEARCHRESULT queryString: ", queryText)

    useEffect(() => {
        setQueryText(searchBar);
    }, [searchBar])

    // API request to get embedding results
    const { data: embeddingResult = [], isLoading: isEmbeddingLoading } = useQuery({
        queryKey: ['embeddingResult', queryText],
        queryFn: async () => {
            if (!queryText) return [];
            const response = await fetch("/api/pinecone/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ namespace: "example-namespace", queryText, topK: 10 })
            });
            const data = await response.json();
            return data.matches || [];
        },
        enabled: !!queryText // The query is executed only if `queryText` is present.
    });

    // Generating an array of IDs to query posts
    const embeddingIds = embeddingResult.map(item => item.id);

    // Request posts by found IDs
    const { data: postsData, isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', embeddingIds],
        queryFn: async () => {
            if (!embeddingIds.length) return { posts: [] };
            const response = await fetch(`/api/posts?page=1&perPage=10&sortOrder=desc&idsArray=${JSON.stringify(embeddingIds)}`);
            return response.json();
        },
        enabled: embeddingIds.length > 0 // The request is executed only if there is an ID
    });

    return (
        <div>
            <h2></h2>
            Your results is
            {isEmbeddingLoading || isPostsLoading && <LoadingIndicator />}
            {postsData?.posts?.length > 0 && (
                <PostsListClient posts={postsData?.posts} layout="col-2"/>
            )}
        </div>
    )
}