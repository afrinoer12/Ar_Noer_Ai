"use client";

import { motion } from "framer-motion";

import {
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  const chats = [
    "AI Website",
    "Next.js Tutorial",
    "Cyberpunk Design",
    "Machine Learning",
    "Laravel Project",
  ];

  return (
    <aside className="w-[300px] h-screen border-r border-white/10 bg-black/40 backdrop-blur-2xl p-6 hidden md:flex flex-col relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

      {/* Logo */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        className="relative z-10"
      >

        <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">

          NoerAI

        </h1>

        <p className="text-gray-500 text-sm mt-2">

          Futuristic AI Assistant

        </p>

      </motion.div>

      {/* New Chat */}
      <motion.button
        whileHover={{
          scale: 1.03,
        }}

        whileTap={{
          scale: 0.97,
        }}

        className="relative z-10 mt-8 flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-2xl transition shadow-lg shadow-cyan-500/30"
      >

        <Plus size={20} />

        New Chat

      </motion.button>

      {/* Menu */}
      <div className="relative z-10 mt-10 space-y-3">

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 transition">

          <Sparkles
            size={18}
            className="text-cyan-400"
          />

          <span className="text-gray-300">

            AI Tools

          </span>

        </button>

        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 transition">

          <Settings
            size={18}
            className="text-cyan-400"
          />

          <span className="text-gray-300">

            Settings

          </span>

        </button>

      </div>

      {/* Chat History */}
      <div className="relative z-10 mt-10 flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">

        <p className="text-gray-500 text-sm mb-3">

          Recent Chats

        </p>

        {chats.map((chat, index) => (

          <motion.div
            key={index}

            initial={{
              opacity: 0,
              x: -20,
            }}

            animate={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              delay: index * 0.1,
            }}

            whileHover={{
              x: 5,
            }}

            className="group bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 rounded-2xl p-4 cursor-pointer transition"
          >

            <div className="flex items-center justify-between gap-3">

              <div className="flex items-center gap-3 overflow-hidden">

                <MessageSquare
                  size={16}
                  className="text-cyan-400 shrink-0"
                />

                <p className="text-gray-300 truncate">

                  {chat}

                </p>

              </div>

              <button className="opacity-0 group-hover:opacity-100 text-red-400 transition">

                <Trash2 size={16} />

              </button>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Bottom */}
      <div className="relative z-10 border-t border-white/10 pt-5">

        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-3xl p-5">

          <p className="text-sm text-gray-300 font-medium">

            🚀 NoerAI v2.0

          </p>

          <p className="text-xs text-gray-400 mt-2 leading-relaxed">

            Cyberpunk futuristic artificial intelligence platform powered by modern AI technology.

          </p>

          <button className="mt-4 w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition">

            Upgrade Pro

          </button>

        </div>

      </div>

    </aside>
  );
}