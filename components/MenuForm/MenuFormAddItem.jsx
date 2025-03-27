import {useState} from "react";
import {mainMenuSliceActions} from "../../store/main-menu-slice";
import {useDispatch} from "react-redux";
import FormGroup from "../FormItems/FormGroup";
import FormRow from "../FormItems/FormRow";
import FormItem from "../FormItems/FormItem";

export default function MenuFormAddItem({parentItem, modalRef}) {
    const [newItem, setNewItem] = useState({ id: Date.now(), title: "", url: "" });
    const dispatch = useDispatch();

    function handleSubmitAddSubItem(event, parentItem) {
        event.preventDefault();

        if (!newItem.id || !newItem.title || !newItem.url) return null;

        dispatch(mainMenuSliceActions.addMenuSubItem({
            parentItemId: parentItem.id,
            newSubItem: newItem
        }));
        setNewItem({ id: Date.now(), title: "", url: "" });
        modalRef.current.close();
    }

    return (
        <form action="" onSubmit={(event) => handleSubmitAddSubItem(event, parentItem)}>
            <div className="h3">Parent Link:</div>
            <div className="h3">{parentItem.id} -- {parentItem.title} -- {parentItem.url}</div>
            <FormGroup>
                <FormRow>
                    <FormItem flexSizing="1">
                        <input
                            type="text"
                            value={newItem.id}
                            placeholder={newItem.id}
                            readOnly/>
                    </FormItem>
                </FormRow>

                <FormRow gap="20px">
                    <FormItem flexSizing="1">
                        <input
                            type="text"
                            value={newItem.title}
                            placeholder="Title"
                            onChange={(e) => setNewItem(prev => ({...prev, title: e.target.value}))}/>
                    </FormItem>
                </FormRow>
                <FormRow gap="20px">
                    <FormItem flexSizing="1">
                        <input
                            type="text"
                            value={newItem.url}
                            placeholder="Url"
                            onChange={(e) => setNewItem(prev => ({...prev, url: e.target.value}))}/>
                    </FormItem>
                </FormRow>

            </FormGroup>



            <button className="btn" type="submit">Submit changes</button>
        </form>
    )
}