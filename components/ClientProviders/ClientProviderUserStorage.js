'use client'

import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userStorageSliceActions} from "../../store/user-storage-slice";
import {getOrCreateUserId} from "../../lib/client-helpers";
import {fetchHelperChatData, sendHelperChat} from "../../store/helper-chat-actions";

let isInitial = true;

export default function ClientProviderUserStorage() {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const userIdChanged = useSelector(state => state.userStorage.changed);
    const helperChatItems = useSelector(state => state.helperChat.items) || [];

    useEffect(() => {
        const id = getOrCreateUserId();
        setUserId(id);
    }, []);

    useEffect(() => {
        if (!userIdChanged || helperChatItems.length === 0) return;
        dispatch(sendHelperChat(helperChatItems, userId))
    }, [helperChatItems, userIdChanged, userId]);

    console.log("userUdv", userIdChanged)
    console.log("helperChatItems PROVIDER", helperChatItems)

    useEffect(() => {

        if (userIdChanged) {
            return;
        }
        dispatch(userStorageSliceActions.setUserId(userId));
    }, [userId])

    useEffect(() => {
        if (!userId) return
        dispatch(fetchHelperChatData(userId));
    }, [userId])

    return (
        <></>
    )
}