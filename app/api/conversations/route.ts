import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const conversations =
      await prisma.conversation.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    return Response.json(conversations);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load conversations",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const conversation =
      await prisma.conversation.create({
        data: {
          title: body.title || "New Chat",
        },
      });

    return Response.json(conversation);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to create conversation",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } =
      new URL(req.url);

    const id =
      Number(searchParams.get("id"));

    if (!id) {
      return Response.json(
        {
          error: "Conversation ID is required",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.chat.deleteMany({
      where: {
        conversationId: id,
      },
    });

    await prisma.conversation.delete({
      where: {
        id,
      },
    });

    return Response.json({
      success: true,
    });
  } catch (error) {
    return Response.json(
      {
        error: "Failed to delete conversation",
      },
      {
        status: 500,
      }
    );
  }
}