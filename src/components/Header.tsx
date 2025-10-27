import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Cpu, Activity, Infinity } from "lucide-react";

export const EpicHeader: React.FC = () => {
  return (
    <header className="relative h-screen w-full overflow-hidden bg-black text-white font-['Bai_Jamjuree']">
      {/* 🌌 Animated Gradient Background */}
      <motion.div
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity as unknown as number, // TS-safe
          ease: "linear",
        }}
        className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-fuchsia-500 to-purple-600 bg-[length:200%_200%] opacity-25 blur-3xl"
      />

      {/* ⚙️ Futuristic Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#FFD700_1px,_transparent_1px)] bg-[length:22px_22px] opacity-10"></div>

      {/* 💡 Shimmering Light Beam */}
      <motion.div
        animate={{ y: ["100%", "-100%"] }}
        transition={{
          duration: 6,
          repeat: Infinity as unknown as number,
          ease: "easeInOut",
        }}
        className="absolute left-0 w-full h-[200px] bg-gradient-to-b from-transparent via-yellow-200/10 to-transparent opacity-30"
      />

      {/* 🧠 Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        {/* 🌟 Title */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="
    text-3xl sm:text-4xl md:text-6xl
    font-extrabold bg-gradient-to-r from-yellow-300 via-amber-400 to-fuchsia-400
    bg-clip-text text-transparent tracking-[3px] uppercase
    drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]
    leading-[2.2rem] sm:leading-[3rem] md:leading-[6rem]
  "
        >
          CHÀO MỪNG ĐẾN VỚI
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="
    mt-4 text-4xl sm:text-5xl md:text-7xl
    font-extrabold bg-gradient-to-r from-fuchsia-400 via-yellow-300 to-amber-400
    bg-clip-text text-transparent uppercase
    drop-shadow-[0_0_30px_rgba(255,215,0,0.3)]
    leading-[2.5rem] sm:leading-[3.5rem] md:leading-[7rem]
  "
        >
          CÔNG CỤ HỖ TRỢ
        </motion.h2>

        {/* ✨ Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-amber-200 italic"
        >
          của{" "}
          <span className="text-fuchsia-400 font-semibold">
            phòng marketing mạnh nhất lịch sử
          </span>
        </motion.p>

        {/* ⚡ Animated Icons */}
        <div className="flex gap-8 mt-10 text-amber-300">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1.2 }}
          >
            <Sparkles className="w-7 h-7 md:w-9 md:h-9" />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.3 }}
            transition={{ duration: 0.6 }}
          >
            <Cpu className="w-7 h-7 md:w-9 md:h-9" />
          </motion.div>
          <motion.div
            whileHover={{ rotate: -360 }}
            transition={{ duration: 1.2 }}
          >
            <Zap className="w-7 h-7 md:w-9 md:h-9" />
          </motion.div>
          <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 1 }}>
            <Activity className="w-7 h-7 md:w-9 md:h-9" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.5 }} transition={{ duration: 1 }}>
            <Infinity className="w-7 h-7 md:w-9 md:h-9" />
          </motion.div>
        </div>

        {/* 🌀 Scrolling Slogan */}

        <motion.div
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            duration: 16,
            repeat: Infinity as unknown as number,
            ease: "linear",
          }}
          className="mt-12 text-xs sm:text-sm md:text-base tracking-widest text-yellow-400 uppercase font-semibold whitespace-nowrap"
        >
          ⚡ WELCOME TO GOLDEN FUND SYSTEM • AI-POWERED • MARKETING SUPREMACY •
          PARADIUS × ANOTHERATH ⚡
        </motion.div>
      </div>

      {/* 🌈 Glowing Bottom Border */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-yellow-400 via-amber-500 to-fuchsia-500 animate-pulse"></div>
    </header>
  );
};
