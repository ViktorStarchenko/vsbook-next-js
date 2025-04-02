'use client'

import { useState, useEffect, useMemo } from 'react';
import { parseHTML } from "../../lib/utils";
import PostsList from "../posts-list/PostsList";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";
import PostsListItem from "../posts-list/PostsListitem";

export default function PostsRecommended({ post }) {
    const [queryText, setQueryText] = useState('');
    const [embeddingResult, setEmbeddingResult] = useState([]);
    const [embeddingIds, setEmbeddingIds] = useState([]);
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        if (post) {
            setQueryText(`${post.title.rendered} ${parseHTML(post.content.rendered)}`);
        }
    }, [post]);

    useEffect(() => {
        if (!queryText) return;

        const fetchData = async () => {
            try {
                const response = await fetch("/api/pinecone/search", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ namespace: "example-namespace", queryText })
                });
                const data = await response.json();
                setEmbeddingResult(data.matches || []);
            } catch (error) {
                console.error("Failed to fetch embeddings:", error);
            }
        };

        fetchData();
    }, [queryText]);

    useEffect(() => {
        if (!embeddingResult.length) return;

        const newIds = embeddingResult
            .filter(item => item.id !== post.id.toString())
            .map(item => item.id);
        setEmbeddingIds(newIds);

        if (newIds.length > 0) {
            const loadPosts = async () => {
                try {
                    const response = await fetch(`/api/posts?page=1&perPage=5&sortOrder=desc&idsArray=${JSON.stringify(newIds)}`);
                    const data = await response.json();
                    setPosts(data);
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            };

            loadPosts();
        }
    }, [embeddingResult, post.id]);

    return (
        <div>
            <h3 className="widget-title">You may also like</h3>
            {/*{posts?.posts.length > 0 && <PostsList posts={posts.posts} layout="sidebar-snippet" />}*/}
            {posts?.posts.length > 0 && (
                <KeenSlider layout="list-small" perView="1" perView1024="1" perView767="1" perView600="1">
                    {posts.posts.map(item => (
                        <KeenSliderSlide key={`recommended-slide-${item.id}`}>
                            <PostsListItem post={item}/>
                        </KeenSliderSlide>
                    ))}
                </KeenSlider>
            )}
        </div>
    );
}
