'use client';

import ViewsCount from "../ViewsCount/ViewsCount";
import {useDispatch} from "react-redux";
import {useEffect} from 'react';
import {viewsSliceActions} from "../../store/views-slice";

export default function PostSingleViews({post}) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) {
            dispatch(viewsSliceActions.updateItemViews(post.id));
        }
    }, [dispatch, post])

    return (
        <div>
            <ViewsCount post={post}/>
        </div>
    )
}