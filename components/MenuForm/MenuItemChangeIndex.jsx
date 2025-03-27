import {mainMenuSliceActions} from "../../store/main-menu-slice";
import {useDispatch} from "react-redux";
import classes from './MenuForm.module.css'

export default function MenuItemChangeIndex({items, index}) {
    const dispatch = useDispatch();

    function handleChangeIndex(items, fromIndex, toIndex) {

        dispatch(mainMenuSliceActions.changeItemIndex({arrayToEdit: items, fromIndex: fromIndex, toIndex: toIndex}))
    }
    return (
        <div className={classes.actionChangeIndex}>
            <span className={classes.actionChangeIndexUp} onClick={() => handleChangeIndex(items, index, Math.max(0, index - 1))}>⏶</span>
            <span className={classes.actionChangeIndexDown} onClick={() => handleChangeIndex(items, index, Math.max(0, index + 1))}>⏷</span>
        </div>
    )
}