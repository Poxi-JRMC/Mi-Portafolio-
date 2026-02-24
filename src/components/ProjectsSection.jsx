import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectsSection = ({
  proyectosData,
  onProjectClick,
  isMobile,
  isTablet,
}) => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" style={{ minHeight: "100vh", marginBottom: "4rem" }}>
      <Typography
        variant="overline"
        sx={{
          display: "block",
          color: "#64ffda",
          letterSpacing: 4,
          fontSize: { xs: "1.05rem", md: "1.15rem" },
          fontWeight: 500,
          mb: 2,
          animation: visible ? "fadeInUp 0.5s ease-out forwards" : "none",
          opacity: visible ? undefined : 0,
        }}
      >
        Proyectos
      </Typography>

      <Typography
        paragraph
        sx={{
          whiteSpace: "normal",
          mb: 4,
          fontFamily: "'Inter', sans-serif",
          color: "#8892b0",
          fontSize: { xs: "0.95rem", md: "1rem" },
          animation: visible ? "fadeInUp 0.5s ease-out 0.1s forwards" : "none",
          opacity: visible ? undefined : 0,
        }}
      >
        Haz clic en un proyecto para ver el detalle, capturas y enlaces a GitHub.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 5 },
          position: "relative",
        }}
      >
        {proyectosData.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <Box
              key={project.id}
              sx={{
                display: "flex",
                flexDirection: isMobile
                  ? "column"
                  : isEven
                  ? "row"
                  : "row-reverse",
                alignItems: "stretch",
                gap: { xs: 2, md: 3 },
                mb: 0,
                position: "relative",
                animation: visible ? "fadeInUp 0.6s ease-out forwards" : "none",
                animationDelay: visible ? `${0.2 + index * 0.12}s` : "0ms",
                opacity: visible ? undefined : 0,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  minWidth: isMobile ? "100%" : "45%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isMobile ? "center" : isEven ? "flex-end" : "flex-start",
                  pr: isMobile ? 0 : isEven ? 3 : 0,
                  pl: isMobile ? 0 : isEven ? 0 : 3,
                }}
              >
                <Box
                  onClick={() => onProjectClick(project)}
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    maxWidth: 400,
                  }}
                >
                  <ProjectCard
                    {...project}
                    sxCard={{
                      border: "1px solid rgba(100, 255, 218, 0.35)",
                    }}
                  />
                </Box>
              </Box>

              {!isMobile && (
                <Box
                  sx={{
                    width: 2,
                    minHeight: "100%",
                    bgcolor: "rgba(100, 255, 218, 0.4)",
                    alignSelf: "stretch",
                    borderRadius: 1,
                    boxShadow: "0 0 8px rgba(100, 255, 218, 0.3)",
                    flexShrink: 0,
                  }}
                />
              )}

              <Box
                sx={{
                  flex: 1,
                  minWidth: isMobile ? "100%" : "45%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  pl: isMobile ? 0 : isEven ? 3 : 0,
                  pr: isMobile ? 0 : isEven ? 0 : 3,
                  py: isMobile ? 2 : 0,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#64ffda",
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#a8b2d1",
                    lineHeight: 1.7,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  {project.description}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </section>
  );
};

export default ProjectsSection;
