'use client';

import { createContext, useContext, useState, useEffect, useRef } from "react";
import classes from './MultiLevelMenu.module.css';
import MultiLevelMenuItem from "./MultiLevelMenuItem";
import {useSelector} from "react-redux";

const MultiLevelMenuContext = createContext();

export function useMultiLevelMenuContext() {
    const ctx = useContext(MultiLevelMenuContext);
    if (!ctx) {
        throw new Error("Something went wrong with MultiLevelMenuContext");
    }
    return ctx;
}

export default function MultiLevelMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [topLevelItem, setTopLevelItem] = useState({});
    const [dropdownItems, setDropdownItems] = useState([]);
    const [dropdownParent, setDropdownParent] = useState({});
    const [prevState, setPrevState] = useState([]);

    const menuRef = useRef(null);

    // const menuData = (data && data.items) ? data.items : [];
    const menuData = useSelector(state => state.mainMenu.items);

    function openMenu(item) {
        if (item.children.length > 0) {
            // If the menu is already open at this point, close it
            if (dropdownItems === item.children) {
                closeMenu();
                return;
            }
            setIsOpen(true);
            setPrevState(dropdownItems);
            setDropdownItems(item.children);
            setDropdownParent(item);
        }
    }

    function goBack(items) {
        if (JSON.stringify(topLevelItem.children) == JSON.stringify(dropdownItems)) {
            closeMenu()
        }
        setDropdownItems(items);
    }

    function closeMenu() {
        setIsOpen(false);
        setDropdownItems([]);
    }

    // Close the menu when clicking outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const contextValue = {
        isOpen,
        openMenu,
        closeMenu,
        dropdownItems,
        dropdownParent,
        setDropdownParent,
        topLevelItem,
        setTopLevelItem
    };

    return (
        <MultiLevelMenuContext.Provider value={contextValue}>
            {menuData && menuData.length > 0 && (
                <div ref={menuRef} className={classes.multiLevelMenu}>
                    <div>
                        <ul className={classes.multiLevelMenuNav}>
                            {menuData.map((item, index) => (
                                <MultiLevelMenuItem key={index} item={item} isTopLevel={true}/>
                            ))}
                        </ul>

                        {isOpen && (
                            <div className={classes.multiLevelMenuDropdown}>
                                <div className="wrapper wrapper-1170">
                                    <ul className={`${classes.multiLevelMenuDropdownList} ${classes.open}`}>
                                        {JSON.stringify(topLevelItem.children) === JSON.stringify(dropdownItems) && <div className={classes.multiLevelMenuGoBack} onClick={closeMenu}>Close ⤬</div>}
                                        {/*{JSON.stringify(topLevelItem.children) !== JSON.stringify(dropdownItems) && <div className={classes.multiLevelMenuGoBack} onClick={() => goBack(prevState)}>⇽ Back to {dropdownParent.link.title}</div>}*/}
                                        {JSON.stringify(topLevelItem.children) !== JSON.stringify(dropdownItems) && <div className={classes.multiLevelMenuGoBack} onClick={() => goBack(prevState)}>⇽ Back to {dropdownParent.title}</div>}
                                        {dropdownItems.map((item, index) => (
                                            <MultiLevelMenuItem key={index} item={item} />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MultiLevelMenuContext.Provider>
    );
}
