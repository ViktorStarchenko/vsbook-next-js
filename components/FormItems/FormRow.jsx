export default function FormRow({gap = '10px', children}) {
    return (
        <>
            <div className="form-row" style={{gap: gap}}>
                {children}
            </div>
        </>
    )
}