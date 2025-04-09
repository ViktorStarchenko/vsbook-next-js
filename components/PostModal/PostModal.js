'use client';

import { useEffect } from "react";
import PostInfoTaxonomiesClient from "../PostInfoTaxonomiesClient/PostInfoTaxonomiesClient";

export default function PostModal({ post, onClose }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <dialog className="post-modal-overlay" onClick={onClose}>
            <div className="post-modal-content" onClick={e => e.stopPropagation()}>
                <h2 className="h2 post-modal-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="post-modal-description" dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
                <div>
                    <PostInfoTaxonomiesClient post={post} wordWrap={true}/>
                </div>
                <a href={`/books/${post.slug}`} className="btn post-modal-link">Details</a>
                <button onClick={onClose} className="modal-close">⤬</button>
            </div>
        </dialog>
        // <div className="modal-overlay" onClick={onClose}>
        //     <div className="modal-content" onClick={e => e.stopPropagation()}>
        //         <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        //         <p>Опис або інша інфа...</p>
        //         <a href={`/books/${post.slug}`} className="btn">Перейти до посту</a>
        //         <button onClick={onClose} className="modal-close">✖</button>
        //     </div>
        // </div>
    );
}
