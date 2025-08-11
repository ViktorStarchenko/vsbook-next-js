// /app/api/agent/groq/generate-response/route.js (Next.js 13+ with App Router)

import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req) {
    try {
        const { embeddingResult, userMessage } = await req.json();

        if (!userMessage || !embeddingResult) {
            return new Response(JSON.stringify({ error: 'Missing userMessage or queryText' }), { status: 400 });
        }

        const bookSummaries = embeddingResult.map((match, i) => {
            return `Book ${i + 1}:\n${match.metadata.text.trim()}`;
        }).join('\n\n');

        const userPrompt = `
                User query:
                "${userMessage}"
                
                Here are several book descriptions that were retrieved based on the user's query using semantic similarity:
                
                ${bookSummaries}
                
                Please explain, in 1–2 sentences per book, why each of these books is relevant to the user's request.
                Respond in a clear and concise way.
                `.trim();

        const systemMessage = `
                You are a helpful assistant that explains why a list of books are relevant to the user's search query. 
                For each book provided, explain briefly why it matches the user's intent.
                `.trim();


        const chatCompletion = await openai.chat.completions.create({
            model: 'llama3-70b-8192', // або 'mixtral-8x7b-32768', 'gemma-7b-it'
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
        });

        const answer = chatCompletion.choices[0].message.content;

        return new Response(JSON.stringify({ answer }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Groq API error:', err);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), { status: 500 });
    }
}
