import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
  Slide,
  Fade,
} from '@mui/material'
import emailjs from '@emailjs/browser'
import Typewriter from 'typewriter-effect'
import ProjectDetail from './components/ProjectDetail'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import {
  socialLinks,
  menuItems,
  proyectosData,
  aboutBlocks,
  technologies,
} from './data/constants'

import './App.css'

export default function App() {
  const sendEmail = (e) => {
    e.preventDefault()
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Mensaje enviado ✅', result.text)
          alert('Mensaje enviado con éxito!')
          e.target.reset()
        },
        (error) => {
          console.log('Error ❌', error.text)
          alert('Ocurrió un error, intenta de nuevo')
        }
      )
  }

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState('about')
  const [selectedProject, setSelectedProject] = useState(null)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [menuSlideDown, setMenuSlideDown] = useState(false)
  const [typewriterReady, setTypewriterReady] = useState(false)
  const [cycleStarted, setCycleStarted] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const rafRef = useRef(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const mainRef = useRef(null)

  // Scroll spy: actualiza el menú según la sección visible
  useEffect(() => {
    const main = mainRef.current
    if (!main) return

    const sectionIds = ['about', 'experience', 'projects', 'contacto']

    const updateActive = () => {
      const scrollTop = main.scrollTop
      let activeId = 'about'

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i])
        if (!el) continue
        const sectionTop = el.offsetTop
        const threshold = 120
        if (scrollTop >= sectionTop - threshold) {
          activeId = sectionIds[i]
          break
        }
      }
      setActive(activeId)
    }

    main.addEventListener('scroll', updateActive)
    updateActive()
    return () => main.removeEventListener('scroll', updateActive)
  }, [])

  // Efecto del cursor con throttle vía requestAnimationFrame
  useEffect(() => {
    const move = (e) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY }
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setCursorPos(lastPosRef.current)
        rafRef.current = null
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Delay antes de que empiece el typewriter; luego el menú baja
  useEffect(() => {
    const t1 = setTimeout(() => setTypewriterReady(true), 1000)
    const t2 = setTimeout(() => setMenuSlideDown(true), 1400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Primera carga: misma posición que al hacer clic en "Más sobre mí"
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById('about')
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }, 100)
    return () => clearTimeout(t)
  }, [])

  // Ciclo de visibilidad solo para sidebar (logo, typewriter, redes)
  useEffect(() => {
    let exitTimeout
    let enterTimeout

    const startCycle = () => {
      setSidebarVisible(true)
      exitTimeout = setTimeout(() => {
        setSidebarVisible(false)
        setCycleStarted(true)
        enterTimeout = setTimeout(startCycle, 2000)
      }, 15000)
    }

    startCycle()
    return () => {
      clearTimeout(exitTimeout)
      clearTimeout(enterTimeout)
    }
  }, [])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  const onProjectClick = (project) => {
    setSelectedProject(project)
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          bgcolor: '#121212',
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(100,255,218,0.12), transparent 40%)`,
          transition: 'background 0.1s',
          zIndex: -1,
        }}
      />

      {/* CONTENEDOR DEL MENÚ LATERAL: posición = top, left | tamaño = width */}
      <Slide direction="down" in={true} timeout={700}>
        <Box
          sx={{
            position: isMobile ? 'relative' : 'fixed',
            top: isMobile ? 0 : 100,      // posición vertical (px desde arriba)
            left: isMobile ? 0 : 190,     // posición horizontal (px desde la izquierda)
            width: isMobile ? '100%' : 200,  // ancho del contenedor
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: 5,   // padding horizontal del contenedor
            py: 5,   // padding vertical del contenedor
            zIndex: 10,
            bgcolor: isMobile ? '#121212' : 'transparent',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* SVG órbitas: animación de entrada */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '48%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: 250, sm: 300, md: 350 },
                  height: { xs: 250, sm: 300, md: 350 },
                  zIndex: 1,
                  pointerEvents: 'none',
                  animation: 'entranceElectrons 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                }}
              >
                <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                  <circle cx="30" cy="40" r="1.5" fill="#0ff" opacity="0.6">
                    <animate attributeName="cy" values="40;38;40" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="160" cy="150" r="2" fill="#0ff" opacity="0.5">
                    <animate attributeName="cy" values="150;148;150" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="180" r="1.2" fill="#0ff" opacity="0.4">
                    <animate attributeName="r" values="1.2;1.8;1.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="45" cy="165" r="1.8" fill="#0ff" opacity="0.55">
                    <animate attributeName="cx" values="45;47;45" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="170" cy="55" r="1.4" fill="#0ff" opacity="0.45">
                    <animate attributeName="opacity" values="0.45;0.7;0.45" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="75" cy="25" r="1.6" fill="rgba(0, 255, 255, 0.6)">
                    <animate attributeName="cy" values="25;28;25" dur="4.5s" repeatCount="indefinite" />
                  </circle>
                  <g style={{ transformOrigin: '100px 100px', animation: 'rotate 6s linear infinite' }}>
                    <ellipse cx="100" cy="100" rx="80" ry="30" stroke="#0ff" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="20" r="4" fill="#0ff" style={{ animation: 'pulse 1.5s ease-in-out infinite, glow 2s ease-in-out infinite' }} />
                  </g>
                  <g style={{ transformOrigin: '100px 100px', animation: 'rotateReverse 8s linear infinite' }}>
                    <ellipse cx="100" cy="100" rx="30" ry="80" transform="rotate(60 100 100)" stroke="#0ff" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="20" r="4" fill="#0ff" style={{ animation: 'pulse 1.7s ease-in-out infinite, glow 2.5s ease-in-out infinite' }} />
                  </g>
                  <g style={{ transformOrigin: '100px 100px', animation: 'rotate 10s linear infinite' }}>
                    <ellipse cx="100" cy="100" rx="50" ry="80" transform="rotate(120 100 100)" stroke="#0ff" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="20" r="4" fill="#0ff" style={{ animation: 'pulse 1.9s ease-in-out infinite, glow 3s ease-in-out infinite' }} />
                  </g>
                  <g style={{ transformOrigin: '100px 100px', animation: 'rotateReverse 14s linear infinite' }}>
                    <ellipse cx="100" cy="100" rx="60" ry="50" transform="rotate(45 100 100)" stroke="rgba(0, 255, 255, 0.9)" strokeWidth="2" fill="none" />
                    <circle cx="100" cy="50" r="4" fill="rgba(0, 255, 255, 0.9)" style={{ animation: 'pulse 2.2s ease-in-out infinite, glow 3s ease-in-out infinite' }} />
                  </g>
                </svg>
              </Box>

              {/* FOTO: primera carga = entrancePhoto; después del ciclo = Fade */}
              {!cycleStarted ? (
                <Box sx={{ display: 'inline-block' }}>
                  <Box
                    component="img"
                    src="/logo2.png"
                    alt="Mi pose"
                    sx={{
                      position: 'relative',
                      height: { xs: 180, sm: 240, md: 280 },
                      width: 'auto',
                      borderRadius: 5,
                      objectFit: 'contain',
                      ml: 3,
                      mt: -6,
                      zIndex: 2,
                      animation: 'entrancePhoto 1.5s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both',
                      transition: 'transform 0.3s ease, filter 0.3s ease',
                      filter: 'drop-shadow(0 0 8px rgba(100, 255, 218, 0.9)) drop-shadow(0 0 10px rgba(100, 255, 218, 0.9))',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        filter: 'drop-shadow(0 0 15px rgba(100, 255, 218, 1)) drop-shadow(0 0 20px rgba(100, 255, 218, 1)) brightness(1.3)',
                      },
                    }}
                  />
                </Box>
              ) : (
                <Fade in={sidebarVisible} timeout={{ enter: 2200, exit: 2200 }}>
                  <Box sx={{ display: 'inline-block' }}>
                    <Box
                      component="img"
                      src="/logo2.png"
                      alt="Mi pose"
                      sx={{
                        position: 'relative',
                        height: { xs: 180, sm: 240, md: 280 },
                        width: 'auto',
                        borderRadius: 5,
                        objectFit: 'contain',
                        ml: 3,
                        mt: -7,
                        zIndex: 2,
                        transition: 'transform 0.3s ease, filter 0.3s ease',
                        filter: 'drop-shadow(0 0 8px rgba(100, 255, 218, 0.9)) drop-shadow(0 0 10px rgba(100, 255, 218, 0.9))',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          filter: 'drop-shadow(0 0 15px rgba(100, 255, 218, 1)) drop-shadow(0 0 20px rgba(100, 255, 218, 1)) brightness(1.3)',
                        },
                      }}
                    />
                  </Box>
                </Fade>
              )}
            </Box>

            {/* Espacio del texto: mt = separación foto–texto; py = padding; mb = espacio antes del menú */}
            <Box
              sx={{
                width: '170%',
                height: '3.6em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,   // separación entre foto y texto (aumentar para más espacio)
                py: 6,
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontWeight: 600,
                  color: '#64ffda',
                  letterSpacing: 1,
                  fontFamily: 'monospace',
                  fontSize: '1.2rem',
                  width: '100%',
                  lineHeight: 1.3,
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                }}
              >
                {typewriterReady && (
                  <Typewriter
                    options={{
                      strings: [
                        'ING. Johan Raul Mamani Cañari',
                        'Desarrollador Full Stack 💻',
                        'Apasionado por la tecnología 🚀',
                      ],
                      autoStart: true,
                      loop: true,
                      delay: 80,
                      deleteSpeed: 40,
                    }}
                  />
                )}
              </Typography>
            </Box>

            {/* MENÚ: empieza arriba (debajo de la foto); al aparecer la primera letra baja y se fija */}
            <Box
              sx={{
                width: '170%',
                transform: menuSlideDown ? 'translateY(0)' : 'translateY(-4.5em)',
                transition: 'transform 0.5s ease-out',
              }}
            >
              <Stack spacing={2} sx={{ width: '100%', mt: -2 }}>
              {menuItems.map(({ id, label, icon }) => (
                <Box
                  key={id}
                  onClick={() => scrollToSection(id)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,           // espacio entre icono y texto
                    px: 2.5,          // padding horizontal (ancho del botón)
                    py: 1.2,          // padding vertical (alto del botón)
                    borderRadius: 3,
                    position: 'relative',
                    bgcolor: active === id ? 'rgba(100,255,218,0.1)' : 'transparent',
                    color: active === id ? '#64ffda' : '#8892b0',
                    fontWeight: active === id ? 'bold' : 400,
                    fontSize: '0.95rem',   // tamaño del texto del menú
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(100,255,218,0.08)',
                      color: '#64ffda',
                      textShadow: '0 0 10px #64ffda, 0 0 20px #64ffda',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '3px',
                      width: active === id ? '100%' : '0',
                      bgcolor: '#64ffda',
                      boxShadow: active === id ? '0 0 10px #64ffda' : 'none',
                      transition: 'width 0.3s ease',
                    },
                  }}
                >
                  {React.cloneElement(icon, { fontSize: 'medium' })}
                  {label}
                </Box>
              ))}
              </Stack>
            </Box>

            {/* REDES SOCIALES: primera carga = visibles; después del ciclo = Fade uno a uno */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: '170%',
                alignItems: 'center',
                justifyContent: 'flex-start',
                mt: 4,
                flexWrap: 'nowrap',
              }}
            >
              {socialLinks.map(({ label, href, icon }, i) => (
                <React.Fragment key={label}>
                  {!cycleStarted ? (
                    <Tooltip title={label}>
                      <IconButton component="a" href={href} target="_blank" rel="noopener" sx={{ color: '#64ffda' }}>
                        {React.cloneElement(icon, { fontSize: 'medium' })}
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Fade in={sidebarVisible} timeout={1000} style={{ transitionDelay: `${150 * i}ms` }}>
                      <Tooltip title={label}>
                        <IconButton component="a" href={href} target="_blank" rel="noopener" sx={{ color: '#64ffda' }}>
                          {React.cloneElement(icon, { fontSize: 'medium' })}
                        </IconButton>
                      </Tooltip>
                    </Fade>
                  )}
                </React.Fragment>
              ))}
            </Stack>
          </Box>
        </Box>
      </Slide>

      <Box
        ref={mainRef}
        component="main"
        sx={{
          ml: isMobile ? 0 : isTablet ? '300px' : '400px',
          mt: isMobile ? 2 : 1,
          px: isMobile ? 3 : 24,
          py: -4,
          height: '100vh',
          overflowY: 'auto',
          color: '#ccd6f6',
          fontFamily: "'Inter', sans-serif",
          scrollBehavior: 'smooth',
        }}
      >
        <AboutSection aboutBlocks={aboutBlocks} />
        <ExperienceSection technologies={technologies} />
        <ProjectsSection
          proyectosData={proyectosData}
          onProjectClick={onProjectClick}
          isMobile={isMobile}
          isTablet={isTablet}
        />
        <ContactSection sendEmail={sendEmail} />
        <Footer />
      </Box>

      <ProjectDetail
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}
