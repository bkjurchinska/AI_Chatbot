import prisma from "./prisma";

export async function getConversations() {
    return await prisma.conversation.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
}

export async function createConversation(title?: string) {
    return await prisma.conversation.create({
        data: {
            title: title || "New Chat",
        }
    });
}

export async function deleteConversation(id: number) {
    return await prisma.conversation.delete({
        where: {
            id,
        },
    });
}

export async function getMessages(conversationId: number) {
    return await prisma.message.findMany({
        where: {
            conversationId,
        },
        orderBy: {
            createdAt: 'asc',
        },
    });
}

export async function createMessage(content: string, role: string, conversationId: number) {
    return await prisma.message.create({
        data: {
            content,
            role,
            conversationId,
        },
    });
}
