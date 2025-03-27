import {createSlice} from "@reduxjs/toolkit";

const initialUiState = {
    notification: null
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialUiState,
    reducers: {
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        },
        clearNotification(state) {
            state.notification = null;
        }
    }
});

export default uiSlice;
export const uiSliceActions = uiSlice.actions;