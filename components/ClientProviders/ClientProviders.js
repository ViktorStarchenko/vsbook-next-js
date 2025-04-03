"use client";

import {Provider} from "react-redux";
import store from "@/store/index";
import ClientProviderMainMenu from "./ClientProviderMainMenu";
import ClientProviderViews from "./ClientProviderViews";
import ClientProviderFavoutires from "./ClientProviderFavoutires";
import ClientProviderCart from "./ClientProviderCart";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "@/lib/utils";

export default function ClientProviders({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <ClientProviderMainMenu />
                <ClientProviderViews />
                <ClientProviderFavoutires />
                <ClientProviderCart />
                {children}
            </Provider>
        </QueryClientProvider>
    );
}
