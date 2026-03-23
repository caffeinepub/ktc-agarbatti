import { Quote } from "lucide-react";
import { motion } from "motion/react";

const TESTIMONIALS = [
  {
    text: "The Rose Agarbatti fills our puja room with the purest fragrance. My family loves it!",
    author: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
  },
  {
    text: "KTC's Chandan sticks remind me of temple mornings. Truly authentic and long-lasting.",
    author: "Rajesh Patel",
    location: "Ahmedabad",
    rating: 5,
  },
  {
    text: "The Sambrani cups are perfect for evening prayers. Beautiful smoke and a divine scent.",
    author: "Meena Devi",
    location: "Varanasi",
    rating: 4,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-star-gold fill-current"
              : "text-border fill-current"
          }`}
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <title>{star <= rating ? "Filled star" : "Empty star"}</title>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 bg-[#2B211B]">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase mb-3">
            What Our Devotees Say
          </p>
          <h2 className="font-cinzel font-bold text-white text-3xl md:text-4xl uppercase tracking-wide">
            Whispers of Peace
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.author}
              data-ocid={`testimonials.item.${i + 1}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#3A2A22] border border-[#C9A35B]/20 p-7 relative"
            >
              <Quote
                className="w-8 h-8 text-gold/30 absolute top-5 right-5"
                aria-hidden="true"
              />
              <StarRating rating={t.rating} />
              <p className="text-[#D7C2A6] mt-4 mb-6 leading-relaxed text-sm italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-[#C9A35B]/20 pt-4">
                <p className="font-cinzel text-gold text-sm font-semibold">
                  {t.author}
                </p>
                <p className="text-[#D7C2A6]/60 text-xs mt-0.5">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
