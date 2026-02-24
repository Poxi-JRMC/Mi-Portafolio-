import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { FiSend } from "react-icons/fi";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Typewriter from "typewriter-effect";

const inputSx = {
  "& .MuiOutlinedInput-root": {
    color: "#ccd6f6",
    fontFamily: "'Inter', sans-serif",
    "& fieldset": { borderColor: "rgba(100, 255, 218, 0.5)" },
    "&:hover fieldset": { borderColor: "#64ffda" },
    "&.Mui-focused fieldset": { borderColor: "#64ffda", borderWidth: 2 },
  },
  "& .MuiInputLabel-root": { color: "#64ffda" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#64ffda" },
};

export const ContactSection = ({ sendEmail, isMobile = false, scrollContainerRef, highlightedSection }) => {
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
            maxWidth: 580,
            animation: visible ? (isMobile ? "fadeInUpMobile 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards" : "fadeInUp 0.6s ease-out forwards") : "none",
            opacity: visible ? undefined : 0,
            bgcolor: "rgba(11, 24, 26, 0.95)",
            border: "1px solid rgba(100, 255, 218, 0.4)",
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(100, 255, 218, 0.08)",
            p: { xs: 3, sm: 4, md: 5 },
            display: "flex",
            flexDirection: "column",
            gap: 2.5,
            color: "#ccd6f6",
            backdropFilter: "blur(10px)",
          }}
        >
          <Typography
            variant="overline"
            align="center"
            sx={{
              display: "block",
              color: "#64ffda",
              letterSpacing: 4,
              fontSize: { xs: "1rem", md: "1.1rem" },
              fontWeight: 600,
              mb: 1,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contáctame
          </Typography>
          <Box
            sx={{
              mb: 2,
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              textAlign: "center",
              "& .Typewriter__wrapper": {
                whiteSpace: "normal !important",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              },
              "& .Typewriter__cursor": {
                whiteSpace: "normal !important",
              },
            }}
          >
            <Typography
              component="span"
              sx={{
                display: "block",
                color: "#8892b0",
                fontSize: { xs: "0.9rem", md: "0.95rem" },
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {isMobile ? (
                "Hagamos realidad tu proyecto 🚀"
              ) : (
                <Typewriter
                  options={{
                    strings: [
                      "Hagamos realidad tu proyecto 🚀",
                      "Desarrollo web a tu medida 🌐",
                    ],
                    autoStart: true,
                    loop: true,
                    delay: 280,
                    deleteSpeed: 50,
                    cursor: "|",
                  }}
                />
              )}
            </Typography>
          </Box>

          <form id="contact-form" onSubmit={sendEmail}>
            <TextField
              label="Nombres"
              name="name"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 2, ...inputSx }}
            />
            <TextField
              label="Apellidos"
              name="lastname"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 2, ...inputSx }}
            />
            <TextField
              label="Correo"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 2, ...inputSx }}
            />
            <TextField
              label="Mensaje"
              name="message"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
              size="small"
              sx={{ mb: 3, ...inputSx }}
              slotProps={{ input: { sx: { fontFamily: "'Inter', sans-serif" } } }}
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "center",
                gap: 2,
                mt: 2,
              }}
            >
              <Button
                type="submit"
                variant="contained"
                startIcon={<FiSend />}
                fullWidth={false}
                sx={{
                  minWidth: 140,
                  py: 1.25,
                  fontWeight: 600,
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  color: "#0a192f",
                  backgroundColor: "#64ffda",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(100, 255, 218, 0.3)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#52e0b8",
                    boxShadow: "0 6px 24px rgba(100, 255, 218, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Enviar
              </Button>

              <Button
                component="a"
                href="https://wa.me/59169707601"
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<WhatsAppIcon />}
                sx={{
                  minWidth: 140,
                  py: 1.25,
                  fontWeight: 600,
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  color: "#fff",
                  backgroundColor: "#25D366",
                  borderRadius: 2,
                  boxShadow: "0 4px 20px rgba(37, 211, 102, 0.3)",
                  textTransform: "none",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#1ebe5d",
                    boxShadow: "0 6px 24px rgba(37, 211, 102, 0.4)",
                    transform: "translateY(-2px)",
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