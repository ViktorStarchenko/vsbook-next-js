'use client';

import {useSelector} from "react-redux";
import KeenSlider from "../KeenSlider/KeenSlider";
import KeenSliderSlide from "../KeenSlider/KeenSliderSlide";
import PostsGridItem from "../posts-grid/PostsGridItem";

export default function RecentryViewed() {
    const viewedPosts = useSelector(state => state.recentlyViewed.recentlyViewed || []);
    console.log("viewedPosts", viewedPosts)
    return (
        <div>
            <KeenSlider>
                {viewedPosts && viewedPosts.map(item => {
                    <KeenSliderSlide key={`recently-slide-${item.id}`}>
                        <PostsGridItem post={item}/>
                    </KeenSliderSlide>
                })}
            </KeenSlider>
        </div>
    )
}