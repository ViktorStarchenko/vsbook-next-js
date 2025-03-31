'use client'

import {useDispatch} from "react-redux";
import {cartSliceActions} from "../../store/cart-slice";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function AddToCartButton({post}) {

    const dispatch = useDispatch();

    function handleAddToCart(post) {
        if (!post) {
            return null
        }
        dispatch(cartSliceActions.startLoading());
        dispatch(cartSliceActions.addToCart(post));
        setTimeout(()=>{
            dispatch(cartSliceActions.stopLoading());
        }, 600)
    }

    return (
        <SvgIcon className="add-to-cart-button" onClick={() => handleAddToCart(post)}>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                <path d="m32.891 35.117h58.082c2.1133 0 3.7969 1.8633 3.3164 4.2344l-5.7227 35.617c-0.26562 1.6758-1.7148 2.8711-3.3633 2.8711v0.011718h-45.445l1.2852 8.0117h42.594c4.4961 0 4.4961 6.832 0 6.832l-45.492-0.003906v-0.011718c-1.6445 0.003906-3.0977-1.1953-3.3633-2.8711l-10.141-63.129h-15.637c-4.4961 0-4.4961-6.832 0-6.832h18.535v0.011719c1.6445-0.003906 3.0977 1.1953 3.3633 2.8711zm31.008-27.809h-6.832v8.0859h-8.0859v6.832h8.0859v8.0859h6.832v-8.0859h8.0859v-6.832h-8.0859z" fillRule="evenodd"/>
            </svg>
        </SvgIcon>
    )
}