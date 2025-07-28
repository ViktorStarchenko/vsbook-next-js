//lib/openaiPrompt.js

import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Викликає OpenAI з системним та користувацьким промптом
 * @param {string} systemPrompt - інструкція для AI
 * @param {string} userPrompt - вхідний текст від користувача
 * @param {object} options - інші параметри: модель, temperature, тощо
 * @returns {Promise<string>} - відповідь від AI
 */
export async function getOpenAIResponse(systemPrompt, userPrompt, options = {}) {
    const {
        model = 'gpt-4',
        temperature = 0.7,
    } = options;

    const response = await openai.chat.completions.create({
        model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
        ],
        temperature,
    });

    return response.choices?.[0]?.message?.content || '';
}

export async function getOpenAI4oMiniResponse(systemPrompt) {

    const response = await openai.responses.create({
        model: "o4-mini",
        reasoning: { effort: "medium" },
        input: [
            {
                role: "user",
                content: systemPrompt,
            },
        ],
    });

    return response.output_text || '';
}

export async function getOpenAiEmbeddings(model = "text-embedding-3-small", input) {
        const embedding = await openai.embeddings.create({
        model: model,
        input: input,
        encoding_format: "float",
    });
        return embedding;
}