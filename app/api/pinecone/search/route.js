import { pc, modelName } from '@/lib/pinecone';
import { OpenAI } from 'openai';
import { stripHTML } from '@/lib/utils';
import {getOpenAiEmbeddings, getOpenAIResponse} from "../../../../lib/openaiPrompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });


export async function POST(req) {
    try {
        const { indexName, indexHost, namespace="", queryText, topK = 5 } = await req.json();

        if (!indexName) {
            return Response.json({ error: "Pinecon index not selected" }, { status: 400 });
        }
        if (!queryText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }
        const index = pc.index(indexName);

        // Step 1: Embed query
        const embedding = await pc.inference.embed(indexName, [queryText], {
            inputType: "query",
        });
        const embeddingValues = embedding.data[0].values;

        // const embedding = await getOpenAiEmbeddings("text-embedding-3-small", queryText);

        // Step 2: Search in Pinecone
        const queryResponse = await index.namespace(namespace).query({
            topK,
            vector: embeddingValues,
            includeValues: true,
            includeMetadata: true,
        });
        return Response.json(queryResponse);


        const matches = queryResponse.matches || [];
        const uniqueMatches = [];
        const seenIds = new Set();

        for (const match of matches) {
            const id = match.metadata.ID;
            if (!seenIds.has(id)) {
                seenIds.add(id);
                uniqueMatches.push(match);
            }
        }

        // Step 4: Create a prompt for OpenAI
        const querySummary = queryText.slice(0, 500);

        const matchesSummary = uniqueMatches.map(m => {
            const content = stripHTML(m.metadata.chunk || m.metadata.content || "").slice(0, 300);
            const title = m.metadata.title || "Untitled";
            const genres = m.metadata.genres?.join(", ");
            return `• ${title} (${genres}): ${content}`;
        }).join('\n');

        const userPrompt = `
            I recommend books based on similarity of description. The user searched for a book with the following description:
            
            "${querySummary}"
            
            Here are the books that were found to be similar:
            
            ${matchesSummary}
            
            Explain briefly in English why these books are recommended. No more than 3 sentences.
        `.trim();

        const systemPrompt = "You help with book recommendations.";

        const explanation = await getOpenAIResponse(systemPrompt, userPrompt);
        // Step 6: Return matches + explanation
        return Response.json({ matches:uniqueMatches, explanation });

    } catch (error) {
        console.error("Search Error:", error);
        return Response.json({ error: "Failed to search data" }, { status: 500 });
    }
}