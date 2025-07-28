//lib/pinecone.js

import { Pinecone } from '@pinecone-database/pinecone';

// const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
export const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

export const indexName = "multilingual-e5-large";
export const modelName = "multilingual-e5-large";
export const index = pc.index(indexName);

export async function getPineconeIndex(indexName) {
    const index = await pc.index(indexName);
    return index;
}

export function chunkText(text, chunkSize = 500) {
    const words = text.split(/\s+/);
    const chunks = [];

    for (let i = 0; i < words.length; i += chunkSize) {
        const chunk = words.slice(i, i + chunkSize).join(' ');
        chunks.push(chunk);
    }

    return chunks;
}
