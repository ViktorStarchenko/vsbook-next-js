// components/MovieChatWidget.js
'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {useSelector} from "react-redux";
import useGetPineconeEmbeddings from "../../hooks/useGetPineconeEmbeddings";

export default function BooksChatWidget() {
    const [queryText, setQueryText] = useState('');
    const [response, setResponse] = useState(null);
    const [updatedQueryText, setUpdatedQueryText] = useState(null);
    const [loading, setLoading] = useState(false);

    const currentIndex = useSelector(state => state.pineconeIndexes.currentIndex);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setResponse(null);
    //
    //     const res = await fetch('/api/recommend/helper-chat', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ queryText }),
    //     });
    //
    //     if (!res.ok) {
    //         const errorData = await res.json();
    //         setResponse({ error: errorData.error || "Something went wrong" });
    //         setLoading(false);
    //         return;
    //     }
    //
    //     const data = await res.json();
    //     setResponse(data);
    //     setLoading(false);
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResponse(null);

        const response = await fetch('/api/agent/groq/generate-query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userMessage: queryText }),
        });

        const data = await response.json();
        // console.log(data.answer);
        // console.log("queryText", queryText);
        setUpdatedQueryText(data.answer);
        setLoading(false);
    };


    const { data: embeddingResult = {}, isLoading: isEmbeddingLoading } = useGetPineconeEmbeddings({
        indexName: currentIndex.name,
        indexHost: currentIndex.host,
        namespace: "example-namespace",
        queryText: updatedQueryText
    });

    useEffect( () =>  {
        if (embeddingResult?.matches) {
            async function fetchData() {
                const response = await fetch('/api/agent/groq/generate-response', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ embeddingResult: embeddingResult.matches, userMessage: queryText }),
                });
                const data = await response.json();
                console.log('FULL ANSWER', data.answer);
            }
            fetchData();
        }
    }, [embeddingResult])

    console.log('embeddingResult', embeddingResult);

    // let embeddingIds = []
    // if (response && response.matches) {
    //     console.log("response.matches", response.matches)
    //     embeddingIds = response.matches
    //         .map(item => item.metadata.ID);
    // }
    //
    // // Request posts by found IDs
    // const { data: postsData, isLoading: isPostsLoading } = useQuery({
    //     queryKey: ['posts', embeddingIds],
    //     queryFn: async () => {
    //         if (!embeddingIds.length) return { posts: [] };
    //         const response = await fetch(`/api/posts?page=1&perPage=5&sortOrder=desc&idsArray=${JSON.stringify(embeddingIds)}`);
    //         return response.json();
    //     },
    //     enabled: embeddingIds.length > 0 // The request is executed only if there is an ID
    // });
    //
    //
    // if (postsData) {
    //     console.log("postsData", postsData)
    // }

    return (
        <div className="fixed bottom-4 right-4 bg-white border p-4 shadow-md rounded-xl w-80 z-50">
            <h4 className="font-bold mb-2">🎬 Ask AI for a Book</h4>
            {response?.error && (
                <div className="mt-3 text-red-500 text-sm">
                    {response.error}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="e.g. dark sci-fi thriller"
                    className="w-full border px-2 py-1 mb-2"
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-black text-white py-1 rounded"
                    disabled={loading}
                >
                    {loading ? 'Searching...' : 'Ask AI'}
                </button>
            </form>

            {response?.explanation && (
                <div className="mt-3 text-sm">
                    <p className="mb-2">{response.explanation}</p>
                    <ul className="list-disc ml-5">
                        {postsData && postsData.posts?.map(post => (
                            <li key={post.id}>
                                <Link href={`/books/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
