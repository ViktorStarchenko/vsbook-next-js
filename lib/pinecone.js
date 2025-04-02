import { Pinecone } from '@pinecone-database/pinecone';

// const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
export const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

export const indexName = "multilingual-e5-large";
export const modelName = "multilingual-e5-large";
export const index = pc.index(indexName);
