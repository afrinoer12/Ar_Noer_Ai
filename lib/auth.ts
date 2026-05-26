import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "fallback-secret-change-this"
);

export type AuthPayload = {
  userId: number;
  email: string;
};

export async function createAuthToken(payload: AuthPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function getAuthUser() {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("noer_token")?.value;

    if (!token) {
      return null;
    }

    const verified = await jwtVerify(token, secret);

    return verified.payload as AuthPayload;
  } catch (error) {
    return null;
  }
}