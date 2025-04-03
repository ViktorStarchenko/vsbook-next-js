'use client'

import Image from "next/image";
import itemImage from "../../public/1700488940348.jpg";
import {usePostImage} from "../../hooks/usePostImage";

export default function PostsGridItemImageClient({post}) {
    const {data: imageSrc, isLoading, isError, error} = usePostImage(post);
    const renderedSrc = imageSrc || itemImage;
    return (
        <Image src={renderedSrc} alt={post.title.rendered} title={post.title.rendered} fill/>
    )
}