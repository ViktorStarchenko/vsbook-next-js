// /app/api/agent/groq/generate-response/route.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
});

export async function POST(req) {
    try {
        const { embeddingResult, userMessage } = await req.json();

        if (!userMessage || !embeddingResult) {
            return new Response(
                JSON.stringify({ error: 'Missing userMessage or embeddingResult' }),
                { status: 400 }
            );
        }

        const bookSummaries = embeddingResult
            .map((match, i) => `Book ${i + 1}. Id: ${match.id}: ${match.metadata.text.trim()}`)
            .join('\n\n');

        const userPrompt = `
            User query:
            "${userMessage}"
            
            Here are several book descriptions retrieved based on semantic similarity:
            
            ${bookSummaries}
            
            You must return ONLY valid JSON in the following format:
            [
              { "id": "<ID>", "reason": "<1–2 sentence reason>" }
            ]
            
            Rules:
            - Output MUST be valid JSON, nothing else.
            - Escape all quotes in values using standard JSON escaping.
            - Do not add markdown, explanations, or any extra text outside the JSON.
            - Keep reasons short (max 2 sentences).
            - If a book is clearly NOT relevant to the user's request, skip it entirely and do not include it in the JSON.
            - Final JSON should contain only books that match the user's intent.
        `.trim();

        const systemMessage = `
            You are a strict JSON generator that only outputs relevant results.
            Your job:
            1. Read the list of books.
            2. Compare with the user's request.
            3. Skip any book that is unrelated or irrelevant.
            4. Output valid JSON ONLY with relevant matches.
        `.trim();

        const chatCompletion = await openai.chat.completions.create({
            model: 'llama3-70b-8192',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.2,
        });

        let answer = chatCompletion.choices[0].message.content.trim();

        // Safe JSON parse
        let parsed;
        try {
            parsed = JSON.parse(answer);
        } catch (err) {
            console.warn('First JSON parse failed, trying cleanup...', err);

            const jsonMatch = answer.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                try {
                    parsed = JSON.parse(jsonMatch[0]);
                } catch (err2) {
                    console.error('Cleanup JSON parse error:', err2);
                    return new Response(
                        JSON.stringify({ error: 'Invalid JSON returned', raw: answer }),
                        { status: 500 }
                    );
                }
            } else {
                return new Response(
                    JSON.stringify({ error: 'No JSON found in response', raw: answer }),
                    { status: 500 }
                );
            }
        }

        return new Response(JSON.stringify({ books: parsed }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Groq API error:', err);
        return new Response(JSON.stringify({ error: 'Something went wrong' }), {
            status: 500,
        });
    }
}
