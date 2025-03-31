'use client';

import {useSelector, useDispatch} from "react-redux";
import {favPostsActions} from "../../store/favourite-slice";
import FavoutiresIcon from "./FavoutiresIcon";

export default function FavoutiresButton({post}) {
    const dispatch = useDispatch()

    function addFav() {
        console.log("addFav")
        dispatch(favPostsActions.startLoading());
        dispatch(favPostsActions.toggleFavs(post));
        setTimeout(() => {
            dispatch(favPostsActions.stopLoading());
        }, 600);
    }
    return (
        <div onClick={addFav}>
            <FavoutiresIcon post={post}/>
        </div>
    )
}