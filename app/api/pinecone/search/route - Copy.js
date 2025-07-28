import { pc, modelName, index } from '@/lib/pinecone';
import { OpenAI } from 'openai';
import { stripHTML } from '@/lib/utils';
import {getOpenAIResponse} from "../../../../lib/openaiPrompt";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const { namespace, queryText, topK = 5 } = await req.json();

        if (!namespace || !queryText) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Step 1: Embed query
        const embedding = await pc.inference.embed(modelName, [queryText], {
            inputType: "query",
        });

        // Step 2: Search in Pinecone
        const queryResponse = await index.namespace(namespace).query({
            topK,
            vector: embedding.data[0].values,
            includeValues: false,
            includeMetadata: true,
        });

        const matches = queryResponse.matches || [];

        // Step 3: Get content of matched posts from WP API
        const ids = matches.map(m => m.id);
        const wpResponse = await fetch(`https://a.vsbookcollection.space/wp-json/wp/v2/book?include=${ids.join(',')}&_fields=id,title,content`);
        const wpPosts = await wpResponse.json();

        // Step 4: Create a prompt for OpenAI
        const querySummary = queryText.slice(0, 500);
        const matchesSummary = wpPosts.map(p =>
            `• ${p.title.rendered}: ${stripHTML(p.content.rendered).slice(0, 300)}`
        ).join('\n');

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
        return Response.json({ matches, explanation });

    } catch (error) {
        console.error("Search Error:", error);
        return Response.json({ error: "Failed to search data" }, { status: 500 });
    }
}