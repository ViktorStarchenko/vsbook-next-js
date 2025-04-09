'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import PostsGridToolTip from "./PostsGridToolTip";
import {motion, AnimatePresence} from "framer-motion";

import dynamic from "next/dynamic";
const PostModal = dynamic(() => import('../PostModal/PostModal'), { ssr: false });

export default function PostLinkWrapper({ post, taxonomies, children }) {
    const [isMobile, setIsMobile] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showTooltip, setShowTooltip] = useState(false);
    const timeoutRef  = useRef(null);

    const handleMouseEnter = () => {
        if (isMobile) {
            return;
        }
        clearTimeout(timeoutRef.current);
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => setShowTooltip(false), 400);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = (e) => {
        if (isMobile) {
            e.preventDefault();
            setShowModal(true);
        }
    };

    const closeModal = () => setShowModal(false);

    return (
        <>
            <Link
                className="posts-grid-hover-area"
                href={`/books/${post.slug}`}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}

            >
                {children}
            </Link>

            {showModal && (
                <PostModal post={post} onClose={closeModal} />
            )}

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
    );
}
