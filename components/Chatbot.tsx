"use client";

import {
  useState,
  useRef,
  useEffect,
} from "react";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

type Message = {
  role: "user" | "ai";
  text: string;
};

type AiMode =
  | "chatbot"
  | "generator"
  | "summary"
  | "scheduler";

type PricingPlan =
  | "starter"
  | "pro"
  | "enterprise";

const modeData = {
  chatbot: {
    title: "NoerAI Chatbot",
    placeholder: "Ask futuristic AI...",
    intro: "Hello 👋 I am NoerAI. How can I help you today?",
    description:
      "Futuristic AI Assistant powered with cyberpunk interface.",
  },

  generator: {
    title: "AI Generator",
    placeholder: "Contoh: buatkan caption promosi produk...",
    intro:
      "✨ Mode AI Generator aktif. Saya bisa membantu membuat ide konten, caption, artikel, slogan, dan teks kreatif.",
    description:
      "Generate creative content, captions, ideas, and writing instantly.",
  },

  summary: {
    title: "AI Summary",
    placeholder: "Tempel materi panjang yang ingin diringkas...",
    intro:
      "📚 Mode AI Summary aktif. Tempel teks panjang, nanti saya ringkas menjadi poin penting.",
    description:
      "Summarize long materials into clear and simple key points.",
  },

  scheduler: {
    title: "AI Scheduler",
    placeholder: "Contoh: buat jadwal belajar 7 hari...",
    intro:
      "📅 Mode AI Scheduler aktif. Saya bisa membantu membuat jadwal belajar, kerja, atau deadline tugas.",
    description:
      "Create smart schedules, study plans, and productivity timelines.",
  },
};

const pricingData = {
  starter: {
    message:
      "🚀 **Starter Plan** dipilih.\n\nPaket ini cocok untuk pengguna personal yang ingin mencoba fitur AI dasar seperti chatbot, bantuan belajar, dan ringkasan sederhana.\n\n**Fitur utama:**\n- Basic AI Chatbot\n- 10 AI Requests/day\n- Fast Response\n- Community Support",
  },

  pro: {
    message:
      "⚡ **Pro AI Plan** dipilih.\n\nPaket ini cocok untuk pengguna aktif yang butuh fitur AI lebih lengkap untuk produktivitas harian.\n\n**Fitur utama:**\n- Unlimited AI Chat\n- AI Generator\n- Realtime Analytics\n- Priority Support",
  },

  enterprise: {
    message:
      "🏢 **Enterprise Plan** dipilih.\n\nPaket ini cocok untuk tim, bisnis, atau perusahaan yang membutuhkan sistem AI lengkap dan dukungan prioritas.\n\n**Fitur utama:**\n- All AI Features\n- Advanced Automation\n- Cloud AI System\n- 24/7 Dedicated Support",
  },
};

export default function Chatbot() {
  const [aiMode, setAiMode] =
    useState<AiMode>("chatbot");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "ai",
        text: modeData.chatbot.intro,
      },
    ]);

  const [input, setInput] =
    useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const [conversationId, setConversationId] =
    useState<number | null>(null);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const getDefaultMessage = (
    mode: AiMode
  ): Message[] => [
    {
      role: "ai",
      text: modeData[mode].intro,
    },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleNewChat = () => {
      setConversationId(null);
      setMessages(getDefaultMessage(aiMode));
      setInput("");
      setIsTyping(false);
    };

    const handleChangeAiMode = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          mode: AiMode;
        }>;

      const selectedMode =
        customEvent.detail.mode;

      setAiMode(selectedMode);
      setConversationId(null);
      setInput("");
      setIsTyping(false);

      setMessages(
        getDefaultMessage(selectedMode)
      );
    };

    const handleSelectPricingPlan = (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          plan: PricingPlan;
        }>;

      const selectedPlan =
        customEvent.detail.plan;

      setAiMode("chatbot");
      setConversationId(null);
      setInput("");
      setIsTyping(false);

      setMessages([
        {
          role: "ai",
          text: pricingData[selectedPlan].message,
        },
      ]);
    };

    const handleOpenConversation = async (
      event: Event
    ) => {
      const customEvent =
        event as CustomEvent<{
          conversationId: number;
        }>;

      const id =
        customEvent.detail.conversationId;

      try {
        const res = await fetch(
          `/api/conversations/${id}`
        );

        if (!res.ok) return;

        const data = await res.json();

        const loadedMessages: Message[] =
          data.chats.map(
            (chat: {
              role: string;
              message: string;
            }) => ({
              role:
                chat.role === "user"
                  ? "user"
                  : "ai",
              text: chat.message,
            })
          );

        setConversationId(id);

        setMessages(
          loadedMessages.length > 0
            ? loadedMessages
            : getDefaultMessage(aiMode)
        );
      } catch (error) {
        console.log(error);
      }
    };

    window.addEventListener(
      "new-chat",
      handleNewChat
    );

    window.addEventListener(
      "open-conversation",
      handleOpenConversation
    );

    window.addEventListener(
      "change-ai-mode",
      handleChangeAiMode
    );

    window.addEventListener(
      "select-pricing-plan",
      handleSelectPricingPlan
    );

    return () => {
      window.removeEventListener(
        "new-chat",
        handleNewChat
      );

      window.removeEventListener(
        "open-conversation",
        handleOpenConversation
      );

      window.removeEventListener(
        "change-ai-mode",
        handleChangeAiMode
      );

      window.removeEventListener(
        "select-pricing-plan",
        handleSelectPricingPlan
      );
    };
  }, [aiMode]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      role: "user",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    const currentInput = input;

    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: currentInput,
          conversationId,
          mode: aiMode,
        }),
      });

      const data = await res.json();

      if (data.conversationId) {
        setConversationId(data.conversationId);

        window.dispatchEvent(
          new CustomEvent(
            "refresh-conversations"
          )
        );
      }

      setIsTyping(false);

      let currentText = "";

      const words = String(
        data.reply || ""
      ).split(" ");

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "",
        },
      ]);

      for (
        let i = 0;
        i < words.length;
        i++
      ) {
        currentText += words[i] + " ";

        await new Promise((resolve) =>
          setTimeout(resolve, 25)
        );

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "ai",
            text: currentText,
          };

          return updated;
        });
      }
    } catch (error) {
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Error connecting to AI.",
        },
      ]);
    }
  };

  return (
    <section className="relative z-10 px-6 pb-24">
      <div className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-2xl p-8 shadow-2xl shadow-cyan-500/10">

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            {modeData[aiMode].title}
          </h2>

          <p className="text-gray-400 mt-4">
            {modeData[aiMode].description}
          </p>
        </div>

        {/* Chat Area */}
        <div className="h-[500px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/30">

          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className={`max-w-[85%] p-5 rounded-3xl overflow-hidden ${
                msg.role === "user"
                  ? "ml-auto bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                  : "bg-gradient-to-br from-white/10 to-cyan-500/5 text-white border border-cyan-400/20 shadow-lg shadow-cyan-500/10"
              }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-cyan-400 mb-4">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-cyan-300 mb-3">
                      {children}
                    </h2>
                  ),

                  p: ({ children }) => (
                    <p className="leading-8 text-gray-200">
                      {children}
                    </p>
                  ),

                  li: ({ children }) => (
                    <li className="ml-5 list-disc py-1">
                      {children}
                    </li>
                  ),

                  code(props) {
                    const {
                      children,
                      className,
                    } = props;

                    const match =
                      /language-(\w+)/.exec(
                        className || ""
                      );

                    return match ? (
                      <div className="relative my-5">
                        <button
                          type="button"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              String(children)
                            )
                          }
                          className="absolute top-3 right-3 z-10 bg-cyan-500 hover:bg-cyan-400 text-black text-xs px-3 py-1 rounded-lg font-bold transition"
                        >
                          Copy
                        </button>

                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            borderRadius: "18px",
                            padding: "22px",
                            background: "#0f172a",
                            fontSize: "14px",
                          }}
                        >
                          {String(children).replace(
                            /\n$/,
                            ""
                          )}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code className="bg-black/50 text-cyan-300 px-2 py-1 rounded-md">
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </motion.div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              className="flex items-center gap-3 bg-white/10 border border-cyan-400/20 w-fit px-5 py-4 rounded-2xl backdrop-blur-xl"
            >
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />

                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />

                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>

              <p className="text-cyan-400 text-sm">
                NoerAI is thinking...
              </p>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="flex gap-4 mt-8">
          <input
            type="text"
            placeholder={
              modeData[aiMode].placeholder
            }
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
          />

          <button
            type="button"
            disabled={isTyping}
            onClick={sendMessage}
            className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50"
          >
            {isTyping ? "Thinking..." : "Send"}
          </button>
        </div>
      </div>
    </section>
  );
}