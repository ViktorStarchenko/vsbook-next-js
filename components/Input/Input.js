'use client'

import { useState, useEffect } from "react";
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";
import {validateFieldClient} from "../../lib/validation";
import InputShowPassword from "./InputShowPassword";

export default function Input({type, id, name, placeholder, value, className, validation, errorMessage, ...props}) {
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        // Очистка помилки, якщо виконується серверна валідація
        setError(errorMessage);
    }, [errorMessage]);

    const handleBlur = (event) => {
        if (validation) {
            const errorMessage = validateFieldClient(event.target.value, validation);
            setError(errorMessage);
        }
    };
    let inputType = type;
    if (type === 'password') {
        inputType = showPassword ? 'text' : 'password';
    }
    return (
        <>
            <input
                className={`${className} `}
                type={inputType}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onBlur={handleBlur}
                {...props}
            />
            {type === 'password' && (
                <InputShowPassword showPassword={showPassword} setShowPassword={setShowPassword}/>
            )}
            <ErrorMessageBlock message={error} />
        </>
    )
}