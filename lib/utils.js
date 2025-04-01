
/*******************************************************
 getExcerpt
********************************************************/
export function getExcerpt(text, maxLength = 100) {
    if (text.length <= maxLength) return text;

    let trimmedText = text.slice(0, maxLength);
    let lastSpaceIndex = trimmedText.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
        trimmedText = trimmedText.slice(0, lastSpaceIndex);
    }

    return trimmedText + "...";
}

/*******************************************************
 createSlug
********************************************************/
export function createSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

/*******************************************************
 truncateContentByWords
********************************************************/
export function truncateContentByWords(content, maxLength) {
    if (content.length <= maxLength) {
        return content;
    }
    const truncated = content.slice(0, maxLength).split(' ');
    truncated.pop(); // Удаляем незавершённое слово
    return truncated.join(' ') + '...';
}

/*******************************************************
cleanAndTruncate
********************************************************/
export function cleanAndTruncate(content, maxLength) {
    const doc = new DOMParser().parseFromString(content, 'text/html');
    const text = doc.body.textContent || '';
    if (text.length <= maxLength) {
        return text;
    }
    return text.slice(0, maxLength) + '...';
}

/*******************************************************
Sort Viewed Posts by views count
********************************************************/
export function sortByViewsCountDescending(arr, limit = arr.length) {
    return arr.slice().sort((a, b) => b.viewsCount - a.viewsCount).slice(0, limit);
}