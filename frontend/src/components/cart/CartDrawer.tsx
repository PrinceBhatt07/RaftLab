import { useCartStore } from "../../store/cart.store";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

interface CartDrawerProps {
  onClose: () => void;
}

const CartDrawer = ({ onClose }: CartDrawerProps) => {
  const { items, getTotal } = useCartStore();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={onClose} />

      {/* Drawer */}
      <div className="cart-drawer">
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--color-surface-2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "1.4rem" }}>🛒</span>
            <div>
              <h2
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--color-text)",
                }}
              >
                Your Cart
              </h2>
              <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            className="btn btn-ghost btn-icon"
            onClick={onClose}
            aria-label="Close cart"
            style={{ fontSize: "1.1rem" }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
                paddingTop: "60px",
              }}
            >
              <span style={{ fontSize: "3rem" }}>🛒</span>
              <p style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: "0.82rem", color: "var(--color-text-muted)" }}>
                Add items from the menu to get started
              </p>
              <button className="btn btn-ghost btn-sm" onClick={onClose}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {items.map((item, i) => (
                <div
                  key={item.menuItemId}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid var(--color-border)",
              background: "var(--color-surface-2)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: "var(--color-text-muted)", fontWeight: 500 }}>
                Subtotal
              </span>
              <span
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "var(--color-primary)",
                }}
              >
                ₹{getTotal().toFixed(2)}
              </span>
            </div>
            <button className="btn btn-primary" style={{ width: "100%", padding: "14px" }} onClick={handleCheckout}>
              Proceed to Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
