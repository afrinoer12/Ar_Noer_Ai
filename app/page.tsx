"use client";

import { motion } from "framer-motion";

import ParticlesBackground from "@/components/ParticlesBackground";
import Chatbot from "@/components/Chatbot";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const tools = [
    {
      icon: "🤖",
      title: "AI Chatbot",
      desc: "Asisten AI pintar untuk menjawab realtime.",
    },
    {
      icon: "✨",
      title: "AI Generator",
      desc: "Buat ide konten otomatis menggunakan AI.",
    },
    {
      icon: "📚",
      title: "AI Summary",
      desc: "Ringkas materi panjang dengan cepat.",
    },
    {
      icon: "📅",
      title: "AI Scheduler",
      desc: "Susun jadwal otomatis dengan AI.",
    },
  ];

  const stats = [
    ["12K+", "AI Requests"],
    ["99%", "Accuracy"],
    ["24/7", "Realtime"],
    ["50+", "AI Tools"],
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

  return (
    <main className="min-h-screen bg-black text-white flex overflow-hidden relative">
      {/* Background */}
      <ParticlesBackground />

      {/* Glow Effects */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full"
      />

      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full"
      />

      {/* Sidebar */}
      <div className="relative z-20">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 overflow-y-auto h-screen">
        {/* Navbar */}
        <nav className="sticky top-0 z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl bg-black/30">
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              NoerAI
            </h1>

            <p className="text-xs text-gray-500 mt-1">
              Futuristic Artificial Intelligence
            </p>
          </div>

          <div className="hidden md:flex gap-8 text-gray-300">
            {["Home", "Features", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-cyan-400 transition"
              >
                {item}
              </a>
            ))}
          </div>

          <button className="px-5 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-semibold transition duration-300 shadow-lg shadow-cyan-500/30">
            Login
          </button>
        </nav>

        {/* Hero */}
        <motion.section
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
          className="px-6 pt-24 pb-20 text-center"
        >
          <p className="uppercase tracking-[8px] text-cyan-400 text-sm">
            FUTURISTIC AI PLATFORM
          </p>

          <h2 className="text-6xl md:text-8xl font-black leading-tight mt-6">
            Build The Future

            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
              With Artificial Intelligence
            </span>
          </h2>

          <p className="mt-8 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Website AI modern dengan desain cyberpunk futuristik
            untuk chatbot, automation, AI tools,
            dan produktivitas digital.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30">
              Launch AI
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition">
              Explore More
            </button>
          </div>
        </motion.section>

        {/* Floating Cards */}
        <section className="px-8 py-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
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
                className={`bg-white/5 border ${item.border} ${item.hover} rounded-3xl p-6 backdrop-blur-xl transition`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-3xl`}
                  >
                    {item.icon}
                  </div>

                  <div>
                    <h3 className={`text-2xl font-bold ${item.text}`}>
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AI Tools */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[6px] text-cyan-400 text-sm">
              AI FEATURES
            </p>

            <h2 className="text-5xl font-bold mt-4">
              Powerful AI Tools
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tools.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                }}
                className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300"
              >
                <div className="text-5xl mb-6">
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">
                  {item.desc}
                </p>

                <button className="mt-6 text-cyan-400 font-semibold">
                  Try Now →
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dashboard */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left */}
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
            >
              <p className="uppercase tracking-[6px] text-cyan-400 text-sm">
                NEXT GENERATION AI
              </p>

              <h2 className="text-5xl font-black leading-tight mt-6">
                Experience Smart

                <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  Artificial Intelligence
                </span>
              </h2>

              <p className="mt-8 text-gray-400 leading-relaxed text-lg">
                NoerAI membantu coding, belajar,
                automation, content creation,
                dan produktivitas digital
                menggunakan AI modern realtime.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30">
                  Get Started
                </button>

                <button className="px-8 py-4 rounded-2xl border border-white/10 hover:border-cyan-400 hover:bg-cyan-500/10 transition">
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right */}
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
              className="relative"
            >
              <div className="absolute inset-0 bg-cyan-500/10 blur-[100px] rounded-full" />

              <div className="relative bg-white/5 border border-white/10 rounded-[40px] backdrop-blur-2xl p-8 overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">
                      AI Dashboard
                    </h3>

                    <p className="text-gray-500 text-sm mt-1">
                      Realtime AI Analytics
                    </p>
                  </div>

                  <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {stats.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.05,
                      }}
                      className="bg-black/30 border border-white/10 rounded-3xl p-6"
                    >
                      <h4 className="text-3xl font-black text-cyan-400">
                        {item[0]}
                      </h4>

                      <p className="text-gray-400 mt-2">
                        {item[1]}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 bg-black/30 border border-white/10 rounded-3xl p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">
                        AI Performance
                      </p>

                      <h4 className="text-2xl font-bold mt-1">
                        Ultra Fast Response
                      </h4>
                    </div>

                    <div className="text-cyan-400 text-4xl">
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
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center">
            <p className="uppercase tracking-[6px] text-cyan-400 text-sm">
              TRUSTED WORLDWIDE
            </p>

            <h2 className="text-5xl font-black mt-6">
              Used By Modern Companies
            </h2>

            <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
              NoerAI membantu developer, creator,
              startup, dan perusahaan modern
              meningkatkan produktivitas menggunakan AI.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
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
                className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition duration-300"
              >
                <h3 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                  {brand}
                </h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-8 py-20 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[6px] text-cyan-400 text-sm">
              TESTIMONIALS
            </p>

            <h2 className="text-5xl font-black mt-6">
              What People Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="bg-white/5 border border-white/10 rounded-[30px] p-8 backdrop-blur-xl hover:border-cyan-400 transition"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-black font-black text-xl">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 text-sm">
                      {item.role}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

{/* Pricing Section */}
<section className="px-8 py-24 max-w-7xl mx-auto">

  <div className="text-center mb-16">

    <p className="uppercase tracking-[6px] text-cyan-400 text-sm">
      PRICING PLAN
    </p>

    <h2 className="text-5xl font-black mt-6">
      Choose Your AI Plan
    </h2>

    <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
      Gunakan fitur Artificial Intelligence modern
      sesuai kebutuhan produktivitas kamu.
    </p>

  </div>

  <div className="grid md:grid-cols-3 gap-8">

    {[
      {
        title: "Starter",
        price: "$9",
        color: "cyan",
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
        color: "purple",
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
        color: "pink",
        features: [
          "All AI Features",
          "Advanced Automation",
          "Cloud AI System",
          "24/7 Dedicated Support",
        ],
      },

    ].map((plan, index) => (

      <motion.div
        key={index}

        initial={{
          opacity: 0,
          y: 40
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.6,
          delay: index * 0.2
        }}

        whileHover={{
          y: -10
        }}

        className="relative bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl hover:border-cyan-400 transition overflow-hidden"
      >

        {/* Glow */}
        <div className={`absolute inset-0 bg-${plan.color}-500/10 blur-[80px]`} />

        <div className="relative z-10">

          <h3 className="text-3xl font-black">
            {plan.title}
          </h3>

          <div className="mt-6 flex items-end gap-2">

            <h2 className="text-6xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
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
                className="flex items-center gap-3 text-gray-300"
              >

                <span className="text-cyan-400">
                  ✓
                </span>

                <p>{feature}</p>

              </div>

            ))}

          </div>

          <button className="mt-10 w-full py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 hover:scale-105 active:scale-95 text-black font-bold transition duration-300 shadow-lg shadow-cyan-500/30">

            Choose Plan

          </button>

        </div>

      </motion.div>

    ))}

  </div>

</section>

        {/* Chatbot */}
        <Chatbot />

        {/* Footer */}
        <footer className="border-t border-white/10 px-8 py-8 text-center text-gray-500 mt-10">
          <p>
            © 2026 NoerAI — Futuristic Artificial Intelligence Platform.
          </p>
        </footer>
      </div>
    </main>
  );
}