"use client";

import { useState, useEffect } from "react";
import {sortByViewsCountDescending} from "../lib/utils";
import Section from "./section/Section";
import PostsList from "./posts-list/PostsList";

export default function SearchComponent() {
    const [posts, setPosts] = useState(null)
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch("/api/pinecone/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ namespace: "example-namespace", queryText: query })
        });

        const data = await response.json();
        setResults(data.matches || []);
    };

    useEffect(() => {
        if (results.length > 0) {

            const newIds = sortByViewsCountDescending(results, 10).map(item => item.id);
            if (!newIds) {
                return null;
            }

            async function loadPosts() {
                try {
                    const response = await fetch(`/api/posts?page=1&perPage=5&sortOrder=desc&idsArray=${JSON.stringify(newIds)}`);
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            }

            if (newIds.length > 0) {
                loadPosts();
            }

        }

    }, [results]);

    let content;
    if (posts && posts.posts.length > 0) {
        content = <PostsList posts={posts.posts} layout="col-2"/>
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter search query"
                    className="border p-2"
                />
                <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white">
                    Search
                </button>

                <div className="mt-4">
                    {results.map((result, index) => (
                        <div key={index} className="p-2 border-b">
                            ID: {result.id} -- {result.text} (Score: {result.score})
                        </div>
                    ))}
                </div>
            </div>
            <Section>
                {content}
            </Section>
        </>
    );
}
