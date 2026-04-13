import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createMessage } from '@/lib/db';

const openrouter = createOpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.API_KEY,
});

export async function POST(req: Request) {
  const { messages, conversationId } = await req.json();
  const userMessage = messages[messages.length - 1];
  await createMessage(userMessage.content, 'user', parseInt(conversationId));

  const result = streamText({
    model: openrouter('liquid/lfm-2.5-1.2b-thinking:free'),
    messages: messages.map((m: any) => ({
      role: m.role,
      content: m.content,
    })),
    async onFinish({ text }) {
      await createMessage(text, 'ai', parseInt(conversationId));
    },
  });
  return result.toTextStreamResponse();
}
