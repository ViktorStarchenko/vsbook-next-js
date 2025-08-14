import {createSlice} from "@reduxjs/toolkit";

const initialHelperChatState = {
    items: [],
    loading: false,
    isChatOpen: false,
    changed: false
}

const helperChatSlice = createSlice({
    name: 'helperChat',
    initialState: initialHelperChatState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        openChat(state) {
            state.isChatOpen = true;
        },
        closeChat(state) {
            state.isChatOpen = false;
        },
        addItem(state, action) {
            if (action.payload) {
                state.items = [...state.items, action.payload];
                state.changed = true;
            }
        },
        replaceItems(state, action) {
            state.items = action.payload;
        }
    }
})

export default helperChatSlice;
export const helperChatActions = helperChatSlice.actions;