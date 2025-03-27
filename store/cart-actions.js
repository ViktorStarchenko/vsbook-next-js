import {cartSliceActions} from "./cart-slice";
import {uiSliceActions} from "./ui-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Sending cart failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            console.log(data)
            const cartData = {
                items: data.items || [],
                totalQuantity: data.totalQuantity || 0
            }
            dispatch(cartSliceActions.replaceCart(cartData || []))
        } catch (error) {
            console.log(error)
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

export const sendCartData = (cart, cartTotalQuantity) => {
    return async (dispatch) => {
        dispatch(uiSliceActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items: cart, totalQuantity: cartTotalQuantity})
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
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
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