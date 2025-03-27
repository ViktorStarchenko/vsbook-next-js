import {createSlice} from "@reduxjs/toolkit";

const initialfavPostsState = {
    favPosts: [],
    loading: false,
    changed: false,
    notification: null
}

const favPostsSlice = createSlice({
    name: 'favPosts',
    initialState: initialfavPostsState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        toggleFavs(state, action) {
            const addedId = action.payload.id;
            const isExists = state.favPosts.some(item => item.id === addedId);
            state.changed = true;
            // return {
            //     ...state,
            //     favPosts: isExists
            //         ? state.favPosts.filter(item => item.id !== addedId)
            //         : [...state.favPosts, action.payload],
            // };
            state.favPosts = isExists
                ? state.favPosts.filter(item => item.id !== addedId)
                : [...state.favPosts, action.payload];
        },
        replaceFavs(state, action) {
          state.favPosts = action.payload;
        },
        showNotification(state, action) {
            state.notification = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export default favPostsSlice;
export const favPostsActions = favPostsSlice.actions