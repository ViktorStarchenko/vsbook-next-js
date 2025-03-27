export default function FormItem({children, className}) {

    return (
        <div className={`form-item ${className}`}>
            {children}
        </div>
    )
}