'use client'

import { useRouter, usePathname } from "next/navigation";

export default function ResetFiltersButton() {
    const router = useRouter();
    const pathname = usePathname();

    const handleReset = () => {
        router.push(`${pathname}?page=1`);
    };

    return (
        <button onClick={handleReset} className="reset-filters-button btn">
            Reset All
        </button>
    );
}
