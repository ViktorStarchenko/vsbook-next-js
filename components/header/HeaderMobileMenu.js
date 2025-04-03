'use client'
import {useRef, useState} from 'react';
import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";
import HeaderAuthMenu from "./HeaderAuthMenu";
import SearchBar from "../SearchBar/SearchBar";

export default function HeaderMobileMenu() {

    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    const mobileMenuTogglerRef = useRef();

    return (
        <div className={`mobile-menu ${openMobileMenu ? 'open' : ''}`}>
            <div className="menu-toggler" onClick={() => setOpenMobileMenu(prevState => !prevState)}>
                <span>{openMobileMenu ? '⤬' : '☰'}</span>
            </div>
            <div className="mobile-menu-container">
                <SearchBar />
                <MultiLevelMenu ref={mobileMenuTogglerRef} setOpenMobileMenu={setOpenMobileMenu}/>
            </div>
        </div>
    )
}