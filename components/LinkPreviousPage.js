'use client';

import {useRouter} from "next/navigation";

export default function LinkPreviousPage({children}) {
    const router = useRouter();
    return (
        <div className="link-to-previous" onClick={router.back}>
            {children}
        </div>
    )
}