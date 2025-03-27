import {createSlice} from "@reduxjs/toolkit";

const initialViewedPostsState = {
    recentlyViewed: []
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
        }
    }
})

export default viewedPostsSlice;
export const viewedPostsActions = viewedPostsSlice.actions