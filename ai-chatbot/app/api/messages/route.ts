import { NextResponse } from 'next/server';
import { getMessages } from "@/lib/db";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId") || searchParams.get("userId");

    if (!conversationId) {
        return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
    }

    try {
        const messages = await getMessages(parseInt(conversationId));

        const formattedMessages = messages.map(m => ({
            id: m.id,
            text: m.content,
            sender: m.role,
            createdAt: m.createdAt
        }));

        return NextResponse.json(formattedMessages);
    } catch (error) {
        console.error("Get messages error", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
