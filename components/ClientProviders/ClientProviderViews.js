import {useDispatch, useSelector} from "react-redux";
import {useEffect} from 'react';
import {fetchViewsData, sendViewsData} from "../../store/views-action";

let isInitial = true;

export default function ClientProviderViews() {
    const isViewsChanged = useSelector(state => state.views.changed);
    const viewsItems = useSelector(state => state.views.items);
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
    }, [viewsItems, isViewsChanged])
    return (
        <></>
    )
}