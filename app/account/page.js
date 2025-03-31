import { getAuthToken } from "@/lib/auth";
import Section from "../../components/section/Section";

export default async function Account() {
    const token = await getAuthToken();
    if (!token) {
        return <p>Please log in</p>;
    }

    return (
        <Section>
            <div className="post-content">
                <p>You are logged in.</p>
            </div>
        </Section>
    );
}