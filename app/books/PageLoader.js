"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageLoader() {
    const pathname = usePathname();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const timeout = setTimeout(() => setLoading(false), 500); // Задержка для плавности
        return () => clearTimeout(timeout);
    }, [pathname]); // Срабатывает при смене маршрута

    if (!loading) return null;

    return (
        <div className="loading-spinner">
            Loading...
        </div>
    );
}
