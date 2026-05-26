import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const totalMessages = await prisma.chat.count();

    const totalConversations =
      await prisma.conversation.count();

    const userMessages = await prisma.chat.count({
      where: {
        role: "user",
      },
    });

    const aiMessages = await prisma.chat.count({
      where: {
        role: "assistant",
      },
    });

    return Response.json({
      totalMessages,
      totalConversations,
      userMessages,
      aiMessages,
      realtimeStatus: "24/7",
      aiTools: 4,
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Failed to load stats",
      },
      {
        status: 500,
      }
    );
  }
}