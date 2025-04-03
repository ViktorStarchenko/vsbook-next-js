import {useQuery} from "@tanstack/react-query";

export function usePostTaxonomies(post) {
    const terms = post._links['wp:term'];
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['postTaxonomies', {postId: post.id, terms}],
        queryFn: async () => {
            const response = await fetch(`/api/post-taxonomies?postId=${post.id}&terms=${JSON.stringify(terms)}`);
            return response.json();
        },
        enabled: !!terms
    })

    return {data, isLoading, isError, error}
}