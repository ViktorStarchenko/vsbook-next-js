// /app/api/pinecone/route.js

import { pc } from '@/lib/pinecone';
import { parse } from 'csv-parse/sync';
import {getOpenAiEmbeddings} from "../../../../lib/openaiPrompt";

export async function POST(req) {

    try {
        const formData = await req.formData();
        const index = formData.get("index");
        const host = formData.get("host");
        const file = formData.get("file"); // це Web API File об'єкт
        const model = formData.get("model"); // це Web API File об'єкт

        if (!file || !index || !host || !model) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const content = buffer.toString('utf-8');

        const records = parse(content, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ',',
        });

        const inputs = records.map(r => `${r.Title}. ${r.Content}`);

        const embeddingResponse = await getOpenAiEmbeddings(model, inputs);

        const vectors = embeddingResponse.data.map((item, i) => {
            const r = records[i];
            return {
                id: r.ID || `book_${i}`,
                values: item.embedding,
                metadata: {
                    title: r.Title,
                    content: r.Content,
                    genres: r.Genres?.split('|'),
                    language: r.Languages?.split('|'),
                    writer: r.Writers?.split('|'),
                    release: r.Release?.split('|'),
                    country: r.Country?.split('|'),
                },
            };
        });

        const namespace = pc.index(index, host);
        await namespace.upsert(vectors);

        return Response.json({ success: true, count: vectors.length });
    } catch (error) {
        console.error("Upsert Error:", error);
        return Response.json({ error: "Failed to upsert data" }, { status: 500 });
    }
}
