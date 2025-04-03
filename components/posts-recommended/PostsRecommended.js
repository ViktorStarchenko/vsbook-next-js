'use client'

import { useState, useEffect } from 'react';
import { parseHTML } from "../../lib/client-utils";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";
import { useQuery } from "@tanstack/react-query";
import PostsListItemClient from "../posts-list-client/PostsListItemClient";

export default function PostsRecommended({ post }) {
    const [queryText, setQueryText] = useState('');

    useEffect(() => {
        if (post) {
            setQueryText(`${post.title.rendered} ${parseHTML(post.content.rendered)}`);
        }
    }, [post]);

    // API request to get embedding results
    const { data: embeddingResult = [], isLoading: isEmbeddingLoading } = useQuery({
        queryKey: ['embeddingResult', queryText],
        queryFn: async () => {
            if (!queryText) return [];
            const response = await fetch("/api/pinecone/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ namespace: "example-namespace", queryText })
            });
            const data = await response.json();
            return data.matches || [];
        },
        enabled: !!queryText // The query is executed only if `queryText` is present.
    });

    // Generating an array of IDs to query posts
    const embeddingIds = embeddingResult
        .filter(item => item.id !== post.id.toString())
        .map(item => item.id);

    // Request posts by found IDs
    const { data: postsData, isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', embeddingIds],
        queryFn: async () => {
            if (!embeddingIds.length) return { posts: [] };
            const response = await fetch(`/api/posts?page=1&perPage=5&sortOrder=desc&idsArray=${JSON.stringify(embeddingIds)}`);
            return response.json();
        },
        enabled: embeddingIds.length > 0 // The request is executed only if there is an ID
    });

    return (
        <div>
            <h3 className="widget-title">You may also like</h3>
            {isEmbeddingLoading || isPostsLoading ? <p>Loading...</p> : null}
            {postsData?.posts?.length > 0 && (
                <KeenSlider layout="list-small" perView="1" perView1024="1" perView767="1" perView600="1">
                    {postsData.posts.map(item => (
                        <KeenSliderSlide key={`recommended-slide-${item.id}`}>
                            <PostsListItemClient post={item} />
                        </KeenSliderSlide>
                    ))}
                </KeenSlider>
            )}
        </div>
    );
}
