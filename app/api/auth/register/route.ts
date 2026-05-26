import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { createAuthToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    if (!email || !password) {
      return Response.json(
        {
          success: false,
          error: "Email dan password wajib diisi.",
        },
        {
          status: 400,
        }
      );
    }

    if (!email.includes("@")) {
      return Response.json(
        {
          success: false,
          error: "Format email tidak valid.",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          error: "Password minimal 6 karakter.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          error: "Email sudah terdaftar.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name || null,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

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
      message: "Register berhasil.",
      user,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return Response.json(
      {
        success: false,
        error:
          "Register gagal. Cek database, environment variable, atau Prisma di server.",
      },
      {
        status: 500,
      }
    );
  }
}