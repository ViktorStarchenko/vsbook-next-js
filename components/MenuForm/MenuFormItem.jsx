import {useState} from 'react'

import MenuItemList from "./MenuItemList";
import FormGroup from "../FormItems/FormGroup";
import FormRow from "../FormItems/FormRow";
import FormItem from "../FormItems/FormItem";
import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";

export default function MenuFormItem({ onAdd, level = 1 }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [children, setChildren] = useState([]);
    const [showChildForm, setShowChildForm] = useState(false); // Controls the display of a nested form.
    const [errorFields, setErrorFields] = useState({ title: false, url: false });

    const dispatch = useDispatch();

    function handleSubmit() {

        const errors = {
            title: !title,
            url: !url
        };
        console.log()
        if (errors.title || errors.url) {
            setErrorFields(errors);
            dispatch(uiSliceActions.showNotification({
                status: "error",
                title: "Error",
                message: "Empty fields or wrong format"
            }));
            return;
        }

        setErrorFields({ title: false, url: false });

        onAdd({ id: Date.now(), title, url, children: children.length ? children : undefined });
        setTitle("");
        setUrl("");
        setChildren([]);
        setShowChildForm(false); // Hide the form after adding
    }

    return (
        <div>
            <FormGroup>
                <FormRow>
                    <FormItem flexSizing="1">
                        <input
                            className={errorFields.title ? "error" : ""}
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                    </FormItem>
                    <FormItem flexSizing="1">
                        <input
                            className={errorFields.url ? "error" : ""}
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required />
                    </FormItem>
                </FormRow>
                <FormRow>
                    <FormItem width="100%">
                        <button className="btn" type="button" onClick={handleSubmit}>Add Item</button>
                    </FormItem>
                </FormRow>
            </FormGroup>
        </div>
    );
}