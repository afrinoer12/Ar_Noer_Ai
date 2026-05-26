import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  try {
    const authUser = await getAuthUser();

    if (!authUser) {
      return Response.json({
        user: null,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: authUser.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return Response.json({
      user,
    });
  } catch (error) {
    console.log("ME ERROR:", error);

    return Response.json(
      {
        user: null,
      },
      {
        status: 500,
      }
    );
  }
}