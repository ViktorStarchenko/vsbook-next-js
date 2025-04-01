'use client'

import {useState, useEffect, useMemo} from 'react';
import {useSelector} from "react-redux";
import {sortByViewsCountDescending} from "../../lib/utils";

export default function PostsMostViewed() {
    const [posts, setPosts] = useState([]);
    const viewedItems = useSelector(state => state.views.items);
    console.log("viewedItems", viewedItems)


    const newIds = useMemo(() => {
        return sortByViewsCountDescending(viewedItems, 5).map(item => item.id);
    }, [viewedItems]);
    //
    useEffect(() => {
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
    }, [newIds]);

    console.log("Fetched posts:", posts);

    let content;
    // if (posts && posts.posts.length > 0) {
    //     content = <PostsList posts={posts.posts}/>
    // }

    return (
        <div>
        </div>
    )
}