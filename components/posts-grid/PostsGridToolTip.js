'use client'

import Link from "next/link";
import {getExcerpt} from "../../lib/utils";
import PostsGridToolTipTaxonomy from "./PostsGridToolTipTaxonomy";
import ViewsCount from "../ViewsCount/ViewsCount";
import FavoutiresIcon from "../FavoutiresIcon/FavoutiresIcon";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

export default function PostsGridToolTip({post, taxonomies, onMouseEnter, onMouseLeave}) {
    const excerpt = getExcerpt(post.content.rendered, 100);

    return (
        <div
            className="posts-grid-tooltip"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="posts-grid-tooltip-inner">
                <div className="posts-grid-tooltip-header">
                    <div className="posts-grid-tooltip-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></div>
                    <ViewsCount post={post}/>
                </div>

                <div className="posts-grid-tooltip-content" dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                {taxonomies && (
                    <div className="posts-grid-tooltip-taxonomies">
                        {taxonomies && taxonomies.genre && <PostsGridToolTipTaxonomy termName="Genre" term={taxonomies.genre} />}
                        {taxonomies && taxonomies.language && <PostsGridToolTipTaxonomy termName="Language" term={taxonomies.language} />}
                        {taxonomies && taxonomies.wrirer && <PostsGridToolTipTaxonomy termName="Writer" term={taxonomies.wrirer} />}
                        {taxonomies && taxonomies.release && <PostsGridToolTipTaxonomy termName="Release" term={taxonomies.release} />}
                        {taxonomies && taxonomies.country && <PostsGridToolTipTaxonomy termName="Country" term={taxonomies.country} />}
                        {taxonomies && taxonomies.reading_status && <PostsGridToolTipTaxonomy termName="Reading Status" term={taxonomies.reading_status} />}
                    </div>
                )}
                <div className="posts-grid-tooltip-actions">
                    <div className="posts-grid-tooltip-actions-icons">
                        <AddToCartButton post={post}/>
                        <FavoutiresIcon post={post}/>
                    </div>
                    <Link className="post-link" href={`/books/${post.slug}`}>
                        <span>ℹ</span>
                        Details
                    </Link>
                </div>
            </div>
        </div>
    )
}