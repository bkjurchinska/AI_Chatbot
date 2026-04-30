import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";

//get messages for a spec session
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get("conversationId") || searchParams.get("userId"); // fallback for userId
    
    if (!conversationId) {
        return NextResponse.json({ error: "Missing conversationId" }, { status: 400 });
    }

    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: parseInt(conversationId),
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        
        // Map Prisma model to the frontend expected format if necessary
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

        // 1. Save user message
        const userMsg = await prisma.message.create({
            data: {
                content: text,
                role: "user",
                conversationId: parseInt(conversationId),
            },
        });

        // 2. Get AI response from OpenRouter
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
            
            // 3. Save AI message
            const aiMsg = await prisma.message.create({
                data: {
                    content: aiTxt,
                    role: "ai",
                    conversationId: parseInt(conversationId),
                },
            });

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
        console.error("No AI response", error);
        return NextResponse.json({ error: "AI failed" }, { status: 500 });
    }
}
