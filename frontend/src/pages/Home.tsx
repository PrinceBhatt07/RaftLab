import Navbar from "../components/common/Navbar";
import MenuList from "../components/menu/MenuList";

const Home = () => {
    return (
        <div className="hero-bg" style={{ minHeight: "100vh" }}>
            <Navbar />

            {/* Hero Section */}
            <section
                style={{
                    maxWidth: "1280px",
                    margin: "0 auto",
                    padding: "48px 24px 32px",
                }}
            >
                <div
                    className="animate-fade-in-up"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginBottom: "48px",
                    }}
                >
                    {/* Tag */}
                    <span
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            background: "rgba(255,107,53,0.12)",
                            border: "1px solid rgba(255,107,53,0.25)",
                            color: "var(--color-primary)",
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            padding: "4px 14px",
                            borderRadius: "20px",
                            width: "fit-content",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                        }}
                    >
                        🔥 Fresh &amp; Hot Today
                    </span>

                    {/* Heading */}
                    <h1
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 800,
                            fontSize: "clamp(2rem, 5vw, 3.2rem)",
                            lineHeight: 1.15,
                            color: "var(--color-text)",
                            letterSpacing: "-0.03em",
                        }}
                    >
                        Order your{" "}
                        <span
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            favourite food
                        </span>
                        <br />
                        delivered fast 🚀
                    </h1>

                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            fontSize: "1rem",
                            maxWidth: "520px",
                            lineHeight: 1.7,
                        }}
                    >
                        Explore our handcrafted menu. Add items to your cart and enjoy hot
                        meals delivered right to your door.
                    </p>

                    {/* Stats row */}
                    <div
                        className="animate-fade-in-up"
                        style={{
                            display: "flex",
                            gap: "24px",
                            marginTop: "8px",
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            { value: "30 min", label: "Avg Delivery" },
                            { value: "4.9★", label: "Rating" },
                            { value: "50+", label: "Menu Items" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p
                                    style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 800,
                                        fontSize: "1.3rem",
                                        color: "var(--color-primary)",
                                    }}
                                >
                                    {stat.value}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.78rem",
                                        color: "var(--color-text-muted)",
                                    }}
                                >
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        borderTop: "1px solid var(--color-border)",
                        marginBottom: "32px",
                    }}
                />

                {/* Menu section heading */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "24px",
                        flexWrap: "wrap",
                        gap: "8px",
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.4rem",
                            color: "var(--color-text)",
                        }}
                    >
                        Today's Menu
                    </h2>
                </div>

                <MenuList />
            </section>

            {/* Footer */}
            <footer
                style={{
                    borderTop: "1px solid var(--color-border)",
                    padding: "24px",
                    textAlign: "center",
                    color: "var(--color-text-muted)",
                    fontSize: "0.82rem",
                }}
            >
                🍔 Raftlabs — Fast Food, Faster Delivery &nbsp;|&nbsp; © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Home;