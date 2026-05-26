"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import ParticlesBackground from "@/components/ParticlesBackground";
import Chatbot from "@/components/Chatbot";
import Sidebar from "@/components/Sidebar";

type DashboardStats = {
  totalMessages: number;
  totalConversations: number;
  userMessages: number;
  aiMessages: number;
  realtimeStatus: string;
  aiTools: number;
};

type AuthUser = {
  id: number;
  name: string | null;
  email: string;
};

export default function Home() {
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats | null>(null);

  const [showLoginModal, setShowLoginModal] =
    useState(false);

  const [authMode, setAuthMode] =
    useState<"login" | "register">("login");

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] =
    useState(false);

  const [authUser, setAuthUser] =
    useState<AuthUser | null>(null);

  const [authName, setAuthName] =
    useState("");

  const [authEmail, setAuthEmail] =
    useState("");

  const [authPassword, setAuthPassword] =
    useState("");

  const [authConfirmPassword, setAuthConfirmPassword] =
    useState("");

  const [authLoading, setAuthLoading] =
    useState(false);

  const [authError, setAuthError] =
    useState("");

  const navLinks = [
    {
      name: "Home",
      href: "#home",
    },
    {
      name: "Features",
      href: "#features",
    },
    {
      name: "Dashboard",
      href: "#dashboard",
    },
    {
      name: "Pricing",
      href: "#pricing",
    },
    {
      name: "Chatbot",
      href: "#chatbot",
    },
  ];

  const tools = [
    {
      icon: "🤖",
      title: "AI Chatbot",
      desc: "Asisten AI pintar untuk menjawab realtime.",
      mode: "chatbot",
    },
    {
      icon: "✨",
      title: "AI Generator",
      desc: "Buat ide konten otomatis menggunakan AI.",
      mode: "generator",
    },
    {
      icon: "📚",
      title: "AI Summary",
      desc: "Ringkas materi panjang dengan cepat.",
      mode: "summary",
    },
    {
      icon: "📅",
      title: "AI Scheduler",
      desc: "Susun jadwal otomatis dengan AI.",
      mode: "scheduler",
    },
  ];

  const stats = [
    [
      dashboardStats ? `${dashboardStats.userMessages}` : "0",
      "User Requests",
    ],
    [
      dashboardStats ? `${dashboardStats.totalConversations}` : "0",
      "Conversations",
    ],
    [
      dashboardStats ? dashboardStats.realtimeStatus : "24/7",
      "Realtime",
    ],
    [
      dashboardStats ? `${dashboardStats.aiTools}` : "4",
      "AI Tools",
    ],
  ];

  const floatingCards = [
    {
      icon: "⚡",
      title: "Ultra Fast",
      desc: "AI response under 1 second.",
      border: "border-cyan-400/20",
      hover: "hover:border-cyan-400",
      bg: "bg-cyan-500/20",
      text: "text-cyan-400",
    },
    {
      icon: "🧠",
      title: "Smart AI",
      desc: "Advanced intelligent assistant.",
      border: "border-purple-400/20",
      hover: "hover:border-purple-400",
      bg: "bg-purple-500/20",
      text: "text-purple-400",
    },
    {
      icon: "🔒",
      title: "Secure System",
      desc: "Modern encrypted AI platform.",
      border: "border-pink-400/20",
      hover: "hover:border-pink-400",
      bg: "bg-pink-500/20",
      text: "text-pink-400",
    },
  ];

  const brands = [
    "OpenAI",
    "Google",
    "Microsoft",
    "Tesla",
    "Meta",
    "Netflix",
    "Amazon",
    "Spotify",
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      text: "NoerAI membantu saya coding lebih cepat dan efisien.",
    },
    {
      name: "Sarah Kim",
      role: "Content Creator",
      text: "AI Generator sangat membantu membuat ide konten viral.",
    },
    {
      name: "Michael Lee",
      role: "Startup Founder",
      text: "Desain futuristik dan AI realtime yang sangat powerful.",
    },
  ];

  const pricingPlans = [
    {
      title: "Starter",
      price: "$9",
      plan: "starter",
      glow: "bg-cyan-500/10",
      features: [
        "Basic AI Chatbot",
        "10 AI Requests/day",
        "Fast Response",
        "Community Support",
      ],
    },
    {
      title: "Pro AI",
      price: "$29",
      plan: "pro",
      glow: "bg-purple-500/10",
      features: [
        "Unlimited AI Chat",
        "AI Generator",
        "Realtime Analytics",
        "Priority Support",
      ],
    },
    {
      title: "Enterprise",
      price: "$99",
      plan: "enterprise",
      glow: "bg-pink-500/10",
      features: [
        "All AI Features",
        "Advanced Automation",
        "Cloud AI System",
        "24/7 Dedicated Support",
      ],
    },
  ];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/stats");

        if (!res.ok) {
          return;
        }

        const data: DashboardStats = await res.json();

        setDashboardStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStats();

    const refreshStats = () => {
      loadStats();
    };

    window.addEventListener(
      "refresh-conversations",
      refreshStats
    );

    return () => {
      window.removeEventListener(
        "refresh-conversations",
        refreshStats
      );
    };
  }, []);

  useEffect(() => {
    const loadAuthUser = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) {
          return;
        }

        const data = await res.json();

        setAuthUser(data.user || null);
      } catch (error) {
        console.log(error);
      }
    };

    loadAuthUser();
  }, []);

  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById("chatbot");

    if (chatbotSection) {
      chatbotSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const openAiTool = (mode: string) => {
    window.dispatchEvent(
      new CustomEvent("change-ai-mode", {
        detail: {
          mode,
        },
      })
    );

    scrollToChatbot();
  };

  const choosePlan = (plan: string) => {
    window.dispatchEvent(
      new CustomEvent("select-pricing-plan", {
        detail: {
          plan,
        },
      })
    );

    scrollToChatbot();
  };

  const resetAuthForm = () => {
    setAuthName("");
    setAuthEmail("");
    setAuthPassword("");
    setAuthConfirmPassword("");
    setAuthError("");
  };

  const openAuthModal = () => {
    resetAuthForm();
    setAuthMode("login");
    setShowLoginModal(true);
  };

  const closeAuthModal = () => {
    setShowLoginModal(false);
    setAuthLoading(false);
    resetAuthForm();
  };

  const handleAuthSubmit = async () => {
    setAuthError("");

    if (!authEmail || !authPassword) {
      setAuthError("Email dan password wajib diisi.");
      return;
    }

    if (authMode === "register") {
      if (authPassword.length < 6) {
        setAuthError("Password minimal 6 karakter.");
        return;
      }

      if (authPassword !== authConfirmPassword) {
        setAuthError("Confirm password tidak sama.");
        return;
      }
    }

    setAuthLoading(true);

    try {
      const endpoint =
        authMode === "login"
          ? "/api/auth/login"
          : "/api/auth/register";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: authName,
          email: authEmail,
          password: authPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || "Login/Register gagal.");
        return;
      }

      setAuthUser(data.user || null);
      setShowLoginModal(false);
      resetAuthForm();

      window.dispatchEvent(new CustomEvent("new-chat"));
      window.dispatchEvent(new CustomEvent("refresh-conversations"));
    } catch (error) {
      console.log(error);
      setAuthError("Terjadi kesalahan koneksi.");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      setAuthUser(null);

      window.dispatchEvent(new CustomEvent("new-chat"));
      window.dispatchEvent(
        new CustomEvent("refresh-conversations")
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen w-full bg-black text-white flex overflow-x-hidden relative">
      <ParticlesBackground />

      {/* Glow Effects */}
      <motion.div
        animate={{
          y: [0, 40, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-0 left-0 w-[300px] sm:w-[420px] md:w-[500px] h-[300px] sm:h-[420px] md:h-[500px] bg-cyan-500/20 blur-[100px] md:blur-[120px] rounded-full"
      />

      <motion.div
        animate={{
          y: [0, -40, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 w-[300px] sm:w-[420px] md:w-[500px] h-[300px] sm:h-[420px] md:h-[500px] bg-purple-500/20 blur-[100px] md:blur-[120px] rounded-full"
      />

      {/* Desktop Sidebar */}
      <div className="relative z-20 hidden md:block shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sidebar
          isMobileOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />
      </div>

      <div className="flex-1 min-w-0 relative z-10 overflow-y-auto overflow-x-hidden h-screen">
        {/* Navbar */}
        <nav className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 md:px-8 py-5 md:py-6 border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden w-11 h-11 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 hover:border-cyan-400 transition"
            >
              <Menu size={22} />
            </button>

            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text truncate">
                NoerAI
              </h1>

              <p className="hidden sm:block text-xs text-gray-500 mt-1 truncate">
                Futuristic Artificial Intelligence
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 text-gray-300">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover:text-cyan-400 transition"
              >
                {item.name}
              </a>
            ))}
          </div>

          {authUser ? (
            <button
              type="button"
              onClick={handleLogout}
              className="shrink-0 px-4 md:px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-red-400 text-gray-200 hover:text-red-300 text-sm md:text-base font-semibold transition duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              type="button"
              onClick={openAuthModal}
              className="shrink-0 px-4 md:px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black text-sm md:text-base font-semibold transition duration-300 shadow-lg shadow-cyan-500/30"
            >
              Login
            </button>
          )}
        </nav>

        {/* Hero */}
        <motion.section
          id="home"
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="w-full px-4 sm:px-6 pt-20 md:pt-24 pb-16 md:pb-20 text-center"
        >
          {authUser && (
            <div className="mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-300">
              <span className="truncate">
                Welcome, {authUser.name || authUser.email}
              </span>
            </div>
          )}

          <p className="uppercase tracking-[4px] sm:tracking-[6px] md:tracking-[8px] text-cyan-400 text-xs sm:text-sm break-words">
            FUTURISTIC AI PLATFORM
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mt-6 break-words">
            Build The Future

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text break-words">
              With Artificial Intelligence
            </span>
          </h2>

          <p className="mt-8 text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed break-words">
            Website AI modern dengan desain cyberpunk futuristik untuk chatbot,
            automation, AI tools, dan produktivitas digital.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a
              href="#chatbot"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30"
            >
              Launch AI
            </a>

            <a
              href="#features"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition"
            >
              Explore More
            </a>
          </div>
        </motion.section>

        {/* Floating Cards */}
        <section className="w-full px-4 sm:px-6 md:px-8 py-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {floatingCards.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5 + index * 0.2,
                }}
                className={`w-full min-w-0 bg-white/5 border ${item.border} ${item.hover} rounded-3xl p-5 md:p-6 backdrop-blur-xl transition overflow-hidden`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-14 h-14 shrink-0 rounded-2xl ${item.bg} flex items-center justify-center text-3xl`}
                  >
                    {item.icon}
                  </div>

                  <div className="min-w-0">
                    <h3
                      className={`text-xl md:text-2xl font-bold ${item.text} break-words`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1 break-words">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section
          id="features"
          className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-7xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <p className="uppercase tracking-[4px] sm:tracking-[6px] text-cyan-400 text-xs sm:text-sm">
              AI FEATURES
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 break-words">
              Powerful AI Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
            {tools.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="w-full min-w-0 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 overflow-hidden"
              >
                <div className="text-4xl md:text-5xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-4 break-words">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed break-words">
                  {item.desc}
                </p>

                <button
                  type="button"
                  onClick={() => openAiTool(item.mode)}
                  className="inline-block mt-6 text-cyan-400 font-semibold"
                >
                  Try Now →
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dashboard */}
        <section
          id="dashboard"
          className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="min-w-0"
            >
              <p className="uppercase tracking-[4px] sm:tracking-[6px] text-cyan-400 text-xs sm:text-sm">
                NEXT GENERATION AI
              </p>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mt-6 break-words">
                Experience Smart

                <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  Artificial Intelligence
                </span>
              </h2>

              <p className="mt-8 text-gray-400 leading-relaxed text-base sm:text-lg break-words">
                NoerAI membantu coding, belajar, automation, content creation,
                dan produktivitas digital menggunakan AI modern realtime.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="#chatbot"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30"
                >
                  Get Started
                </a>

                <a
                  href="#features"
                  className="w-full sm:w-auto text-center px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition"
                >
                  Learn More
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.8,
              }}
              className="relative min-w-0"
            >
              <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />

              <div className="relative w-full min-w-0 bg-white/5 border border-white/10 rounded-[28px] md:rounded-[40px] backdrop-blur-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold break-words">
                      AI Dashboard
                    </h3>

                    <p className="text-gray-500 text-sm mt-1 break-words">
                      Realtime AI Analytics
                    </p>
                  </div>

                  <div className="w-4 h-4 shrink-0 bg-green-400 rounded-full animate-pulse" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {stats.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="min-w-0 bg-black/30 border border-white/10 rounded-3xl p-5 md:p-6 overflow-hidden"
                    >
                      <h4 className="text-2xl md:text-3xl font-black text-cyan-400 break-words">
                        {item[0]}
                      </h4>

                      <p className="text-gray-400 mt-2 break-words">
                        {item[1]}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="min-w-0 bg-black/30 border border-white/10 rounded-3xl p-5 overflow-hidden">
                    <p className="text-gray-400 text-sm break-words">
                      User Messages
                    </p>

                    <h4 className="text-2xl md:text-3xl font-black text-cyan-400 mt-2 break-words">
                      {dashboardStats?.userMessages || 0}
                    </h4>
                  </div>

                  <div className="min-w-0 bg-black/30 border border-white/10 rounded-3xl p-5 overflow-hidden">
                    <p className="text-gray-400 text-sm break-words">
                      AI Responses
                    </p>

                    <h4 className="text-2xl md:text-3xl font-black text-purple-400 mt-2 break-words">
                      {dashboardStats?.aiMessages || 0}
                    </h4>
                  </div>
                </div>

                <div className="mt-8 bg-black/30 border border-white/10 rounded-3xl p-5 overflow-hidden">
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-400 break-words">
                        AI Performance
                      </p>

                      <h4 className="text-xl sm:text-2xl font-bold mt-1 break-words">
                        Ultra Fast Response
                      </h4>
                    </div>

                    <div className="text-cyan-400 text-4xl shrink-0">
                      ⚡
                    </div>
                  </div>

                  <div className="mt-5 w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      whileInView={{
                        width: "90%",
                      }}
                      transition={{
                        duration: 1.5,
                      }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trusted Companies */}
        <section className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="uppercase tracking-[4px] sm:tracking-[6px] text-cyan-400 text-xs sm:text-sm">
              TRUSTED WORLDWIDE
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 break-words">
              Used By Modern Companies
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto break-words">
              NoerAI membantu developer, creator, startup, dan perusahaan
              modern meningkatkan produktivitas menggunakan AI.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{
                  scale: 1.05,
                }}
                className="min-w-0 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 text-center backdrop-blur-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300 overflow-hidden"
              >
                <h3 className="text-xl md:text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text break-words">
                  {brand}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <p className="uppercase tracking-[4px] sm:tracking-[6px] text-cyan-400 text-xs sm:text-sm">
              TESTIMONIALS
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 break-words">
              What People Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -10,
                }}
                className="min-w-0 bg-white/5 border border-white/10 rounded-[30px] p-6 md:p-8 backdrop-blur-xl hover:border-cyan-400 transition overflow-hidden"
              >
                <div className="flex items-center gap-4 mb-6 min-w-0">
                  <div className="w-14 h-14 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-black text-xl">
                    {item.name.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-lg break-words">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm break-words">
                      {item.role}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed break-words">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section
          id="pricing"
          className="w-full px-4 sm:px-6 md:px-8 py-20 md:py-24 max-w-7xl mx-auto"
        >
          <div className="text-center mb-12 md:mb-16">
            <p className="uppercase tracking-[4px] sm:tracking-[6px] text-cyan-400 text-xs sm:text-sm">
              PRICING PLAN
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-6 break-words">
              Choose Your AI Plan
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto break-words">
              Gunakan fitur Artificial Intelligence modern sesuai kebutuhan
              produktivitas kamu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                }}
                whileHover={{
                  y: -10,
                }}
                className="relative min-w-0 bg-white/5 border border-white/10 rounded-[30px] md:rounded-[35px] p-6 md:p-8 backdrop-blur-xl hover:border-cyan-400 transition overflow-hidden"
              >
                <div className={`absolute inset-0 ${plan.glow} blur-[80px]`} />

                <div className="relative z-10 min-w-0">
                  <h3 className="text-2xl md:text-3xl font-black break-words">
                    {plan.title}
                  </h3>

                  <div className="mt-6 flex items-end gap-2 min-w-0">
                    <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text break-words">
                      {plan.price}
                    </h2>

                    <p className="text-gray-500 mb-2">
                      /month
                    </p>
                  </div>

                  <div className="mt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-gray-300 min-w-0"
                      >
                        <span className="text-cyan-400 shrink-0">
                          ✓
                        </span>

                        <p className="break-words">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => choosePlan(plan.plan)}
                    className="inline-block text-center mt-10 w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30"
                  >
                    Choose Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="chatbot">
          <Chatbot />
        </section>

        <footer className="border-t border-white/10 px-4 sm:px-6 md:px-8 py-8 text-center text-gray-500 mt-10">
          <p className="break-words">
            © 2026 NoerAI — Futuristic Artificial Intelligence Platform.
          </p>
        </footer>
      </div>

    {/* Login Modal */}
    {showLoginModal && (
      <div
        onClick={closeAuthModal}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-xl px-4 sm:px-6 overflow-y-auto"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          className="relative w-full max-w-md bg-black/80 border border-white/10 rounded-[28px] md:rounded-[35px] p-5 sm:p-6 md:p-8 shadow-2xl shadow-cyan-500/20 overflow-hidden my-10"
        >
          <button
            type="button"
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text break-words">
              {authMode === "login" ? "Login" : "Create Account"}
            </h2>

            <p className="text-gray-400 mt-3 break-words">
              {authMode === "login"
                ? "Masuk ke akun NoerAI kamu."
                : "Buat akun baru untuk NoerAI."}
            </p>
          </div>

          <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
              }}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                authMode === "login"
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
              }}
              className={`flex-1 py-3 rounded-xl font-bold transition ${
                authMode === "register"
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </button>
          </div>

          {authError && (
            <div className="mb-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-red-300 text-sm">
              {authError}
            </div>
          )}

          <div className="space-y-4">
            {authMode === "register" && (
              <input
                type="text"
                placeholder="Full name"
                value={authName}
                onChange={(e) => setAuthName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={authEmail}
              onChange={(e) => setAuthEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={authPassword}
              onChange={(e) => setAuthPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && authMode === "login") {
                  handleAuthSubmit();
                }
              }}
              className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
            />

            {authMode === "register" && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={authConfirmPassword}
                onChange={(e) =>
                  setAuthConfirmPassword(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAuthSubmit();
                  }
                }}
                className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition"
              />
            )}

            <button
              type="button"
              disabled={authLoading}
              onClick={handleAuthSubmit}
              className="w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black transition shadow-lg shadow-cyan-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {authLoading
                ? "Loading..."
                : authMode === "login"
                  ? "Login"
                  : "Register"}
            </button>

            <button
              type="button"
              onClick={() =>
                alert(
                  "Google Login akan kita aktifkan setelah login email/password stabil."
                )
              }
              className="w-full py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 font-bold transition"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6 break-words">
            NoerAI secure futuristic authentication.
          </p>
        </motion.div>
      </div>
    )}
    </main>
  );
}