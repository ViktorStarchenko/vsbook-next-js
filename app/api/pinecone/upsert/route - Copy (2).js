import { pc } from '@/lib/pinecone';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
    try {
        const namespace = pc.index("openai-3-large", "openai-3-large-vg6n5cq.svc.aped-4627-b74a.pinecone.io");

        const records = [
            {
                _id: "rec1",
                chunk_text: "Apples are a great source of dietary fiber, which supports digestion and helps maintain a healthy gut.",
                category: "digestive system",
            },
            {
                _id: "rec2",
                chunk_text: "Apples originated in Central Asia and have been cultivated for thousands of years, with over 7,500 varieties available today.",
                category: "cultivation",
            },
            {
                _id: "rec3",
                chunk_text: "Rich in vitamin C and other antioxidants, apples contribute to immune health and may reduce the risk of chronic diseases.",
                category: "immune system",
            },
            {
                _id: "rec4",
                chunk_text: "The high fiber content in apples can also help regulate blood sugar levels, making them a favorable snack for people with diabetes.",
                category: "endocrine system",
            }
        ];

        // Отримуємо тексти для ембедінгу
        const inputs = records.map(r => r.chunk_text);

        // Вбудовуємо через OpenAI
        const embeddingResponse = await openai.embeddings.create({
            model: "text-embedding-3-large",
            input: inputs,
        });

        const vectors = embeddingResponse.data.map((item, i) => ({
            id: records[i]._id,
            values: item.embedding,
            metadata: {
                chunk_text: records[i].chunk_text,
                category: records[i].category,
            },
        }));

        await namespace.upsert(vectors); // Або namespace.upsertRecords якщо ти обгорнув його

        return Response.json({ success: true, message: "Data upserted successfully" });
    } catch (error) {
        console.error("Upsert Error:", error);
        return Response.json({ error: "Failed to upsert data" }, { status: 500 });
    }
}
