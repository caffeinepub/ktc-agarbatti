import { motion } from "motion/react";

interface HeroProps {
  onShopNow: () => void;
  onOurStory: () => void;
}

export function Hero({ onShopNow, onOurStory }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/ktc-hero.dim_1400x700.jpg')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#2B211B]/70" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-cinzel font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
        >
          Pure Devotion,
          <br />
          <span className="text-gold">Sacred Fragrance</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#D7C2A6] text-lg mb-10 font-lato font-light"
        >
          Premium incense for your spiritual journey
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            type="button"
            onClick={onShopNow}
            data-ocid="hero.primary_button"
            className="font-cinzel text-sm tracking-widest uppercase px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-[#2B211B] transition-all duration-300"
          >
            Shop Now
          </button>
          <button
            type="button"
            onClick={onOurStory}
            data-ocid="hero.secondary_button"
            className="font-cinzel text-sm tracking-widest uppercase px-8 py-3 border-2 border-white/50 text-white hover:border-white hover:bg-white/10 transition-all duration-300"
          >
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-px h-10 bg-gold/50 mx-auto mb-1" />
        <div className="w-2 h-2 rounded-full bg-gold mx-auto" />
      </div>
    </section>
  );
}
