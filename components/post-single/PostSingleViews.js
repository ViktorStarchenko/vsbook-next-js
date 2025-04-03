'use client';

import ViewsCount from "../ViewsCount/ViewsCount";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {viewsSliceActions} from "../../store/views-slice";
import {viewedPostsActions} from "../../store/viewed-posts";

export default function PostSingleViews({post}) {
    const dispatch = useDispatch();
    const initiallyLoadedViews = useSelector(state => state.views.initiallyLoaded);
    const initiallyLoadedRecentryViewed = useSelector(state => state.recentlyViewed.initiallyLoaded);

    useEffect(() => {
        if (initiallyLoadedViews) {
            dispatch(viewsSliceActions.updateItemViews(post.id));
        }
        if (initiallyLoadedRecentryViewed) {
            dispatch(viewedPostsActions.addViewed(post));
        }
    }, [dispatch, post.id, initiallyLoadedViews, initiallyLoadedRecentryViewed]);
    console.log("initiallyLoadedViews", initiallyLoadedViews)
    console.log("initiallyLoadedRecentryViewed", initiallyLoadedRecentryViewed)
    return (
        <div>
            <ViewsCount post={post}/>
        </div>
    )
}