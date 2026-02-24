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
        borderTop: "1px solid rgba(100, 255, 218, 0.2)",
        py: 4,
        px: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        bgcolor: "rgba(10, 25, 47, 0.6)",
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
                "&:hover": { color: "#64ffda" },
              }}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: "#64ffda",
          fontSize: "0.9rem",
          fontWeight: 600,
          letterSpacing: 2,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        INNOVA - J.M.C.
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#8892b0",
          fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Johan Raúl Mamani Cañari © {new Date().getFullYear()}
      </Typography>
      <Typography
        component="a"
        href="mailto:mamanijohan46@gmail.com"
        sx={{
          color: "#64ffda",
          fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif",
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        mamanijohan46@gmail.com
      </Typography>
      <IconButton
        onClick={scrollToTop}
        size="small"
        sx={{
          color: "#64ffda",
          "&:hover": { bgcolor: "rgba(100, 255, 218, 0.1)" },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
