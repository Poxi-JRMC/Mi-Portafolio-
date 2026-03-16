import React from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { useT } from "../context/LanguageContext";

const ProjectDetail = ({ project, open, onClose }) => {
  const t = useT();
  if (!project) return null;

  const { id, title, description, image, background, link, demo, tech, screenshots, note } = project;
  const projTranslation = t('projects.data')[id]
  const hasBackground = !!background;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: hasBackground ? "transparent" : "rgba(11, 24, 26, 0.98)",
          border: "1px solid rgba(100, 255, 218, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 0 24px rgba(100, 255, 218, 0.08)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          zIndex: 10,
          color: "#64ffda",
          "&:hover": { bgcolor: "rgba(100, 255, 218, 0.1)" },
        }}
        aria-label="cerrar"
      >
        <CloseIcon />
      </IconButton>

      {/* Área scrollable: imagen + info + capturas */}
      <DialogContent sx={{ p: 0, overflowY: "auto", position: "relative", flex: 1 }}>
        {hasBackground && (
          <>
            <Box sx={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: `url(${background})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <Box sx={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to bottom, rgba(10,25,47,0.92) 0%, rgba(10,25,47,0.97) 50%, rgba(10,25,47,0.98) 100%)" }} />
          </>
        )}

        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Box sx={{ width: "100%", height: 220, overflow: "hidden", bgcolor: "#0a192f", borderBottom: "1px solid rgba(100,255,218,0.2)" }}>
            <Box component="img" src={image} alt={title}
              onError={(e) => { e.target.src = "https://placehold.co/800x220/0a192f/64ffda?text=" + encodeURIComponent(title); }}
              sx={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#64ffda", mb: 1.5, letterSpacing: 0.5 }}>
              {projTranslation?.title || title}
            </Typography>
            <Typography sx={{ color: "#a8b2d1", lineHeight: 1.75, fontSize: "1rem", mb: 2 }}>
              {projTranslation?.description || description}
            </Typography>

            {(projTranslation?.note || note) && (
              <Box sx={{ mb: 2, p: 1.5, borderRadius: 2, bgcolor: "rgba(100,255,218,0.08)", borderLeft: "3px solid #64ffda" }}>
                <Typography sx={{ color: "#64ffda", fontSize: "0.9rem" }}>{projTranslation?.note || note}</Typography>
              </Box>
            )}

            {tech && tech.length > 0 && (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.75, mb: 2 }}>
                {tech.map((chip) => (
                  <Chip key={chip} label={chip} size="small" sx={{ bgcolor: "rgba(100,255,218,0.1)", color: "#64ffda", border: "1px solid rgba(100,255,218,0.4)" }} />
                ))}
              </Box>
            )}

            {screenshots && screenshots.length > 0 && (
              <Box sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ color: "#8892b0", display: "block", mb: 1 }}>{t('detail.screenshots')}</Typography>
                <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                  {screenshots.map((src, i) => (
                    <Box key={i} component="img" src={src} alt={`Captura ${i + 1}`}
                      sx={{ height: 80, width: "auto", minWidth: 120, borderRadius: 1, objectFit: "cover", border: "1px solid rgba(100,255,218,0.3)", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.03)" } }}
                      onClick={() => window.open(src, "_blank")}
                    />
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      {/* Botones siempre visibles en la parte inferior */}
      {(link || demo) && (
        <Box sx={{ px: 3, py: 2, display: "flex", gap: 2, flexWrap: "wrap", borderTop: "1px solid rgba(100,255,218,0.15)", bgcolor: "rgba(10,25,47,0.98)", position: "relative", zIndex: 2 }}>
          {link && (
            <Button component="a" href={link} target="_blank" rel="noopener noreferrer" variant="contained" startIcon={<GitHubIcon />}
              sx={{ bgcolor: "rgba(100,255,218,0.15)", color: "#64ffda", border: "1px solid rgba(100,255,218,0.5)", textTransform: "none", fontWeight: 600,
                "&:hover": { bgcolor: "rgba(100,255,218,0.25)", boxShadow: "0 0 16px rgba(100,255,218,0.3)" } }}>
              {t('detail.github')}
            </Button>
          )}
          {demo && (
            <Button component="a" href={demo} target="_blank" rel="noopener noreferrer" variant="contained" endIcon={<LaunchIcon />}
              sx={{ bgcolor: "#64ffda", color: "#0a192f", fontWeight: 600, textTransform: "none",
                "&:hover": { bgcolor: "#52e0b8", boxShadow: "0 0 16px rgba(100,255,218,0.35)" } }}>
              {t('detail.demo')}
            </Button>
          )}
        </Box>
      )}
    </Dialog>
  );
};

export default ProjectDetail;
