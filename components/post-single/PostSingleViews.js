'use client';

import ViewsCount from "../ViewsCount/ViewsCount";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {viewsSliceActions} from "../../store/views-slice";
import {viewedPostsActions} from "../../store/viewed-posts";

export default function PostSingleViews({post}) {
    const dispatch = useDispatch();
    const initiallyLoaded = useSelector(state => state.views.initiallyLoaded);

    useEffect(() => {
        if (initiallyLoaded) {
            dispatch(viewsSliceActions.updateItemViews(post.id));
            dispatch(viewedPostsActions.addViewed(post));
        }
    }, [dispatch, post.id, initiallyLoaded]);
    // console.log("initiallyLoaded", initiallyLoaded)
    return (
        <div>
            <ViewsCount post={post}/>
        </div>
    )
}