import { NextResponse } from "next/server";
import { getConversations, createConversation, deleteConversation } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const conversations = await getConversations();
  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  const { title } = await request.json();
  const newConversation = await createConversation(title);
  revalidatePath("/", "layout");
  return NextResponse.json(newConversation);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing conversation id" }, { status: 400 });
  }

  try {
    await deleteConversation(parseInt(id));
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true });
  }

  catch (error) {
    console.error("Delete conversation error", error);
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}