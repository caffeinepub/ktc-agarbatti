const year = new Date().getFullYear();

const quickLinks = ["Home", "About Us", "Products", "Contact"];
const productLinks = ["Agarbatti", "Dhup Sticks", "Sambrani", "Essential Oils"];

export function Footer() {
  const handleScroll = (href: string) => {
    const map: Record<string, string> = {
      Home: "#home",
      "About Us": "#about",
      Products: "#agarbatti",
      Contact: "#contact",
      Agarbatti: "#agarbatti",
      "Dhup Sticks": "#agarbatti",
      Sambrani: "#agarbatti",
      "Essential Oils": "#agarbatti",
    };
    const el = document.querySelector(map[href] || "#home");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#2B211B] border-t border-[#C9A35B]/20">
      <div className="max-w-[1200px] mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/ktc-logo-transparent.dim_300x120.png"
              alt="KTC Agarbatti"
              className="h-14 w-auto mb-5"
            />
            <p className="text-[#D7C2A6]/70 text-sm leading-relaxed">
              Handcrafted incense for your spiritual journey. Natural
              ingredients, traditional methods, sacred fragrance.
            </p>
          </div>

          {/* Quick Links + Products */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-cinzel text-gold text-xs tracking-widest uppercase mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => handleScroll(link)}
                      className="text-[#D7C2A6]/70 text-sm hover:text-gold transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-cinzel text-gold text-xs tracking-widest uppercase mb-4">
                Products
              </h4>
              <ul className="space-y-2">
                {productLinks.map((link) => (
                  <li key={link}>
                    <button
                      type="button"
                      onClick={() => handleScroll(link)}
                      className="text-[#D7C2A6]/70 text-sm hover:text-gold transition-colors text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-cinzel text-gold text-xs tracking-widest uppercase mb-4">
              Contact Details
            </h4>
            <address className="not-italic space-y-3">
              <p className="text-[#D7C2A6]/70 text-sm">
                Sahajani, Shuklaganj, Unnao
                <br />
                Near Kanpur
              </p>
              <p className="text-[#D7C2A6]/70 text-sm">+91 89170 00012</p>
              <p className="text-[#D7C2A6]/70 text-sm">info@ktcagarbatti.com</p>
            </address>
          </div>
        </div>

        <div className="border-t border-[#C9A35B]/20 mt-10 pt-8 text-center">
          <p className="text-[#D7C2A6]/50 text-xs">
            © {year} KTC Agarbatti. All rights reserved. &nbsp;|&nbsp; Built
            with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/70 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
