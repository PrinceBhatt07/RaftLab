import { useState } from "react"; // useState kept for imgError
import { useCartStore } from "../../store/cart.store";
import toast from "react-hot-toast";

interface MenuItemCardProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category?: string;
  };
  index?: number;
}

const MenuItemCard = ({ item, index = 0 }: MenuItemCardProps) => {
  const [imgError, setImgError] = useState(false);
  const addToCart = useCartStore((s) => s.addToCart);
  const cartItems = useCartStore((s) => s.items);
  const cartItem = cartItems.find((i) => i.menuItemId === item.id);

  const handleAdd = () => {
    addToCart({
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
    });
    toast.success(`${item.name} added to cart! 🛒`, {
      style: { background: "#1a1a24", color: "#f2f2f5", border: "1px solid rgba(255,255,255,0.1)" },
    });
  };

  const categoryEmoji: Record<string, string> = {
    pizza: "🍕",
    burger: "🍔",
    pasta: "🍝",
    salad: "🥗",
    dessert: "🍰",
    drink: "🥤",
    default: "🍽️",
  };
  const emoji =
    categoryEmoji[item.category?.toLowerCase() ?? ""] ||
    categoryEmoji["default"];

  return (
    <div
      className="glass-card food-card animate-fade-in-up"
      style={{
        animationDelay: `${index * 60}ms`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", overflow: "hidden", height: "180px" }}>
        {imgError ? (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, var(--color-surface-2), var(--color-surface-3))",
              fontSize: "3rem",
            }}
          >
            {emoji}
          </div>
        ) : (
          <img
            src={item.imageUrl}
            alt={item.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLImageElement).style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLImageElement).style.transform = "scale(1)")
            }
          />
        )}

        {/* Category badge */}
        {item.category && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              color: "white",
              fontSize: "0.72rem",
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: "20px",
              textTransform: "capitalize",
              letterSpacing: "0.03em",
            }}
          >
            {emoji} {item.category}
          </span>
        )}

        {/* Cart indicator */}
        {cartItem && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "var(--color-primary)",
              color: "white",
              fontSize: "0.72rem",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: "20px",
            }}
          >
            {cartItem.quantity} in cart
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "var(--color-text)",
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            {item.name}
          </h3>
          <span
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "1.05rem",
              color: "var(--color-primary)",
              whiteSpace: "nowrap",
              marginLeft: "8px",
            }}
          >
            ₹{item.price}
          </span>
        </div>

        <p
          style={{
            fontSize: "0.82rem",
            color: "var(--color-text-muted)",
            lineHeight: 1.5,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {item.description}
        </p>

        {/* Add to Cart */}
        <div style={{ marginTop: "4px" }}>
          <button
            className="btn btn-primary"
            style={{ width: "100%", padding: "10px 14px", fontSize: "0.88rem" }}
            onClick={handleAdd}
          >
            {cartItem ? `Add Again (${cartItem.quantity} in cart)` : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
