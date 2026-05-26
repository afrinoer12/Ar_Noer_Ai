import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const createTitle = (message: string) => {
  const cleanTitle = message
    .replace(/\s+/g, " ")
    .trim();

  if (cleanTitle.length > 35) {
    return cleanTitle.slice(0, 35) + "...";
  }

  return cleanTitle || "New Chat";
};

const getSystemPrompt = (mode: string) => {
  return `
You are NoerAI, an advanced futuristic AI assistant.

Current mode: ${mode}

Mode instructions:
- chatbot: Answer normally as a smart AI assistant.
- generator: Focus on creating captions, content ideas, slogans, articles, descriptions, and creative writing.
- summary: Summarize long text into short, clear, structured points.
- scheduler: Create schedules, study plans, timelines, task planning, and productivity plans.

Rules:
- Be friendly and helpful.
- Answer clearly.
- Use markdown when useful.
- Help with coding, learning, productivity, and technology.
- Do not be too dramatic.
- If the user speaks Indonesian, answer in Indonesian.
`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message;
    const mode = body.mode || "chatbot";

    let conversationId = body.conversationId;

    if (!message || message.trim() === "") {
      return Response.json({
        reply: "Message is empty.",
      });
    }

    // Jika belum ada conversation, buat baru
    if (!conversationId) {
      const newConversation = await prisma.conversation.create({
        data: {
          title: createTitle(message),
        },
      });

      conversationId = newConversation.id;
    }

    // Simpan pesan user ke database
    await prisma.chat.create({
      data: {
        role: "user",
        message,
        conversationId,
      },
    });

    // Ambil history chat dalam conversation ini
    const history = await prisma.chat.findMany({
      where: {
        conversationId,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Format history untuk AI
    const messages = history.map(
      (chat: {
        role: string;
        message: string;
      }) => ({
        role: chat.role as "user" | "assistant",
        content: chat.message,
      })
    );

    // Kirim ke Groq AI
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: getSystemPrompt(mode),
        },
        ...messages,
      ],

      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiReply =
      completion.choices[0].message.content || "";

    // Simpan jawaban AI ke database
    await prisma.chat.create({
      data: {
        role: "assistant",
        message: aiReply,
        conversationId,
      },
    });

    // Kirim balasan ke frontend
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