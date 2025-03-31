export default function SvgIcon({children, className, ...props}) {

    return (
        <div className={`svg-icon ${className ? className : ''}`} {...props}>
            {children}
        </div>
    )
}