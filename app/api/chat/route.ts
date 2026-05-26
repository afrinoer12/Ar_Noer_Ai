import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || "missing-api-key",
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        {
          reply:
            "GROQ_API_KEY belum diatur di Environment Variables.",
        },
        {
          status: 500,
        }
      );
    }

    const body = await req.json();

    const message = body.message;
    let conversationId = body.conversationId;
    const mode = body.mode || "chatbot";

    if (!message || message.trim() === "") {
      return Response.json({
        reply: "Message is empty.",
      });
    }

    if (!conversationId) {
      const newConversation =
        await prisma.conversation.create({
          data: {
            title: message.slice(0, 30),
          },
        });

      conversationId = newConversation.id;
    }

    await prisma.chat.create({
      data: {
        role: "user",
        message,
        conversationId,
      },
    });

    const history = await prisma.chat.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    const messages = history.map((chat) => ({
      role:
        chat.role === "user"
          ? ("user" as const)
          : ("assistant" as const),
      content: chat.message,
    }));

    const systemPrompt = `
You are NoerAI, an advanced futuristic AI assistant.

Current mode: ${mode}

Rules:
- Be friendly and helpful
- Answer clearly
- Use markdown when useful
- Help with coding, learning, productivity, and technology
- Do not be too dramatic
`;

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

    const aiReply =
      completion.choices[0].message.content || "";

    await prisma.chat.create({
      data: {
        role: "assistant",
        message: aiReply,
        conversationId,
      },
    });

    return Response.json({
      reply: aiReply,
      conversationId,
    });
  } catch (error) {
    console.log("CHAT API ERROR:", error);

    return Response.json(
      {
        reply: "API Error: " + String(error),
      },
      {
        status: 500,
      }
    );
  }
}