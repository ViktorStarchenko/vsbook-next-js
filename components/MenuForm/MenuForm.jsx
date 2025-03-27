'use client';

import {useDispatch, useSelector} from "react-redux";
import {mainMenuSliceActions} from "@/store/main-menu-slice";

import classes from './MenuForm.module.css'
import MenuFormItem from "./MenuFormItem";
import MenuItemList from "./MenuItemList";

export default function MenuForm() {
    // const [menuItems, setMenuItems] = useState([]);
    const dispatch = useDispatch();

    const menuItems = useSelector(state => state.mainMenu.items || []);

    // console.log(menuItems)

    function handleAddItem(newItem) {
        // setMenuItems([...menuItems, newItem]);
        console.log("handleAddItem", newItem)
        dispatch(mainMenuSliceActions.addMenuItem(newItem));
    }

    return (
        <div className="wrapper-860">
            <h1 className="h1">Manage Menu</h1>
            <MenuFormItem onAdd={handleAddItem} />
            <div className={classes.menuFormListWrapper}>
                <MenuItemList items={menuItems} />
            </div>
        </div>
    );
}