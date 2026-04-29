import { useState, useMemo } from "react";
import { useMenu } from "../../hooks/useMenu";
import MenuItemCard from "./MenuItemCard";
import Loader from "../common/Loader";

const CATEGORIES = ["All", "Pizza", "Burger", "Pasta", "Salad", "Dessert", "Drink"];

const MenuList = () => {
  const { data, isLoading, isError } = useMenu();
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((item: any) => {
      const matchCat =
        activeCategory === "All" ||
        item.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [data, activeCategory, search]);

  if (isLoading) return <Loader text="Fetching today's menu..." />;

  if (isError) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "40vh",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "3rem" }}>⚠️</span>
        <p style={{ color: "var(--color-text-muted)" }}>
          Could not load the menu. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "0 0 40px" }}>
      {/* Search + Filter row */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {/* Search */}
        <div style={{ position: "relative", maxWidth: "480px" }}>
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
          <input
            className="input-field"
            placeholder="Search menu items…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: "42px" }}
          />
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p
        style={{
          fontSize: "0.82rem",
          color: "var(--color-text-muted)",
          marginBottom: "20px",
        }}
      >
        Showing{" "}
        <strong style={{ color: "var(--color-text)" }}>{filtered.length}</strong>{" "}
        {filtered.length === 1 ? "item" : "items"}
        {activeCategory !== "All" && ` in ${activeCategory}`}
        {search && ` matching "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "var(--color-text-muted)",
          }}
        >
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "12px" }}>
            🍽️
          </span>
          No items found. Try a different search or category.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((item: any, i: number) => (
            <MenuItemCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuList;
