import {useSelector, useDispatch} from "react-redux";
import {useEffect} from 'react';
import {sendFavsData, fetchFavsData} from "../../store/favourite-actions";

let isInitial = true;

export default function ClientProviderFavoutires() {
    const dispatch = useDispatch();
    const favList = useSelector(state => state.favPosts.favPosts);
    const isFavsChanged = useSelector(state => state.favPosts.changed);
    useEffect(() => {
        dispatch(fetchFavsData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (isFavsChanged) {
            dispatch(sendFavsData(favList));
        }
    }, [favList, dispatch, isFavsChanged]);

    return (
        <></>
    )
}