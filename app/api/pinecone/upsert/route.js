import { index } from '@/lib/pinecone';

export async function POST(req) {
    try {
        const { namespace, data } = await req.json();

        if (!namespace || !data || !Array.isArray(data)) {
            return Response.json({ error: "Invalid input data" }, { status: 400 });
        }

        await index.namespace(namespace).upsert(data);

        return Response.json({ success: true, message: "Data upserted successfully" });
    } catch (error) {
        console.error("Upsert Error:", error);
        return Response.json({ error: "Failed to upsert data" }, { status: 500 });
    }
}
