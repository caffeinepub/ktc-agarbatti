import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import { About } from "./components/About";
import { CartSidebar } from "./components/CartSidebar";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Testimonials } from "./components/Testimonials";
import { ValueStrip } from "./components/ValueStrip";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <Header onCartOpen={() => setCartOpen(true)} />

      <main>
        <Hero
          onShopNow={() => scrollTo("#agarbatti")}
          onOurStory={() => scrollTo("#about")}
        />
        <ValueStrip />
        <Products />
        <About />
        <Testimonials />
        <Contact />
      </main>

      <Footer />

      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />

      <Toaster richColors position="top-right" />
    </div>
  );
}
