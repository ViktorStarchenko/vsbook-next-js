'use client'

import { useAccordionItemContext } from "./AccordionItem";
import {useAccordionContext} from "./Accordion";

export default function AccordionContent({children, contentAbsolute = false}) {
    const {openItemId} = useAccordionContext();
    const {id} = useAccordionItemContext();

    const isOpen = openItemId === id;

    return (
        <>
            <div className={`accordion-item-content ${isOpen ? 'open' : 'close'} ${contentAbsolute ? 'content-absolute' : ''}`}>
                {children}
            </div>
        </>
    )
}