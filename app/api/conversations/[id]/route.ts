import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const params = await context.params;

    const id = Number(params.id);

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

    const conversation =
      await prisma.conversation.findUnique({
        where: {
          id,
        },
        include: {
          chats: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

    if (!conversation) {
      return Response.json(
        {
          error: "Conversation not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(conversation);
  } catch (error) {
    return Response.json(
      {
        error: "Failed to load conversation",
      },
      {
        status: 500,
      }
    );
  }
}