import { pc, modelName, index } from '@/lib/pinecone';

export async function GET(req) {
    const listindexes = await pc.listIndexes();
    return Response.json(listindexes);
}