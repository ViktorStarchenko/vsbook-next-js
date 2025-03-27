import {createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";

import favPostsSlice from "./favourite-slice";
import viewedPostsSlice from "./viewed-posts";
import cartSlice from "./cart-slice";
import viewsSlice from "./views-slice";
import uiSlice from "./ui-slice";
import mainMenuSlice from "./main-menu-slice";
import authSlice from "./auth-slice";

const store = configureStore({
    reducer: {
        recentlyViewed: viewedPostsSlice.reducer,
        favPosts: favPostsSlice.reducer,
        cart: cartSlice.reducer,
        views: viewsSlice.reducer,
        ui: uiSlice.reducer,
        mainMenu: mainMenuSlice.reducer,
        auth: authSlice.reducer
    }
});

export default store
// const viewedPostsReducer = (state = initialState, action) => {
//
//     if (action.type === TOGGLE_VIEWED) {
//         const viewedId = action.payload.id;
//
//         const isViewed = state.recentlyViewed.some(item => item.id === viewedId);
//         console.log(isViewed)
//         return {
//             ...state,
//             recentlyViewed: !isViewed
//                 ? [...state.recentlyViewed, action.payload]
//                 : [...state.recentlyViewed],
//         };
//     }
//
//     return state
// }

