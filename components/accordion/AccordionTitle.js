'use client'

import { useAccordionItemContext } from "./AccordionItem";
import {useAccordionContext} from "./Accordion";

export default function AccordionTitle({className, children}) {
    const {toggleOpenId, openItemId} = useAccordionContext();
    const {id} = useAccordionItemContext();
    const isOpen = openItemId === id;
    return (
        <>
            <h3 className={`accordion-item-title ${className} ${isOpen ? 'open' : 'close'}`} onClick={() => toggleOpenId(id)}>{children}</h3>
        </>
    )
}