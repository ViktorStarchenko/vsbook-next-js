import { mainMenuSliceActions } from "./main-menu-slice";
import { uiSliceActions } from "./ui-slice";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchMainMenuData = () => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Fetching...',
            message: 'Fetching Main Menu data!'
        }))

        const fetchData = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/mainMenu.json', {
                next: { revalidate: 60 }
            });

            if (!response.ok) {
                throw new Error('Fetching Main Menu failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            dispatch(mainMenuSliceActions.replaceMenuItems(data || []));
        } catch(error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Fetching Main Menu failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}

export const sendMainMenuData = (mainMenuData) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending Main Menu data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/mainMenu.json', {
                method: 'PUT',
                body: JSON.stringify(mainMenuData)
            })

            if (!response.ok) {
                throw new Error('Sending cart failed');
            }
            const responseData = await response.json();
        }

        try {
            await sendRequest();
            dispatch(uiSliceActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sent Main Menu data successfully!'
            }));
        } catch(error) {
            dispatch(uiSliceActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending cart data failed!'
            }))
        }
        setTimeout(() => {
            dispatch(uiSliceActions.clearNotification());
        }, 3000);
    }
}