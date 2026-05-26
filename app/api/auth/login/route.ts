import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email = body.email?.trim().toLowerCase();
    const password = body.password;

    if (!email || !password) {
      return Response.json(
        {
          error: "Email dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json(
        {
          error: "Email atau password salah.",
        },
        {
          status: 401,
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return Response.json(
        {
          error: "Email atau password salah.",
        },
        {
          status: 401,
        }
      );
    }

    const token = await createAuthToken({
      userId: user.id,
      email: user.email,
    });

    const cookieStore = await cookies();

    cookieStore.set("noer_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return Response.json(
      {
        error: "Login gagal.",
      },
      {
        status: 500,
      }
    );
  }
}