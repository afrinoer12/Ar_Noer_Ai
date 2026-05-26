"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Plus,
  MessageSquare,
  Trash2,
  Sparkles,
  Settings,
  Bot,
  Crown,
  Search,
  X,
} from "lucide-react";

type Conversation = {
  id: number;
  title: string;
  createdAt: string;
};

type SidebarProps = {
  isMobileOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  isMobileOpen = false,
  onClose,
}: SidebarProps) {
  const [chats, setChats] = useState<Conversation[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById("chatbot");

    if (chatbotSection) {
      chatbotSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const closeMobileSidebar = () => {
    if (onClose) {
      onClose();
    }
  };

  const loadChats = async () => {
    try {
      const res = await fetch("/api/conversations");

      if (!res.ok) {
        return;
      }

      const data: Conversation[] = await res.json();

      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadChats();
    }, 0);

    const refreshSidebar = () => {
      loadChats();
    };

    window.addEventListener(
      "refresh-conversations",
      refreshSidebar
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "refresh-conversations",
        refreshSidebar
      );
    };
  }, []);

  const createNewChat = () => {
    setActiveChatId(null);

    window.dispatchEvent(new CustomEvent("new-chat"));

    scrollToChatbot();
    closeMobileSidebar();
  };

  const deleteChat = async (id: number) => {
    try {
      const res = await fetch(`/api/conversations?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Failed to delete chat");
        return;
      }

      setChats((prev) =>
        prev.filter((chat) => chat.id !== id)
      );

      window.dispatchEvent(
        new CustomEvent("refresh-conversations")
      );

      if (activeChatId === id) {
        setActiveChatId(null);
        window.dispatchEvent(new CustomEvent("new-chat"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearAllChats = async () => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus semua riwayat chat?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch("/api/conversations/clear", {
        method: "DELETE",
      });

      if (!res.ok) {
        console.log("Failed to clear chats");
        return;
      }

      setChats([]);
      setActiveChatId(null);
      setSearchQuery("");

      window.dispatchEvent(new CustomEvent("new-chat"));
      window.dispatchEvent(
        new CustomEvent("refresh-conversations")
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openChat = (id: number) => {
    setActiveChatId(id);

    window.dispatchEvent(
      new CustomEvent("open-conversation", {
        detail: {
          conversationId: id,
        },
      })
    );

    scrollToChatbot();
    closeMobileSidebar();
  };

  const filteredChats = chats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSidebarContent = () => (
    <>
      {/* Glow */}
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full" />

      {/* Header */}
      <div className="relative z-10 p-6 border-b border-white/10">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <Bot size={30} className="text-black" />
              </div>

              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  NoerAI
                </h1>

                <p className="text-gray-500 text-sm mt-1">
                  Futuristic AI Assistant
                </p>
              </div>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="md:hidden w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 transition"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        <motion.button
          type="button"
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={createNewChat}
          className="mt-8 w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30"
        >
          <Plus size={20} />
          New Chat
        </motion.button>
      </div>

      {/* Menu */}
      <div className="relative z-10 px-6 py-5 space-y-3">
        <a
          href="#features"
          onClick={closeMobileSidebar}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 transition duration-300"
        >
          <Sparkles size={18} className="text-cyan-400" />

          <span className="text-gray-300 font-medium">
            AI Tools
          </span>
        </a>

        <a
          href="#pricing"
          onClick={closeMobileSidebar}
          className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 transition duration-300"
        >
          <Settings size={18} className="text-cyan-400" />

          <span className="text-gray-300 font-medium">
            Pricing
          </span>
        </a>
      </div>

      {/* Chat History */}
      <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-6 custom-scrollbar">
        {/* Search */}
        <div className="relative mb-5">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition"
          />
        </div>

        <div className="flex items-center justify-between mb-5">
          <p className="text-gray-500 text-sm uppercase tracking-[3px]">
            Recent Chats
          </p>

          <div className="flex items-center gap-3">
            <span className="text-cyan-400 text-xs">
              {filteredChats.length} Chats
            </span>

            {chats.length > 0 && (
              <button
                type="button"
                onClick={clearAllChats}
                className="text-red-400 hover:text-red-300 text-xs font-semibold transition"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {filteredChats.length === 0 && (
            <p className="text-gray-500 text-sm">
              {searchQuery ? "Chat tidak ditemukan." : "Belum ada chat."}
            </p>
          )}

          {filteredChats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                x: 5,
              }}
              onClick={() => openChat(chat.id)}
              className={`group rounded-2xl p-4 cursor-pointer transition duration-300 border ${
                activeChatId === chat.id
                  ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 hover:bg-cyan-500/10 border-white/10 hover:border-cyan-400/30"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      activeChatId === chat.id
                        ? "bg-cyan-500/30"
                        : "bg-cyan-500/10"
                    }`}
                  >
                    <MessageSquare
                      size={18}
                      className="text-cyan-400"
                    />
                  </div>

                  <div className="overflow-hidden">
                    <p
                      className={`truncate font-medium ${
                        activeChatId === chat.id
                          ? "text-cyan-200"
                          : "text-gray-200"
                      }`}
                    >
                      {chat.title}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      AI Conversation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 p-6 border-t border-white/10">
        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/10 rounded-[30px] p-6 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Crown size={22} className="text-black" />
            </div>

            <div>
              <h3 className="font-bold text-lg">
                NoerAI Pro
              </h3>

              <p className="text-xs text-gray-400">
                Premium AI Experience
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            Unlock unlimited AI chats, faster responses,
            smart memory, and advanced AI tools.
          </p>

          <a
            href="#pricing"
            onClick={closeMobileSidebar}
            className="block text-center mt-5 w-full py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30"
          >
            Upgrade Now
          </a>
        </motion.div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-[320px] h-screen bg-black/40 border-r border-white/10 backdrop-blur-2xl relative overflow-hidden">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[998] md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.aside
            initial={{
              x: -320,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -320,
            }}
            transition={{
              duration: 0.3,
            }}
            className="relative z-10 flex flex-col w-[320px] max-w-[85vw] h-screen bg-black/90 border-r border-white/10 backdrop-blur-2xl overflow-hidden"
          >
            {renderSidebarContent()}
          </motion.aside>
        </div>
      )}
    </>
  );
}