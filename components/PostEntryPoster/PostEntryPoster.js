import Image from "next/image";
import itemImage from "../../public/1700488940348.jpg";
import {fetchPostImageByUrl} from "../../lib/posts-loader";

export default async function PostEntryPoster({post}) {

    const imageUrl = post?._links?.['wp:featuredmedia']?.[0]?.href || null;
    const imageSrc = await fetchPostImageByUrl(imageUrl);
    // const renderedSrc = imageSrc || itemImage;

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