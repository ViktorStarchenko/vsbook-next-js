'use client'

import {useRouter} from 'next/navigation';
import {useRef, useState, useEffect} from 'react';
import Modal from "../Modal/Modal";
import {useMutation} from "@tanstack/react-query";
import {deletePost} from "../../lib/posts-action";
import { queryClient } from "../../lib/utils";

export default function PostEntryDelete({post}) {
    const [message, setMessage] = useState(`Are you sure you want to delete the post ${post.title.rendered}?`);
    const [progress, setProgress] = useState(0);
    const modalRef = useRef();
    const router = useRouter();

    function openModal() {
        modalRef.current.open();
    }

    const {mutate, isPending, isError, error } = useMutation({
        mutationKey: ['deletePost', {postId: post.id}],
        mutationFn: async () => {
            if (!post.id) return;
            const response = await fetch(`/api/posts?postId=${post.id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Unknown error');
            }

            return response.json();
        },
        onSuccess: () => {
            setMessage(`Post ${post.title.rendered} was successfully deleted. You will be redirected to books catalog`);
            setProgress(100)
            queryClient.invalidateQueries({queryKey: ['posts']})
            setTimeout(() => {
                router.push('/books');
            }, 3000);
        }
    })

    function deletePost(postId) {
        mutate(postId);
    }

    console.log("isPending", isPending);
    console.log("isError", isError);
    console.log("error", error);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 1, 0));
        }, 30); // 30ms * 100 шагов ≈ 3 секунды

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="btn" onClick={openModal}>Delete Post</div>

            <Modal ref={modalRef}>
                <div className="delete-post-modal">
                    <h3 className="h2">{message}</h3>
                    <div className="btn" onClick={() => deletePost(post.id)}>Submit</div>
                    {progress > 0 && <progress max="100" value={progress}></progress>}
                </div>

            </Modal>
        </div>
    )
}