import { index, pc } from '@/lib/pinecone';

export async function POST(req) {
    try {
        // const { namespace, data } = await req.json();
        //
        // if (!namespace || !data || !Array.isArray(data)) {
        //     return Response.json({ error: "Invalid input data" }, { status: 400 });
        // }

        const namespace = pc.index("openai-3-large", "openai-3-large-vg6n5cq.svc.aped-4627-b74a.pinecone.io");
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
        console.log("NAMESPACE", namespace)
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
        await namespace.upsertRecords([
            {
                "_id": "rec1",
                "chunk_text": "Apples are a great source of dietary fiber, which supports digestion and helps maintain a healthy gut.",
                "category": "digestive system",
            },
            {
                "_id": "rec2",
                "chunk_text": "Apples originated in Central Asia and have been cultivated for thousands of years, with over 7,500 varieties available today.",
                "category": "cultivation",
            },
            {
                "_id": "rec3",
                "chunk_text": "Rich in vitamin C and other antioxidants, apples contribute to immune health and may reduce the risk of chronic diseases.",
                "category": "immune system",
            },
            {
                "_id": "rec4",
                "chunk_text": "The high fiber content in apples can also help regulate blood sugar levels, making them a favorable snack for people with diabetes.",
                "category": "endocrine system",
            }
        ]);

        return Response.json({ success: true, message: "Data upserted successfully" });
    } catch (error) {
        console.error("Upsert Error:", error);
        return Response.json({ error: "Failed to upsert data" }, { status: 500 });
    }
}
