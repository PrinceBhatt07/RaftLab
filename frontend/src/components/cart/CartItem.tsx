import { useCartStore } from "../../store/cart.store";
import type { CartItem as CartItemType } from "../../store/cart.store";

interface CartItemProps {
  item: CartItemType;
  compact?: boolean;
}

const CartItem = ({ item, compact = false }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      removeFromCart(item.menuItemId);
    } else {
      updateQuantity(item.menuItemId, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.menuItemId, item.quantity + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: compact ? "10px 0" : "14px",
        borderRadius: "var(--radius-sm)",
        background: compact ? "transparent" : "var(--color-surface-2)",
        borderBottom: compact ? "1px solid var(--color-border)" : "none",
        transition: "var(--transition)",
      }}
    >
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: "0.9rem",
            color: "var(--color-text)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </p>
        <p style={{ fontSize: "0.8rem", color: "var(--color-primary)", fontWeight: 600, marginTop: "2px" }}>
          ₹{(item.price * item.quantity).toFixed(2)}
          {item.quantity > 1 && (
            <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>
              {" "}(₹{item.price} × {item.quantity})
            </span>
          )}
        </p>
      </div>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          className="qty-btn"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
        >
          {item.quantity <= 1 ? "🗑" : "−"}
        </button>
        <span
          style={{
            minWidth: "24px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: "var(--color-text)",
          }}
        >
          {item.quantity}
        </span>
        <button
          className="qty-btn"
          onClick={handleIncrement}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;