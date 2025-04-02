import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {fetchViewsData, sendViewsData} from "../../store/views-action";
import {viewsSliceActions} from "../../store/views-slice";

let isInitial = true;

export default function ClientProviderViews() {
    const isViewsChanged = useSelector(state => state.views.changed);
    const viewsItems = useSelector(state => state.views.items);
    const initiallyLoaded = useSelector(state => state.views.initiallyLoaded);
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

    }, [viewsItems, isViewsChanged])
    return (
        <></>
    )
}