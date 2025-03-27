"use client";

import {Provider} from "react-redux";
import store from "@/store/index";
import ClientProviderFetch from "./ClientProviderFetch";

export default function ClientProviders({ children }) {
    return (
        <Provider store={store}>
            <ClientProviderFetch />
            {children}
        </Provider>
    );
}
