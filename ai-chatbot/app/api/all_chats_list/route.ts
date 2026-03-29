import { NextResponse } from "next/server";

//mock database
let conversations = [
    {id: "session-1", title: "Current Session"},
    {id: "session-2", title: "Data Analysis #4"},
];

export async function getConversation() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return NextResponse.json(conversations);
}

export async function createConversation(request: Request) {
    const {title} = await request.json();

    const newConversation = {id: `session-${Date.now()}`, 
    title: title || "New Chat"};

    conversations.push(newConversation);
    return NextResponse.json(newConversation);
}