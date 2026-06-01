import { useState, useEffect, useRef } from "react"
import {
  Phone, Mail, MapPin, Menu, X, ChevronLeft, ChevronRight,
  ChevronUp, MessageCircle, Star, Award, Clock, Users,
  Wrench, Palette, Package
} from "lucide-react"

const THEME = {
  bg: "#0d0500",
  bgCard: "#1a0a00",
  bgCardHover: "#2d1200",
  gold: "#c9a84c",
  goldLight: "#f0c040",
  goldDark: "#9a7a2a",
  white: "#ffffff",
  textMuted: "#c8b89a",
}

// ─── IMAGE PATHS ──────────────────────────────────────────────────────────────
const IMG = {
  owner:    "assets/owner.jpeg",
  heroBg:   "assets/WhatsApp Image 2026-06-01 at 19.41.02.jpeg",
  flyer:    "assets/A.jpeg",
  // Stage / Wedding
  stage1:   "assets/WhatsApp Image 2026-06-01 at 19.41.02.jpeg",
  stage2:   "assets/WhatsApp Image 2026-06-01 at 19.41.03 (2).jpeg",
  stage3:   "assets/WhatsApp Image 2026-06-01 at 19.41.03.jpeg",
  stage4:   "assets/WhatsApp Image 2026-06-01 at 19.41.00 (1).jpeg",
  stage5:   "assets/WhatsApp Image 2026-06-01 at 19.41.00 (2).jpeg",
  stage6:   "assets/WhatsApp Image 2026-06-01 at 19.41.00.jpeg",
  stage7:   "assets/WhatsApp Image 2026-06-01 at 19.41.03 (1).jpeg",
  // LED Decor
  led1:     "assets/WhatsApp Image 2026-06-01 at 19.40.59 (1).jpeg",
  led2:     "assets/WhatsApp Image 2026-06-01 at 19.40.59.jpeg",
  led3:     "assets/WhatsApp Image 2026-06-01 at 19.40.59 (2).jpeg",
  led4:     "assets/WhatsApp Image 2026-06-01 at 19.41.01 (2).jpeg",
  led5:     "assets/WhatsApp Image 2026-06-01 at 19.40.58.jpeg",
  // Fiber Products
  fiber1:   "assets/WhatsApp Image 2026-06-01 at 19.40.52 (1).jpeg",
  fiber2:   "assets/WhatsApp Image 2026-06-01 at 19.40.52.jpeg",
  fiber3:   "assets/WhatsApp Image 2026-06-01 at 19.40.57 (1).jpeg",
  fiber4:   "assets/WhatsApp Image 2026-06-01 at 19.40.57 (2).jpeg",
  fiber5:   "assets/WhatsApp Image 2026-06-01 at 19.40.54 (1).jpeg",
  fiber6:   "assets/WhatsApp Image 2026-06-01 at 19.40.55.jpeg",
  fiber7:   "assets/WhatsApp Image 2026-06-01 at 19.40.56.jpeg",
  fiber8:   "assets/WhatsApp Image 2026-06-01 at 19.40.56 (1).jpeg",
  // MS Iron / Furniture
  ms1:      "assets/WhatsApp Image 2026-06-01 at 19.40.53.jpeg",
  ms2:      "assets/WhatsApp Image 2026-06-01 at 19.40.53 (2).jpeg",
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NAVBAR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Navbar({ navigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const links = [
    { label: "होम", page: "home" },
    { label: "हमारे बारे में", page: "about" },
    { label: "सेवाएं", page: "services" },
    { label: "गैलरी", page: "gallery" },
    { label: "करियर", page: "career" },
    { label: "संपर्क करें", page: "contact" },
  ]

  const handleNav = (page) => { navigate(page); setMenuOpen(false) }

  return (
    <>
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
      background: "rgba(13,5,0,0.97)", backdropFilter: "blur(12px)",
      borderBottom: `2px solid ${THEME.gold}`,
      boxShadow: scrolled ? "0 4px 32px rgba(201,168,76,0.18)" : "none",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <button onClick={() => handleNav("home")} style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="assets/logo.png"
            alt="जय माँ अम्बे फाइबर वर्कशॉप लोगो"
            style={{ height: 48, width: 48, borderRadius: "50%", objectFit: "cover", border: `2px solid ${THEME.gold}`, boxShadow: `0 0 10px ${THEME.gold}60` }}
          />
          <span style={{ lineHeight: 1.2, textAlign: "left" }}>
            <span style={{ display: "block", fontSize: "1rem", fontWeight: 700, color: THEME.gold, fontFamily: "'Tiro Devanagari Hindi', serif" }}>जय माँ अम्बे</span>
            <span style={{ display: "block", fontSize: "0.72rem", color: THEME.textMuted, fontFamily: "'Hind', sans-serif", fontWeight: 400 }}>फाइबर वर्कशॉप</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex" style={{ gap: 4 }}>
          {links.map(l => (
            <button key={l.page} onClick={() => handleNav(l.page)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: currentPage === l.page ? THEME.goldLight : THEME.textMuted,
              fontWeight: currentPage === l.page ? 700 : 400,
              fontSize: "0.9rem", padding: "6px 12px",
              borderBottom: currentPage === l.page ? `2px solid ${THEME.goldLight}` : "2px solid transparent",
              transition: "all 0.2s", fontFamily: "'Hind', sans-serif",
            }}
              onMouseEnter={e => { if (currentPage !== l.page) e.currentTarget.style.color = THEME.gold }}
              onMouseLeave={e => { if (currentPage !== l.page) e.currentTarget.style.color = THEME.textMuted }}
            >{l.label}</button>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="मेनू खोलें"
          style={{
            background: menuOpen ? `${THEME.gold}22` : "none",
            border: `1.5px solid ${THEME.gold}`,
            borderRadius: 10,
            color: THEME.gold,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
            width: 44, height: 44,
            transition: "all 0.2s",
          }}
        >
          {menuOpen ? <X size={22} /> : (
            <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "center" }}>
              <span style={{ display: "block", width: 22, height: 2, background: THEME.gold, borderRadius: 2 }} />
              <span style={{ display: "block", width: 16, height: 2, background: THEME.gold, borderRadius: 2 }} />
              <span style={{ display: "block", width: 22, height: 2, background: THEME.gold, borderRadius: 2 }} />
            </div>
          )}
        </button>
      </div>
    </nav>

    {/* ── MOBILE FULL-SCREEN OVERLAY ── */}
    {menuOpen && (
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(8,2,0,0.97)",
        backdropFilter: "blur(16px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        overflowY: "auto",
      }}>
        {/* X Close */}
        <button
          onClick={() => setMenuOpen(false)}
          style={{
            position: "absolute", top: 18, right: 18,
            background: `${THEME.gold}22`,
            border: `1.5px solid ${THEME.gold}`,
            borderRadius: "50%",
            width: 50, height: 50,
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: THEME.gold,
          }}
        ><X size={24} /></button>

        {/* Logo */}
        <img src="assets/logo.png" alt="लोगो" style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${THEME.gold}`, objectFit: "cover", boxShadow: `0 0 30px ${THEME.gold}60`, marginBottom: 10 }} />
        <div style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.05rem", fontWeight: 700 }}>जय माँ अम्बे</div>
        <div style={{ color: THEME.textMuted, fontSize: "0.78rem", marginBottom: 24 }}>फाइबर वर्कशॉप</div>

        {/* Gold divider */}
        <div style={{ width: 100, height: 1, background: `linear-gradient(90deg,transparent,${THEME.gold},transparent)`, marginBottom: 24 }} />

        {/* Nav Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 310 }}>
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => handleNav(l.page)}
              style={{
                background: currentPage === l.page ? `${THEME.gold}22` : "transparent",
                border: `1.5px solid ${currentPage === l.page ? THEME.gold : THEME.gold + "40"}`,
                borderRadius: 14,
                cursor: "pointer",
                color: currentPage === l.page ? THEME.goldLight : THEME.textMuted,
                fontWeight: currentPage === l.page ? 700 : 500,
                fontSize: "1.1rem",
                padding: "15px 0",
                width: "100%",
                fontFamily: "'Hind', sans-serif",
                transition: "all 0.18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${THEME.gold}22`; e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.color = THEME.goldLight }}
              onMouseLeave={e => {
                e.currentTarget.style.background = currentPage === l.page ? `${THEME.gold}22` : "transparent"
                e.currentTarget.style.borderColor = currentPage === l.page ? THEME.gold : `${THEME.gold}40`
                e.currentTarget.style.color = currentPage === l.page ? THEME.goldLight : THEME.textMuted
              }}
            >{l.label}</button>
          ))}
        </div>

        {/* Call CTA */}
        <a href="tel:9102556441" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: `linear-gradient(135deg,${THEME.goldLight},${THEME.gold})`,
          color: "#0d0500", fontWeight: 700, fontSize: "1rem",
          padding: "13px 32px", borderRadius: 999, textDecoration: "none",
          boxShadow: `0 4px 20px ${THEME.gold}50`, marginTop: 28,
        }}>📞 9102556441</a>
      </div>
    )}
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PAGE HEADER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function PageHeader({ title, sub, breadcrumb, navigate }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, #1a0a00 0%, #0d0500 60%, #2d1200 100%)`,
      borderBottom: `2px solid ${THEME.gold}`,
      padding: "5rem 1.5rem 3rem", textAlign: "center",
    }}>
      {breadcrumb && (
        <div style={{ color: THEME.textMuted, fontSize: "0.85rem", marginBottom: 12 }}>
          <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: THEME.gold, fontSize: "0.85rem" }}>होम</button>
          <span style={{ margin: "0 8px" }}>›</span><span>{title}</span>
        </div>
      )}
      <h1 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: THEME.goldLight, margin: 0, marginBottom: 12 }}>{title}</h1>
      {sub && <p style={{ color: THEME.textMuted, fontSize: "1.05rem", margin: 0 }}>{sub}</p>}
      <div style={{ width: 80, height: 3, background: `linear-gradient(90deg, transparent, ${THEME.gold}, transparent)`, margin: "1.2rem auto 0" }} />
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// HOME PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function HomePage({ navigate }) {

  const galleryPreview = [
    { src: IMG.stage1, caption: "भव्य शादी स्टेज" },
    { src: IMG.led1,   caption: "LED हार्ट बैकड्रॉप" },
    { src: IMG.fiber1, caption: "फाइबर प्लेग्राउंड" },
  ]

  const services = [
    { icon: <Wrench size={36} />, title: "MS लोहे के डिज़ाइन", desc: "शादी-विवाह, पार्टी, रिसेप्शन के लिए मजबूत और सुंदर MS लोहे के सजावटी सामान।" },
    { icon: <Package size={36} />, title: "फाइबर उत्पाद", desc: "प्लेग्राउंड, हल्दी टब, डस्टबिन और अन्य फाइबर उत्पाद — टिकाऊ और आकर्षक।" },
    { icon: <Palette size={36} />, title: "स्टेज और इवेंट डेकोर", desc: "शादी स्टेज, LED डेकोर और रिसेप्शन बैकड्रॉप — हर आयोजन के लिए।" },
  ]

  const stats = [
    { icon: "🏆", val: "500+", label: "प्रोजेक्ट" },
    { icon: "🎨", val: "50+", label: "डिज़ाइन" },
    { icon: "⭐", val: "100%", label: "संतुष्ट" },
    { icon: "📅", val: "10+", label: "साल" },
  ]

  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        backgroundImage: `url('${IMG.heroBg}')`,
        backgroundSize: "cover", backgroundPosition: "center",
        padding: "100px 1.5rem 3rem",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(13,5,0,0.9) 0%, rgba(50,20,0,0.82) 100%)" }} />
        <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${THEME.gold}, transparent)`, animation: "shimmer 2.5s ease-in-out infinite", opacity: 0.5 }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820, animation: "fadeInUp 0.8s ease both" }}>
          <div style={{ display: "inline-block", border: `1px solid ${THEME.gold}`, borderRadius: 999, padding: "6px 20px", marginBottom: 24, color: THEME.goldLight, fontSize: "0.85rem" }}>
            ✨ मुजफ्फरपुर की नंबर 1 वर्कशॉप
          </div>
          <h1 style={{
            fontFamily: "'Tiro Devanagari Hindi', serif",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold}, ${THEME.goldDark})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            margin: "0 0 1.2rem", lineHeight: 1.3,
          }}>शादी-विवाह और हर आयोजन को बनाएं यादगार</h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", marginBottom: "2rem", lineHeight: 1.7, color: "#e8d5b0" }}>
            MS लोहे और फाइबर से बने खूबसूरत सजावटी उत्पाद —<br />आपके बजट में, आपके डिज़ाइन में
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a href="tel:9102556441" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
              color: "#0d0500", fontWeight: 700, fontSize: "1rem",
              padding: "14px 32px", borderRadius: 999, textDecoration: "none",
              boxShadow: `0 4px 20px ${THEME.gold}60`, transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 8px 30px ${THEME.gold}80` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 4px 20px ${THEME.gold}60` }}
            >📞 अभी कॉल करें</a>
            <button onClick={() => navigate("gallery")} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              border: `2px solid ${THEME.gold}`, color: THEME.goldLight,
              background: "transparent", fontWeight: 600, fontSize: "1rem",
              padding: "12px 32px", borderRadius: 999, cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = `${THEME.gold}22`; e.currentTarget.style.transform = "scale(1.05)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)" }}
            >🖼️ गैलरी देखें</button>
          </div>

          {/* Stats strip */}
          <div style={{
            display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap",
            background: "rgba(13,5,0,0.75)", border: `1px solid ${THEME.gold}44`,
            borderRadius: 16, padding: "18px 24px", backdropFilter: "blur(8px)",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{ textAlign: "center", padding: "0 16px" }}>
                <div style={{ fontSize: "1.4rem", marginBottom: 2 }}>{s.icon}</div>
                <div style={{ color: THEME.goldLight, fontWeight: 700, fontSize: "1.3rem" }}>{s.val}</div>
                <div style={{ color: THEME.textMuted, fontSize: "0.8rem" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2.2rem", margin: 0 }}>हमारी सेवाएं</h2>
            <div style={{ width: 60, height: 2, background: THEME.gold, marginTop: 8 }} />
          </div>
          <button onClick={() => navigate("services")} style={{ background: "none", border: `1px solid ${THEME.gold}`, color: THEME.gold, borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: "0.95rem" }}>और देखें →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: THEME.bgCard, border: `1px solid ${THEME.gold}30`, borderRadius: 16, padding: "2rem", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.background = THEME.bgCardHover; e.currentTarget.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.background = THEME.bgCard; e.currentTarget.style.transform = "translateY(0)" }}
            >
              <div style={{ color: THEME.gold, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.3rem", margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ color: THEME.textMuted, margin: 0, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY PREVIEW ── */}
      <section style={{ padding: "0 1.5rem 5rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2.2rem", margin: 0 }}>काम की झलक</h2>
            <div style={{ width: 60, height: 2, background: THEME.gold, marginTop: 8 }} />
          </div>
          <button onClick={() => navigate("gallery")} style={{ background: "none", border: `1px solid ${THEME.gold}`, color: THEME.gold, borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: "0.95rem" }}>पूरी गैलरी →</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {galleryPreview.map((img, i) => (
            <div key={i} onClick={() => navigate("gallery")} style={{
              borderRadius: 16, overflow: "hidden", cursor: "pointer",
              border: `1px solid ${THEME.gold}30`, transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.boxShadow = `0 8px 30px ${THEME.gold}40` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.boxShadow = "none" }}
            >
              <img src={img.src} alt={img.caption} style={{ width: "100%", height: 240, objectFit: "cover", display: "block" }} />
              <div style={{ background: THEME.bgCard, padding: "12px 16px", color: THEME.goldLight, fontWeight: 600 }}>{img.caption}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OWNER INTRO SECTION ── */}
      <section style={{
        background: `linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0800 100%)`,
        borderTop: `2px solid ${THEME.gold}40`, borderBottom: `2px solid ${THEME.gold}40`,
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          {/* Owner Photo */}
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div style={{
              width: 180, height: 180, borderRadius: "50%", overflow: "hidden",
              border: `4px solid ${THEME.gold}`,
              boxShadow: `0 0 30px ${THEME.gold}60, 0 0 60px ${THEME.gold}30`,
              animation: "pulse-gold 2.5s ease-in-out infinite",
              margin: "0 auto 14px",
            }}>
              <img src={IMG.owner} alt="रणधीर कुमार — संस्थापक" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
              color: "#0d0500", fontWeight: 700, fontSize: "0.95rem",
              padding: "6px 20px", borderRadius: 999, display: "inline-block",
            }}>रणधीर कुमार</div>
          </div>

          {/* Bio */}
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ color: THEME.gold, fontSize: "0.85rem", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>संस्थापक एवं मालिक</p>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: "0 0 8px" }}>जय माँ अम्बे फाइबर वर्कशॉप</h2>
            <div style={{ width: 60, height: 2, background: THEME.gold, marginBottom: 20 }} />
            <p style={{ color: THEME.textMuted, lineHeight: 1.9, fontSize: "1rem", marginBottom: 24 }}>
              नमस्कार! मैं रणधीर कुमार हूँ। पिछले <strong style={{ color: THEME.goldLight }}>10+ वर्षों</strong> से मुजफ्फरपुर में
              MS लोहे और फाइबर से शादी-विवाह, पार्टी, स्टेज डेकोरेशन और फाइबर उत्पाद बना रहे हैं।
              <br /><strong style={{ color: THEME.goldLight }}>उच्च गुणवत्ता, समय पर डिलीवरी और ग्राहक संतुष्टि</strong> — हमारी पहचान।
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => navigate("about")} style={{
                background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
                color: "#0d0500", fontWeight: 700, padding: "12px 28px",
                borderRadius: 999, border: "none", cursor: "pointer", fontSize: "0.95rem",
                transition: "transform 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >हमारे बारे में जानें →</button>
              <a href="tel:9102556441" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                border: `2px solid ${THEME.gold}`, color: THEME.goldLight,
                background: "transparent", fontWeight: 600, padding: "10px 24px",
                borderRadius: 999, textDecoration: "none", fontSize: "0.95rem",
              }}>📞 9102556441</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{
        background: `linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0800 100%)`,
        borderBottom: `2px solid ${THEME.gold}`,
        padding: "3rem 1.5rem", textAlign: "center",
      }}>
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "clamp(1.4rem, 3vw, 2rem)", margin: "0 0 1.2rem" }}>
          कुशल कारीगरों की आवश्यकता है — अभी संपर्क करें!
        </h2>
        <button onClick={() => navigate("career")} style={{
          background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
          color: "#0d0500", fontWeight: 700, fontSize: "1rem",
          padding: "14px 36px", borderRadius: 999, border: "none", cursor: "pointer",
          boxShadow: `0 4px 20px ${THEME.gold}60`, transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >📋 विवरण देखें</button>
      </section>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ABOUT PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AboutPage({ navigate }) {
  const [counts, setCounts] = useState({ projects: 0, designs: 0, satisfaction: 0 })

  useEffect(() => {
    const targets = { projects: 500, designs: 50, satisfaction: 100 }
    let step = 0; const steps = 60; const interval = 1800 / steps
    const timer = setInterval(() => {
      step++; const ease = 1 - Math.pow(1 - step / steps, 3)
      setCounts({ projects: Math.round(targets.projects * ease), designs: Math.round(targets.designs * ease), satisfaction: Math.round(targets.satisfaction * ease) })
      if (step >= steps) clearInterval(timer)
    }, interval)
    return () => clearInterval(timer)
  }, [])

  const features = [
    { icon: "✅", title: "उच्च गुणवत्ता", desc: "हर उत्पाद में सर्वोच्च गुणवत्ता और शिल्पकारी।" },
    { icon: "⏰", title: "समय पर डिलीवरी", desc: "आपका आयोजन समय पर हो — हम वचन देते हैं।" },
    { icon: "💰", title: "उचित मूल्य", desc: "बेहतरीन गुणवत्ता, आपके बजट में।" },
    { icon: "🤝", title: "ग्राहक सेवा", desc: "हर ग्राहक हमारे लिए पहली प्राथमिकता है।" },
  ]

  return (
    <div>
      <PageHeader title="हमारे बारे में" breadcrumb navigate={navigate} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Owner Section */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center", marginBottom: "5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 240, height: 240, borderRadius: "50%", overflow: "hidden",
              border: `4px solid ${THEME.gold}`,
              boxShadow: `0 0 30px ${THEME.gold}60, 0 0 60px ${THEME.gold}30`,
              animation: "pulse-gold 2s ease-in-out infinite",
            }}>
              <img src={IMG.owner} alt="रणधीर कुमार — संस्थापक जय माँ अम्बे फाइबर वर्कशॉप" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, fontSize: "1rem", padding: "8px 24px", borderRadius: 999 }}>रणधीर कुमार</div>
          </div>
          <div>
            <p style={{ color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 6 }}>संस्थापक एवं मालिक</p>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2.5rem", margin: "0 0 6px" }}>रणधीर कुमार</h2>
            <p style={{ color: THEME.gold, fontStyle: "italic", fontSize: "1.1rem", marginBottom: "1.5rem" }}>जय माँ अम्बे फाइबर वर्कशॉप</p>
            <p style={{ color: THEME.textMuted, lineHeight: 1.9, fontSize: "1rem", marginBottom: "2rem" }}>
              नमस्कार! मैं रणधीर कुमार हूँ। पिछले कई वर्षों से हम मुजफ्फरपुर में
              MS लोहे और फाइबर से शादी-विवाह, पार्टी, रिसेप्शन और स्टेज डेकोरेशन
              के सामान बना रहे हैं। हमारा उद्देश्य है — उच्च गुणवत्ता, समय पर
              डिलीवरी और हर ग्राहक की संतुष्टि।
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="mailto:Kumarrandhir1313@gmail.com" style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.goldLight, textDecoration: "none", fontSize: "0.95rem" }}>
                <Mail size={18} color={THEME.gold} /> Kumarrandhir1313@gmail.com
              </a>
              <a href="tel:9102556441" style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.goldLight, textDecoration: "none", fontSize: "0.95rem" }}>
                <Phone size={18} color={THEME.gold} /> 9102556441
              </a>
            </div>
          </div>
        </div>

        {/* Animated Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: "5rem", background: THEME.bgCard, borderRadius: 20, padding: "3rem 2rem", border: `1px solid ${THEME.gold}30` }}>
          {[{ val: counts.projects + "+", label: "सफल प्रोजेक्ट" }, { val: counts.designs + "+", label: "अनोखे डिज़ाइन" }, { val: counts.satisfaction + "%", label: "संतुष्ट ग्राहक" }].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: THEME.goldLight }}>{s.val}</div>
              <div style={{ color: THEME.textMuted, fontSize: "1rem", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2rem", marginBottom: "2rem", textAlign: "center" }}>हमें क्यों चुनें?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: THEME.bgCard, border: `1px solid ${THEME.gold}30`, borderRadius: 16, padding: "1.8rem", textAlign: "center", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.transform = "translateY(0)" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ color: THEME.goldLight, fontSize: "1.1rem", margin: "0 0 8px", fontFamily: "'Tiro Devanagari Hindi', serif" }}>{f.title}</h3>
              <p style={{ color: THEME.textMuted, margin: 0, fontSize: "0.9rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SERVICES PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ServicesPage({ navigate }) {
  const services = [
    {
      img: IMG.stage4, imgAlt: "स्टेज ट्री पिलर MS लोहे",
      title: "MS लोहे के डिज़ाइन",
      points: ["शादी-विवाह, पार्टी, रिसेप्शन के लिए सजावटी सामान", "डिजाइन के अनुसार फैब्रिकेशन और फिनिशिंग", "समय पर डिलीवरी, मजबूत निर्माण", "कस्टम डिज़ाइन उपलब्ध"],
    },
    {
      img: IMG.fiber1, imgAlt: "फाइबर प्लेग्राउंड और उत्पाद",
      title: "फाइबर उत्पाद",
      points: ["प्लेग्राउंड उपकरण निर्माण", "हल्दी टब (फाइबर) बनाना", "फाइबर फर्नीचर और डस्टबिन", "मजबूत और टिकाऊ फिनिशिंग"],
    },
    {
      img: IMG.stage1, imgAlt: "भव्य शादी स्टेज इवेंट डेकोर",
      title: "स्टेज और इवेंट डेकोर",
      points: ["शादी स्टेज सजावट", "LED और नियॉन डेकोर", "रिसेप्शन बैकड्रॉप", "पूरे इवेंट का सेटअप"],
    },
  ]

  const steps = [
    { num: "1️⃣", title: "संपर्क करें", desc: "कॉल या WhatsApp करें" },
    { num: "2️⃣", title: "डिज़ाइन चुनें", desc: "मनपसंद डिज़ाइन चुनें" },
    { num: "3️⃣", title: "निर्माण", desc: "कुशल कारीगरों द्वारा" },
    { num: "4️⃣", title: "डिलीवरी", desc: "समय पर डिलीवरी" },
  ]

  return (
    <div>
      <PageHeader title="हमारी सेवाएं" sub="हर आयोजन के लिए बेहतरीन समाधान" breadcrumb navigate={navigate} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: "5rem" }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: THEME.bgCard, borderRadius: 20, overflow: "hidden", border: `1px solid ${THEME.gold}30`, borderTop: `3px solid ${THEME.gold}`, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${THEME.gold}30` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
            >
              <div style={{ width: "100%", paddingBottom: "56.25%", position: "relative", overflow: "hidden" }}>
                <img src={s.img} alt={s.imgAlt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "1.8rem" }}>
                <h3 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "1.4rem", margin: "0 0 1.2rem" }}>{s.title}</h3>
                <ul style={{ margin: "0 0 1.5rem", padding: 0, listStyle: "none" }}>
                  {s.points.map((p, j) => (
                    <li key={j} style={{ color: THEME.textMuted, padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 10, borderBottom: `1px solid ${THEME.gold}18` }}>
                      <span style={{ color: THEME.gold, marginTop: 2 }}>◆</span><span>{p}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => navigate("contact")} style={{ background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, padding: "12px 28px", borderRadius: 999, border: "none", cursor: "pointer", width: "100%", fontSize: "0.95rem" }}>📞 ऑर्डर करें</button>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2rem", textAlign: "center", marginBottom: "3rem" }}>हम कैसे काम करते हैं?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16 }}>
          {steps.map((st, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ background: THEME.bgCard, border: `2px solid ${THEME.gold}`, borderRadius: 16, padding: "1.5rem 1.8rem", textAlign: "center", minWidth: 150 }}>
                <div style={{ fontSize: "2rem", marginBottom: 8 }}>{st.num}</div>
                <div style={{ color: THEME.goldLight, fontWeight: 700, fontSize: "1rem", marginBottom: 6 }}>{st.title}</div>
                <div style={{ color: THEME.textMuted, fontSize: "0.85rem" }}>{st.desc}</div>
              </div>
              {i < steps.length - 1 && <div style={{ color: THEME.gold, fontSize: "1.5rem" }}>→</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GALLERY PAGE — All 20 real images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("सभी")
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  const filters = ["सभी", "स्टेज डेकोरेशन", "LED डेकोर", "फाइबर उत्पाद", "MS लोहे"]

  const galleryItems = [
    // स्टेज डेकोरेशन
    { id:1,  src: IMG.stage1,   caption: "भव्य शादी स्टेज",           category: "स्टेज डेकोरेशन" },
    { id:2,  src: IMG.stage2,   caption: "राजस्थानी शादी स्टेज",      category: "स्टेज डेकोरेशन" },
    { id:3,  src: IMG.stage3,   caption: "भव्य आर्च वेन्यू",          category: "स्टेज डेकोरेशन" },
    { id:4,  src: IMG.stage4,   caption: "स्टेज ट्री पिलर",           category: "स्टेज डेकोरेशन" },
    { id:5,  src: IMG.stage5,   caption: "कमल फूल बैकड्रॉप",         category: "स्टेज डेकोरेशन" },
    { id:6,  src: IMG.stage6,   caption: "गोल्ड फूल सेंटरपीस",        category: "स्टेज डेकोरेशन" },
    { id:7,  src: IMG.stage7,   caption: "लक्जरी बैंक्वेट हॉल",      category: "स्टेज डेकोरेशन" },
    // LED डेकोर
    { id:8,  src: IMG.led1,     caption: "LED हार्ट बैकड्रॉप",       category: "LED डेकोर" },
    { id:9,  src: IMG.led2,     caption: "LED मंडल डेकोरेशन",        category: "LED डेकोर" },
    { id:10, src: IMG.led3,     caption: "LED क्यूब लाइट",            category: "LED डेकोर" },
    { id:11, src: IMG.led4,     caption: "LED नियॉन पैनल",            category: "LED डेकोर" },
    { id:12, src: IMG.led5,     caption: "LED स्टार डेकोर",           category: "LED डेकोर" },
    // फाइबर उत्पाद
    { id:13, src: IMG.fiber1,   caption: "मल्टी प्लेग्राउंड सेट",    category: "फाइबर उत्पाद" },
    { id:14, src: IMG.fiber2,   caption: "डबल स्लाइड प्लेग्राउंड",   category: "फाइबर उत्पाद" },
    { id:15, src: IMG.fiber3,   caption: "कवर्ड प्लेग्राउंड",        category: "फाइबर उत्पाद" },
    { id:16, src: IMG.fiber4,   caption: "आउटडोर प्लेग्राउंड",       category: "फाइबर उत्पाद" },
    { id:17, src: IMG.fiber5,   caption: "एक्टिविटी टेबल सेट",       category: "फाइबर उत्पाद" },
    { id:18, src: IMG.fiber6,   caption: "लेक्चर चेयर सेट",          category: "फाइबर उत्पाद" },
    { id:19, src: IMG.fiber7,   caption: "डोरेमॉन डस्टबिन",          category: "फाइबर उत्पाद" },
    { id:20, src: IMG.fiber8,   caption: "रैबिट डस्टबिन",            category: "फाइबर उत्पाद" },
    // MS लोहे
    { id:21, src: IMG.ms1,      caption: "स्कूल डेस्क-बेंच",         category: "MS लोहे" },
    { id:22, src: IMG.ms2,      caption: "डेस्क-चेयर सेट",           category: "MS लोहे" },
  ]

  const filtered = activeFilter === "सभी" ? galleryItems : galleryItems.filter(i => i.category === activeFilter)

  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox.open) return
      if (e.key === "Escape") setLightbox({ open: false, index: 0 })
      if (e.key === "ArrowRight") setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }))
      if (e.key === "ArrowLeft") setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }))
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [lightbox.open, filtered.length])

  return (
    <div>
      <PageHeader title="हमारे काम की झलक" sub="हर उत्पाद — हमारे हुनर की पहचान" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Filters */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: "3rem" }}>
          {filters.map(f => (
            <button key={f} onClick={() => { setActiveFilter(f); setLightbox({ open: false, index: 0 }) }} style={{
              padding: "10px 22px", borderRadius: 999, cursor: "pointer",
              fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s",
              background: activeFilter === f ? `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})` : "transparent",
              color: activeFilter === f ? "#0d0500" : THEME.gold,
              border: `2px solid ${THEME.gold}`,
            }}>{f}</button>
          ))}
        </div>

        {/* Count badge */}
        <p style={{ color: THEME.textMuted, textAlign: "center", marginBottom: "2rem", fontSize: "0.9rem" }}>
          <span style={{ color: THEME.goldLight, fontWeight: 700 }}>{filtered.length}</span> उत्पाद दिखाए जा रहे हैं
        </p>

        {/* Grid */}
        <div className="gallery-grid" style={{ display: "grid", gap: 20 }}>
          {filtered.map((item, i) => (
            <div key={item.id} onClick={() => setLightbox({ open: true, index: i })} style={{
              borderRadius: 16, overflow: "hidden", cursor: "pointer",
              border: `1px solid ${THEME.gold}30`, transition: "all 0.3s", position: "relative",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.boxShadow = `0 8px 30px ${THEME.gold}40` }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.boxShadow = "none" }}
            >
              <div style={{ position: "relative", overflow: "hidden" }}>
                <img src={item.src} alt={item.caption} style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: 0, transition: "opacity 0.3s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "1"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "0"}
                >
                  <span style={{ color: THEME.white, fontSize: "1rem", fontWeight: 600 }}>🔍 बड़ा देखें</span>
                </div>
              </div>
              <div style={{ background: THEME.bgCard, padding: "10px 14px" }}>
                <div style={{ color: THEME.goldLight, fontWeight: 600, fontSize: "0.9rem" }}>{item.caption}</div>
                <div style={{ color: THEME.textMuted, fontSize: "0.75rem", marginTop: 3 }}>{item.category}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && (
        <div onClick={() => setLightbox({ open: false, index: 0 })} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.96)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setLightbox({ open: false, index: 0 })} style={{ position: "absolute", top: 20, right: 20, background: `${THEME.gold}22`, border: `1px solid ${THEME.gold}`, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: THEME.gold, zIndex: 201 }}><X size={22} /></button>
          <button onClick={e => { e.stopPropagation(); setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length })) }} style={{ position: "absolute", left: 16, background: `${THEME.gold}22`, border: `1px solid ${THEME.gold}`, borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: THEME.gold, zIndex: 201 }}><ChevronLeft size={28} /></button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "85vw", textAlign: "center" }}>
            <img src={filtered[lightbox.index]?.src} alt={filtered[lightbox.index]?.caption} style={{ maxWidth: "85vw", maxHeight: "75vh", objectFit: "contain", borderRadius: 12, border: `2px solid ${THEME.gold}` }} />
            <p style={{ color: THEME.goldLight, marginTop: 16, fontSize: "1.1rem", fontWeight: 600 }}>{filtered[lightbox.index]?.caption}</p>
            <p style={{ color: THEME.textMuted, fontSize: "0.85rem", marginTop: 4 }}>{lightbox.index + 1} / {filtered.length}</p>
          </div>
          <button onClick={e => { e.stopPropagation(); setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length })) }} style={{ position: "absolute", right: 16, background: `${THEME.gold}22`, border: `1px solid ${THEME.gold}`, borderRadius: "50%", width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: THEME.gold, zIndex: 201 }}><ChevronRight size={28} /></button>
        </div>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CAREER PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CareerPage({ navigate }) {
  const jobs = [
    {
      icon: "⚙️", title: "MS लोहे के बिल्डर",
      whatsappText: "मुझे MS लोहे के बिल्डर पद के लिए आवेदन करना है",
      work: ["शादी-विवाह, पार्टी, रिसेप्शन, स्टेज के लिए सजावटी सामान बनाना", "डिजाइन के अनुसार फैब्रिकेशन और फिनिशिंग करना", "गेट, ग्रिल, रेलिंग का काम नहीं — केवल इवेंट डेकोर", "समय पर, बेहतर और मजबूत कार्य करना"],
      qual: ["अनुभवी और जिम्मेदार कारीगर", "MS लोहे के काम का अनुभव जरूरी"],
    },
    {
      icon: "🏺", title: "हल्दी टब मोल्डर",
      whatsappText: "मुझे हल्दी टब मोल्डर पद के लिए आवेदन करना है",
      work: ["हल्दी टब (फाइबर) के मोल्ड बनाने का कार्य", "मजबूत, फिनिशिंग युक्त और अच्छी क्वालिटी वाले मोल्ड", "डिजाइन के अनुसार काम करने का अनुभव जरूरी", "लंबी अवधि तक चलने वाले मोल्ड बनाने में कुशल हो"],
      qual: ["फाइबर मोल्डिंग का अनुभव आवश्यक", "अच्छा फिनिशिंग कार्य करने में सक्षम"],
    },
  ]

  const benefits = [
    { icon: "💰", title: "उचित मजदूरी", desc: "काम के अनुसार उचित भुगतान।" },
    { icon: "⏰", title: "समय पर भुगतान", desc: "कोई देरी नहीं — आपका हक़ समय पर।" },
    { icon: "👥", title: "लंबे समय का काम", desc: "स्थायी रोजगार का अवसर।" },
    { icon: "🌟", title: "बेहतर माहौल", desc: "सुरक्षित और सम्मानजनक कार्यस्थल।" },
  ]

  return (
    <div>
      <PageHeader title="आवश्यकता है — कुशल कारीगरों की" sub="जय माँ अम्बे फाइबर वर्कशॉप, मुजफ्फरपुर में अनुभवी कारीगरों की तलाश है" breadcrumb navigate={navigate} />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        {/* Flyer image */}
        <div style={{ marginBottom: "3rem", borderRadius: 20, overflow: "hidden", border: `2px solid ${THEME.gold}`, boxShadow: `0 0 40px ${THEME.gold}30`, maxWidth: 600, margin: "0 auto 3rem" }}>
          <img src={IMG.flyer} alt="जय माँ अम्बे फाइबर वर्कशॉप करियर फ्लायर" style={{ width: "100%", display: "block" }} />
        </div>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#3d0000", border: "2px solid #ff4444", borderRadius: 999, padding: "10px 28px", color: "#ff6666", fontWeight: 700 }}>
            🔴 अभी आवेदन स्वीकार किए जा रहे हैं
          </div>
        </div>

        {/* Job Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginBottom: "4rem" }}>
          {jobs.map((job, i) => (
            <div key={i} style={{ background: THEME.bgCard, borderRadius: 20, overflow: "hidden", border: `1px solid ${THEME.gold}40`, borderTop: `4px solid ${THEME.gold}` }}>
              <div style={{ background: `linear-gradient(135deg, #2d1200, #1a0a00)`, padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: "2rem" }}>{job.icon}</span>
                  <h3 style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.3rem", margin: 0 }}>{job.title}</h3>
                </div>
                <div style={{ background: "#1a4d00", border: "1px solid #4CAF50", borderRadius: 999, padding: "4px 14px", color: "#81C784", fontSize: "0.8rem", fontWeight: 600 }}>पद उपलब्ध</div>
              </div>
              <div style={{ padding: "1.8rem" }}>
                <p style={{ color: THEME.gold, fontWeight: 700, marginBottom: 8 }}>कार्य विवरण:</p>
                <ul style={{ margin: "0 0 1.5rem", padding: 0, listStyle: "none" }}>
                  {job.work.map((w, j) => (<li key={j} style={{ color: THEME.textMuted, padding: "5px 0", display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.92rem" }}><span style={{ color: THEME.gold }}>•</span><span>{w}</span></li>))}
                </ul>
                <p style={{ color: THEME.gold, fontWeight: 700, marginBottom: 8 }}>योग्यता:</p>
                <ul style={{ margin: "0 0 1.8rem", padding: 0, listStyle: "none" }}>
                  {job.qual.map((q, j) => (<li key={j} style={{ color: THEME.textMuted, padding: "5px 0", display: "flex", gap: 10, alignItems: "flex-start", fontSize: "0.92rem" }}><span style={{ color: THEME.gold }}>✓</span><span>{q}</span></li>))}
                </ul>
                <a href={`https://wa.me/919102556441?text=${encodeURIComponent(job.whatsappText)}`} target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: "#25D366", color: THEME.white, fontWeight: 700, padding: "14px", borderRadius: 12, textDecoration: "none", fontSize: "0.95rem" }}>
                  {job.icon} WhatsApp पर आवेदन करें
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "1.8rem", textAlign: "center", marginBottom: "2rem" }}>हमारे साथ काम करने के लाभ</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: "4rem" }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ background: THEME.bgCard, border: `1px solid ${THEME.gold}30`, borderRadius: 16, padding: "1.8rem", textAlign: "center", transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.transform = "translateY(-4px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.transform = "translateY(0)" }}
            >
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>{b.icon}</div>
              <h3 style={{ color: THEME.goldLight, fontSize: "1rem", margin: "0 0 8px", fontFamily: "'Tiro Devanagari Hindi', serif" }}>{b.title}</h3>
              <p style={{ color: THEME.textMuted, margin: 0, fontSize: "0.88rem", lineHeight: 1.6 }}>{b.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center", background: THEME.bgCard, borderRadius: 20, padding: "3rem", border: `1px solid ${THEME.gold}30` }}>
          <p style={{ color: THEME.textMuted, marginBottom: 16, fontSize: "1.1rem" }}>सीधे बात करें:</p>
          <a href="tel:9102556441" style={{ display: "inline-block", color: THEME.goldLight, textDecoration: "none", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 800, letterSpacing: 2 }}>📞 9102556441</a>
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CONTACT PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ContactPage() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = e => {
    e.preventDefault()
    const msg = `नमस्कार रणधीर जी!\nमेरा नाम ${formData.name} है।\nमोबाइल: ${formData.phone}\nसंदेश: ${formData.message}`
    window.open(`https://wa.me/919102556441?text=${encodeURIComponent(msg)}`, "_blank")
  }
  const inputStyle = { width: "100%", padding: "14px 16px", borderRadius: 10, background: "#1a0a00", border: `1.5px solid ${THEME.gold}50`, color: THEME.white, fontSize: "0.95rem", outline: "none", boxSizing: "border-box", fontFamily: "'Hind', sans-serif", transition: "border-color 0.2s" }

  return (
    <div>
      <PageHeader title="संपर्क करें" sub="हम आपकी सेवा के लिए तत्पर हैं" />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48 }}>
          <div>
            <a href="tel:9102556441" style={{ display: "block", color: THEME.goldLight, textDecoration: "none", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, marginBottom: 16, letterSpacing: 1 }}>📞 9102556441</a>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.textMuted, marginBottom: 12 }}><Mail size={18} color={THEME.gold} /><span>Kumarrandhir1313@gmail.com</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.textMuted, marginBottom: "2.5rem" }}><MapPin size={18} color={THEME.gold} /><span>मुजफ्फरपुर, बिहार, भारत</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: "2.5rem" }}>
              <a href="tel:9102556441" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, padding: "15px", borderRadius: 12, textDecoration: "none", fontSize: "1rem" }}>📞 कॉल करें</a>
              <a href="https://wa.me/919102556441" target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, background: "#25D366", color: THEME.white, fontWeight: 700, padding: "15px", borderRadius: 12, textDecoration: "none", fontSize: "1rem" }}>💬 WhatsApp करें</a>
              <a href="mailto:Kumarrandhir1313@gmail.com" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, border: `2px solid ${THEME.gold}`, color: THEME.goldLight, background: "transparent", fontWeight: 700, padding: "13px", borderRadius: 12, textDecoration: "none", fontSize: "1rem" }}>📧 ईमेल करें</a>
            </div>
            <div style={{ background: THEME.bgCard, border: `1px solid ${THEME.gold}30`, borderRadius: 16, padding: "1.5rem" }}>
              <h3 style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.1rem", margin: "0 0 1rem" }}>🕐 कार्यालय समय</h3>
              <div style={{ color: THEME.textMuted, lineHeight: 2, fontSize: "0.92rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: `1px solid ${THEME.gold}20`, paddingBottom: 8, marginBottom: 8 }}>
                  <span>सोमवार - शनिवार</span><span style={{ color: THEME.goldLight }}>सुबह 9 - शाम 7</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>रविवार</span><span style={{ color: THEME.goldLight }}>सुबह 10 - दोपहर 2</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: THEME.bgCard, borderRadius: 20, padding: "2.5rem", border: `1px solid ${THEME.gold}30`, borderTop: `3px solid ${THEME.gold}` }}>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "1.6rem", margin: "0 0 1.8rem" }}>संदेश भेजें</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label style={{ color: THEME.textMuted, fontSize: "0.88rem", display: "block", marginBottom: 6 }}>नाम *</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="आपका नाम" style={inputStyle} onFocus={e => e.target.style.borderColor = THEME.gold} onBlur={e => e.target.style.borderColor = `${THEME.gold}50`} />
              </div>
              <div>
                <label style={{ color: THEME.textMuted, fontSize: "0.88rem", display: "block", marginBottom: 6 }}>मोबाइल नंबर *</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="आपका मोबाइल नंबर" style={inputStyle} onFocus={e => e.target.style.borderColor = THEME.gold} onBlur={e => e.target.style.borderColor = `${THEME.gold}50`} />
              </div>
              <div>
                <label style={{ color: THEME.textMuted, fontSize: "0.88rem", display: "block", marginBottom: 6 }}>आपका संदेश *</label>
                <textarea name="message" required rows={4} value={formData.message} onChange={handleChange} placeholder="अपनी जरूरत बताएं..." style={{ ...inputStyle, resize: "vertical", minHeight: 120 }} onFocus={e => e.target.style.borderColor = THEME.gold} onBlur={e => e.target.style.borderColor = `${THEME.gold}50`} />
              </div>
              <button type="submit" style={{ background: "#25D366", color: THEME.white, fontWeight: 700, fontSize: "1rem", padding: "15px", borderRadius: 12, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              ><MessageCircle size={20} /> WhatsApp पर भेजें</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FOOTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function Footer({ navigate }) {
  const links = [
    { label: "होम", page: "home" }, { label: "हमारे बारे में", page: "about" },
    { label: "सेवाएं", page: "services" }, { label: "गैलरी", page: "gallery" },
    { label: "करियर", page: "career" }, { label: "संपर्क", page: "contact" },
  ]
  return (
    <footer style={{ background: "#0a0300", borderTop: `2px solid ${THEME.gold}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: "3rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
              <img
                src="assets/logo.png"
                alt="जय माँ अम्बे फाइबर वर्कशॉप लोगो"
                style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `3px solid ${THEME.gold}`, boxShadow: `0 0 24px ${THEME.gold}60` }}
              />
              <div>
                <p style={{ color: THEME.goldLight, fontWeight: 700, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.05rem", margin: "0 0 4px" }}>जय माँ अम्बे फाइबर वर्कशॉप</p>
                <p style={{ color: THEME.textMuted, margin: "0 0 2px", fontSize: "0.85rem" }}>मुजफ्फरपुर, बिहार</p>
                <p style={{ color: THEME.textMuted, margin: 0, fontSize: "0.85rem" }}>संस्थापक: रणधीर कुमार</p>
              </div>
            </div>
          </div>
          <div>
            <h3 style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.1rem", margin: "0 0 1.2rem" }}>त्वरित लिंक</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {links.map(l => (
                <button key={l.page} onClick={() => navigate(l.page)} style={{ background: "none", border: "none", cursor: "pointer", color: THEME.textMuted, fontSize: "0.92rem", textAlign: "left", padding: 0, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = THEME.goldLight}
                  onMouseLeave={e => e.currentTarget.style.color = THEME.textMuted}
                >› {l.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.1rem", margin: "0 0 1.2rem" }}>संपर्क जानकारी</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="tel:9102556441" style={{ color: THEME.textMuted, textDecoration: "none", fontSize: "0.92rem" }}>📞 9102556441</a>
              <a href="mailto:Kumarrandhir1313@gmail.com" style={{ color: THEME.textMuted, textDecoration: "none", fontSize: "0.92rem", wordBreak: "break-all" }}>✉️ Kumarrandhir1313@gmail.com</a>
              <div style={{ color: THEME.textMuted, fontSize: "0.92rem" }}>📍 मुजफ्फरपुर, बिहार</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${THEME.gold}30`, borderBottom: `1px solid ${THEME.gold}30`, padding: "1.2rem", textAlign: "center", marginBottom: "1.5rem", background: `${THEME.gold}08` }}>
          <p style={{ color: THEME.gold, margin: 0, fontStyle: "italic", fontSize: "0.95rem" }}>✨ आज ही संपर्क करें और अपने हुनर को दें एक नई पहचान</p>
        </div>
        {/* ── SEO KEYWORD SECTION — visible for crawlers ── */}
        <div style={{ borderTop: `1px solid ${THEME.gold}20`, paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: THEME.textMuted, fontSize: "0.78rem", textAlign: "center", marginBottom: 10, letterSpacing: 0.5 }}>
            हमारी सेवाएं क्षेत्र | Our Services & Coverage
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {[
              "जय माँ अम्बे फाइबर वर्कशॉप",
              "Jai Maa Ambe Fiber Workshop",
              "माँ अम्बे फाइबर मुजफ्फरपुर",
              "Maa Ambe Fiber Muzaffarpur",
              "अम्बे फाइबर वर्कशॉप",
              "Ambe Fiber Workshop Bihar",
              "शादी स्टेज मुजफ्फरपुर",
              "Wedding Stage Muzaffarpur",
              "MS लोहे डेकोर बिहार",
              "MS Iron Decoration Bihar",
              "LED डेकोर मुजफ्फरपुर",
              "फाइबर प्लेग्राउंड बिहार",
              "हल्दी टब निर्माता",
              "Haldi Tub Manufacturer",
              "रणधीर कुमार मुजफ्फरपुर",
              "Randhir Kumar Muzaffarpur",
              "इवेंट डेकोर बिहार",
              "Event Decor Bihar",
            ].map((tag, i) => (
              <span key={i} style={{
                background: `${THEME.gold}10`,
                border: `1px solid ${THEME.gold}25`,
                borderRadius: 999,
                padding: "3px 10px",
                fontSize: "0.72rem",
                color: THEME.textMuted,
              }}>{tag}</span>
            ))}
          </div>
        </div>

        <p style={{ color: THEME.textMuted, textAlign: "center", margin: 0, fontSize: "0.85rem" }}>© 2024 जय माँ अम्बे फाइबर वर्कशॉप | सर्वाधिकार सुरक्षित | रणधीर कुमार</p>
      </div>
    </footer>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN APP
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function App() {
  const [currentPage, setCurrentPage] = useState("home")
  const [showScrollTop, setShowScrollTop] = useState(false)

  const navigate = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }) }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Hind', sans-serif; background: #0d0500; color: #c8b89a; scroll-behavior: smooth; }
      h1, h2, h3 { font-family: 'Tiro Devanagari Hindi', serif; }
      @keyframes pulse-gold {
        0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.4), 0 0 30px rgba(201,168,76,0.4); }
        70% { box-shadow: 0 0 0 15px rgba(201,168,76,0), 0 0 30px rgba(201,168,76,0.2); }
      }
      @keyframes shimmer { 0%{opacity:0.3} 50%{opacity:0.8} 100%{opacity:0.3} }
      @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
      @keyframes whatsapp-pulse {
        0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.5)}
        70%{transform:scale(1.08);box-shadow:0 0 0 14px rgba(37,211,102,0)}
        100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0)}
      }
      @keyframes call-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
      .gallery-grid { grid-template-columns: repeat(3,1fr); }
      @media (max-width:768px) {
        .gallery-grid{grid-template-columns:repeat(2,1fr)!important;}
        .hidden.md\\:flex{display:none!important;}
      }
      @media (max-width:480px) {
        .gallery-grid{grid-template-columns:repeat(1,1fr)!important;}
      }
      @media (min-width:769px) { .flex.md\\:hidden{display:none!important;} }
      input::placeholder, textarea::placeholder { color: #7a6a5a; }
      button { font-family:'Hind',sans-serif; }
      a { transition: color 0.2s; }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <HomePage navigate={navigate} />
      case "about":    return <AboutPage navigate={navigate} />
      case "services": return <ServicesPage navigate={navigate} />
      case "gallery":  return <GalleryPage />
      case "career":   return <CareerPage navigate={navigate} />
      case "contact":  return <ContactPage />
      default:         return <HomePage navigate={navigate} />
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: THEME.bg }}>
      <Navbar navigate={navigate} currentPage={currentPage} />
      <div style={{ paddingTop: 68 }}>{renderPage()}</div>
      <Footer navigate={navigate} />

      {/* ── WhatsApp FAB (Official Logo) ── */}
      <a
        href="https://wa.me/919102556441"
        target="_blank" rel="noopener noreferrer"
        title="WhatsApp पर बात करें"
        style={{
          position: "fixed", bottom: 28, right: 24, zIndex: 50,
          width: 60, height: 60, borderRadius: "50%",
          background: "#25D366",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 24px rgba(37,211,102,0.6)",
          animation: "whatsapp-pulse 2s ease-in-out infinite",
          textDecoration: "none",
        }}
      >
        {/* Official WhatsApp SVG Logo */}
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
        </svg>
      </a>

      {/* ── Phone FAB (always visible, bottom-left) ── */}
      <a
        href="tel:9102556441"
        title="अभी कॉल करें"
        style={{
          position: "fixed", bottom: 28, left: 24, zIndex: 50,
          width: 60, height: 60, borderRadius: "50%",
          background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 24px ${THEME.gold}70`,
          animation: "call-pulse 2s ease-in-out infinite",
          textDecoration: "none",
        }}
      >
        {/* Phone SVG icon */}
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#0d0500"/>
        </svg>
      </a>

      {/* ── Scroll to Top ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: 100, right: 24, zIndex: 50,
            width: 46, height: 46, borderRadius: "50%",
            background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
            border: "none", display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", boxShadow: `0 4px 16px ${THEME.gold}50`,
            animation: "fadeInUp 0.3s ease both", transition: "transform 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <ChevronUp size={22} color="#0d0500" />
        </button>
      )}
    </div>
  )
}
