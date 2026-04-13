import { NextResponse } from 'next/server';
import { getMessages, createMessage } from "@/lib/db";
import { revalidatePath } from "next/cache";

//get messages for a spec session
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId") || searchParams.get("userId"); // fallback for userId

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

//saving a message and getting AI response
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { text, userId, conversationId: bodyConvoId } = body;
        const conversationId = bodyConvoId || userId;

        if (!text || !conversationId) {
            return NextResponse.json({ error: "Missing text or conversationId" }, { status: 400 });
        }

        const parsedConvoId = parseInt(conversationId);
        await createMessage(text, "user", parsedConvoId);

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "liquid/lfm-2.5-1.2b-thinking:free",
                messages: [{ role: "user", content: text }]
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Openrouter API error", errorData);
            return NextResponse.json({ error: "AI provider error" }, { status: 500 });
        }

        const data = await response.json();
        if (data.choices && data.choices[0]?.message) {
            const aiTxt = data.choices[0].message.content;

            const aiMsg = await createMessage(aiTxt, "ai", parsedConvoId);
            revalidatePath(`/UI_components/${parsedConvoId}`);

            return NextResponse.json({
                id: aiMsg.id,
                text: aiMsg.content,
                sender: aiMsg.role,
                createdAt: aiMsg.createdAt
            });
        } else {
            console.error("Unexpected AI response", data);
            return NextResponse.json({ error: "Empty AI response" }, { status: 500 });
        }
    } catch (error) {
        console.error("Post message error", error);
        return NextResponse.json({ error: "Failed to process message" }, { status: 500 });
    }
}
