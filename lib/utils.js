export function getExcerpt(text, maxLength = 100) {
    if (text.length <= maxLength) return text;

    let trimmedText = text.slice(0, maxLength);
    let lastSpaceIndex = trimmedText.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
        trimmedText = trimmedText.slice(0, lastSpaceIndex);
    }

    return trimmedText + "...";
}