import { Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCart } from "../hooks/useQueries";

interface HeaderProps {
  onCartOpen: () => void;
}

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Agarbatti", href: "#agarbatti" },
  { label: "Dhup Sticks", href: "#agarbatti" },
  { label: "Sambrani", href: "#agarbatti" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header({ onCartOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: cartItems } = useGetCart();

  const cartCount =
    cartItems?.reduce((sum, item) => sum + Number(item.quantity), 0) ?? 0;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#2B211B]/95 shadow-lg" : "bg-[#2B211B]/80"
      } backdrop-blur-sm`}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNavClick("#home")}
          className="flex-shrink-0"
          aria-label="Go to home"
        >
          <img
            src="/assets/generated/ktc-logo-transparent.dim_300x120.png"
            alt="KTC Agarbatti"
            className="h-12 w-auto"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "_")}.link`}
              className="font-cinzel text-xs tracking-widest text-[#D7C2A6] hover:text-gold transition-colors uppercase"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Cart + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCartOpen}
            data-ocid="cart.open_modal_button"
            className="relative p-2 text-[#D7C2A6] hover:text-gold transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-[#2B211B] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            type="button"
            className="lg:hidden p-2 text-[#D7C2A6] hover:text-gold"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#2B211B] border-t border-[#C9A35B]/20 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-cinzel text-xs tracking-widest text-[#D7C2A6] hover:text-gold uppercase text-left py-1"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
