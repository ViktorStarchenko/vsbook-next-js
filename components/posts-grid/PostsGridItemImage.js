import Image from "next/image";
export default function PostsGridItemImage({renderedSrc, title}) {

    return (
        <Image src={renderedSrc} alt={title} fill/>
    )
}