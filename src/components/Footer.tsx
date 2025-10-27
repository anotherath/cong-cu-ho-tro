import React from "react";
import { motion } from "framer-motion";
import { Zap, Cpu, Wifi, Sparkles, ShieldCheck } from "lucide-react";

export const EpicFooter: React.FC = () => {
  return (
    <footer className="relative w-full h-screen bg-black text-white overflow-hidden font-['Bai_Jamjuree']">
      {/* ⚡ Neon Gradient Aura */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-400 to-fuchsia-500 opacity-20 blur-2xl animate-pulse"></div>

      {/* 🧠 Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFD700_1px,_transparent_1px)] bg-[length:22px_22px] opacity-10"></div>

      {/* 🔱 Core Section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-[4px] bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        >
          GOLDEN FUND
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-lg md:text-xl text-amber-200/80 italic"
        >
          — BỌN BỐ MÀY ĐẲNG CẤP —
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-base md:text-lg text-gray-400"
        >
          Designed by{" "}
          <span className="text-amber-300 font-semibold">Paradius</span> ⚙️ |
          Built by{" "}
          <span className="text-fuchsia-400 font-semibold">anotherath</span> 💻
        </motion.p>

        {/* ⚙️ Techno Icons */}
        <div className="flex gap-6 sm:gap-8 mt-10 text-amber-300">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.2 }}
          >
            <Zap className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.4 }}
            transition={{ duration: 0.6 }}
          >
            <Cpu className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.4 }}>
            <Wifi className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <motion.div
            whileHover={{ rotate: -360 }}
            transition={{ duration: 1.2 }}
          >
            <Sparkles className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.3, rotate: 180 }}
            transition={{ duration: 0.8 }}
          >
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10" />
          </motion.div>
        </div>

        {/* 💥 Scrolling techno ticker */}
        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-0 w-full text-sm md:text-base tracking-widest text-yellow-400 uppercase font-semibold whitespace-nowrap"
        >
          ⚡ PHÒNG MARKETING MẠNH NHẤT LỊCH SỬ • GOLDEN FUND • PARADIUS X
          ANOTHERATH • IN GOLD WE TRUST • GOLDEN FUND CÂN CẢ THẾ GIỚI - ANH EM
          BỌN TAO CHẤP HẾT ⚡
        </motion.div>
      </div>

      {/* 🌈 Bottom Beam */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-amber-500 to-fuchsia-500 animate-pulse"></div>
    </footer>
  );
};
