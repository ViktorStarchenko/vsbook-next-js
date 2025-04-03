'use client'

import Image from "next/image";
import itemImage from "../../public/1700488940348.jpg";
import Link from "next/link";
import {usePostImage} from "../../hooks/usePostImage";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";

export default function PostEntryPosterClient({post}) {
    const {data, isLoading} = usePostImage(post);
    // console.log("imageUrl", imageUrl)
    // console.log("imageSrc", imageSrc)
    const imageSrc = data ? data  : itemImage
    return (
        <div className="posts-list-item-poster">
            <Link className="post-poster poster-hover-area" href={`/books/${post.slug}`}>
                {isLoading && <LoadingIndicator />}
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={post.title.rendered}
                        title={post.title.rendered}
                        fill
                    />
                )}
            </Link>
        </div>
    )
}