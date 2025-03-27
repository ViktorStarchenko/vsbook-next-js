import {createSlice} from "@reduxjs/toolkit";

const viewsInitialState = {
    items: [],
    loading: false,
    changed: false
}

const viewsSlice = createSlice({
    name: 'views',
    initialState: viewsInitialState,
    reducers: {
        updateItemViews(state, action) {
            const timestamp = Date.now();
            const expiresAt = timestamp + 5 * 60 * 1000;
            const currentId = action.payload
            const existingItem = state.items.find((item) => item.id === currentId);

            if (!existingItem || Date.now() > existingItem.duration) {
                if (existingItem) {
                    existingItem.duration = expiresAt;
                    existingItem.viewsCount += 1;
                } else {
                    state.items.push({
                        id: currentId,
                        duration: expiresAt,
                        viewsCount: 1
                    });
                }
                state.changed = true;
            }
        },
        replaceViewsItems(state, action) {
            state.items = action.payload;
            state.changed = true;
        }
    }
})

export default viewsSlice;
export const viewsSliceActions = viewsSlice.actions;