'use client'

import {useDispatch} from "react-redux";
import {cartSliceActions} from "../../store/cart-slice";
import SvgIcon from "../SvgIcon/SvgIcon";

export default function CartIcon({isLoading = false}) {


    return (
        <div className="">
            <SvgIcon>
                <svg className={isLoading ? 'animate-pumping' : ''} xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 110.0">
                    <path d="m32.867 29.695h58.102c2.1211 0 3.793 1.8906 3.3242 4.207l-4.5781 27.117c-0.94922 5.625-5.7578 9.6875-11.445 9.6875h-38.48l1.2305 7.2969h42.613c4.4961 0 4.4961 6.832 0 6.832h-45.492v-0.007813c-1.6367 0.003906-3.0859-1.1797-3.3633-2.8477l-10.121-59.988h-15.656c-4.4961 0-4.4961-6.8281 0-6.8281h18.535v0.007813c1.6367-0.003906 3.0859 1.1797 3.3633 2.8477z" fillRule="evenodd"/>
                </svg>
            </SvgIcon>
        </div>
    )
}