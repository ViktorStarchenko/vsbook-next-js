import {useQuery} from "@tanstack/react-query";

export function useGetPostsByIds({page = 1, perPage = 10, sortOrder = "desc", filtersArray = null, idsArray = null, enabled = true}) {
    const { data, isLoading } = useQuery({
        queryKey: ['posts', idsArray],
        queryFn: async () => {
            if (!idsArray.length) return { posts: [] };
            const response = await fetch(`/api/posts?page=1&perPage=10&sortOrder=desc&idsArray=${JSON.stringify(idsArray)}`);
            return response.json();
        },
        enabled: enabled // The request is executed only if there is an ID
    });

    return { data, isLoading };
}