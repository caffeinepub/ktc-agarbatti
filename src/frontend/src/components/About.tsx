import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  "Over 45 years of incense-making expertise",
  "100% natural herbs, resins, and flower extracts",
  "No toxic chemicals or artificial binders",
  "Handrolled by skilled artisans in Maharashtra",
];

export function About() {
  const handleExplore = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-20 bg-[#F3E7D6]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <img
              src="/assets/generated/ktc-about-artisans.dim_600x500.jpg"
              alt="KTC Artisans crafting incense"
              className="w-full h-auto object-cover rounded shadow-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-gold text-[#2B211B] p-5 font-cinzel text-center hidden lg:block">
              <div className="text-3xl font-bold">45+</div>
              <div className="text-xs tracking-widest uppercase">
                Years of Craft
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase mb-3">
              Our Heritage
            </p>
            <h2 className="font-cinzel font-bold text-[#2B211B] text-3xl md:text-4xl uppercase tracking-wide mb-6">
              The KTC Tradition
            </h2>
            <div className="w-12 h-px bg-gold mb-7" />
            <p className="text-foreground leading-relaxed mb-4">
              Founded in 1978 in the sacred city of Nashik, KTC Agarbatti was
              born from a deep reverence for ancient Indian ritual traditions.
              Our founder, Shri Raj Kumar, began handcrafting incense using
              recipes passed down through generations.
            </p>
            <p className="text-foreground leading-relaxed mb-8">
              Every stick, every cup, and every dhup cone carries the essence of
              nature — sourced from Himalayan herbs, forest resins, and blooming
              flowers. We believe that true fragrance cannot be manufactured; it
              must be nurtured with devotion.
            </p>
            <ul className="space-y-3 mb-10">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleExplore}
              data-ocid="about.primary_button"
              className="font-cinzel text-xs tracking-widest uppercase px-8 py-3 border-2 border-[#2B211B] text-[#2B211B] hover:bg-[#2B211B] hover:text-gold transition-all duration-300"
            >
              Explore Our Heritage
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
