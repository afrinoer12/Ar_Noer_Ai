"use client";

import {
  useState,
  useRef,
  useEffect
} from "react";

import { motion } from "framer-motion";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import { Prism as SyntaxHighlighter }
from "react-syntax-highlighter";

import { oneDark }
from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Chatbot() {

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello 👋 I am NoerAI. How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");

  const [isTyping, setIsTyping] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, isTyping]);

  const sendMessage = async () => {

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      text: input
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    const currentInput = input;

    setInput("");

    setIsTyping(true);

    try {

      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          message: currentInput,
        }),
      });

      const data = await res.json();

      setIsTyping(false);

      let currentText = "";

      const words =
        data.reply.split(" ");

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

        currentText +=
          words[i] + " ";

        await new Promise((resolve) =>
          setTimeout(resolve, 25)
        );

        setMessages((prev) => {

          const updated = [...prev];

          updated[
            updated.length - 1
          ] = {
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
          text:
            "❌ Error connecting to AI.",
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

            NoerAI Chatbot

          </h2>

          <p className="text-gray-400 mt-4">

            Futuristic AI Assistant powered
            with cyberpunk interface.

          </p>

        </div>

        {/* Chat Area */}
        <div className="h-[500px] overflow-y-auto pr-2 space-y-5 scrollbar-thin scrollbar-thumb-cyan-500/30">

          {messages.map((msg, index) => (

            <motion.div
              key={index}

              initial={{
                opacity: 0,
                y: 20
              }}

              animate={{
                opacity: 1,
                y: 0
              }}

              transition={{
                duration: 0.3
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
                      className
                    } = props;

                    const match =
                      /language-(\w+)/.exec(
                        className || ""
                      );

                    return match ? (

                      <div className="relative my-5">

                        {/* Copy Button */}
                        <button
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

                          {String(children).replace(/\n$/, "")}

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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}

              className="flex items-center gap-3 bg-white/10 border border-cyan-400/20 w-fit px-5 py-4 rounded-2xl backdrop-blur-xl"
            >

              <div className="flex gap-1">

                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>

                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>

                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>

              </div>

              <p className="text-cyan-400 text-sm">

                NoerAI is thinking...

              </p>

            </motion.div>

          )}

          {/* Auto Scroll */}
          <div ref={messagesEndRef} />

        </div>

        {/* Input Area */}
        <div className="flex gap-4 mt-8">

          <input
            type="text"

            placeholder="Ask futuristic AI..."

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
            disabled={isTyping}

            onClick={sendMessage}

            className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30 disabled:opacity-50"
          >

            {isTyping
              ? "Thinking..."
              : "Send"}

          </button>

        </div>

      </div>

    </section>
  );
}