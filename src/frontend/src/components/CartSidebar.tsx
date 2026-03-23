import { Loader2, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  useGetAllProducts,
  useGetCart,
  useRemoveFromCart,
} from "../hooks/useQueries";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const FALLBACK_PRODUCTS = [
  { id: 1n, name: "Rose Agarbatti", price: 12000n },
  { id: 2n, name: "Chandan Agarbatti", price: 15000n },
  { id: 3n, name: "Guggal Dhup Sticks", price: 9500n },
  { id: 4n, name: "Sambrani Cups", price: 8500n },
];

export function CartSidebar({ open, onClose }: CartSidebarProps) {
  const { data: cartItems, isLoading: cartLoading } = useGetCart();
  const { data: backendProducts } = useGetAllProducts();
  const removeFromCart = useRemoveFromCart();

  const products =
    backendProducts && backendProducts.length > 0
      ? backendProducts
      : FALLBACK_PRODUCTS;

  const getProduct = (productId: bigint) =>
    products.find((p) => p.id === productId);

  const total = (cartItems || []).reduce((sum, item) => {
    const product = getProduct(item.productId);
    if (!product) return sum;
    return sum + Number(product.price) * Number(item.quantity);
  }, 0);

  const handleRemove = async (productId: bigint) => {
    try {
      await removeFromCart.mutateAsync(productId);
      toast.success("Item removed from cart");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleCheckout = () => {
    toast.info("Checkout coming soon!");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sidebar */}
          <motion.div
            data-ocid="cart.panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-card shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border bg-[#2B211B]">
              <h2 className="font-cinzel text-gold text-sm font-semibold tracking-widest uppercase">
                Your Cart
              </h2>
              <button
                type="button"
                onClick={onClose}
                data-ocid="cart.close_button"
                className="text-[#D7C2A6] hover:text-gold transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cartLoading ? (
                <div
                  data-ocid="cart.loading_state"
                  className="flex items-center justify-center py-12"
                >
                  <Loader2 className="w-6 h-6 animate-spin text-gold" />
                </div>
              ) : !cartItems || cartItems.length === 0 ? (
                <div
                  data-ocid="cart.empty_state"
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <ShoppingBag className="w-12 h-12 text-gold/30 mb-4" />
                  <p className="font-cinzel text-[#2B211B] text-sm tracking-wider">
                    Your cart is empty
                  </p>
                  <p className="text-foreground/60 text-xs mt-2">
                    Add some sacred fragrances
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, i) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;
                    const priceRupees = Number(product.price) / 100;
                    return (
                      <div
                        key={String(item.productId)}
                        data-ocid={`cart.item.${i + 1}`}
                        className="flex items-center gap-3 p-3 bg-background border border-border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-cinzel text-[#2B211B] text-xs font-semibold truncate">
                            {product.name}
                          </p>
                          <p className="text-foreground/60 text-xs mt-0.5">
                            ₹{priceRupees.toFixed(0)} × {String(item.quantity)}
                          </p>
                          <p className="text-cta-brown text-xs font-semibold mt-0.5">
                            ₹{(priceRupees * Number(item.quantity)).toFixed(0)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemove(item.productId)}
                          data-ocid={`cart.delete_button.${i + 1}`}
                          className="text-foreground/40 hover:text-destructive transition-colors p-1"
                          aria-label="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems && cartItems.length > 0 && (
              <div className="p-5 border-t border-border bg-[#2B211B]/5">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-[#2B211B] text-sm uppercase tracking-wider">
                    Total
                  </span>
                  <span className="font-cinzel text-cta-brown text-lg font-bold">
                    ₹{(total / 100).toFixed(0)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCheckout}
                  data-ocid="cart.primary_button"
                  className="w-full font-cinzel text-xs tracking-widest uppercase px-6 py-3 bg-[#2B211B] text-gold hover:bg-cta-brown hover:text-white transition-all duration-300"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
