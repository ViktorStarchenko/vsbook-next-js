import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";
import {useEffect, useState} from "react";
import {validateFieldClient} from "../../lib/validation";

export default function Textarea({className, name, id, placeholder, validation, errorMessage, ...props}) {
    const [error, setError] = useState("");

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

    return (
        <>
            <textarea
                className={`${className} `}
                name={name}
                id={id}
                cols="30"
                rows="10"
                placeholder={placeholder}
                onBlur={handleBlur}
                {...props}
            />
            <ErrorMessageBlock message={error} />
        </>
    )
}