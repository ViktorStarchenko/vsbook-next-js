import classes from "./MenuForm.module.css";
import MenuItemListItem from "./MenuItemListItem";

export default function MenuItemList({items}) {

    return (
        <ul className={classes.menuFormList}>
            {items.map((item, index) => (
                <MenuItemListItem key={item.id} items={items} item={item} index={index}/>
            ))}

        </ul>
    );
}