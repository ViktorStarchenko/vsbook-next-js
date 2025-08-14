import {createSlice} from "@reduxjs/toolkit";

const initialUserStorage = {
    userId: null,
    changed: false
};

const userStorageSlice = createSlice({
    name: 'userStorage',
    initialState: initialUserStorage,
    reducers: {
        setUserId: (state, action) => {
            console.log("action.payload", action.payload);
            if (!action.payload) {
                return;
            }

            state.userId = action.payload;
            state.changed = true;
        },
        clearToken: (state) => {
            state.userId = null;
        },
    }
})

export default userStorageSlice;
export const userStorageSliceActions = userStorageSlice.actions;