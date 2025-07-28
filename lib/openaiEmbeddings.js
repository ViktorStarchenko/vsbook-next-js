import OpenAI from "openai";
const openai = new OpenAI();

const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: "Your text string goes here",
    encoding_format: "float",
});

console.log(embedding);