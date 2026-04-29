import { useCartStore } from "../../store/cart.store";

const CartSummary = () => {
  const { items, getTotal } = useCartStore();
  const subtotal = getTotal();
  const deliveryFee = subtotal > 0 ? 49 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div
      style={{
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
        padding: "24px",
      }}
    >
      <h3
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          marginBottom: "16px",
          color: "var(--color-text)",
        }}
      >
        Order Summary
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => (
          <div
            key={item.menuItemId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.88rem",
              color: "var(--color-text-muted)",
            }}
          >
            <span>
              {item.name}{" "}
              <span style={{ opacity: 0.6 }}>× {item.quantity}</span>
            </span>
            <span style={{ color: "var(--color-text)", fontWeight: 500 }}>
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          borderTop: "1px solid var(--color-border)",
          marginTop: "16px",
          paddingTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.88rem",
            color: "var(--color-text-muted)",
          }}
        >
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.88rem",
            color: "var(--color-text-muted)",
          }}
        >
          <span>Delivery Fee</span>
          <span>₹{deliveryFee.toFixed(2)}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontSize: "1.05rem",
            paddingTop: "8px",
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text)",
          }}
        >
          <span>Total</span>
          <span style={{ color: "var(--color-primary)" }}>
            ₹{total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;