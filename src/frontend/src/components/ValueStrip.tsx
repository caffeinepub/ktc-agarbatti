import { Flame, Leaf, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const values = [
  { icon: Leaf, label: "Natural Ingredients" },
  { icon: Flame, label: "Traditional Methods" },
  { icon: Sparkles, label: "Spiritual Awakening" },
];

export function ValueStrip() {
  return (
    <div className="bg-gold py-5">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
          {values.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center"
            >
              <div className="flex items-center gap-2 px-6 py-1">
                <item.icon className="w-4 h-4 text-[#2B211B]" />
                <span className="font-cinzel text-sm font-semibold tracking-wider text-[#2B211B] uppercase">
                  {item.label}
                </span>
              </div>
              {i < values.length - 1 && (
                <div className="hidden sm:block w-px h-6 bg-[#2B211B]/30" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
