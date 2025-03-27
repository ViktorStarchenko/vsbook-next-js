import {createSlice} from "@reduxjs/toolkit";

const initialCartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    isCartOpen: false,
    changed: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        openCart(state) {
            state.isCartOpen = true;
        },
        closeCart(state) {
            state.isCartOpen = false;
        },
        addToCart(state, action) {
            const newItem = action.payload;
            // const existingItemIndex = state.posts.findIndex((item) => item.id === newItem.id); //for immutable option
            const existingItem = state.items.find((item) => item.id === newItem.id);
            state.changed = true;
            // if (existingItemIndex !== -1) { //for immutable option
            if (existingItem) {
                existingItem.quantity += 1;
                // // Create a new array with the updated element for immutable option
                // state.posts = state.posts.map((item, index) =>
                //     index === existingItemIndex
                //         ? { ...item, count: item.count + 1 }
                //         : item
                // );

            } else {
                state.items = [...state.items, {
                    id: newItem.id,
                    title: newItem.title.rendered,
                    quantity: 1
                }];
            }
            state.totalQuantity = state.items.reduce((sum, item) => sum + Number(item.quantity), 0);
        },
        removeFromCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);
            if (existingItem.quantity > 1) {
                existingItem.quantity --;
            } else {
                state.items = state.items.filter(item => item.id != existingItem.id);
            }
            state.changed = true;
            //With immutate
            // const newItem = action.payload;
            // const updatedItems = state.items.map(item =>
            //     item.id === newItem.id
            //         ? { ...item, count: item.count - 1 }
            //         : item
            // ).filter(item => item.count > 0);
            //
            // return {
            //     ...state,
            //     items: updatedItems,
            //     totalQuantity: Math.max(0, state.totalQuantity - 1)
            // };
            state.totalQuantity = state.items.reduce((sum, item) => sum + Number(item.quantity), 0);
        },
        changeItemQuantity(state, action) {
            const actionItem = action.payload.item;
            const actionQuantity = action.payload.quantity;
            const existingItem = state.items.find((item) => item.id === actionItem.id);

            if (existingItem) {
                existingItem.quantity = actionQuantity;
            }
            state.totalQuantity = state.items.reduce((sum, item) => sum + Number(item.quantity), 0);
        },
        replaceCart(state, action) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity || initialCartState.totalQuantity;
            state.changed = true;
        }
    }
})

export default cartSlice;
export const cartSliceActions = cartSlice.actions;