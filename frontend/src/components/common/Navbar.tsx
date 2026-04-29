import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCartStore } from "../../store/cart.store";
import CartDrawer from "../cart/CartDrawer";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(15, 15, 19, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 24px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 12px rgba(255,107,53,0.4)",
              }}
            >
              🍔
            </div>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
              }}
            >
              Raft<span style={{ color: "var(--color-primary)" }}>Labs</span>
            </span>
          </button>

          {/* Nav links */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <button
              className="nav-link"
              onClick={() => navigate("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color:
                  location.pathname === "/"
                    ? "var(--color-text)"
                    : "var(--color-text-muted)",
                fontWeight: location.pathname === "/" ? 600 : 400,
              }}
            >
              Menu
            </button>
          </nav>

          {/* Cart Icon */}
          <button
            id="cart-btn"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              width: "46px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "1.3rem",
              transition: "var(--transition)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-surface-3)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--color-surface-2)";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "var(--color-border)";
            }}
          >
            🛒
            {totalQty > 0 && (
              <span
                className="badge"
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  minWidth: "20px",
                  height: "20px",
                  fontSize: "0.7rem",
                  boxShadow: "0 2px 8px rgba(255,107,53,0.5)",
                }}
              >
                {totalQty > 99 ? "99+" : totalQty}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Cart Drawer */}
      {cartOpen && <CartDrawer onClose={() => setCartOpen(false)} />}
    </>
  );
};

export default Navbar;
