import Link from "next/link";
import PostsGridItemFront from "./PostsGridItemFront";

export default function PostsGridItem({post, itemPosition}) {
    // const isLastInRow = (itemPosition % 4 && itemPosition % 3) === 0;
    const isLastInRow = itemPosition % 4 === 2 || itemPosition % 4 === 3;
    return (
        <div className={`posts-grid-item ${isLastInRow ? "last-in-row" : ""}`}>
            <div className="posts-grid-item--inner">
                <PostsGridItemFront post={post}/>
                <div className="posts-grid-item--content">
                    <Link className="posts-grid-item--title" href={`/books/${post.slug}`} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></Link>
                    <p className="posts-grid-item--description">description</p>
                </div>
            </div>
        </div>
    )
}