'use client';

import {useState, useEffect} from 'react';
import PostInfoTaxonomiesItemClient from "./PostInfoTaxonomiesItemClient";

export default function PostInfoTaxonomiesClient({post, wordWrap = false}) {
    const [taxonomies, setTaxonomies] = useState([]);
    const terms = post._links['wp:term'];
    // const taxonomies = await fetchPostTaxonomies({postId: post.id, terms});

    useEffect(() => {
        async function loadTaxonomies() {
            try {
                const response = await fetch(`/api/post-taxonomies?postId=${post.id}&terms=${JSON.stringify(terms)}`);
                const data = await response.json();
                setTaxonomies(data);
            } catch (error) {
                console.error("Failed to fetch taxonomies:", error);
            }
        }

        if (terms.length > 0) {
            loadTaxonomies();
        }
    }, [terms, post]);
    return (
        <ul className="info-list">
            {taxonomies && taxonomies.genre && <PostInfoTaxonomiesItemClient termName="Genre" term={taxonomies.genre} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.language && <PostInfoTaxonomiesItemClient termName="Language" term={taxonomies.language} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.wrirer && <PostInfoTaxonomiesItemClient termName="Writer" term={taxonomies.wrirer} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.release && <PostInfoTaxonomiesItemClient termName="Release" term={taxonomies.release} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.country && <PostInfoTaxonomiesItemClient termName="Country" term={taxonomies.country} wordWrap={wordWrap}/>}
            {taxonomies && taxonomies.reading_status && <PostInfoTaxonomiesItemClient termName="Reading Status" term={taxonomies.reading_status} wordWrap={wordWrap}/>}
        </ul>
    )
}