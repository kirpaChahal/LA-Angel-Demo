import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    document.title = "Angel — LA Chatbot Demo";
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const demoSteps = [
    { step: 1, title: "Arrival at LAX (QR → Angel)", text: "Akira scans a QR at baggage claim and opens this page. Angel greets her in Japanese/English and offers navigation help and cultural recs." },
    { step: 2, title: "Hotel guidance + memory", text: "Angel captures hotel name, offers directions, and stores preferences (art, food, music) for later personalization." },
    { step: 3, title: "Explore LA", text: "Shows museum hours (e.g., LACMA), transit tips, and nearby events. Demonstrates Botcopy UI + Dialogflow fulfillment flows." },
  ];

  const features = [
    { icon: "🌐", title: "Multilingual", text: "Start in English or try Japanese (こんにちは)." },
    { icon: "🧭", title: "Wayfinding", text: "Quick directions from LAX to your hotel." },
    { icon: "🎯", title: "Personalization", text: "Remembers interests to tailor recs." },
  ];

  return (
    <div style={styles.page}>
      {/* Global CSS & effects */}
      <style>{`
        :root { --accent: #3861fb; --accent2:#7dd3fc; --ink:#0b0c0c; }
        *, *::before, *::after { box-sizing: border-box; }
        html, body, #root { height: 100%; }
        body { margin: 0; }

        /* Accent loader bar */
        .accent-bar { position: fixed; top:0; left:0; height:3px; width:100%; z-index: 40;
          background: linear-gradient(90deg, var(--accent), #7aa2ff, var(--accent2), #7aa2ff, var(--accent));
          background-size: 200% 100%; animation: move 8s linear infinite; }
        @keyframes move { 0%{background-position:0% 0} 100%{background-position:200% 0} }

        /* Fancy hero background with floating blurs */
        .hero-fx { position: relative; overflow: hidden; }
        .hero-fx::before, .hero-fx::after { content:""; position:absolute; width:480px; height:480px; filter: blur(90px); opacity:.35; pointer-events:none; }
        .hero-fx::before { left: -160px; top: -140px; background: radial-gradient(closest-side, var(--accent), transparent 70%); }
        .hero-fx::after  { right: -140px; top:  -80px; background: radial-gradient(closest-side, var(--accent2), transparent 70%); }

        /* Card gradient border wrapper */
        .cardWrap { padding:1px; border-radius:18px; background: linear-gradient(135deg, var(--accent), var(--accent2)); }
        .cardInner { border-radius:16px; background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%); padding:18px; }
        .tilt { transition: transform .18s ease, box-shadow .18s ease; }
        .tilt:hover { transform: perspective(900px) rotateX(-2deg) rotateY(2deg) translateY(-4px); box-shadow: 0 16px 40px rgba(16,24,40,.12); }

        /* Scroll reveal */
        .reveal { opacity: 0; transform: translateY(12px); transition: opacity .6s ease, transform .6s cubic-bezier(.2,.65,.25,1); }
        .reveal.visible { opacity:1; transform:none; }

        /* Section headings */
        .underlined { position: relative; display: inline-block; }
        .underlined::after { content:""; position:absolute; left:50%; transform:translateX(-50%); bottom:-8px; width:80px; height:3px; border-radius: 999px; background: linear-gradient(90deg, var(--accent), var(--accent2)); }
      `}</style>

      <div className="accent-bar" aria-hidden />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.center}>
          <div style={styles.brandRow}>
            <div style={styles.brand}>
              <img
  src={import.meta.env.BASE_URL + 'la-flag.png'}
  alt="Los Angeles flag"
  style={styles.brandLogo}
/>

              <span style={styles.brandText}>Angel — Los Angeles Digital Assistant</span>
            </div>
            <nav style={styles.nav}>
              <a href="#demo" style={styles.navLink}>Demo</a>
              <a href="#story" style={styles.navLink}>Storyline</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero (compact, centered) */}
      <section className="hero-fx" style={styles.hero}>
        <div style={styles.center}>
          <div className="reveal" style={styles.heroContent}>
            <h1 className="gradient-title" style={styles.h1}>Welcome to Angel</h1>
            <p style={styles.lede}>A multilingual civic‑grade assistant for visitors to Los Angeles.</p>
            <p style={styles.note}>The chat widget lives in the bottom‑right corner — just click the bubble to start.</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={styles.sectionTight}>
        <div style={styles.center}>
          <div style={styles.gridAutoFit}>
            {features.map((f, i) => (
              <div key={i} className="cardWrap reveal tilt">
                <div className="cardInner">
                  <div style={styles.cardTitle}><span style={styles.icon}>{f.icon}</span>{f.title}</div>
                  <div style={styles.cardText}>{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo info */}
      <section id="demo" style={styles.altSection}>
        <div style={styles.center}>
          <h2 className="underlined reveal" style={styles.h2}>Demo Info</h2>
          <ul className="reveal" style={styles.list}>
            <li><strong>Launcher:</strong> Use the floating chat bubble at the bottom‑right.</li>
            <li><strong>Languages:</strong> Start in English or try “こんにちは” to see multilingual greeting.</li>
            <li><strong>Examples:</strong> “Navigate me to the Freehand Hotel”, “Show LACMA hours”, “Food near my hotel”.</li>
            <li><strong>Privacy:</strong> This is a demo; avoid sending sensitive personal data.</li>
          </ul>
        </div>
      </section>

      {/* Storyline */}
      <section id="story" style={styles.section}>
        <div style={styles.center}>
          <h2 className="underlined reveal" style={styles.h2}>Demo Storyline</h2>
          <ol className="reveal" style={{ ...styles.list, listStyle: "decimal", paddingLeft: 22 }}>
            {demoSteps.map(({ step, title, text }) => (
              <li key={step} style={{ marginBottom: 10 }}>
                <div style={{ fontWeight: 700 }}>{title}</div>
                <div style={{ opacity: 0.9 }}>{text}</div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.center}>
          <small>© {new Date().getFullYear()} City of Angels Demo • Built with Vite + React</small>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
    color: "#0b0c0c",
    background: "linear-gradient(180deg, #eef3ff 0%, #ffffff 35%)",
    minHeight: "100dvh",
    width: "100%",
    overflowX: "hidden",
  },
  // Centered container (full-bleed, with minimal responsive insets)
  center: {
    marginLeft: "50%",
    transform: "translateX(-50%)",
    width: "min(1800px, 100vw)",
    padding: "0 clamp(16px, 2.5vw, 32px)",
  },

  header: {
    position: "sticky",
    top: 0,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "saturate(180%) blur(8px)",
    borderBottom: "1px solid #eef0f3",
    zIndex: 20,
  },
  brandRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" },
  brand: { display: "flex", alignItems: "center", gap: 10 },
  brandLogo: { width: 36, height: 36, objectFit: "contain", borderRadius: 8, boxShadow: "0 2px 6px rgba(0,0,0,0.08)" },
  brandText: { fontWeight: 800, letterSpacing: 0.2 },
  nav: { display: "flex", gap: 18 },
  navLink: { textDecoration: "none", color: "#0b0c0c", opacity: 0.85 },

  hero: {
    position: "relative",
    minHeight: "18vh",
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(180deg, rgba(56,97,251,0.05) 0%, rgba(255,255,255,0) 100%)",
  },
  heroContent: { textAlign: "center" },
  h1: { fontSize: 50, margin: "0 0 6px", lineHeight: 1.06 },
  lede: { fontSize: 18, opacity: 0.92, margin: "0 auto 4px", maxWidth: 960 },
  note: { marginTop: 0, fontSize: 14, opacity: 0.85 },

  sectionTight: { padding: "12px 0 16px" },
  section: { padding: "18px 0 24px" },
  altSection: { padding: "18px 0", background: "#f7f9fb", borderTop: "1px solid #eef0f3", borderBottom: "1px solid #eef0f3" },

  gridAutoFit: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 20,
    alignItems: "stretch",
  },
  icon: { marginRight: 8 },
  cardTitle: { fontWeight: 800, marginBottom: 6, display: "flex", alignItems: "center" },
  cardText: { opacity: 0.85 },

  h2: { fontSize: 26, margin: "0 0 18px", textAlign: "center" },
  list: { margin: 0, paddingLeft: 18, lineHeight: 1.6 },
  p: { margin: "8px 0" },
  codeBlock: { display: "block", background: "#0f172a", color: "#e2e8f0", padding: 12, borderRadius: 10, overflowX: "auto", fontSize: 12 },
  footer: { padding: "24px 0", borderTop: "1px solid #eef0f3", marginBottom: 90 },
};
