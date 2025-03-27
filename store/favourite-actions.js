import {favPostsActions} from "./favourite-slice";
import {uiSliceActions} from "./ui-slice";

export const fetchFavsData = () => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending favs data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/favourites.json');

            if (!response.ok) {
                throw new Error('Sending favs failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const favsData = await fetchData();
            dispatch(favPostsActions.replaceFavs(favsData || []))
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending favs data failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}

export const sendFavsData = (favList) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending favs data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/favourites.json', {
                method: 'PUT',
                body: JSON.stringify(favList)
            })

            if (!response.ok) {
                throw new Error('Sending favs failed');
            }

            const responseData = await response.json();
        }


        try {
            await sendRequest();
            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sent favs data successfully!'
            }))
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending favs data failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}