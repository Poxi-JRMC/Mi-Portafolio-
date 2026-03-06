import React from "react";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { socialLinks } from "../data/constants";

export const Footer = () => {
  const scrollToTop = () => {
    const main = document.querySelector("main");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid rgba(100, 255, 218, 0.15)",
        py: 3,
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1.5,
        bgcolor: "rgba(10, 25, 47, 0.5)",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        {socialLinks.map(({ icon, href, label }) => (
          <Tooltip key={label} title={label}>
            <IconButton
              component="a"
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: "#8892b0",
                transition: "color 0.2s ease",
                "&:hover": { color: "#64ffda" },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", justifyContent: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: "#64ffda", fontSize: "0.85rem", fontWeight: 600, letterSpacing: 1.5 }}
        >
          INNOVA J.M.C.
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(100,255,218,0.3)", fontSize: "0.75rem" }}>
          /
        </Typography>
        <Typography variant="body2" sx={{ color: "#8892b0", fontSize: "0.82rem" }}>
          Johan Raúl Mamani Cañari © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(100,255,218,0.3)", fontSize: "0.75rem" }}>
          /
        </Typography>
        <Typography
          component="a"
          href="mailto:mamanijohan46@gmail.com"
          sx={{
            color: "#8892b0",
            fontSize: "0.82rem",
            textDecoration: "none",
            transition: "color 0.2s ease",
            "&:hover": { color: "#64ffda" },
          }}
        >
          mamanijohan46@gmail.com
        </Typography>
      </Box>

      <IconButton
        onClick={scrollToTop}
        size="small"
        sx={{
          color: "#64ffda",
          mt: 0.5,
          "&:hover": { bgcolor: "rgba(100, 255, 218, 0.08)" },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
