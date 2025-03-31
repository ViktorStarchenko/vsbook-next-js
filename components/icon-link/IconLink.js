'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";

export default function IconLink({url, title, className, children}) {
    const path = usePathname();
    return (
        <Link className={`icon-link ${className ? className : ''} ${path === url ? 'active' : ''}`} href={url}>{children}</Link>
    )
}