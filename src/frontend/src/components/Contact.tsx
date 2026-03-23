import { Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "../hooks/useQueries";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await submitInquiry.mutateAsync({ name, email, message });
      toast.success("Your inquiry has been sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      toast.error("Failed to send inquiry. Please try again.");
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-cinzel font-bold text-[#2B211B] text-3xl md:text-4xl uppercase tracking-wide">
            Embrace the Calm
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-5" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-foreground leading-relaxed mb-8">
              We'd love to hear from you. Whether you have questions about our
              products, want to place a bulk order, or simply wish to share your
              experience — reach out and we'll respond with warmth.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-cinzel text-[#2B211B] text-sm font-semibold mb-1">
                    Our Address
                  </p>
                  <p className="text-foreground/70 text-sm">
                    Sahajani, Shuklaganj, Unnao
                    <br />
                    Near Kanpur
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-cinzel text-[#2B211B] text-sm font-semibold mb-1">
                    Phone
                  </p>
                  <p className="text-foreground/70 text-sm">+91 89170 00027</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-cinzel text-[#2B211B] text-sm font-semibold mb-1">
                    Email
                  </p>
                  <p className="text-foreground/70 text-sm">
                    info@ktcagarbatti.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-cinzel text-xs text-[#2B211B] uppercase tracking-wider mb-2 block"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-ocid="contact.input"
                  placeholder="Priya Sharma"
                  className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="font-cinzel text-xs text-[#2B211B] uppercase tracking-wider mb-2 block"
                >
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-ocid="contact.search_input"
                  placeholder="priya@example.com"
                  className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="font-cinzel text-xs text-[#2B211B] uppercase tracking-wider mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  data-ocid="contact.textarea"
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  className="w-full bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitInquiry.isPending}
                data-ocid="contact.submit_button"
                className="w-full font-cinzel text-xs tracking-widest uppercase px-8 py-4 bg-[#2B211B] text-gold hover:bg-cta-brown hover:text-white transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {submitInquiry.isPending && (
                  <Loader2 className="w-3 h-3 animate-spin" />
                )}
                Send Inquiry
              </button>
              {submitInquiry.isSuccess && (
                <p
                  data-ocid="contact.success_state"
                  className="text-center text-sm text-green-700 font-cinzel tracking-wider"
                >
                  Message sent successfully!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
