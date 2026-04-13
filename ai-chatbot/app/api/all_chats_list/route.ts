import { NextResponse } from "next/server";
import { getConversations, createConversation, deleteConversation } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const conversations = await getConversations();
  return NextResponse.json(conversations);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const title = body.title || "New Chat"; 
    
    const newConversation = await createConversation(title);
    
    revalidatePath("/"); 
    return NextResponse.json(newConversation);
  } catch (error) {
    console.error("Create conversation error", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "Missing conversation id" }, { status: 400 });
    }

    await deleteConversation(parseInt(id));
    
    revalidatePath("/");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete conversation error", error);
    return NextResponse.json({ error: "Failed to delete conversation" }, { status: 500 });
  }
}