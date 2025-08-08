'use client'

import {useState, useEffect} from 'react';
import PostsListClient from "../posts-list-client/PostsListClient";
import {useQuery} from "@tanstack/react-query";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import {useSelector} from "react-redux";
import useGetPineconeEmbeddings from "../../hooks/useGetPineconeEmbeddings";


export default function SearchResult({searchBar}) {
    const [queryText, setQueryText] = useState(searchBar || null);
    const currentIndex = useSelector(state => state.pineconeIndexes.currentIndex) || {};

    useEffect(() => {
        setQueryText(searchBar);
    }, [searchBar])

    const { data: embeddingResult = {}, isLoading: isEmbeddingLoading } = useGetPineconeEmbeddings({
        indexName: currentIndex.name,
        indexHost: currentIndex.host,
        namespace: "example-namespace",
        queryText
    });


    // Generating an array of IDs to query posts
    const matches = embeddingResult.matches || [];
    const embeddingIds = matches.map(item => item.id);

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
            Your results is
            {isEmbeddingLoading || isPostsLoading && <LoadingIndicator />}
            {postsData?.posts?.length > 0 && (
                <PostsListClient posts={postsData?.posts} layout="col-2"/>
            )}
        </div>
    )
}