"use client";

import {Provider} from "react-redux";
import store from "@/store/index";
import ClientProviderMainMenu from "./ClientProviderMainMenu";
import ClientProviderViews from "./ClientProviderViews";
import ClientProviderFavoutires from "./ClientProviderFavoutires";
import ClientProviderCart from "./ClientProviderCart";

export default function ClientProviders({ children }) {
    return (
        <Provider store={store}>
            <ClientProviderMainMenu />
            <ClientProviderViews />
            <ClientProviderFavoutires />
            <ClientProviderCart />
            {children}
        </Provider>
    );
}
