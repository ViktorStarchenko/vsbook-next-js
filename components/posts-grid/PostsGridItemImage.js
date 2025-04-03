import Image from "next/image";
import {fetchPostImageByUrl} from "../../lib/posts-loader";
import itemImage from "../../public/1700488940348.jpg";
export default async function PostsGridItemImage({post}) {
    const imageUrl = post?._links?.["wp:featuredmedia"]?.[0]?.href || null;

    // Since the imageUrl is not present, we immediately set the standard image
    const imageSrc = imageUrl ? await fetchPostImageByUrl(imageUrl) : null;
    const renderedSrc = imageSrc || itemImage;
    return (
        <Image src={renderedSrc} alt={post.title.rendered} title={post.title.rendered} fill/>
    )
}