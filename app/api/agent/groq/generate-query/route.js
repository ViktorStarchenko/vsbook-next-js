// /app/api/agent/groq/generate-query/route.js (Next.js 13+ with App Router)
// або /pages/api/agent/groq.js для Pages Router

import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req) {
    try {
        const { userMessage } = await req.json();

        if (!userMessage) {
            return new Response(JSON.stringify({ error: 'Missing userMessage' }), { status: 400 });
        }

        const chatCompletion = await openai.chat.completions.create({
            model: 'llama3-70b-8192', // або 'mixtral-8x7b-32768', 'gemma-7b-it'
            messages: [
                // { role: 'system', content: 'You are a helpful AI book recommendation assistant.' },
                { role: 'system', content: `you are an assistant generating a detailed description of the genre and subject of the book based on the user's request. Take the user's query and generate a detailed description of the genre and subject of the books he is interested in, no more than 5 sentences. Do not mention the user in the answer and what the user is asking, return only the designation. Respond only with the rephrased query.` },
                { role: 'user', content: userMessage },
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
