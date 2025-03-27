import Section from "../../components/section/Section";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function Login() {

    return (
        <>
            <Section>
                <h1 className="h1 color-accent">Login</h1>
            </Section>
            <Section>
                <LoginForm />
            </Section>
        </>
    )
}