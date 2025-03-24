'use client';

import Link from "next/link";
import PostsGridToolTip from "./PostsGridToolTip";
import {useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function PostsGridItemLink({post, taxonomies}) {
    const [showTooltip, setShowTooltip] = useState(false);
    const timeoutRef  = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setShowTooltip(false), 400);
    };

    return (
        <>
            <Link
                href={`/books/${post.slug}`}
                className="posts-grid-hover-area"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >

            </Link>

            {/*{showTooltip && (*/}
            {/*    <PostsGridToolTip*/}
            {/*        post={post}*/}
            {/*        taxonomies={taxonomies}*/}
            {/*        onMouseEnter={handleMouseEnter}*/}
            {/*        onMouseLeave={handleMouseLeave}*/}
            {/*    />*/}
            {/*)}*/}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PostsGridToolTip
                            post={post}
                            taxonomies={taxonomies}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}