import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {fetchViewsData, sendViewsData} from "../../store/views-action";
import {viewsSliceActions} from "../../store/views-slice";
import {viewedPostsActions} from "../../store/viewed-posts";

let isInitial = true;

export default function ClientProviderViews() {
    const isViewsChanged = useSelector(state => state.views.changed);
    const viewsItems = useSelector(state => state.views.items);
    const initiallyLoaded = useSelector(state => state.views.initiallyLoaded);
    const recentlyViewed = useSelector(state => state.recentlyViewed.recentlyViewed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchViewsData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isViewsChanged) {
            dispatch(sendViewsData(viewsItems));
        }

        if (initiallyLoaded == false) {
            dispatch(viewsSliceActions.updateInitiallyLoaded(true))
        }

    }, [viewsItems, isViewsChanged]);

    useEffect(() => {
        dispatch(viewedPostsActions.updateInitiallyLoaded(true))
    }, [recentlyViewed])
    return (
        <></>
    )
}