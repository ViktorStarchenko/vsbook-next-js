'use client'

import {useFormStatus} from 'react-dom'

export default function FormSubmitButton() {
    const formStatus = useFormStatus();
    return (
        <button className="btn" disabled={formStatus.pending}>
            {formStatus.pending ? 'Pending...' : 'Submit'}
        </button>
    )
}