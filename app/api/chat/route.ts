import OpenAI from "openai";

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    if (!body.message) {

      return Response.json({
        reply: "Message is empty.",
      });

    }

    const completion =
      await groq.chat.completions.create({

        model: "llama-3.3-70b-versatile",

        messages: [

          {
            role: "system",
            content:
              "You are NoerAI, futuristic AI assistant with cyberpunk style."
          },

          {
            role: "user",
            content: body.message,
          },

        ],

        temperature: 0.7,

        max_tokens: 1000,

      });

    return Response.json({
      reply:
        completion.choices[0].message.content,
    });

  } catch (error) {

    console.log(error);

    return Response.json({
      reply:
        "Sorry, AI server error.",
    });

  }

}