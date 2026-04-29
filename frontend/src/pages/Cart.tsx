import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Navbar from "../components/common/Navbar";

const Cart = () => {
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 60px" }}>
        <div className="animate-fade-in-up" style={{ marginBottom: "32px" }}>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => navigate("/")}
            style={{ marginBottom: "16px" }}
          >
            ← Continue Shopping
          </button>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              color: "var(--color-text)",
            }}
          >
            Your Cart
          </h1>
          <p style={{ color: "var(--color-text-muted)", marginTop: "4px", fontSize: "0.9rem" }}>
            {items.length === 0
              ? "No items yet"
              : `${items.reduce((s, i) => s + i.quantity, 0)} items`}
          </p>
        </div>

        {items.length === 0 ? (
          <div
            className="glass-card animate-fade-in-up"
            style={{
              padding: "60px 24px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "4rem" }}>🛒</span>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                color: "var(--color-text)",
                fontSize: "1.3rem",
              }}
            >
              Your cart is empty
            </h2>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Browse our menu and add some delicious items!
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: "8px" }}
              onClick={() => navigate("/")}
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr min(340px, 100%)",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Items */}
            <div className="glass-card" style={{ padding: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    color: "var(--color-text)",
                    fontSize: "1rem",
                  }}
                >
                  Cart Items
                </h2>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={clearCart}
                >
                  Clear All
                </button>
              </div>
              {items.map((item) => (
                <CartItem key={item.menuItemId} item={item} compact />
              ))}

              <button
                className="btn btn-primary"
                style={{ width: "100%", marginTop: "24px", padding: "14px" }}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout →
              </button>
            </div>

            {/* Summary */}
            <div style={{ position: "sticky", top: "80px" }}>
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
