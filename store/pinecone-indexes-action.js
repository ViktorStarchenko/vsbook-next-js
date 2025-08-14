import {pineconeIndexesActions} from "./pinecone-indexes";
import {uiSliceActions} from "./ui-slice";

export const fetchCurrentIndex = () => {
    console.log("fetchCurrentIndex FUNCTION")
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/current-pinecone-index.json');

            if (!response.ok) {
                throw new Error('Fetching index failed');
            }

            const responseData = await response.json();
            console.log("fetched current INDEX", responseData)
            return responseData;
        }

        try {
            const data = await fetchData();

            dispatch(pineconeIndexesActions.setCurrentIndex(data || {}))
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

export const sendCurrentIndex = (item) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/current-pinecone-index.json', {
                method: 'PUT',
                body: JSON.stringify(item)
            })

            if (!response.ok) {
                throw new Error('Sending Index failed');
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