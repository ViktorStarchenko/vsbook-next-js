'use client';

import {useSelector} from "react-redux";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";
import PostsGridClient from "../posts-grid-client/PostsGridClient";
import PostsGridItemClient from "../posts-grid-client/PostsGridItemClient";

export default function RecentryViewed() {
    const viewedPosts = useSelector(state => state.recentlyViewed.recentlyViewed);
    // console.log("viewedPosts", viewedPosts)
    return (
        <div>
            <PostsGridClient posts={viewedPosts}/>
            {/*<KeenSlider>*/}
            {/*    {viewedPosts && viewedPosts?.map(item => {*/}
            {/*        <KeenSliderSlide key={`recently-slide-${item.id}`}>*/}
            {/*            <PostsGridItemClient post={item}/>*/}
            {/*        </KeenSliderSlide>*/}
            {/*    })}*/}
            {/*</KeenSlider>*/}
        </div>
    )
}