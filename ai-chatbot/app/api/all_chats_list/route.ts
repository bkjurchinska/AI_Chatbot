import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//mock database
// let conversations = [
//     {id: "session-1", title: "Current Session"},
//     {id: "session-2", title: "Data Analysis #4"},
// ];

export async function GET() {
  const conversations = await prisma.conversation.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const { title } = await request.json();

  const newConversation = await prisma.conversation.create({
    data: {
      title: title || "New Chat",
    }
  });

  return NextResponse.json(newConversation);
}