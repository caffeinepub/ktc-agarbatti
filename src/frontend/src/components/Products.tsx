import { Loader2, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import { useAddToCart, useGetAllProducts } from "../hooks/useQueries";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Rose Agarbatti",
    category: "Agarbatti",
    description:
      "Delicate rose fragrance crafted from pure rose petals. Perfect for morning prayers and meditation.",
    price: 12000n,
    imageUrl: "/assets/generated/product-rose-agarbatti.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: 2n,
    name: "Chandan Agarbatti",
    category: "Agarbatti",
    description:
      "Rich sandalwood aroma derived from aged chandan. Evokes serenity and temple tranquility.",
    price: 15000n,
    imageUrl: "/assets/generated/product-chandan-agarbatti.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: 3n,
    name: "Guggal Dhup Sticks",
    category: "Dhup Sticks",
    description:
      "Sacred guggal resin dhup sticks for deep purification rituals and spiritual ceremonies.",
    price: 9500n,
    imageUrl: "/assets/generated/product-guggal-dhup.dim_400x400.jpg",
    inStock: true,
  },
  {
    id: 4n,
    name: "Sambrani Cups",
    category: "Sambrani",
    description:
      "Traditional sambrani cups with aromatic loban smoke \u2014 ideal for evening aarti and blessing rituals.",
    price: 8500n,
    imageUrl: "/assets/generated/product-sambrani.dim_400x400.jpg",
    inStock: true,
  },
];

function ProductCard({ product }: { product: Product; index: number }) {
  const addToCart = useAddToCart();

  const handleAdd = async () => {
    try {
      await addToCart.mutateAsync({ productId: product.id, quantity: 1n });
      toast.success(`${product.name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const priceInRupees = Number(product.price) / 100;

  return (
    <div className="bg-card border border-border rounded overflow-hidden shadow-xs hover:shadow-gold transition-all duration-300 group flex flex-col">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={
            product.imageUrl ||
            "/assets/generated/product-rose-agarbatti.dim_400x400.jpg"
          }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-gold text-[#2B211B] text-[10px] font-cinzel font-semibold tracking-wider uppercase px-2 py-1">
            {product.category}
          </span>
        </div>
        {!product.inStock && (
          <div className="absolute inset-0 bg-[#2B211B]/60 flex items-center justify-center">
            <span className="text-white font-cinzel text-sm tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-cinzel font-semibold text-[#2B211B] text-base mb-2">
          {product.name}
        </h3>
        <p className="text-sm text-foreground/70 mb-4 flex-1 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="font-cinzel text-lg font-bold text-cta-brown">
            \u20b9{priceInRupees.toFixed(0)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!product.inStock || addToCart.isPending}
            data-ocid={`products.item.${Number(product.id)}`}
            className="flex items-center gap-2 bg-[#2B211B] text-gold text-xs font-cinzel tracking-wider uppercase px-4 py-2 hover:bg-cta-brown hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addToCart.isPending ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <ShoppingCart className="w-3 h-3" />
            )}
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export function Products() {
  const { data: backendProducts, isLoading } = useGetAllProducts();
  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : FALLBACK_PRODUCTS;

  return (
    <section id="agarbatti" className="py-20 bg-background">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="font-cinzel text-gold text-xs tracking-[0.3em] uppercase mb-3">
            Crafted with Devotion
          </p>
          <h2 className="font-cinzel font-bold text-[#2B211B] text-3xl md:text-4xl uppercase tracking-wide">
            Our Signature Products
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mt-5" />
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="products.loading_state"
            className="flex items-center justify-center py-16"
          >
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <motion.div
                key={String(product.id)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
