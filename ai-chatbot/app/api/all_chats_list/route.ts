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

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing conversation id" }, { status: 400 });
  }

  try {
    await prisma.conversation.delete({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete conversation error", error);
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}