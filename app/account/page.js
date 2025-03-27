import { getAuthToken } from "@/lib/auth";
import Section from "../../components/section/Section";
import Link from "next/link";

export default async function Account() {
    const token = await getAuthToken();
    if (!token) {
        return <p>Please log in</p>;
    }

    return (
        <Section>
            <div className="post-container account-content sidebar-enabled sidebar-left">
                <div className="sidebar sidebar-left">
                    <h2>Sidebar</h2>
                    <div>
                        <h2>Account Navigation</h2>
                        <ul>
                            <li>
                                <Link href="/account/main-menu">Edit Main Menu</Link>
                            </li>
                            <li>
                                <Link href="/account/create-post">Add Post</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="account-inner">
                    <h1>Welcome to the Dashboard</h1>
                    <p>You are logged in.</p>
                </div>
            </div>
        </Section>
    );
}