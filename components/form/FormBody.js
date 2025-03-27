import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";

export default function FormBody({action, method,children, submitText}) {

    return (
        <form action={action} method={method}>
            <div className="form-inner">
                {children}
                <div className="form-group">
                    <div className="form-item">
                        <FormSubmitButton />
                    </div>
                </div>
            </div>
        </form>
    )
}