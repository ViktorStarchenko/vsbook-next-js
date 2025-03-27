import {mainMenuSliceActions} from "../../store/main-menu-slice";
import {useState} from "react";
import {useDispatch} from "react-redux";
import FormGroup from "../FormItems/FormGroup";
import FormItem from "../FormItems/FormItem";
import FormRow from "../FormItems/FormRow";

export default function MenuFormEditItem({item, modalRef}) {
    const [itemToEdit, setItemToEdit] = useState({id: item.id, title: item.title, url: item.url});
    const dispatch = useDispatch();
    function handleSubmitEdit(event) {
        event.preventDefault();

        if (!itemToEdit.id) return;
        dispatch(mainMenuSliceActions.editMenuItem(itemToEdit));
        setItemToEdit({id: item.id, title: item.title, url: item.url});
        modalRef.current.close();
    }

    return (
        <>
            <div className="h3">
                Edit {item.id} -- {item.title} -- {item.url}
            </div>
            <form action="" onSubmit={handleSubmitEdit}>
                <FormGroup>
                    <FormRow>
                        <FormItem flexSizing="1">
                            <input
                                type="text"
                                value={itemToEdit.id || ''}
                                placeholder={itemToEdit.id}
                                readOnly/>
                        </FormItem>
                    </FormRow>
                    <FormRow gap="20px">
                        <FormItem flexSizing="1">
                            <input
                                type="text"
                                value={itemToEdit.title || ''}
                                placeholder={itemToEdit.title}
                                onChange={(e) => setItemToEdit(prev => ({...prev, title: e.target.value}))}/>
                        </FormItem>
                    </FormRow>
                    <FormRow gap="20px">
                        <FormItem flexSizing="1">
                            <input
                                type="text"
                                value={itemToEdit.url || ''}
                                placeholder={itemToEdit.url}
                                onChange={(e) => setItemToEdit(prev => ({...prev, url: e.target.value}))}/>
                        </FormItem>
                    </FormRow>




                </FormGroup>
                <button className="btn" type="submit">Submit changes</button>
            </form>
        </>
    )
}