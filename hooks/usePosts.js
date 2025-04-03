import {useQuery} from "@tanstack/react-query";

export function usePosts({page = 1, perPage = 10, sortOrder = "desc", filtersArray = null, idsArray = null, enabled = true}) {
    const { data: postsData, isLoading: isPostsLoading } = useQuery({
        queryKey: ['posts', embeddingIds],
        queryFn: async () => {
            if (!embeddingIds.length) return { posts: [] };
            const response = await fetch(`/api/posts?page=1&perPage=10&sortOrder=desc&idsArray=${JSON.stringify(embeddingIds)}`);
            return response.json();
        },
        enabled: enabled // The request is executed only if there is an ID
    });
}