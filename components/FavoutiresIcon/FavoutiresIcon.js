'use client';

import {useSelector} from "react-redux";
import {useState, useEffect} from 'react';
import SvgIcon from "../SvgIcon/SvgIcon";

export default function FavoutiresIcon({post}) {
    const [isInFavs, setIsInFavs] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const favsList = useSelector(state => state.favPosts.favPosts);
    const isLoading = useSelector(state => state.favPosts.loading);

    useEffect(() => {
        setIsClient(true);
        if (post) {
            setIsInFavs(favsList.some(item => item.id === post.id));
        }
    }, [favsList, post]);

    if (!isClient) {
        return null; // Уникаємо гідраційного конфлікту
    }
    return (
        <SvgIcon className={`favoutires-icon ${isInFavs ? 'active' : ''}`}>
            <svg className={`${isLoading ? 'animate-pumping' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" x="0px" y="0px"><title></title><desc></desc><metadata></metadata><path d="M45.856,6.138C36.2,6.138,32,14.941,32,14.941a17.411,17.411,0,0,0-3.292-4.4,14.86,14.86,0,0,0-10.564-4.4c-9.66,0-17.656,7.875-15.9,19.66S15.792,47.3,32,57.862c8.1-5.274,15.1-10.348,20.3-15.568,5.192-5.238,8.575-10.6,9.461-16.5C63.512,14.013,55.516,6.138,45.856,6.138Z"/></svg>
        </SvgIcon>
    )
}