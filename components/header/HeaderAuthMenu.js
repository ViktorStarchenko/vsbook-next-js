import IconLink from "../icon-link/IconLink";
import LogoutButton from "../LogoutButton/LogoutButton";
import {getAuthToken} from "../../lib/auth";


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
                <IconLink url="/favourites">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" x="0px" y="0px"><title></title><desc></desc><path d="M45.856,6.138C36.2,6.138,32,14.941,32,14.941a17.411,17.411,0,0,0-3.292-4.4,14.86,14.86,0,0,0-10.564-4.4c-9.66,0-17.656,7.875-15.9,19.66S15.792,47.3,32,57.862c8.1-5.274,15.1-10.348,20.3-15.568,5.192-5.238,8.575-10.6,9.461-16.5C63.512,14.013,55.516,6.138,45.856,6.138Z"/></svg>
                </IconLink>
            </li>

        </ul>
    )
}