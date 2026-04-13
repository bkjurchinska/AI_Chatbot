import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createMessage } from '@/lib/db';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, conversationId } = await req.json();
    
    const idAsNumber = parseInt(conversationId);

    if (isNaN(idAsNumber)) {
      console.error("Invalid conversationId received:", conversationId);
      return new Response("Invalid ID", { status: 400 });
    }

    const userMessage = messages[messages.length - 1];

    console.log('Saving user message...');
    await createMessage(userMessage.content, 'user', idAsNumber);

    const result = await streamText({
      model: openrouter('liquid/lfm-2.5-1.2b-thinking:free'),
      messages: messages.map((m: any) => ({
        role: m.role === 'ai' ? 'assistant' : m.role,
        content: m.content,
      })),
      async onFinish({ text }) {
        try {
          console.log('trying to save ai message');
          await createMessage(text || "", 'ai', idAsNumber);
          console.log('save successful!!');
        } catch (error) {
          console.error('Database error:', error);
        }
      },
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("POST Route Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}