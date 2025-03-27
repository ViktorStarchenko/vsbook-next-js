'use client'

import {userLogin} from "../../lib/auth";
import FormGroup from "../FormGroup/FormGroup";
import FormItem from "../FormItem/FormItem";
import Input from "../Input/Input";
import FormBody from "../form/FormBody";
import {useActionState} from 'react'
import ErrorMessageBlock from "../ErrorMessageBlock/ErrorMessageBlock";
import { useRouter } from "next/navigation";

const initialState = {
    success: false,
    errors: '',
}

export default function LoginForm() {
    const [state, formAction, pending] = useActionState(userLogin, initialState);
    const router = useRouter();
    console.log(state.success)
    if (state?.success === true) {
        router.push('/account');
    }

    return (
        <FormBody
            action={formAction}
        >
            {pending && <h4>Pending...</h4>}
            {state.errors?.message && <ErrorMessageBlock message={state.errors?.message}/>}
            <FormGroup>
                <FormItem>
                    <Input
                        className={`${state.errors?.username ? 'input-error' : ''}`}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        validation={[
                            { type: "required", message: "Username is required" },
                            { type: "regex", value: /^[a-zA-Z0-9_-]{3,}$/, message: "Invalid username format" }
                        ]}
                        errorMessage={state.errors?.username}
                    />
                    {/*<ErrorMessageBlock message={state.errors?.username}/>*/}
                </FormItem>
            </FormGroup>
            <FormGroup>
                <FormItem>
                    <Input
                        className={`${state.errors?.password ? 'input-error' : ''}`}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Your password"
                        validation={[
                            { type: "required", message: "Password is required" },
                            { type: "minLength", value: 6, message: "Password must be at least 6 characters" }
                        ]}
                        errorMessage={state.errors?.password}
                    />
                    {/*<ErrorMessageBlock message={state.errors?.password}/>*/}
                </FormItem>
            </FormGroup>
        </FormBody>
    )
}