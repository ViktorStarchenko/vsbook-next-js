import {useRef, useState} from "react";

export default function Checkbox({id, name, label, value, defaultChecked , ...props}) {
    const [isChecked, setIsChecked] = useState(defaultChecked || false)

    const checkbox = useRef()
    function handleChange(event) {
        setIsChecked(event.target.checked);
    }

    return (
        <>
            <div className="custom-checkbox-wrapper">
                <div className="custom-checkbox">
                    <span className={`custom-checkbox-icon ${isChecked ? 'checked' : ''}`}>✔</span>
                </div>
                <input type="checkbox" id={id} name={name} value={value} ref={checkbox} onClick={handleChange} {...props}/>
                <label htmlFor={id}>{label}</label>
            </div>
        </>
    )
}