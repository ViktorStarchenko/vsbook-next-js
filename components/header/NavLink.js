'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function NavLink({url, title}) {
    const path = usePathname();
    return (
        <Link href={url} className={`${path === url ? 'active' : ''}`}>{title}</Link>
    )
}