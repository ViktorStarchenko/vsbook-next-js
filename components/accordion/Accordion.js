'use client'

import {createContext, useContext, useState} from "react";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
import AccordionItem from "./AccordionItem";

const AccordionContext = createContext();

export function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if (!ctx) {
        throw new Error('Accordion-related components must be wrapped by AccordionContext component')
    }

    return ctx;
}

export default function Accordion({children}) {
    const [openItemId, setOpenItemId] = useState();

    function toggleOpenId(id) {
        setOpenItemId(prevOpenId => prevOpenId === id ? null : id);
    }

    const contextValue = {
        openItemId: openItemId,
        toggleOpenId: toggleOpenId,
    }

    return (
        <>
            <AccordionContext.Provider value={contextValue}>
                <div className="accordion-wrapper">
                    {children}
                </div>
            </AccordionContext.Provider>
        </>
    )
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;