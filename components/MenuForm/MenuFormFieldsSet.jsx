import Input from "../elements/Input";
import FormRow from "../FormItems/FormRow";

export default function MenuFormFieldsSet() {

    return (
        <>
            <FormRow>
                <Input type="text" name="title" placeholder="Title"/>
                <Input type="text" name="link" placeholder="Url"/>
            </FormRow>
        </>
    )
}