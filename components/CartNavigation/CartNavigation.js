'use client'

import {useSelector} from "react-redux";
import {useRef} from 'react';
import CartIcon from "../CartIcon/CartIcon";
import Modal from "../Modal/Modal";
import Cart from "../Cart/Cart";

export default function CartNavigation() {

    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const isLoading = useSelector(state => state.cart.loading);
    const isCartOpen = useSelector(state => state.cart.isCartOpen);
    const modalRef = useRef();

    function handleOpenCart() {
        modalRef.current.open()
    }
    return (
        <>
            <div className="cart-link" onClick={handleOpenCart}>
                <CartIcon isLoading={isLoading} />
            </div>

            <Modal ref={modalRef}>
                <Cart />
            </Modal>
        </>
    )
}