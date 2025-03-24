'use client'

import {createContext, useContext, useState} from "react";

const AccordionItemContext = createContext();

export function useAccordionItemContext() {
    const ctx = useContext(AccordionItemContext);

    if (!ctx) {
        throw new Error('AccordionItem-related components must be wrapped by AccordionItemContext component');
    }

    return ctx;
}

export default function AccordionItem({id, children}) {

    const contextValue = {
        id: id,
    }

    return  (
        <>
            <AccordionItemContext.Provider value={contextValue}>
                <div className="accordion-item" id={id}>
                    {children}
                </div>
            </AccordionItemContext.Provider>
        </>
    )
}