import Image from "next/image";
import {fetchPostImage} from "../../lib/posts-loader";
import itemImage from "../../public/1700488940348.jpg";

export default async function PostEntryPoster({post}) {
    const imageSrc = await fetchPostImage({post});
    const renderedSrc = imageSrc || itemImage;

    return (
        <div className="posts-list-item-poster">
            <a className="post-poster poster-hover-area" href={`/books/${post.slug}`}>
                <Image
                    src={renderedSrc}
                    alt={post.title.rendered}
                    title={post.title.rendered}
                    fill
                />
            </a>
        </div>
    )
}