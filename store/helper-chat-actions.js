import {uiSliceActions} from "./ui-slice";
import {helperChatActions} from "./helper-chat-slice";

export const fetchHelperChatData = (userId) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch(`https://vsbookcollection-b2868-default-rtdb.firebaseio.com/chatHistory/${userId}/items.json`);

            if (!response.ok) {
                throw new Error('Fetching chat items failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            console.log('HELPER SLICE REPLACE', data)
            dispatch(helperChatActions.replaceItems(data || []))
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

export const sendHelperChat = (chatItems, userId) => {
    return async (dispatch) => {
        if (!userId || !chatItems || chatItems.length === 0) {
            return; // ❗ don't send empty array
        }
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch(`https://vsbookcollection-b2868-default-rtdb.firebaseio.com/chatHistory/${userId}/items.json`, {
                method: 'PUT',
                body: JSON.stringify(chatItems)
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