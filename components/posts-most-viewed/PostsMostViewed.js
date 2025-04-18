'use client'

import {useMemo} from 'react';
import {useSelector} from "react-redux";
import {sortByViewsCountDescending} from "../../lib/utils";
import {useQuery} from "@tanstack/react-query";
import PostsListClient from "../posts-list-client/PostsListClient";
import LoadingIndicator from "../loadingIndicator/LoadingIndicator";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";
import PostsListItemClient from "../posts-list-client/PostsListItemClient";

export default function PostsMostViewed() {
    const viewedItems = useSelector(state => state.views.items);

    const newIds = useMemo(() => {
        return sortByViewsCountDescending(viewedItems, 3).map(item => item.id);
    }, [viewedItems]);
    //

    const {data, isLoading} = useQuery({
        queryKey: ['posts', newIds],
        queryFn: async () => {
            if (!newIds) {return}
            const response = await fetch(`/api/posts?page=1&perPage=5&sortOrder=desc&idsArray=${JSON.stringify(newIds)}`);
            return response.json();
        },
        enabled: newIds.length > 0
    })

    return (
        <div className="most-viewed">
            <h3 className="widget-title">Most Viewed</h3>
            {isLoading ? <LoadingIndicator /> : null}
            {data?.posts?.length > 0 && <PostsListClient posts={data?.posts} layout="sidebar-snippet"/>}
            {/*{data?.posts?.length > 0 && (*/}
            {/*    <KeenSlider layout="list-small" perView="1" perView1024="1" perView767="1" perView600="1">*/}
            {/*        {data.posts.map(item => (*/}
            {/*            <KeenSliderSlide key={`recommended-slide-${item.id}`}>*/}
            {/*                <PostsListItemClient post={item} />*/}
            {/*            </KeenSliderSlide>*/}
            {/*        ))}*/}
            {/*    </KeenSlider>*/}
            {/*)}*/}
        </div>
    )
}