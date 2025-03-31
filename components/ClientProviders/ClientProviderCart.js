import {useSelector, useDispatch} from "react-redux";
import {useEffect} from 'react';
import {fetchCartData, sendCartData} from "../../store/cart-actions";

let isInitial = true;

export default function ClientProviderCart() {
    const dispatch = useDispatch();
    const isCartChanged = useSelector(state => state.cart.changed);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

    // Cart redux
    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (isCartChanged) {
            dispatch(sendCartData(cartItems, cartTotalQuantity));
        }
    }, [cartItems, cartTotalQuantity, dispatch, isCartChanged])

    return (
        <></>
    )
}