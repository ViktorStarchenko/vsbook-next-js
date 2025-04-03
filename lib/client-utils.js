/*******************************************************
 ParseHTML
 ********************************************************/
export function parseHTML(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
};