import {useDispatch, useSelector} from "react-redux";

import classes from './Cart.module.css';
import {cartSliceActions} from "../../store/cart-slice";

export default function Cart() {

    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    function handleAddToCart(item) {
        dispatch(cartSliceActions.addToCart(item));
    }
    function handleRemoveFromCart(item) {
        dispatch(cartSliceActions.removeFromCart(item));
    }

    function handleChangeQuantity({event, item}) {
        let newQuantity = Number(event.target.value);
        if (newQuantity < 1 || isNaN(newQuantity)) {
            newQuantity = 1;
        }
        dispatch(cartSliceActions.changeItemQuantity({item: item, quantity: newQuantity}));
    }

    return (
        <>
            <div className={classes.cartWrapper}>
                <div className="cartInner">
                    <div className="cartHeader h2">Your cart</div>
                    <div className="cart-body">
                        {cartItems && cartItems.length === 0 ? (
                            <p>Cart is empty</p>
                        ) : (
                            <ul className={classes.cartItems}>
                                {cartItems.map((item) => (
                                    <li className={classes.cartItem} key={item.id}>
                                        <span>
                                            {item.title}
                                        </span>
                                        <div className={classes.cartItemButtons}>
                                            <button onClick={() => handleRemoveFromCart(item)}>-</button>
                                            <input
                                                className={classes.cartQuantityInput}
                                                type="number"
                                                value={item.quantity < 1 ? 1 : item.quantity}
                                                onChange={() => handleChangeQuantity({event, item})}
                                                onBlur={(event) => handleChangeQuantity(event, item)}
                                                min="1"/>
                                            <button onClick={() => handleAddToCart(item)}>+</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="cartFooter"></div>
                </div>
            </div>
        </>
    )
}