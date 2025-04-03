"use client";

import { useState } from "react";
import PostsGridToolTip from "./PostsGridToolTip";
import Link from "next/link";

export default function PostsGridItemHover({ post, children }) {
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <Link
            href={`/books/${post.slug}`}
            className="posts-grid-hover-area"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => () => {
                setTimeout(setShowTooltip(false), 400);
            }}
        >
            {children}
            {showTooltip && <PostsGridToolTip post={post} />}
        </Link>
    );
}
