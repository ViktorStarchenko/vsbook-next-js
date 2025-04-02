'use client'

import Image from "next/image";
import itemImage from "../../public/1700488940348.jpg";
import {useEffect, useState} from "react";

export default function PostEntryPoster({post}) {
    const [imageSrc, setImageSrc] = useState('');
    const imageUrl = post?._links?.['wp:featuredmedia']?.[0]?.href;
    // const imageSrc = await fetchPostImage({post});
    // const renderedSrc = imageSrc || itemImage;

    useEffect(() => {
        async function loadTaxonomies() {
            try {
                const response = await fetch(`/api/post-image?imageUrl=${imageUrl}`);
                const data = await response.json();
                setImageSrc(data);
            } catch (error) {
                console.error("Failed to fetch taxonomies:", error);
            }
        }

        if (post && imageUrl) {
            loadTaxonomies();
        }
    }, [imageUrl, post]);

    return (
        <div className="posts-list-item-poster">
            <a className="post-poster poster-hover-area" href={`/books/${post.slug}`}>
                <Image
                    src={imageSrc ? imageSrc  : itemImage}
                    alt={post.title.rendered}
                    title={post.title.rendered}
                    fill
                />
            </a>
        </div>
    )
}