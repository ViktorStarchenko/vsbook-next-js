// /api/recommend/helper-chat/route.js

import { pc, modelName } from '@/lib/pinecone';
import { getOpenAIResponse } from '@/lib/openaiPrompt';
import { stripHTML } from '@/lib/utils';
import {getOpenAiEmbeddings, getOpenAI4oMiniResponse} from "../../../../lib/openaiPrompt";

const index = pc.index("text-embedding-3-small");

export async function POST(req) {

    try {
        const { queryText, namespace = "", topK = 5 } = await req.json();

        if (!queryText) {
            return Response.json({ error: "Missing query text" }, { status: 400 });
        }
        if (queryText.trim().split(/\s+/).length < 3) {
            return Response.json({ error: "Query too generic. Please describe what kind of books you're looking for." }, { status: 400 });
        }

        // Embed запиту
        const embeddingSystemPromt = "you are an assistant generating a detailed description of the genre and subject of the book based on the user's request"
        const embeddingUserPromt = `user's query = ${queryText}
        .Take the user's query and generate a detailed description of the genre and subject of the books he is interested in, no more than 5 sentences. Do not mention the user in the answer and what the user is asking, return only the designation. Respond only with the rephrased query.`

        // const betterQuery = await getOpenAIResponse(embeddingSystemPromt, embeddingUserPromt);
        const query4Mini = await getOpenAI4oMiniResponse(embeddingSystemPromt);
        // const openAiEmbeddings = await getOpenAiEmbeddings("text-embedding-3-small", betterQuery);

        console.log('query4Mini', query4Mini);
        return false;

        // Pinecone search
        const queryResponse = await index.namespace(namespace).query({
            topK,
            // vector: embedding.data[0].values,
            vector: openAiEmbeddings.data[0].embedding,
            includeMetadata: true,
        });

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

        // Побудова запиту до OpenAI
        const matchesSummary = uniqueMatches.map(m => {
            const content = stripHTML(m.metadata.chunk || m.metadata.content || "").slice(0, 300);
            const title = m.metadata.title || "Untitled";
            const genres = m.metadata.genres?.join(", ");
            return `• ${title} (${genres}): ${content}`;
        }).join('\n');

        const userPrompt = `
            User asked: "${queryText}"
            
            Based on this request, here are some recommended books:
            
            ${matchesSummary}
            
            Briefly explain why these books are relevant recommendations for user's request: ${queryText}.
        `.trim();

        const systemPrompt = "You are a useful assistant and will recommend books based on the user's request";

        const explanation = await getOpenAIResponse(systemPrompt, userPrompt);

        return Response.json({ matches: uniqueMatches, explanation });

    } catch (error) {
        console.error("Chat books Reco Error:", error);
        return Response.json({ error: "Failed to generate recommendations" }, { status: 500 });
    }
}
