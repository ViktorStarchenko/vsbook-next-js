import classes from "./MenuForm.module.css";
import MenuItemList from "./MenuItemList";
import MenuItemChangeIndex from "./MenuItemChangeIndex";

import MenuItemActionRemove from "./MenuItemActionRemove";
import Modal from "../Modal/Modal";
import MenuFormEditItem from "./MenuFormEditItem";
import MenuFormAddItem from "./MenuFormAddItem";
import {useRef, useState} from "react";
import Link from "next/link";

export default function MenuItemListItem({items, item, index}) {
    const [modalType, setModalType] = useState();
    const [selectedItem, setSelectedItem] = useState(null);

    const modalEditRef = useRef();

    function handleOpenEdit(item) {
        setSelectedItem(item);
        setModalType('edit');
        modalEditRef.current.open();
    }
    function handleOpenAddSubItem(item) {
        setSelectedItem(item);
        setModalType('add');
        modalEditRef.current.open();
    }

    return (
        <li>
            <div
                className={classes.menuFormListInner}>
                <div className={classes.menuFormListName}>
                    <MenuItemChangeIndex items={items} index={index}/>
                    {item.title} -
                    <Link href={item.url}>{item.url}</Link>
                </div>
                <div className={classes.actions}>
                    <span onClick={() => handleOpenEdit(item)}>Edit</span>
                    {/*<span onClick={() => handleRemove(item)} >Remove</span>*/}
                    <MenuItemActionRemove item={item}/>
                    <span onClick={() => handleOpenAddSubItem(item)} >Add Sub Item</span>
                </div>
            </div>
            {item.children && <MenuItemList items={item.children} />}
            <Modal ref={modalEditRef}>
                <div className="h2">{modalType} this item</div>
                {modalType === 'edit' && selectedItem && <MenuFormEditItem item={selectedItem} modalRef={modalEditRef}/>}
                {modalType === 'add' && selectedItem && <MenuFormAddItem parentItem={selectedItem} modalRef={modalEditRef}/>}
            </Modal>
        </li>
    )
}