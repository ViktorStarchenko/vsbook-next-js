import Image from "next/image";
import ImagePlaceholder from "../../public/1700488940348.jpg";
import {fetchPostImage} from "../../lib/posts-loader";

export default async function PostSingleImage({post}) {
    const imageSrc = await fetchPostImage({post});
    const renderedSrc = imageSrc || ImagePlaceholder;

    return (
        <div className="entry-poster">
            <Image className="test" src={renderedSrc} alt={post.title.rendered} fill/>
        </div>
    )
}