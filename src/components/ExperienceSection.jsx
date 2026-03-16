import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import BuildIcon from "@mui/icons-material/Build";
import { supportBlocks } from "../data/constants";
import { useT } from "../context/LanguageContext";

const statsValues = [
  { value: 3, suffix: "+" },
  { value: 6, suffix: "" },
  { value: 8, suffix: "+" },
];

const useCountUp = (end, duration, start) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(easeOut * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, start]);
  return count;
};

const StatCard = ({ value, suffix, label, index, visible, isMobile = false }) => {
  const animatedCount = useCountUp(value, 2000, visible);
  const displayCount = isMobile ? value : animatedCount;
  return (
    <Box
      sx={{
        flex: "1 1 100px",
        minWidth: { xs: 85, md: 90 },
        maxWidth: { xs: 130, md: 140 },
        textAlign: "center",
        py: { xs: 1.5, md: 2 },
        px: { xs: 1.5, md: 2 },
        borderRadius: "12px",
        border: "1px solid rgba(100, 255, 218, 0.35)",
        bgcolor: "rgba(9,48,53,0.5)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        transition: "transform 0.4s ease, box-shadow 0.4s ease",
        animation: isMobile ? "none" : (visible ? "statFadeIn 0.5s ease forwards" : "none"),
        animationDelay: isMobile ? "0ms" : (visible ? `${index * 120}ms` : "0ms"),
        opacity: isMobile ? 1 : (visible ? undefined : 0),
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 28px rgba(100, 255, 218, 0.2)",
          borderColor: "rgba(100, 255, 218, 0.6)",
        },
      }}
    >
      <Typography sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, fontWeight: 700, color: "#64ffda", fontVariantNumeric: "tabular-nums" }}>
        {displayCount}{suffix}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "0.7rem", md: "0.8rem" },
          color: "#8892b0",
          mt: 0.5,
          wordBreak: "break-word",
          overflowWrap: "break-word",
          lineHeight: 1.3,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const ExperienceSection = ({ technologies, isMobile = false, scrollContainerRef, highlightedSection }) => {
  const t = useT();
  const sectionRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const root = isMobile && scrollContainerRef?.current ? scrollContainerRef.current : null;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          if (!hasAnimated) {
            setStatsVisible(true);
            setHasAnimated(true);
          }
        }
      },
      { threshold: 0.02, root }
    );
    observer.observe(el);
    const fallback = isMobile ? setTimeout(() => {
      setSectionVisible(true);
      setStatsVisible(true);
      setHasAnimated(true);
    }, 800) : null;
    return () => {
      observer.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, [hasAnimated, isMobile, scrollContainerRef]);

  const isHighlighted = isMobile && highlightedSection === "experience";
  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        marginBottom: "1rem",
        minHeight: "100vh",
        animation: isHighlighted ? "sectionSlideDown 0.5s ease-out" : undefined,
      }}
    >
      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "#64ffda",
          letterSpacing: 4,
          fontSize: { xs: "1.05rem", md: "1.15rem" },
          fontWeight: 500,
          mb: 2,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "fadeInUp 0.5s ease-out forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {t('experience.title')}
      </Typography>

      <Box
        sx={{
          borderLeft: "2px solid rgba(100, 255, 218, 0.3)",
          pl: 2.5,
          py: 1.25,
          mb: 2,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s forwards" : "fadeInUp 0.5s ease-out 0.1s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.05rem", md: "1.12rem" },
            lineHeight: 1.7,
            maxWidth: 800,
            color: "#ccd6f6",
            mb: 2,
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {t('experience.p1')}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "1.05rem", md: "1.12rem" },
            lineHeight: 1.7,
            maxWidth: 800,
            color: "#ccd6f6",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {t('experience.p2')}
        </Typography>
      </Box>

      {/* Soporte técnico: álbum visual */}
      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "#64ffda",
          letterSpacing: 3,
          fontSize: "0.85rem",
          mb: 1.5,
          mt: 3,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.18s forwards" : "fadeInUp 0.5s ease-out 0.18s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {t('experience.supportTitle')}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: { xs: 1, sm: 1.5, md: 2 },
          mb: 3,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.22s forwards" : "fadeInUp 0.5s ease-out 0.22s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {supportBlocks.map(({ id, img }, i) => {
          const altText = t('experience.supportAlt')[i] || ''
          return (
          <Box
            key={id}
            sx={{
              position: "relative",
              aspectRatio: "1",
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid rgba(100, 255, 218, 0.25)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
              bgcolor: "rgba(10, 25, 47, 0.6)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 24px rgba(100, 255, 218, 0.2)",
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={altText}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.style.display = "none";
                const fallback = e.target.nextElementSibling;
                if (fallback) fallback.style.display = "flex";
              }}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              sx={{
                display: "none",
                position: "absolute",
                inset: 0,
                alignItems: "center",
                justifyContent: "center",
                color: "#64ffda",
                bgcolor: "rgba(10, 25, 47, 0.9)",
              }}
            >
              <BuildIcon sx={{ fontSize: { xs: 40, md: 48 }, opacity: 0.6 }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                py: 0.75,
                px: 1,
                background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "#64ffda",
                  fontSize: { xs: "0.65rem", sm: "0.7rem" },
                  fontWeight: 600,
                }}
              >
                {altText}
              </Typography>
            </Box>
          </Box>
          )
        })}
      </Box>

      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "#64ffda",
          letterSpacing: 3,
          fontSize: "0.85rem",
          mb: 1.5,
          mt: 1,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards" : "fadeInUp 0.5s ease-out 0.25s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {t('experience.techTitle')}
      </Typography>

      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          mt: 2,
          mb: 3,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards" : "fadeInUp 0.5s ease-out 0.25s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
          "&::before, &::after": {
            content: '""',
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 60,
            zIndex: 2,
            pointerEvents: "none",
          },
          "&::before": {
            left: 0,
            background: "linear-gradient(to right, #121212, transparent)",
          },
          "&::after": {
            right: 0,
            background: "linear-gradient(to left, #121212, transparent)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            animation: "techScroll 50s linear infinite",
            "&:hover": { animationPlayState: "paused" },
          }}
        >
          {[...technologies, ...technologies].map(({ label, icon }, i) => (
            <Box
              key={`tech-${i}`}
              sx={{
                flexShrink: 0,
                width: { xs: 78, sm: 88 },
                height: { xs: 78, sm: 88 },
                bgcolor: "rgba(9,48,53,0.85)",
                borderRadius: "14px",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(100,255,218,0.35)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 15px rgba(100,255,218,0.2)",
                transition: "transform 0.35s ease, box-shadow 0.35s ease",
                "&:hover": {
                  transform: "scale(1.12)",
                  boxShadow: "0 0 25px rgba(100,255,218,0.5)",
                },
              }}
            >
              {icon || (
                <Typography sx={{ fontSize: 11, fontStyle: "italic", color: "#8892b0" }}>
                  —
                </Typography>
              )}
              <Typography
                variant="caption"
                sx={{
                  mt: 0.5,
                  fontWeight: 600,
                  textAlign: "center",
                  color: "#ccd6f6",
                  fontSize: "0.72rem",
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Mini stats - contador animado al entrar en vista */}
      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "#64ffda",
          letterSpacing: 3,
          fontSize: "0.85rem",
          mb: 1.5,
          mt: 3,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.35s forwards" : "fadeInUp 0.5s ease-out 0.35s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {t('experience.statsTitle')}
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1.5, md: 3 },
          mt: 2,
          mb: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {statsValues.map(({ value, suffix }, i) => {
          const label = t('experience.statsLabels')[i] || ''
          return <StatCard key={i} value={value} suffix={suffix} label={label} index={i} visible={statsVisible} isMobile={isMobile} />
        })}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 3, md: 4 },
          alignItems: "flex-start",
          mt: 2,
          animation: sectionVisible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards" : "fadeInUp 0.5s ease-out 0.5s forwards") : "none",
          opacity: sectionVisible ? undefined : 0,
        }}
      >
        {/* CV panel - centrado, más a la derecha y abajo */}
        <Box
          sx={{
            flex: 1,
            minWidth: { md: "50%" },
            order: { xs: 1, md: 1 },
            display: "flex",
            justifyContent: { md: "center" },
            alignItems: "center",
            pl: { md: 2 },
            mt: { xs: 0, md: 3 },
          }}
        >
          <Box
            component="a"
            href="/cv%20actualizado.pdf"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 190,
              height: 170,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              border: "2px solid rgba(100, 255, 218, 0.45)",
              bgcolor: "rgba(9,48,53,0.6)",
              color: "#64ffda",
              fontFamily: "monospace",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              "&:hover": {
                boxShadow: "0 0 28px rgba(100, 255, 218, 0.3)",
                borderColor: "#64ffda",
                transform: "translateY(-4px)",
              },
            }}
          >
            <PictureAsPdfIcon sx={{ fontSize: 48, mb: 1, opacity: 0.95 }} />
            <Typography sx={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {t('experience.cvTitle')}
            </Typography>
            <Typography sx={{ fontSize: "0.78rem", color: "#8892b0", mt: 0.5 }}>
              {t('experience.cvSub')}
            </Typography>
          </Box>
        </Box>

        {/* Metodología - derecha */}
        <Box sx={{ flex: 1, minWidth: { md: "50%" }, order: { xs: 2, md: 2 } }}>
          <Typography
            variant="overline"
            sx={{
              display: "block",
              color: "#64ffda",
              letterSpacing: 3,
              fontSize: "0.85rem",
              mb: 1.5,
            }}
          >
            {t('experience.methodTitle')}
          </Typography>
          <Box
            sx={{
              borderLeft: "2px solid rgba(100, 255, 218, 0.3)",
              pl: 2,
              py: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.65,
                color: "#a8b2d1",
                mb: 1,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {t('experience.methodP1')}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.05rem" },
                lineHeight: 1.65,
                color: "#8892b0",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              {t('experience.methodP2')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default ExperienceSection;
