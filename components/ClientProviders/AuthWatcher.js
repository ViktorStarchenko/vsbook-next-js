"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "@/store/authSlice";
import { getTokenDuration } from "@/utils/auth"; // Функція, що рахує залишок часу

export default function AuthWatcher() {
    const router = useRouter();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (!token) return;

        if (token === "EXPIRED") {
            dispatch(clearToken());
            router.push("/logout");
            return;
        }

        const tokenDuration = getTokenDuration();
        console.log("Token active, logging out in:", tokenDuration);

        const logoutTimer = setTimeout(() => {
            dispatch(clearToken());
            router.push("/logout");
        }, tokenDuration);

        return () => clearTimeout(logoutTimer);
    }, [token, router, dispatch]);

    return null;
}
