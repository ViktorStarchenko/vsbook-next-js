'use client'

import {Provider, useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchMainMenuData, sendMainMenuData} from "../../store/main-menu-actions";

let isInitial = true;


export default function ClientProviderFetch() {
    const dispatch = useDispatch();

    const isMainMenuChanged = useSelector(state => state.mainMenu.changed);
    const mainMenuItems = useSelector(state => state.mainMenu.items);

    useEffect(() => {
        dispatch(fetchMainMenuData());
    }, [dispatch]);

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isMainMenuChanged) {
            dispatch(sendMainMenuData(mainMenuItems))
        }
    }, [mainMenuItems, isMainMenuChanged]);

    return (
        <></>
    )
}