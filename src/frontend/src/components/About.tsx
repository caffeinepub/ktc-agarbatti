import { CheckCircle } from "lucide-react";
import { motion } from "motion/react";

const highlights = [
  "Products crafted using modern, high-quality machinery",
  "100% natural herbs, resins, and flower extracts",
  "No toxic chemicals or artificial binders",
  "Made with precision and care in Unnao, Uttar Pradesh",
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
              alt="KTC manufacturing incense"
              className="w-full h-auto object-cover rounded shadow-lg"
            />
            <div className="absolute -bottom-5 -right-5 bg-gold text-[#2B211B] p-5 font-cinzel text-center hidden lg:block">
              <div className="text-3xl font-bold">KTC</div>
              <div className="text-xs tracking-widest uppercase">
                Pure Quality
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
              Our Story
            </p>
            <h2 className="font-cinzel font-bold text-[#2B211B] text-3xl md:text-4xl uppercase tracking-wide mb-6">
              The KTC Promise
            </h2>
            <div className="w-12 h-px bg-gold mb-7" />
            <p className="text-foreground leading-relaxed mb-4">
              KTC Agarbatti is proudly rooted in Unnao, Uttar Pradesh — a brand
              built on passion and commitment to quality. Founded by Shri Raj
              Kumar, KTC was established with a clear vision: to bring pure,
              natural incense to every home and temple across India.
            </p>
            <p className="text-foreground leading-relaxed mb-8">
              While we are a newer name in this industry, we have embraced
              modern machinery to ensure consistency, precision, and superior
              quality in every product. Our agarbattis, dhup sticks, and
              essentials are crafted with the finest natural ingredients —
              because we believe devotion deserves nothing less.
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
              Get In Touch
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
