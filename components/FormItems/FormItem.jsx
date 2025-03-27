import classes from './FormItems.module.css'

export default function FormItem({width, flexSizing = "none", children}) {

    return (
        <div className="form-item" style={{width: width, flex: flexSizing}}>
            {children}
        </div>
    )
}