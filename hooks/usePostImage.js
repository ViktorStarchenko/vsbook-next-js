import {useQuery} from "@tanstack/react-query";

export function usePostImage(post) {
    const imageUrl = post?._links?.['wp:featuredmedia']?.[0]?.href || null;

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['postImage', {postId: post.id, imageUrl: imageUrl}],
        queryFn: async () => {
            if (!imageUrl) {return null}
            const response = await fetch(`/api/post-image?imageUrl=${imageUrl}`);
            return response.json();
        },
        enabled: !!imageUrl
    })

    return {data, isLoading, isError, error}
}