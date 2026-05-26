import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.chat.deleteMany();

    await prisma.conversation.deleteMany();

    return Response.json({
      success: true,
      message: "All conversations deleted",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Failed to clear conversations",
      },
      {
        status: 500,
      }
    );
  }
}