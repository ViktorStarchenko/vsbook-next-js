import { pc, modelName, index } from '@/lib/pinecone';

export async function POST(req) {
    try {
        const { namespace, queryText, topK = 5 } = await req.json();

        if (!namespace || !queryText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // get embeddings
        const embedding = await pc.inference.embed(modelName, [queryText], {
            inputType: "query",
        });

        // get query
        const queryResponse = await index.namespace(namespace).query({
            topK,
            vector: embedding.data[0].values,
            includeValues: false,
            includeMetadata: true,
        });

        return Response.json(queryResponse);
    } catch (error) {
        console.error("Search Error:", error);
        return Response.json({ error: "Failed to search data" }, { status: 500 });
    }
}
