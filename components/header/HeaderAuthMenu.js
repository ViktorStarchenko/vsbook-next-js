import IconLink from "../icon-link/IconLink";
import LogoutButton from "../LogoutButton/LogoutButton";
import {getAuthToken} from "../../lib/auth";
import SvgIcon from "../SvgIcon/SvgIcon";
import FavoutiresIcon from "../FavoutiresIcon/FavoutiresIcon";
import CartIcon from "../CartIcon/CartIcon";
import CartNavigation from "../CartNavigation/CartNavigation";


export default async function HeaderAuthMenu() {
    const token = await getAuthToken();

    return (
        <ul className="d-flex d-flex-row d-align-center auth-menu-list">
            {!token && (
                <li>
                    <IconLink url="/login">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="-999.5 1000.5 24 24" enableBackground="new -999.5 1000.5 24 24"><circle cx="-987.5" cy="1004.5" r="4"/><path d="M-983.5,1010.5h-8c-2.209,0-4,1.791-4,4v1h6v-3l5,5l-5,5v-3h-6v5h16v-10C-979.5,1012.291-981.291,1010.5-983.5,1010.5z"/></svg>
                    </IconLink>
                </li>
            )}
            {token && (
                <li>
                    <IconLink url="/account">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100"><g><g><g><circle cx="50" cy="23" r="18"/><path d="M82.941,82.764c0-18.192-14.749-32.941-32.941-32.941S17.059,64.572,17.059,82.764c0,0.08,0.011,0.158,0.012,0.237V95     h65.87V83.002h-0.012C82.93,82.922,82.941,82.845,82.941,82.764z"/></g></g></g></svg>
                    </IconLink>
                </li>
            )}
            {token && (
                <li>
                    <LogoutButton />
                </li>
            )}
            <li>
                <IconLink className="favourites-link" url="/favourites">
                    <FavoutiresIcon />
                </IconLink>
            </li>
            <li>
                <CartNavigation />
            </li>

        </ul>
    )
}