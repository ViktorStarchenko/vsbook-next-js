import {viewsSliceActions} from "./views-slice";
import {uiSliceActions} from "./ui-slice";

export const fetchViewsData = () => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/views.json');

            if (!response.ok) {
                throw new Error('Sending views failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            dispatch(viewsSliceActions.replaceViewsItems(data || []))
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending views data failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}

export const sendViewsData = (viewsItems) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/views.json', {
                method: 'PUT',
                body: JSON.stringify(viewsItems)
            })

            if (!response.ok) {
                throw new Error('Sending views failed');
            }

            const responseData = await response.json();
        }


        try {
            await sendRequest();
            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sent views data successfully!'
            }))
        } catch (error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending views data failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}