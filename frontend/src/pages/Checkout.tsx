import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cart.store";
import { useCreateOrder } from "../hooks/useOrder";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Navbar from "../components/common/Navbar";
import toast from "react-hot-toast";

const STEPS = ["Cart Review", "Delivery Details", "Confirm"];

const Checkout = () => {
  const { items, clearCart } = useCartStore();
  const { mutate, isPending } = useCreateOrder();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);

  const handleOrder = () => {
    if (!form.name.trim() || !form.address.trim() || !form.phone.trim()) {
      toast.error("Please fill in all delivery details");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    mutate(
      {
        items: items.map((i) => ({
          menuItemId: i.menuItemId,
          quantity: i.quantity,
        })),
        deliveryName: form.name,
        deliveryAddress: form.address,
        deliveryPhone: form.phone,
      },
      {
        onSuccess: (data) => {
          toast.success("🎉 Order placed successfully!");
          clearCart();
          navigate(`/order/${data.id}`);
        },
        onError: () => {
          toast.error("Failed to place order. Please try again.");
        },
      }
    );
  };

  if (items.length === 0 && step === 0) {
    return (
      <div className="hero-bg" style={{ minHeight: "100vh" }}>
        <Navbar />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "70vh",
            gap: "16px",
            padding: "40px 24px",
          }}
        >
          <span style={{ fontSize: "4rem" }}>🛒</span>
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "var(--color-text)",
            }}
          >
            Your cart is empty
          </h2>
          <p style={{ color: "var(--color-text-muted)" }}>
            Add some delicious items first!
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-bg" style={{ minHeight: "100vh" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 24px 60px",
        }}
      >
        {/* Page Header */}
        <div
          className="animate-fade-in-up"
          style={{ marginBottom: "32px" }}
        >
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => (step > 0 ? setStep(step - 1) : navigate("/"))}
            style={{ marginBottom: "16px" }}
          >
            ← Back
          </button>
          <h1
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              color: "var(--color-text)",
            }}
          >
            Checkout
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", marginTop: "4px" }}>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your order
          </p>
        </div>

        {/* Step Indicator */}
        <div
          className="animate-fade-in-up"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "36px",
            gap: "0",
          }}
        >
          {STEPS.map((s, i) => (
            <div
              key={s}
              style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : undefined }}
            >
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    background:
                      i < step
                        ? "var(--color-success)"
                        : i === step
                        ? "var(--color-primary)"
                        : "var(--color-surface-3)",
                    color: i <= step ? "white" : "var(--color-text-muted)",
                    boxShadow: i === step ? "0 0 12px rgba(255,107,53,0.4)" : "none",
                    transition: "all 0.3s ease",
                  }}
                >
                  {i < step ? "✓" : i + 1}
                </div>
                <span
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: i === step ? 600 : 400,
                    color: i === step ? "var(--color-text)" : "var(--color-text-muted)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  style={{
                    flex: 1,
                    height: "2px",
                    background: i < step ? "var(--color-success)" : "var(--color-surface-3)",
                    margin: "-16px 8px 0",
                    transition: "background 0.3s ease",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr min(340px, 100%)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Main Panel */}
          <div className="animate-fade-in">
            {/* Step 0 — Cart Review */}
            {step === 0 && (
              <div className="glass-card" style={{ padding: "24px" }}>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--color-text)",
                    marginBottom: "16px",
                  }}
                >
                  🛒 Review Your Order
                </h2>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {items.map((item) => (
                    <CartItem key={item.menuItemId} item={item} compact />
                  ))}
                </div>
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "24px", padding: "14px" }}
                  onClick={() => setStep(1)}
                >
                  Continue to Delivery →
                </button>
              </div>
            )}

            {/* Step 1 — Delivery Details */}
            {step === 1 && (
              <div className="glass-card" style={{ padding: "24px" }}>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--color-text)",
                    marginBottom: "20px",
                  }}
                >
                  📍 Delivery Details
                </h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        color: "var(--color-text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="checkout-name"
                      className="input-field"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        color: "var(--color-text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Delivery Address *
                    </label>
                    <textarea
                      id="checkout-address"
                      className="input-field"
                      placeholder="123 Main St, City, State"
                      rows={3}
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      style={{ resize: "vertical", minHeight: "80px" }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.82rem",
                        color: "var(--color-text-muted)",
                        marginBottom: "6px",
                        fontWeight: 500,
                      }}
                    >
                      Phone Number *
                    </label>
                    <input
                      id="checkout-phone"
                      className="input-field"
                      placeholder="+91 98765 43210"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "24px", padding: "14px" }}
                  onClick={() => {
                    if (!form.name || !form.address || !form.phone) {
                      toast.error("Please fill all fields");
                      return;
                    }
                    setStep(2);
                  }}
                >
                  Review Order →
                </button>
              </div>
            )}

            {/* Step 2 — Confirm */}
            {step === 2 && (
              <div className="glass-card" style={{ padding: "24px" }}>
                <h2
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: "var(--color-text)",
                    marginBottom: "20px",
                  }}
                >
                  ✅ Confirm Order
                </h2>

                {/* Delivery summary */}
                <div
                  style={{
                    background: "var(--color-surface-2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "16px",
                    marginBottom: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Delivering to
                  </p>
                  <p style={{ fontWeight: 600, color: "var(--color-text)" }}>{form.name}</p>
                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)" }}>{form.address}</p>
                  <p style={{ fontSize: "0.88rem", color: "var(--color-text-muted)" }}>{form.phone}</p>
                </div>

                <button
                  className="btn btn-primary"
                  id="place-order-btn"
                  style={{ width: "100%", padding: "16px", fontSize: "1rem" }}
                  onClick={handleOrder}
                  disabled={isPending}
                >
                  {isPending ? "Placing Order…" : "🎉 Place Order"}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar — Summary */}
          <div style={{ position: "sticky", top: "80px" }}>
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;