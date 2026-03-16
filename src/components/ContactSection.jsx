import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { FiSend } from "react-icons/fi";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useT } from "../context/LanguageContext";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#ccd6f6",
    fontFamily: "'Space Grotesk', sans-serif",
    "& fieldset": { borderColor: "rgba(100, 255, 218, 0.3)" },
    "&:hover fieldset": { borderColor: "rgba(100, 255, 218, 0.6)" },
    "&.Mui-focused fieldset": { borderColor: "#64ffda", borderWidth: 2 },
  },
  "& .MuiInputLabel-root": { color: "#64ffda", fontFamily: "'Space Grotesk', sans-serif" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#64ffda" },
};

export const ContactSection = ({ sendEmail, isMobile = false, scrollContainerRef, highlightedSection }) => {
  const t = useT();
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

  const isHighlighted = isMobile && highlightedSection === "contacto";
  return (
    <section
      ref={sectionRef}
      id="contacto"
      style={{
        animation: isHighlighted ? "sectionSlideDown 0.5s ease-out" : undefined,
      }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 4, md: 5 },
          px: { xs: 0, md: 2 },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 540,
            animation: visible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "fadeInUp 0.6s ease-out forwards") : "none",
            opacity: visible ? undefined : 0,
            bgcolor: "rgba(10, 25, 47, 0.85)",
            border: "1px solid rgba(100, 255, 218, 0.25)",
            borderRadius: 3,
            boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
            p: { xs: 3, sm: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
            color: "#ccd6f6",
          }}
        >
          <Typography
            variant="overline"
            align="center"
            sx={{
              display: "block",
              color: "#64ffda",
              letterSpacing: 4,
              fontSize: { xs: "0.95rem", md: "1rem" },
              fontWeight: 600,
              mb: 0.5,
            }}
          >
            {t('contact.title')}
          </Typography>

          <Typography
            align="center"
            sx={{
              color: "#8892b0",
              fontSize: { xs: "0.88rem", md: "0.92rem" },
              mb: 1,
            }}
          >
            {t('contact.subtitle')}
          </Typography>

          <form id="contact-form" onSubmit={sendEmail}>
            <TextField
              label={t('contact.name')}
              name="name"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 2, ...inputSx }}
            />
            <TextField
              label={t('contact.email')}
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 2, ...inputSx }}
            />
            <TextField
              label={t('contact.message')}
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 3, ...inputSx }}
              slotProps={{ input: { sx: { fontFamily: "'Space Grotesk', sans-serif" } } }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<FiSend />}
                sx={{
                  minWidth: 140,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#0a192f",
                  backgroundColor: "#64ffda",
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#52e0b8",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(100, 255, 218, 0.3)",
                  },
                }}
              >
                {t('contact.send')}
              </Button>

              <Button
                component="a"
                href="https://wa.me/59169707601"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                sx={{
                  minWidth: 140,
                  py: 1.2,
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#fff",
                  backgroundColor: "#25D366",
                  borderRadius: 2,
                  textTransform: "none",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    backgroundColor: "#1ebe5d",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
                  },
                }}
              >
                WhatsApp
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </section>
  );
};

export default ContactSection;
