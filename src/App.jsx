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
  // Logos
  logoOfficial: "assets/logo1.jpeg",   // New official JM Fiber Workshop logo
  logoElegant:  "assets/logo.png",     // Elegant Jai Maa Ambe logo (used in About hero)

  // People
  owner:   "assets/owner.jpeg",

  // Hero / Flyer
  heroBg:  "assets/WhatsApp Image 2026-06-01 at 19.41.02.jpeg",
  flyer:   "assets/A.jpeg",

  // ── STAGE DECOR ──
  stage1:  "assets/WhatsApp Image 2026-06-03 at 11.12.09.jpeg",   // Grand wedding stage (night, green lights)
  stage2:  "assets/WhatsApp Image 2026-06-03 at 11.12.12.jpeg", // Gold mandap with flowers
  stage3:  "assets/WhatsApp Image 2026-06-03 at 11.12.16 (2).jpeg", // Wedding mandap arch tree MS
  stage4:  "assets/WhatsApp Image 2026-06-01 at 19.41.00 (1).jpeg", // Stage tree pillar
  stage5:  "assets/WhatsApp Image 2026-06-01 at 19.41.00 (2).jpeg", // Stage lotus backdrop
  stage6:  "assets/WhatsApp Image 2026-06-01 at 19.41.00.jpeg",   // Gold flower centerpiece
  stage7:  "assets/WhatsApp Image 2026-06-01 at 19.41.03.jpeg",   // Arch venue
  stage8:  "assets/WhatsApp Image 2026-06-01 at 19.41.02.jpeg",   // Stage wedding
  stage9:  "assets/WhatsApp Image 2026-06-01 at 19.41.03 (2).jpeg", // Rajasthani stage

  // ── LED DECOR ──
  led1:    "assets/WhatsApp Image 2026-06-03 at 11.12.14.jpeg",   // LED neon feather
  led2:    "assets/WhatsApp Image 2026-06-03 at 11.12.15 (1).jpeg", // LED neon panel
  led3:    "assets/WhatsApp Image 2026-06-03 at 11.12.15 (2).jpeg", // LED star neon
  led4:    "assets/WhatsApp Image 2026-06-03 at 11.12.16 (1).jpeg", // LED circles neon
  led5:    "assets/WhatsApp Image 2026-06-03 at 11.12.17 (2).jpeg", // LED swan heart backdrop
  led6:    "assets/WhatsApp Image 2026-06-01 at 19.40.59 (1).jpeg", // LED heart backdrop
  led7:    "assets/WhatsApp Image 2026-06-01 at 19.40.59.jpeg",   // LED mandal
  led8:    "assets/WhatsApp Image 2026-06-01 at 19.40.58.jpeg",   // LED star

  // ── FIBER PRODUCTS / HALDI TUB ──
  fiber1:  "assets/WhatsApp Image 2026-06-03 at 11.12.09 (1).jpeg", // Haldi tub open top
  fiber2:  "assets/WhatsApp Image 2026-06-03 at 11.12.09 (2).jpeg", // Haldi tub cylindrical
  fiber3:  "assets/WhatsApp Image 2026-06-03 at 11.12.09 (3).jpeg", // Haldi tub dark room
  fiber4:  "assets/WhatsApp Image 2026-06-03 at 11.12.22.jpeg",   // Haldi tub swan design
  fiber5:  "assets/WhatsApp Image 2026-06-01 at 19.40.52 (1).jpeg", // Fiber playground set
  fiber6:  "assets/WhatsApp Image 2026-06-01 at 19.40.52.jpeg",   // Double slide playground
  fiber7:  "assets/WhatsApp Image 2026-06-01 at 19.40.57 (1).jpeg", // Covered playground
  fiber8:  "assets/WhatsApp Image 2026-06-01 at 19.40.57 (2).jpeg", // Outdoor playground

  // ── MS IRON ──
  ms1:     "assets/WhatsApp Image 2026-06-03 at 11.12.15.jpeg",   // MS iron decorative frames
  ms2:     "assets/WhatsApp Image 2026-06-03 at 11.12.17.jpeg",   // MS iron mandap
  ms3:     "assets/WhatsApp Image 2026-06-01 at 19.40.53.jpeg",   // School desk-bench
  ms4:     "assets/WhatsApp Image 2026-06-01 at 19.40.53 (2).jpeg", // Desk-chair set
  ms5:     "assets/WhatsApp Image 2026-06-01 at 19.40.54 (1).jpeg", // Activity table set
  ms6:     "assets/WhatsApp Image 2026-06-01 at 19.40.56.jpeg",   // Fiber chair set

  // ── SCHOOL FIBER WORK ──
  school1: "assets/WhatsApp Image 2026-06-03 at 11.12.22 (1).jpeg", // Fiber pillars white classic
  school2: "assets/WhatsApp Image 2026-06-03 at 11.12.22 (2).jpeg", // Fiber pillars colored
  school3: "assets/WhatsApp Image 2026-06-03 at 11.12.13 (2).jpeg", // Buddha fiber art panel
  school4: "assets/WhatsApp Image 2026-06-03 at 11.12.14 (1).jpeg", // Buddha painted close
  school5: "assets/WhatsApp Image 2026-06-03 at 11.12.14 (2).jpeg", // Buddha installed at school gate
  school6: "assets/WhatsApp Image 2026-06-03 at 11.12.13 (1).jpeg", // Surya fiber statue workshop
  school7: "assets/WhatsApp Image 2026-06-01 at 19.40.55.jpeg",   // Lecture chair row
  school8: "assets/WhatsApp Image 2026-06-01 at 19.40.56 (1).jpeg", // Doraemon dustbin

  // ── PLAYGROUND ──
  play1:   "assets/WhatsApp Image 2026-06-01 at 19.40.52 (1).jpeg", // Multi playground set
  play2:   "assets/WhatsApp Image 2026-06-01 at 19.40.52.jpeg",   // Double slide
  play3:   "assets/WhatsApp Image 2026-06-01 at 19.40.57 (1).jpeg", // Covered playground
  play4:   "assets/WhatsApp Image 2026-06-01 at 19.40.57 (2).jpeg", // Outdoor playground
  play5:   "assets/WhatsApp Image 2026-06-01 at 19.40.58.jpeg",   // Activity playground
  play6:   "assets/WhatsApp Image 2026-06-01 at 19.40.59 (2).jpeg", // LED cube playground light
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
            src={IMG.logoOfficial}
            alt="जय माँ अम्बे फाइबर वर्कशॉप लोगो"
            loading="eager"
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

        {/* Hamburger */}
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

    {/* Mobile Overlay */}
    {menuOpen && (
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(8,2,0,0.97)", backdropFilter: "blur(16px)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "1.5rem", overflowY: "auto",
      }}>
        <button onClick={() => setMenuOpen(false)} style={{
          position: "absolute", top: 18, right: 18,
          background: `${THEME.gold}22`, border: `1.5px solid ${THEME.gold}`,
          borderRadius: "50%", width: 50, height: 50,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: THEME.gold,
        }}><X size={24} /></button>

        <img src={IMG.logoOfficial} alt="लोगो" loading="lazy" style={{ width: 80, height: 80, borderRadius: "50%", border: `3px solid ${THEME.gold}`, objectFit: "cover", boxShadow: `0 0 30px ${THEME.gold}60`, marginBottom: 10 }} />
        <div style={{ color: THEME.goldLight, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.05rem", fontWeight: 700 }}>जय माँ अम्बे</div>
        <div style={{ color: THEME.textMuted, fontSize: "0.78rem", marginBottom: 24 }}>फाइबर वर्कशॉप</div>
        <div style={{ width: 100, height: 1, background: `linear-gradient(90deg,transparent,${THEME.gold},transparent)`, marginBottom: 24 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 310 }}>
          {links.map((l) => (
            <button key={l.page} onClick={() => handleNav(l.page)} style={{
              background: currentPage === l.page ? `${THEME.gold}22` : "transparent",
              border: `1.5px solid ${currentPage === l.page ? THEME.gold : THEME.gold + "40"}`,
              borderRadius: 14, cursor: "pointer",
              color: currentPage === l.page ? THEME.goldLight : THEME.textMuted,
              fontWeight: currentPage === l.page ? 700 : 500,
              fontSize: "1.1rem", padding: "15px 0", width: "100%",
              fontFamily: "'Hind', sans-serif", transition: "all 0.18s",
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
    // Stage Decor
    { src: IMG.stage1,  caption: "भव्य शादी स्टेज",        cat: "स्टेज" },
    { src: IMG.stage2,  caption: "सोना मण्डप",              cat: "स्टेज" },
    { src: IMG.stage3,  caption: "आर्च मण्डप स्टेज",        cat: "स्टेज" },
    { src: IMG.stage4,  caption: "ट्री पिलर स्टेज",          cat: "स्टेज" },
    { src: IMG.stage5,  caption: "कमल बैकड्रॉप स्टेज",      cat: "स्टेज" },
    { src: IMG.stage6,  caption: "गोल्ड फ्लावर सेंटरपीस",   cat: "स्टेज" },
    { src: IMG.stage7,  caption: "आर्च वेन्यू",              cat: "स्टेज" },
    { src: IMG.stage8,  caption: "शादी स्टेज",              cat: "स्टेज" },
    { src: IMG.stage9,  caption: "राजस्थानी स्टेज",          cat: "स्टेज" },
    // LED Decor
    { src: IMG.led1,    caption: "LED नियॉन फेदर",          cat: "LED" },
    { src: IMG.led2,    caption: "LED नियॉन पैनल",           cat: "LED" },
    { src: IMG.led3,    caption: "LED स्टार नियॉन",          cat: "LED" },
    { src: IMG.led4,    caption: "LED सर्किल नियॉन",         cat: "LED" },
    { src: IMG.led5,    caption: "LED हार्ट बैकड्रॉप",        cat: "LED" },
    { src: IMG.led6,    caption: "LED हार्ट बैकड्रॉप",        cat: "LED" },
    { src: IMG.led7,    caption: "LED मण्डल",               cat: "LED" },
    { src: IMG.led8,    caption: "LED स्टार",               cat: "LED" },
    // Fiber / Haldi Tub
    { src: IMG.fiber1,  caption: "हल्दी टब (खुला)",           cat: "फाइबर" },
    { src: IMG.fiber2,  caption: "हल्दी टब (सिलेंडर)",       cat: "फाइबर" },
    { src: IMG.fiber3,  caption: "हल्दी टब",                cat: "फाइबर" },
    { src: IMG.fiber4,  caption: "हल्दी टब स्वान",           cat: "फाइबर" },
    { src: IMG.fiber5,  caption: "फाइबर प्लेग्राउंड सेट",    cat: "फाइबर" },
    { src: IMG.fiber6,  caption: "डबल स्लाइड प्लेग्राउंड",   cat: "फाइबर" },
    { src: IMG.fiber7,  caption: "कवर्ड प्लेग्राउंड",         cat: "फाइबर" },
    { src: IMG.fiber8,  caption: "आउटडोर प्लेग्राउंड",        cat: "फाइबर" },
    // MS Iron
    { src: IMG.ms1,     caption: "MS लोहे डेकोरेटिव फ्रेम",  cat: "MS लोहे" },
    { src: IMG.ms2,     caption: "MS लोहे मण्डप",            cat: "MS लोहे" },
    { src: IMG.ms3,     caption: "स्कूल डेस्क-बेंच",          cat: "MS लोहे" },
    { src: IMG.ms4,     caption: "डेस्क-चेयर सेट",            cat: "MS लोहे" },
    { src: IMG.ms5,     caption: "एक्टिविटी टेबल सेट",        cat: "MS लोहे" },
    { src: IMG.ms6,     caption: "फाइबर चेयर सेट",           cat: "MS लोहे" },
    // School Fiber Work
    { src: IMG.school1, caption: "फाइबर पिलर (सफेद)",        cat: "स्कूल" },
    { src: IMG.school2, caption: "फाइबर पिलर (रंगीन)",       cat: "स्कूल" },
    { src: IMG.school3, caption: "बुद्ध फाइबर आर्ट पैनल",    cat: "स्कूल" },
    { src: IMG.school4, caption: "बुद्ध पेंटेड",              cat: "स्कूल" },
    { src: IMG.school5, caption: "स्कूल गेट बुद्ध",           cat: "स्कूल" },
    { src: IMG.school6, caption: "सूर्य फाइबर मूर्ति",        cat: "स्कूल" },
    { src: IMG.school7, caption: "लेक्चर चेयर",              cat: "स्कूल" },
    { src: IMG.school8, caption: "डोरेमॉन डस्टबिन",           cat: "स्कूल" },
  ]

  // Auto-rotating gallery carousel
  const [activeSlide, setActiveSlide] = useState(0)
  const [captionVisible, setCaptionVisible] = useState(true)
  const touchStartX = useRef(null)
  const carouselRef = useRef(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionVisible(false)
      setTimeout(() => {
        setActiveSlide(prev => (prev + 1) % galleryPreview.length)
        setCaptionVisible(true)
      }, 250)
    }, 3500)
    return () => clearInterval(timer)
  }, [galleryPreview.length])

  const goToSlide = (idx) => {
    setCaptionVisible(false)
    setTimeout(() => {
      setActiveSlide(idx)
      setCaptionVisible(true)
    }, 250)
  }

  // Touch/Swipe handlers
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) goToSlide((activeSlide + 1) % galleryPreview.length)
      else goToSlide((activeSlide - 1 + galleryPreview.length) % galleryPreview.length)
    }
    touchStartX.current = null
  }

  const services = [
    { icon: <Wrench size={36} />, title: "MS लोहे के डिज़ाइन", desc: "शादी-विवाह, पार्टी, रिसेप्शन के लिए मजबूत और सुंदर MS लोहे के सजावटी सामान।" },
    { icon: <Package size={36} />, title: "फाइबर उत्पाद", desc: "प्लेग्राउंड, हल्दी टब, स्कूल फर्नीचर और अन्य फाइबर उत्पाद — टिकाऊ और आकर्षक।" },
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
      <section className="hero-section" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        position: "relative", overflow: "hidden",
        backgroundImage: `url('${IMG.heroBg}')`,
        backgroundSize: "cover", backgroundPosition: "center 60%",
        padding: "90px 1.5rem 3rem",
      }}>
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.30) 40%, rgba(0,0,0,0.55) 85%, rgba(0,0,0,0.70) 100%)" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
          <div style={{ display: "inline-block", border: `1px solid ${THEME.gold}`, borderRadius: 999, padding: "6px 20px", marginBottom: 24, color: THEME.goldLight, fontSize: "0.85rem" }}>
            ✨ मुजफ्फरपुर की नंबर 1 वर्कशॉप
          </div>
          <h1 style={{
            fontFamily: "'Tiro Devanagari Hindi', serif",
            fontSize: "clamp(2rem, 5.5vw, 4rem)",
            background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold}, ${THEME.goldDark})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            margin: "0 0 1.2rem", lineHeight: 1.3,
            filter: "drop-shadow(0 3px 12px rgba(0,0,0,0.9))",
          }}>शादी-विवाह और हर आयोजन को बनाएं यादगार</h1>
          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", marginBottom: "2rem", lineHeight: 1.7, color: "#fff5d6", textShadow: "0 2px 10px rgba(0,0,0,0.95), 0 0 30px rgba(0,0,0,0.8)" }}>
            MS लोहे और फाइबर से बने खूबसूरत सजावटी उत्पाद —<br />आपके बजट में, आपके डिज़ाइन में
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            <a href="tel:9102556441" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
              color: "#0d0500", fontWeight: 700, fontSize: "1rem",
              padding: "14px 32px", borderRadius: 999, textDecoration: "none",
              boxShadow: `0 4px 20px ${THEME.gold}60`, transition: "transform 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)" }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}
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

      {/* ── GALLERY PREVIEW — AUTO ROTATING CAROUSEL ── */}
      <section style={{ padding: "0 1rem 5rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "clamp(1.6rem, 4vw, 2.2rem)", margin: 0 }}>काम की झलक</h2>
            <div style={{ width: 60, height: 2, background: THEME.gold, marginTop: 8 }} />
          </div>
          <button onClick={() => navigate("gallery")} style={{ background: "none", border: `1px solid ${THEME.gold}`, color: THEME.gold, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: "0.9rem" }}>पूरी गैलरी →</button>
        </div>

        {/* ── SLIDING TRACK CAROUSEL — no black screen ── */}
        <div
          ref={carouselRef}
          style={{
            position: "relative",
            borderRadius: 16, overflow: "hidden",
            border: `2px solid ${THEME.gold}40`,
            boxShadow: `0 8px 40px rgba(201,168,76,0.25)`,
            touchAction: "pan-y",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding track — all images side by side, no gap, no black */}
          <div style={{
            position: "relative",
            width: "100%",
            paddingBottom: "clamp(56%, 52vw, 52%)",
            overflow: "hidden",
          }}>
            {/* The track: all images in one row */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex",
              width: `${galleryPreview.length * 100}%`,
              height: "100%",
              transform: `translateX(-${activeSlide * (100 / galleryPreview.length)}%)`,
              transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              willChange: "transform",
            }}>
              {galleryPreview.map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: `${100 / galleryPreview.length}%`,
                    flexShrink: 0,
                    position: "relative",
                    height: "100%",
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading={i <= 2 ? "eager" : "lazy"}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom gradient overlay — always on top */}
            <div style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(to top, rgba(13,5,0,0.82) 0%, rgba(13,5,0,0.05) 50%, transparent 100%)",
            }} />

            {/* Category tag — top left */}
            <div style={{
              position: "absolute", top: 12, left: 12, zIndex: 2,
              background: "rgba(13,5,0,0.75)", border: `1px solid ${THEME.gold}80`,
              borderRadius: 999, padding: "3px 12px",
              color: THEME.gold, fontSize: "0.75rem", fontWeight: 600,
              backdropFilter: "blur(6px)",
              opacity: captionVisible ? 1 : 0,
              transition: "opacity 0.25s ease",
            }}>
              {galleryPreview[activeSlide].cat}
            </div>

            {/* Slide counter — top right */}
            <div style={{
              position: "absolute", top: 12, right: 12, zIndex: 2,
              background: "rgba(13,5,0,0.75)", border: `1px solid ${THEME.gold}60`,
              borderRadius: 999, padding: "3px 12px", color: THEME.gold,
              fontSize: "0.75rem", backdropFilter: "blur(6px)",
            }}>
              {activeSlide + 1} / {galleryPreview.length}
            </div>

            {/* Caption — bottom */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
              padding: "20px 52px 16px 16px",
              opacity: captionVisible ? 1 : 0,
              transform: captionVisible ? "translateY(0)" : "translateY(6px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              <div style={{
                color: THEME.goldLight, fontWeight: 700,
                fontSize: "clamp(0.95rem, 2.5vw, 1.4rem)",
                fontFamily: "'Tiro Devanagari Hindi', serif",
                textShadow: "0 2px 10px rgba(0,0,0,1)",
              }}>
                {galleryPreview[activeSlide].caption}
              </div>
            </div>

            {/* Left arrow */}
            <button
              onClick={() => goToSlide((activeSlide - 1 + galleryPreview.length) % galleryPreview.length)}
              style={{
                position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, background: "rgba(13,5,0,0.7)",
                border: `1.5px solid ${THEME.gold}70`,
                borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: THEME.goldLight, fontSize: "1.4rem",
                backdropFilter: "blur(6px)", padding: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.35)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(13,5,0,0.7)"}
            >‹</button>

            {/* Right arrow */}
            <button
              onClick={() => goToSlide((activeSlide + 1) % galleryPreview.length)}
              style={{
                position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                zIndex: 3, background: "rgba(13,5,0,0.7)",
                border: `1.5px solid ${THEME.gold}70`,
                borderRadius: "50%", width: 38, height: 38, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: THEME.goldLight, fontSize: "1.4rem",
                backdropFilter: "blur(6px)", padding: 0,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.35)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(13,5,0,0.7)"}
            >›</button>
          </div>

          {/* Dot indicators */}
          <div style={{ background: THEME.bgCard, padding: "10px 12px 8px", display: "flex", justifyContent: "center", gap: 5, flexWrap: "wrap" }}>
            {galleryPreview.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                style={{
                  flexShrink: 0,
                  width: i === activeSlide ? 24 : 8,
                  height: 8, borderRadius: 999,
                  background: i === activeSlide ? THEME.gold : `${THEME.gold}35`,
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail strip — mobile scrollable */}
        <div style={{
          display: "flex", gap: 8, marginTop: 10,
          overflowX: "auto", paddingBottom: 8,
          scrollbarWidth: "thin", scrollbarColor: `${THEME.gold}40 transparent`,
          WebkitOverflowScrolling: "touch",
        }}>
          {galleryPreview.map((img, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              title={img.caption}
              style={{
                flexShrink: 0,
                width: "clamp(56px, 12vw, 75px)",
                height: "clamp(42px, 9vw, 56px)",
                borderRadius: 8,
                overflow: "hidden", cursor: "pointer",
                border: i === activeSlide ? `2.5px solid ${THEME.gold}` : `2px solid ${THEME.gold}25`,
                transition: "all 0.25s",
                opacity: i === activeSlide ? 1 : 0.55,
                transform: i === activeSlide ? "scale(1.1)" : "scale(1)",
                boxShadow: i === activeSlide ? `0 2px 10px ${THEME.gold}50` : "none",
              }}
            >
              <img src={img.src} alt={img.caption} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>

        {/* Swipe hint — mobile only */}
        <div style={{ textAlign: "center", marginTop: 6, color: `${THEME.gold}70`, fontSize: "0.75rem" }}>
          ← swipe করুন / tap করুন →
        </div>
      </section>

      {/* ── OWNER INTRO SECTION ── */}
      <section style={{
        background: `linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #1a0800 100%)`,
        borderTop: `2px solid ${THEME.gold}40`, borderBottom: `2px solid ${THEME.gold}40`,
        padding: "5rem 1.5rem",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div style={{
              width: 180, height: 180, borderRadius: "50%", overflow: "hidden",
              border: `4px solid ${THEME.gold}`,
              boxShadow: `0 0 30px ${THEME.gold}60, 0 0 60px ${THEME.gold}30`,
              margin: "0 auto 14px",
            }}>
              <img src={IMG.owner} alt="संस्थापक — जय माँ अम्बे फाइबर वर्कशॉप" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{
              background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
              color: "#0d0500", fontWeight: 700, fontSize: "0.95rem",
              padding: "6px 20px", borderRadius: 999, display: "inline-block",
            }}>संस्थापक एवं मालिक</div>
          </div>

          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ color: THEME.gold, fontSize: "0.85rem", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>संस्थापक एवं मालिक</p>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "clamp(1.8rem, 4vw, 2.5rem)", margin: "0 0 4px" }}>Mr. Randhir Kumar</h2>
            <p style={{ color: THEME.textMuted, fontSize: "0.95rem", margin: "0 0 8px" }}>जय माँ अम्बे फाइबर वर्कशॉप</p>
            <div style={{ width: 60, height: 2, background: THEME.gold, marginBottom: 20 }} />
            <p style={{ color: THEME.textMuted, lineHeight: 1.9, fontSize: "1rem", marginBottom: 24 }}>
              नमस्कार! पिछले <strong style={{ color: THEME.goldLight }}>10+ वर्षों</strong> से मुजफ्फरपुर में
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

        {/* Owner Section — only owner photo */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48, alignItems: "center", marginBottom: "5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            {/* Owner Photo only */}
            <div style={{
              width: 260, height: 260, borderRadius: "50%", overflow: "hidden",
              border: `4px solid ${THEME.gold}`,
              boxShadow: `0 0 40px ${THEME.gold}60, 0 0 80px ${THEME.gold}30`,
            }}>
              <img src={IMG.owner} alt="संस्थापक — जय माँ अम्बे फाइबर वर्कशॉप" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, fontSize: "1rem", padding: "8px 24px", borderRadius: 999 }}>संस्थापक एवं मालिक</div>
          </div>
          <div>
            <p style={{ color: THEME.textMuted, fontSize: "0.9rem", marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>संस्थापक एवं मालिक</p>
            <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2.8rem", margin: "0 0 4px" }}>Mr. Randhir Kumar</h2>
            <p style={{ color: THEME.textMuted, fontSize: "1rem", marginBottom: 8 }}>जय माँ अम्बे फाइबर वर्कशॉप</p>
            <p style={{ color: THEME.gold, fontStyle: "italic", fontSize: "1.1rem", marginBottom: "0.5rem" }}>मुजफ्फरपुर, बिहार</p>
            <p style={{ color: THEME.textMuted, fontSize: "0.92rem", marginBottom: "1.5rem" }}>
              🏆 10+ वर्षों का अनुभव &nbsp;|&nbsp; 500+ सफल प्रोजेक्ट
            </p>
            <p style={{ color: THEME.textMuted, lineHeight: 1.9, fontSize: "1rem", marginBottom: "2rem" }}>
              नमस्कार! पिछले कई वर्षों से हम मुजफ्फरपुर में
              MS लोहे और फाइबर से शादी-विवाह, पार्टी, रिसेप्शन और स्टेज डेकोरेशन
              के सामान बना रहे हैं। हमारा उद्देश्य है — उच्च गुणवत्ता, समय पर
              डिलीवरी और हर ग्राहक की संतुष्टि।
              <br /><br />
              हम <strong style={{ color: THEME.goldLight }}>स्कूल फर्नीचर, हल्दी टब, प्लेग्राउंड उपकरण, LED डेकोर और भव्य स्टेज</strong> बनाने में विशेषज्ञ हैं।
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <a href="mailto:Kumarrandhir1313@gmail.com" style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.goldLight, textDecoration: "none", fontSize: "0.95rem" }}>
                <Mail size={18} color={THEME.gold} /> Kumarrandhir1313@gmail.com
              </a>
              <a href="tel:9102556441" style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.goldLight, textDecoration: "none", fontSize: "0.95rem" }}>
                <Phone size={18} color={THEME.gold} /> 9102556441
              </a>
              <div style={{ display: "flex", alignItems: "center", gap: 10, color: THEME.textMuted, fontSize: "0.95rem" }}>
                <MapPin size={18} color={THEME.gold} /> मुजफ्फरपुर, बिहार, भारत
              </div>
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
      img: IMG.stage1, imgAlt: "भव्य शादी स्टेज",
      emoji: "✨", title: "स्टेज डेकोरेशन", filter: "स्टेज डेकोरेशन",
      points: ["शादी-विवाह के लिए भव्य स्टेज सजावट", "मण्डप, आर्च और बैकड्रॉप निर्माण", "रिसेप्शन और पार्टी डेकोर सेटअप", "कस्टम डिज़ाइन उपलब्ध"],
    },
    {
      img: IMG.led5, imgAlt: "LED नियॉन डेकोर",
      emoji: "💡", title: "LED डेकोर", filter: "LED डेकोर",
      points: ["LED नियॉन साइनेज और पैनल", "हार्ट, स्टार, मण्डल के डिज़ाइन", "शादी स्टेज और इवेंट के लिए LED बैकड्रॉप", "कमल फूल और स्वान डिज़ाइन वाले LED फ्रेम"],
    },
    {
      img: IMG.fiber4, imgAlt: "हल्दी टब फाइबर",
      emoji: "🛁", title: "हल्दी टब", filter: "हल्दी टब",
      points: ["फाइबर हल्दी टब निर्माण", "हंस, कमल और कस्टम डिज़ाइन", "गोल्डन फिनिश और उच्च गुणवत्ता", "शादी-विवाह के लिए आदर्श"],
    },
    {
      img: IMG.school2, imgAlt: "स्कूल फाइबर वर्क",
      emoji: "🏫", title: "स्कूल फाइबर वर्क", filter: "स्कूल फाइबर वर्क",
      points: ["स्तम्भ, मूर्ति और फाइबर आर्ट निर्माण", "स्कूल डेस्क-बेंच और चेयर सेट", "एक्टिविटी टेबल और लेक्चर चेयर", "डस्टबिन और स्कूल सजावट"],
    },
    {
      img: IMG.play1, imgAlt: "फाइबर प्लेग्राउंड",
      emoji: "⛹️", title: "प्लेग्राउंड", filter: "प्लेग्राउंड",
      points: ["मल्टी स्लाइड प्लेग्राउंड सेट", "स्कूल और पार्क के लिए आउटडोर सेट", "कवर्ड और डबल स्लाइड स्ट्रक्चर", "मजबूत और रंगीन फाइबर निर्माण"],
    },
    {
      img: IMG.ms1, imgAlt: "MS लोहे के डेकोरेटिव फ्रेम",
      emoji: "⚒️", title: "MS लोहे", filter: "MS लोहे",
      points: ["स्टेज, गेट और मण्डप के लिए MS शेप", "डिज़ाइन के अनुसार फैब्रिकेशन", "समय पर डिलीवरी, मजबूत निर्माण", "कस्टम डिज़ाइन उपलब्ध"],
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28, marginBottom: "5rem" }}>
          {services.map((s, i) => (
            <div key={i} style={{ background: THEME.bgCard, borderRadius: 20, overflow: "hidden", border: `1px solid ${THEME.gold}30`, borderTop: `3px solid ${THEME.gold}`, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.gold; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${THEME.gold}30` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = `${THEME.gold}30`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none" }}
            >
              <div style={{ width: "100%", paddingBottom: "56.25%", position: "relative", overflow: "hidden" }}>
                <img src={s.img} alt={s.imgAlt} loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(13,5,0,0.85)", border: `1px solid ${THEME.gold}`, borderRadius: 999, padding: "4px 14px", fontSize: "0.9rem", backdropFilter: "blur(6px)", color: THEME.goldLight, fontWeight: 600 }}>
                  {s.emoji} {s.title}
                </div>
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
                <button onClick={() => navigate("gallery", s.filter)} style={{ background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, padding: "12px 28px", borderRadius: 999, border: "none", cursor: "pointer", width: "100%", fontSize: "0.95rem", transition: "transform 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                >🖼️ गैलरी में देखें →</button>
              </div>
            </div>
          ))}
        </div>

        {/* Process */}
        <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "2rem", textAlign: "center", marginBottom: "3rem" }}>हम कैसे काम करते हैं?</h2>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, marginBottom: "4rem" }}>
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

        {/* CTA */}
        <div style={{ textAlign: "center", background: `linear-gradient(135deg, #1a0800, #2d1200, #1a0800)`, borderRadius: 20, padding: "3rem 2rem", border: `1px solid ${THEME.gold}40` }}>
          <h2 style={{ fontFamily: "'Tiro Devanagari Hindi', serif", color: THEME.goldLight, fontSize: "clamp(1.4rem, 3vw, 2rem)", margin: "0 0 1rem" }}>
            कोई भी सेवा चाहिए? अभी संपर्क करें!
          </h2>
          <p style={{ color: THEME.textMuted, marginBottom: "1.8rem", fontSize: "1rem" }}>Mr. Randhir Kumar — जय माँ अम्बे फाइबर वर्कशॉप, मुजफ्फरपुर</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="tel:9102556441" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`, color: "#0d0500", fontWeight: 700, padding: "14px 32px", borderRadius: 999, textDecoration: "none", fontSize: "1rem", boxShadow: `0 4px 20px ${THEME.gold}60` }}>📞 9102556441</a>
            <a href="https://wa.me/919102556441" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#25D366", color: "#fff", fontWeight: 700, padding: "14px 32px", borderRadius: 999, textDecoration: "none", fontSize: "1rem" }}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LIGHTBOX MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function LightboxModal({ item, index, total, onClose, onPrev, onNext }) {
  // ESC key to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose, onPrev, onNext])

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.97)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      {/* ── TOP BAR: Close button ── */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", zIndex: 10001 }}
        onClick={e => e.stopPropagation()}
      >
        <span style={{ color: THEME.textMuted, fontSize: "0.9rem" }}>{index + 1} / {total}</span>
        <button
          onClick={onClose}
          style={{
            background: `linear-gradient(135deg, ${THEME.gold}, ${THEME.goldDark})`,
            border: "none", borderRadius: 999,
            color: "#0d0500", fontWeight: 800, fontSize: "1rem",
            padding: "10px 24px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: `0 4px 20px ${THEME.gold}80`,
          }}
        >
          <X size={18} /> बंद करें
        </button>
      </div>

      {/* ── LEFT arrow ── */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        style={{
          position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
          background: `${THEME.gold}25`, border: `2px solid ${THEME.gold}`,
          borderRadius: "50%", width: 56, height: 56,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: THEME.gold, zIndex: 10001,
        }}
      ><ChevronLeft size={32} /></button>

      {/* ── IMAGE ── */}
      <div onClick={e => e.stopPropagation()} style={{ textAlign: "center", padding: "80px 80px 40px" }}>
        <img
          src={item?.src}
          alt={item?.caption}
          style={{
            maxWidth: "88vw", maxHeight: "72vh",
            objectFit: "contain", borderRadius: 14,
            border: `2px solid ${THEME.gold}`,
            boxShadow: `0 0 60px ${THEME.gold}30`,
          }}
        />
        <p style={{ color: THEME.goldLight, marginTop: 18, fontSize: "1.15rem", fontWeight: 700 }}>{item?.caption}</p>
        <p style={{ color: THEME.textMuted, fontSize: "0.85rem", marginTop: 6 }}>{item?.category}</p>
      </div>

      {/* ── RIGHT arrow ── */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        style={{
          position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
          background: `${THEME.gold}25`, border: `2px solid ${THEME.gold}`,
          borderRadius: "50%", width: 56, height: 56,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: THEME.gold, zIndex: 10001,
        }}
      ><ChevronRight size={32} /></button>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GALLERY PAGE — Expanded with 6 categories + all new images
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GalleryPage({ initialFilter = "सभी" }) {
  const [activeFilter, setActiveFilter] = useState(initialFilter)
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  // Sync filter when navigated from Services page
  useEffect(() => { setActiveFilter(initialFilter) }, [initialFilter])

  const filters = [
    "सभी",
    "स्टेज डेकोरेशन",
    "LED डेकोर",
    "हल्दी टब",
    "स्कूल फाइबर वर्क",
    "प्लेग्राउंड",
    "MS लोहे",
  ]

  const galleryItems = [
    // ── स्टेज डेकोरेशन ─────────────────────────────────────────
    { id:1,  src: IMG.stage1,  caption: "भव्य शादी स्टेज (नाइट)",           category: "स्टेज डेकोरेशन" },
    { id:2,  src: IMG.stage2,  caption: "राजदरबार पैलेस — वेडिंग वेन्यू",        category: "स्टेज डेकोरेशन" },
    { id:3,  src: IMG.stage3,  caption: "MS आर्च ट्री वेडिंग मण्डप",       category: "स्टेज डेकोरेशन" },
    { id:4,  src: IMG.stage4,  caption: "स्टेज ट्री पिलर डेकोर",           category: "स्टेज डेकोरेशन" },
    { id:5,  src: IMG.stage5,  caption: "कमल फूल बैकड्रॉप",                category: "LED डेकोर" },
    { id:6,  src: IMG.stage6,  caption: "गोल्ड फूल सेंटरपीस",              category: "स्टेज डेकोरेशन" },
    { id:7,  src: IMG.stage7,  caption: "भव्य आर्च वेन्यू",               category: "स्टेज डेकोरेशन" },
    { id:8,  src: IMG.stage8,  caption: "शादी स्टेज लाइव",                 category: "स्टेज डेकोरेशन" },
    { id:9,  src: IMG.stage9,  caption: "राजस्थानी शादी स्टेज",            category: "स्टेज डेकोरेशन" },

    // ── LED डेकोर ──────────────────────────────────────────────
    // NOTE: LED items belong ONLY in LED Decor — none in Stage or Playground
    { id:10, src: IMG.led1,   caption: "LED नियॉन पंख डिज़ाइन",            category: "LED डेकोर" },
    { id:11, src: IMG.led2,   caption: "LED नियॉन पैनल",                   category: "LED डेकोर" },
    { id:12, src: IMG.led3,   caption: "LED स्टार नियॉन",                  category: "LED डेकोर" },
    { id:13, src: IMG.led4,   caption: "LED सर्कल नियॉन",                  category: "LED डेकोर" },
    { id:14, src: IMG.led5,   caption: "LED स्वान हार्ट बैकड्रॉप",         category: "LED डेकोर" },
    { id:15, src: IMG.led6,   caption: "LED हार्ट बैकड्रॉप",               category: "LED डेकोर" },
    { id:16, src: IMG.led7,   caption: "LED मण्डल डेकोरेशन",              category: "LED डेकोर" },
    { id:17, src: IMG.led8,   caption: "LED स्टार डेकोर",                  category: "LED डेकोर" },

    // ── हल्दी टब ───────────────────────────────────────────────
    { id:18, src: IMG.fiber1,  caption: "हल्दी टब — खुली टॉप",             category: "हल्दी टब" },
    { id:19, src: IMG.fiber2,  caption: "हल्दी टब — बाहर से",              category: "हल्दी टब" },
    { id:20, src: IMG.fiber3,  caption: "हल्दी टब — गोल्डन फिनिश",        category: "हल्दी टब" },
    { id:21, src: IMG.fiber4,  caption: "हल्दी टब — हंस डिज़ाइन",          category: "हल्दी टब" },

    // ── स्कूल फाइबर वर्क ───────────────────────────────────────
    { id:24, src: IMG.school3, caption: "बुद्ध फाइबर आर्ट पैनल",          category: "स्कूल फाइबर वर्क" },
    { id:25, src: IMG.school4, caption: "बुद्ध पेंटेड क्लोज़ व्यू",        category: "स्कूल फाइबर वर्क" },
    { id:26, src: IMG.school5, caption: "स्कूल गेट पर बुद्ध आर्ट",        category: "स्कूल फाइबर वर्क" },
    { id:27, src: IMG.school6, caption: "सूर्य देव फाइबर मूर्ति",          category: "स्कूल फाइबर वर्क" },
    { id:28, src: IMG.school7, caption: "लेक्चर चेयर सेट",                 category: "स्कूल फाइबर वर्क" },
    { id:29, src: IMG.school8, caption: "डोरेमॉन डस्टबिन",                 category: "स्कूल फाइबर वर्क" },
    { id:41, src: IMG.ms3,    caption: "स्कूल डेस्क-बेंच",                category: "स्कूल फाइबर वर्क" },
    { id:42, src: IMG.ms4,    caption: "डेस्क-चेयर सेट",                   category: "स्कूल फाइबर वर्क" },
    { id:43, src: IMG.ms5,    caption: "एक्टिविटी टेबल सेट",              category: "स्कूल फाइबर वर्क" },
    { id:44, src: IMG.ms6,    caption: "कलरफुल चेयर रो",                   category: "स्कूल फाइबर वर्क" },

    // ── प्लेग्राउंड ─── (only actual playground equipment, no LED)
    { id:30, src: IMG.play1,   caption: "मल्टी प्लेग्राउंड सेट",           category: "प्लेग्राउंड" },
    { id:31, src: IMG.play2,   caption: "डबल स्लाइड प्लेग्राउंड",          category: "प्लेग्राउंड" },
    { id:32, src: IMG.play3,   caption: "कवर्ड प्लेग्राउंड",              category: "प्लेग्राउंड" },
    { id:33, src: IMG.play4,   caption: "आउटडोर प्लेग्राउंड",             category: "प्लेग्राउंड" },
    // play5 (LED star) moved to LED Decor — keeping only playground equipment here

    // ── MS लोहे ─── (only MS iron fabrication / stage items)
    { id:35, src: IMG.ms1,    caption: "MS लोहे के डेकोरेटिव फ्रेम",      category: "MS लोहे" },
    { id:36, src: IMG.ms2,    caption: "MS लोहे का मण्डप स्ट्रक्चर",      category: "MS लोहे" },
    // desk/bench/chair/activity table moved to School Fiber Work
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
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: "2rem" }}>
          {filters.map(f => (
            <button key={f} onClick={() => { setActiveFilter(f); setLightbox({ open: false, index: 0 }) }} style={{
              padding: "9px 20px", borderRadius: 999, cursor: "pointer",
              fontWeight: 600, fontSize: "0.88rem", transition: "all 0.2s",
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
                <img src={item.src} alt={item.caption} loading="lazy" style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }} />
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

      {/* ── LIGHTBOX ── */}
      {lightbox.open && (
        <LightboxModal
          item={filtered[lightbox.index]}
          index={lightbox.index}
          total={filtered.length}
          onClose={() => setLightbox({ open: false, index: 0 })}
          onPrev={() => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }))}
          onNext={() => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }))}
        />
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
          <img src={IMG.flyer} alt="जय माँ अम्बे फाइबर वर्कशॉप करियर फ्लायर" loading="lazy" style={{ width: "100%", display: "block" }} />
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
    const msg = `नमस्कार!\nमेरा नाम ${formData.name} है।\nमोबाइल: ${formData.phone}\nसंदेश: ${formData.message}`
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
                src={IMG.logoOfficial}
                alt="जय माँ अम्बे फाइबर वर्कशॉप लोगो"
                loading="lazy"
                style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover", border: `3px solid ${THEME.gold}`, boxShadow: `0 0 24px ${THEME.gold}60` }}
              />
              <div>
                <p style={{ color: THEME.goldLight, fontWeight: 700, fontFamily: "'Tiro Devanagari Hindi', serif", fontSize: "1.05rem", margin: "0 0 2px" }}>जय माँ अम्बे फाइबर वर्कशॉप</p>
                <p style={{ color: THEME.gold, fontWeight: 600, margin: "0 0 2px", fontSize: "0.9rem" }}>Mr. Randhir Kumar</p>
                <p style={{ color: THEME.textMuted, margin: "0 0 2px", fontSize: "0.82rem" }}>मुजफ्फरपुर, बिहार</p>
                <p style={{ color: THEME.textMuted, margin: 0, fontSize: "0.82rem" }}>संस्थापक एवं मालिक</p>
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
        {/* SEO KEYWORD SECTION */}
        <div style={{ borderTop: `1px solid ${THEME.gold}20`, paddingTop: "1.5rem", marginBottom: "1.5rem" }}>
          <p style={{ color: THEME.textMuted, fontSize: "0.78rem", textAlign: "center", marginBottom: 10, letterSpacing: 0.5 }}>
            हमारी सेवाएं क्षेत्र | Our Services &amp; Coverage
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {[
              "जय माँ अम्बे फाइबर वर्कशॉप", "Jai Maa Ambe Fiber Workshop",
              "माँ अम्बे फाइबर मुजफ्फरपुर", "Maa Ambe Fiber Muzaffarpur",
              "शादी स्टेज मुजफ्फरपुर", "Wedding Stage Muzaffarpur",
              "MS लोहे डेकोर बिहार", "LED डेकोर मुजफ्फरपुर",
              "फाइबर प्लेग्राउंड बिहार", "हल्दी टब निर्माता",
              "स्कूल फर्नीचर फाइबर", "School Furniture Fiber Bihar",
              "इवेंट डेकोर बिहार", "Event Decor Bihar",
              "Haldi Tub Manufacturer", "Fiber Workshop Muzaffarpur",
            ].map((tag, i) => (
              <span key={i} style={{
                background: `${THEME.gold}10`, border: `1px solid ${THEME.gold}25`,
                borderRadius: 999, padding: "3px 10px",
                fontSize: "0.72rem", color: THEME.textMuted,
              }}>{tag}</span>
            ))}
          </div>
        </div>
        <p style={{ color: THEME.textMuted, textAlign: "center", margin: 0, fontSize: "0.85rem" }}>© 2024 जय माँ अम्बे फाइबर वर्कशॉप | सर्वाधिकार सुरक्षित</p>
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
  const [galleryFilter, setGalleryFilter] = useState("सभी")

  const navigate = (page, filter) => {
    if (filter) setGalleryFilter(filter)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Hind:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap');
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: 'Hind', sans-serif; background: #0d0500; color: #c8b89a; scroll-behavior: smooth; }
      h1, h2, h3 { font-family: 'Tiro Devanagari Hindi', serif; }
      @keyframes whatsapp-pulse {
        0%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0.5)}
        70%{transform:scale(1.06);box-shadow:0 0 0 12px rgba(37,211,102,0)}
        100%{transform:scale(1);box-shadow:0 0 0 0 rgba(37,211,102,0)}
      }
      @keyframes call-pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
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
      case "gallery":  return <GalleryPage initialFilter={galleryFilter} />
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

      {/* ── WhatsApp FAB ── */}
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
          animation: "whatsapp-pulse 2.5s ease-in-out infinite",
          textDecoration: "none",
        }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="white"/>
        </svg>
      </a>

      {/* ── Phone FAB ── */}
      <a
        href="tel:9102556441"
        title="अभी कॉल करें"
        style={{
          position: "fixed", bottom: 28, left: 24, zIndex: 50,
          width: 60, height: 60, borderRadius: "50%",
          background: `linear-gradient(135deg, ${THEME.goldLight}, ${THEME.gold})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 24px ${THEME.gold}70`,
          animation: "call-pulse 2.5s ease-in-out infinite",
          textDecoration: "none",
        }}
      >
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
            transition: "transform 0.2s",
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
