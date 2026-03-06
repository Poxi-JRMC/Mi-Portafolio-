import React, { useState, useEffect, useRef } from "react";
import { Typography, Box, useTheme } from "@mui/material";

const AboutSection = ({ aboutBlocks, isMobile = false, scrollContainerRef, highlightedSection }) => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    const root = isMobile && scrollContainerRef?.current ? scrollContainerRef.current : null;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: isMobile ? 0.05 : 0.15, root }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile, scrollContainerRef]);

  const isHighlighted = isMobile && highlightedSection === "about";
  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        marginBottom: "1rem",
        width: "100%",
        maxWidth: "100%",
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
          animation: visible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "fadeInUp 0.5s ease-out forwards") : "none",
          opacity: visible ? undefined : 0,
        }}
      >
        Sobre mí
      </Typography>

      {aboutBlocks.map(({ id, text, img, alt }, i) => (
        <Box
          key={id}
          sx={{
            display: "flex",
            animation: visible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "fadeInUp 0.6s ease-out forwards") : "none",
            animationDelay: visible ? `${i * 0.15}s` : "0ms",
            opacity: visible ? undefined : 0,
            flexDirection: i % 2 === 0 ? "row" : "row-reverse",
            gap: { xs: 2.5, md: 5 },
            mb: 3.5,
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "stretch",
            },
          }}
        >
          <Box
            sx={{
              flex: "1 1 65%",
              minWidth: 0,
              maxWidth: 900,
              [theme.breakpoints.down("md")]: {
                minWidth: "100%",
                maxWidth: "100%",
              },
            }}
          >
            <Box
              sx={{
                borderLeft: "2px solid rgba(100, 255, 218, 0.3)",
                pl: 2.5,
                py: 1.25,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "1.05rem", md: "1.12rem" },
                  lineHeight: 1.7,
                  whiteSpace: "normal",
                  color: "#ccd6f6",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {text}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flex: "1 1 38%",
              minWidth: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "sticky",
              top: 120,
              pl: i % 2 === 0 ? 1.5 : 0,
              pr: i % 2 === 0 ? 0 : 2,
              [theme.breakpoints.down("md")]: {
                position: "static",
                minWidth: "100%",
                mt: 1,
                pl: 0,
                pr: 0,
              },
            }}
          >
            <Box
              component="img"
              src={img}
              alt={alt}
              loading={i === 0 ? "eager" : "lazy"}
              sx={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)",
                height: "220px",
                maxWidth: "100%",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)",
                },
                [theme.breakpoints.between("md", "lg")]: {
                  height: "260px",
                  maxWidth: "450px",
                },
                [theme.breakpoints.between("sm", "md")]: {
                  height: "240px",
                  maxWidth: "100%",
                },
                [theme.breakpoints.down("sm")]: {
                  height: "220px",
                  width: "100%",
                  marginBottom: "16px",
                },
              }}
            />
          </Box>
        </Box>
      ))}
    </section>
  );
};

export default AboutSection;
