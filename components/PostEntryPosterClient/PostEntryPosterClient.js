'use client'

import Image from "next/image";
import itemImage from "../../public/1700488940348.jpg";
import {useQuery} from "@tanstack/react-query";

export default function PostEntryPosterClient({post}) {
    const imageUrl = post?._links?.['wp:featuredmedia']?.[0]?.href || null;

    const {data: imageSrc, isLoading} = useQuery({
        queryKey: ['postImage', {postId: post.id, imageUrl: imageUrl}],
        queryFn: async () => {
            if (!imageUrl) {return null}
            const response = await fetch(`/api/post-image?imageUrl=${imageUrl}`);
            return response.json();
        },
        enabled: !!imageUrl
    })
    // console.log("imageUrl", imageUrl)
    // console.log("imageSrc", imageSrc)
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