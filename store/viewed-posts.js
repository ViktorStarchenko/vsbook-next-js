import {createSlice} from "@reduxjs/toolkit";

const initialViewedPostsState = {
    recentlyViewed: [],
    initiallyLoaded: false
}

export const TOGGLE_VIEWED = "TOGGLE_VIEWED";

const viewedPostsSlice = createSlice({
    name: 'viewedPosts',
    initialState: initialViewedPostsState,
    reducers: {
        addViewed(state, action) {
            const viewedId = action.payload.id;
            const isViewed = state.recentlyViewed.some(item => item.id === viewedId);
            // console.log(isViewed)
            return {
                ...state,
                recentlyViewed: !isViewed
                    ? [...state.recentlyViewed, action.payload]
                    : [...state.recentlyViewed],
            };
        },
        updateInitiallyLoaded(state, action) {
            state.initiallyLoaded = action.payload;
        }
    }
})

export default viewedPostsSlice;
export const viewedPostsActions = viewedPostsSlice.actions