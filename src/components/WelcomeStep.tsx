import { useState, useEffect } from "react";
import { StepProps } from "../types";
import {
  QrCode,
  TrendingUp,
  ArrowRight,
  MousePointerClick,
  MessageSquareHeart,
  Zap
} from "lucide-react";
import { motion } from "motion/react";

export function WelcomeStep({ onNext }: StepProps) {
  // State for card swapping
  const [activeMockup, setActiveMockup] = useState<
    "acrylic" | "sticker"
  >("acrylic");

  // Auto-swap effect every 3.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMockup((prev) =>
        prev === "acrylic" ? "sticker" : "acrylic"
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 30
      }
    }
  };

  return (
    <div className="w-full max-w-4xl py-6 md:py-10">

      {/* HERO SECTION */}
      <div className="border-2 border-[var(--color-ink)] bg-white shadow-hard-lg mb-12 p-6 md:p-12 relative">

        {/* Background Accent Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0Y4RjlGNiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 z-0"></div>

        <div className="relative z-10 grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">

          <div className="space-y-6 text-left">

            <div className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-3 py-1 font-mono font-bold text-xs uppercase border-2 border-[var(--color-ink)] shadow-[2px_2px_0px_0px_var(--color-ink)]">
              <Zap className="w-4 h-4" />
              100% Free Printable QR Code Generator
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-display font-extrabold text-[var(--color-ink)] leading-[1.15] uppercase tracking-tight">
              <span>Google Review</span>
              <br />
              <span className="text-white bg-[var(--color-ink)] px-2 leading-snug inline-block mt-1">
                QR Code Generator
              </span>
            </h1>

            <p className="text-sm md:text-base text-gray-800 font-medium max-w-xl leading-relaxed border-l-4 border-[var(--color-accent)] pl-4">
              <strong>
                Turn every customer transaction into an opportunity
                to earn a Google review.
              </strong>{" "}
              No searching for your business name. With a quick scan
              from their smartphone, customers can open your Google
              review page directly.
            </p>

            <button
              onClick={() => onNext()}
              className="mt-4 inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white font-display font-bold text-lg md:text-xl px-6 md:px-8 py-4 border-2 border-[var(--color-ink)] shadow-hard hover:shadow-hard-hover transition-all cursor-pointer group w-full sm:w-auto justify-center relative z-20"
            >
              CREATE YOUR QR CODE
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

          {/* MOCKUP SHOWCASE - AUTO SWAP CARDS */}
          <div className="flex relative justify-center items-center w-full min-h-[360px] md:min-h-[460px] lg:w-[400px] mt-6 lg:mt-0 max-w-full pt-8 pb-4">

            {/* Storefront Sticker Mockup */}
            <motion.div
              animate={{
                rotate: activeMockup === "sticker" ? -2 : 6,
                scale: activeMockup === "sticker" ? 1.05 : 0.9,
                zIndex: activeMockup === "sticker" ? 20 : 10,
                x: activeMockup === "sticker" ? 0 : 25,
                y: activeMockup === "sticker" ? 0 : 20,
                opacity: activeMockup === "sticker" ? 1 : 0.8
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20
              }}
              className="absolute w-[200px] sm:w-56 md:w-72 aspect-[3/4] bg-white border-2 border-[var(--color-ink)] shadow-hard-lg overflow-hidden"
            >
              <img
                src="/stiker-gerobak.webp"
                alt="Google review QR code storefront sticker"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-[var(--color-ink)] text-white font-mono text-[10px] md:text-xs py-2 px-2 font-bold text-center border-t-2 border-[var(--color-ink)] uppercase">
                Window / Table Sticker
              </div>

            </motion.div>

            {/* Acrylic Counter Stand Mockup */}
            <motion.div
              animate={{
                rotate: activeMockup === "acrylic" ? -2 : -8,
                scale: activeMockup === "acrylic" ? 1.05 : 0.9,
                zIndex: activeMockup === "acrylic" ? 20 : 10,
                x: activeMockup === "acrylic" ? 0 : -25,
                y: activeMockup === "acrylic" ? 0 : 20,
                opacity: activeMockup === "acrylic" ? 1 : 0.8
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 20
              }}
              className="absolute w-[200px] sm:w-56 md:w-72 aspect-[3/4] bg-white border-2 border-[var(--color-ink)] shadow-hard-lg overflow-hidden"
            >
              <img
                src="/akrilik-kasir.webp"
                alt="Google review QR code acrylic checkout stand"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-0 inset-x-0 bg-[var(--color-accent)] text-white font-mono text-[10px] md:text-xs py-2 px-2 font-bold text-center border-t-2 border-[var(--color-ink)] uppercase">
                Acrylic Counter Stand
              </div>

            </motion.div>

            {/* Ready to Print Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-8 sm:top-2 left-1/2 -translate-x-[60%] lg:left-0 lg:-translate-x-6 bg-yellow-300 text-[var(--color-ink)] font-mono font-extrabold text-xs sm:text-sm md:text-base px-2 sm:px-3 py-1.5 border-2 border-[var(--color-ink)] -rotate-12 z-30 shadow-[2px_2px_0px_0px_var(--color-ink)] pointer-events-none"
            >
              ⭐ READY TO PRINT!
            </motion.div>

          </div>

        </div>

      </div>

      {/* FEATURES GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-3 gap-6 mb-16"
      >

        <motion.div
          variants={item}
          className="bg-white p-6 border-2 border-[var(--color-ink)] shadow-hard flex flex-col h-full"
        >
          <div className="w-10 h-10 bg-blue-50 border-2 border-[var(--color-ink)] flex items-center justify-center mb-4">
            <MousePointerClick className="w-5 h-5 text-[var(--color-ink)]" />
          </div>

          <h3 className="font-display font-bold text-xl uppercase mb-2">
            Scan. Review. Done.
          </h3>

          <p className="text-gray-600 font-medium text-sm leading-relaxed mt-auto">
            No searching, typing, or accidentally selecting the wrong
            business. One scan takes customers directly to your Google
            review page.
          </p>

        </motion.div>

        <motion.div
          variants={item}
          className="bg-[var(--color-ink)] text-white p-6 border-2 border-[var(--color-ink)] shadow-hard flex flex-col h-full relative"
        >
          <div className="absolute top-4 right-4 text-[var(--color-accent)] font-mono font-bold"></div>

          <div className="w-10 h-10 bg-[var(--color-accent)] border-2 border-[var(--color-ink)] flex items-center justify-center mb-4">
            <QrCode className="w-5 h-5 text-white" />
          </div>

          <h3 className="font-display font-bold text-xl uppercase mb-2">
            Print & Display
          </h3>

          <p className="text-gray-300 font-medium text-sm leading-relaxed mt-auto">
            Designed for acrylic counter stands, printable signs,
            storefront windows, and waterproof table stickers.
            Simply download, print, and display wherever customers
            can easily scan.
          </p>

        </motion.div>

        <motion.div
          variants={item}
          className="bg-white p-6 border-2 border-[var(--color-ink)] shadow-hard flex flex-col h-full"
        >
          <div className="w-10 h-10 bg-green-50 border-2 border-[var(--color-ink)] flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-[var(--color-ink)]" />
          </div>

          <h3 className="font-display font-bold text-xl uppercase mb-2">
            Boost Local Visibility
          </h3>

          <p className="text-gray-600 font-medium text-sm leading-relaxed mt-auto">
            Build your online reputation with authentic customer
            reviews. More positive feedback can help your business
            stand out on Google Maps and attract new customers.
          </p>

        </motion.div>

      </motion.div>

      {/* WHY GOOGLE REVIEWS MATTER */}
      <div className="bg-white border-2 border-[var(--color-ink)] shadow-hard-lg overflow-hidden">

        <div className="bg-[#FFFDE6] border-b-2 border-[var(--color-ink)] p-4 flex items-center gap-3">

          <MessageSquareHeart className="w-6 h-6 text-yellow-600 shrink-0" />

          <h2 className="font-display font-extrabold text-xl md:text-2xl uppercase tracking-wide text-left">
            Why Google Reviews Matter for Your Business
          </h2>

        </div>

        <div className="p-6 md:p-8 grid md:grid-cols-[1.3fr_1fr] gap-8 items-center">

          <div className="space-y-6 text-left">

            {/* AI Recommendations */}
            <div className="flex gap-4 items-start">

              <div className="w-8 h-8 shrink-0 bg-blue-100 border-2 border-[var(--color-ink)] flex items-center justify-center mt-0.5 font-mono font-bold text-sm">
                1
              </div>

              <div>

                <h4 className="font-display font-bold text-base md:text-lg uppercase mb-1">
                  Get Discovered by AI
                </h4>

                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  More people are using AI assistants like ChatGPT
                  and Gemini to find local businesses by asking
                  questions such as{" "}
                  <em>"What's the best coffee shop near me?"</em>.
                  A strong online reputation and authentic customer
                  reviews can help your business stand out when
                  people research their options.
                </p>

              </div>

            </div>

            {/* Local Search Visibility */}
            <div className="flex gap-4 items-start">

              <div className="w-8 h-8 shrink-0 bg-green-100 border-2 border-[var(--color-ink)] flex items-center justify-center mt-0.5 font-mono font-bold text-sm">
                2
              </div>

              <div>

                <h4 className="font-display font-bold text-base md:text-lg uppercase mb-1">
                  Improve Your Local Search Ranking
                </h4>

                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Google considers review count and ratings among
                  its local ranking factors. Consistently receiving
                  genuine customer reviews can help improve your
                  visibility on{" "}
                  <strong>Google Search and Google Maps.</strong>
                </p>

              </div>

            </div>

            {/* Customer Trust */}
            <div className="flex gap-4 items-start">

              <div className="w-8 h-8 shrink-0 bg-rose-100 border-2 border-[var(--color-ink)] flex items-center justify-center mt-0.5 font-mono font-bold text-sm">
                3
              </div>

              <div>

                <h4 className="font-display font-bold text-base md:text-lg uppercase mb-1">
                  Build Instant Customer Trust
                </h4>

                <p className="text-gray-600 font-medium text-sm leading-relaxed">
                  Potential customers often read reviews before
                  visiting a business. Honest feedback from real
                  customers is one of the most effective ways to{" "}
                  <strong>
                    build credibility and encourage new customers
                    to choose your business.
                  </strong>
                </p>

              </div>

            </div>

          </div>

          {/* ACRYLIC TABLE STAND SHOWCASE */}
          <div className="bg-[var(--color-paper)] border-2 border-[var(--color-ink)] p-4 flex flex-col items-center justify-center relative shadow-inner h-full min-h-[280px]">

            <div className="absolute top-2 left-2 flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-[var(--color-ink)]"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400 border border-[var(--color-ink)]"></div>
              <div className="w-3 h-3 rounded-full bg-green-400 border border-[var(--color-ink)]"></div>
            </div>

            <div className="w-full max-w-[220px] aspect-[3/4] my-4 overflow-hidden border-2 border-[var(--color-ink)] shadow-hard bg-white">

              <img
                src="/akrilir meja.webp"
                alt="Printable Google review QR code acrylic table stand"
                className="w-full h-full object-cover"
              />

            </div>

            <div className="mt-auto text-center w-full">

              <p className="font-mono font-bold text-[11px] bg-[var(--color-ink)] text-white py-1.5 px-2 uppercase tracking-wider block">
                DISPLAY AT CHECKOUT OR ON TABLES
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
