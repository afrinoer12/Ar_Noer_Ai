import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return Response.json(
        {
          reply:
            "GROQ_API_KEY belum diatur di Vercel Environment Variables.",
        },
        {
          status: 500,
        }
      );
    }

    const groq = new OpenAI({
      apiKey,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const body = await req.json();

    const message = String(body.message || "");
    const mode = body.mode || "chatbot";

    if (!message.trim()) {
      return Response.json({
        reply: "Message is empty.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: getSystemPrompt(mode),
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const aiReply =
      completion.choices[0].message.content ||
      "Maaf, NoerAI belum bisa menjawab saat ini.";

    return Response.json({
      reply: aiReply,
      conversationId: null,
      saved: false,
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