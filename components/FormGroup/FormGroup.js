export default function FormGroup({children, className}) {

    return (
        <div className={`form-group ${className}`}>
            {children}
        </div>
    )
}