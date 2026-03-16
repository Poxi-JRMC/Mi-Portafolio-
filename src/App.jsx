import React, { useEffect, useState, useRef } from 'react'
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
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
import { useLang, useT } from './context/LanguageContext'

export default function App() {
  const sendEmail = (e) => {
    e.preventDefault()
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    console.log('EmailJS vars:', { serviceId, templateId, publicKey: publicKey ? 'OK' : 'UNDEFINED' })
    if (!serviceId || !templateId || !publicKey) {
      alert(t('contact.configError'))
      return
    }
    emailjs
      .sendForm(serviceId, templateId, e.target, publicKey)
      .then(
        (result) => {
          console.log('Mensaje enviado ✅', result.text)
          alert(t('contact.successMsg'))
          e.target.reset()
        },
        (error) => {
          console.log('Error ❌ completo:', error)
          alert(t('contact.errorMsg'))
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
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [highlightedSection, setHighlightedSection] = useState(null)
  const [appReady, setAppReady] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const { lang, toggle } = useLang()
  const t = useT()

  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 2000)
    return () => clearTimeout(t)
  }, [])
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'), { noSsr: true })
  const rafRef = useRef(null)
  const lastPosRef = useRef({ x: 0, y: 0 })
  const mainRef = useRef(null)
  const scrollContainerRef = useRef(null)

  // Scroll spy: cuando el contenido está montado (appReady)
  useEffect(() => {
    if (!appReady) return
    const sectionIds = ['about', 'experience', 'projects', 'contacto']
    const els = sectionIds.map((id) => document.getElementById(id)).filter(Boolean)
    if (els.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { root: null, rootMargin: '-15% 0px -60% 0px', threshold: 0 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [appReady])

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

  // Delay typewriter y menú (visible pronto tras splash)
  useEffect(() => {
    const t1 = setTimeout(() => setTypewriterReady(true), 300)
    const t2 = setTimeout(() => setMenuSlideDown(true), 500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  // Primera carga: scroll cuando el contenido está listo
  useEffect(() => {
    if (!appReady) return
    const t = setTimeout(() => {
      if (isMobile) {
        const el = scrollContainerRef.current
        if (el) el.scrollTo({ top: 0, behavior: 'auto' })
      } else {
        const el = document.getElementById('about')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
    return () => clearTimeout(t)
  }, [appReady, isMobile])

  // Ciclo de visibilidad solo para sidebar (logo, typewriter, redes). En móvil: siempre visible.
  useEffect(() => {
    if (isMobile) return
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
  }, [isMobile])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
      if (isMobile) {
        setHighlightedSection(id)
        setTimeout(() => setHighlightedSection(null), 500)
      }
    }
  }

  const onProjectClick = (project) => {
    setSelectedProject(project)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#121212', position: 'relative' }}>
      {/* Switch de idioma ES | EN — fijo esquina superior derecha */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 12, md: 16 },
          right: { xs: 14, md: 20 },
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography
          onClick={() => lang !== 'es' && toggle()}
          sx={{
            cursor: lang === 'es' ? 'default' : 'pointer',
            color: lang === 'es' ? '#64ffda' : '#8892b0',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: 1,
            transition: 'color 0.2s',
            userSelect: 'none',
            '&:hover': lang !== 'es' ? { color: '#ccd6f6' } : {},
          }}
        >
          ES
        </Typography>
        <Typography sx={{ color: 'rgba(100,255,218,0.25)', fontSize: '0.7rem', userSelect: 'none' }}>|</Typography>
        <Typography
          onClick={() => lang !== 'en' && toggle()}
          sx={{
            cursor: lang === 'en' ? 'default' : 'pointer',
            color: lang === 'en' ? '#64ffda' : '#8892b0',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: 1,
            transition: 'color 0.2s',
            userSelect: 'none',
            '&:hover': lang !== 'en' ? { color: '#ccd6f6' } : {},
          }}
        >
          EN
        </Typography>
      </Box>

      {/* Splash: exactamente 2000 ms, animación suave, luego se oculta */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          bgcolor: '#121212',
          display: appReady ? 'none' : 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          pointerEvents: appReady ? 'none' : 'auto',
        }}
      >
        <Box
          component="img"
          src="/jrmc.png"
          alt="Logo"
          sx={{
            width: 100,
            height: 'auto',
            filter: 'drop-shadow(0 0 20px rgba(100, 255, 218, 0.5))',
            animation: 'splashZoom 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
          }}
        />
        <Typography
          sx={{
            color: '#64ffda',
            fontSize: '1.3rem',
            fontWeight: 600,
            letterSpacing: 3,
            opacity: 0,
            animation: 'splashZoom 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.25s forwards',
            animationFillMode: 'forwards',
          }}
        >
          Mi Portafolio
        </Typography>
      </Box>

      {/* Efecto cursor neon: fuera del contenedor para no quedar tapado por bgcolor */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          background: `radial-gradient(circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(100,255,218,0.18) 0%, rgba(100,255,218,0.06) 18%, transparent 35%)`,
          transition: 'background 0.08s',
          zIndex: 5,
        }}
      />

      {/* Contenido principal: siempre montado, visible solo tras el splash */}
      <Box
        ref={scrollContainerRef}
        sx={{
          minHeight: '100vh',
          visibility: appReady ? 'visible' : 'hidden',
          bgcolor: '#121212',
          ...(isMobile && {
            height: '100vh',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
          }),
        }}
      >

      {/* CONTENEDOR DEL MENÚ LATERAL: posición = top, left | tamaño = width */}
        <Box
          sx={{
            position: isMobile ? 'relative' : 'fixed',
            top: isMobile ? 0 : 100,
            left: isMobile ? 0 : 190,
            width: isMobile ? '100%' : 200,
            minHeight: isMobile ? '100vh' : undefined,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: isMobile ? 'center' : 'flex-start',
            px: isMobile ? 2 : 5,
            py: isMobile ? 3 : 5,
            zIndex: 10,
            bgcolor: isMobile ? '#121212' : 'transparent',
            animation: appReady
              ? isMobile
                ? 'mainContentEntrance 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both'
                : 'sidebarEntrance 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.05s both'
              : 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                mt: isMobile ? 4 : 0,
              }}
            >
              {/* SVG órbitas: mismo tamaño en móvil/PC, más visibles, detrás de la foto */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '48%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: { xs: 260, sm: 300, md: 350 },
                  height: { xs: 260, sm: 300, md: 350 },
                  zIndex: 0,
                  pointerEvents: 'none',
                  opacity: 0.85,
                  animation: 'entranceElectrons 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                }}
              >
                <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
                  <circle cx="30" cy="40" r="1.5" fill="#0ff" opacity="0.8">
                    <animate attributeName="cy" values="40;38;40" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="160" cy="150" r="2" fill="#0ff" opacity="0.75">
                    <animate attributeName="cy" values="150;148;150" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="100" cy="180" r="1.2" fill="#0ff" opacity="0.7">
                    <animate attributeName="r" values="1.2;1.8;1.2" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="45" cy="165" r="1.8" fill="#0ff" opacity="0.8">
                    <animate attributeName="cx" values="45;47;45" dur="3.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="170" cy="55" r="1.4" fill="#0ff" opacity="0.75">
                    <animate attributeName="opacity" values="0.75;0.95;0.75" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="75" cy="25" r="1.6" fill="rgba(0, 255, 255, 0.85)">
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
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: isMobile ? 2 : 0 }}>
                  <Box
                    component="img"
                    src="/logo2.webp"
                    alt="Mi pose"
                    fetchPriority="high"
                    sx={{
                      position: 'relative',
                      height: { xs: 200, sm: 240, md: 280 },
                      width: 'auto',
                      borderRadius: 5,
                      objectFit: 'contain',
                      ml: isMobile ? 1.5 : 3,
                      mt: isMobile ? -4 : -6,
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
                  <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <Box
                      component="img"
                      src="/logo2.webp"
                      alt="Mi pose"
                      fetchPriority="high"
                      sx={{
                        position: 'relative',
                        height: { xs: 200, sm: 240, md: 280 },
                        width: 'auto',
                        borderRadius: 5,
                        objectFit: 'contain',
                        ml: isMobile ? 0 : 3,
                        mt: isMobile ? -4 : -7,
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
                width: isMobile ? '100%' : '170%',
                height: isMobile ? 'auto' : '3.6em',
                minHeight: isMobile ? '4em' : undefined,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: isMobile ? 2 : 2,
                py: isMobile ? 1.5 : 6,
                mb: isMobile ? 1.5 : 3,
              }}
            >
              <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography
                  variant="h6"
                  align="center"
                  component="div"
                  sx={{
                    fontWeight: 600,
                    color: '#64ffda',
                    letterSpacing: 1,
                    fontFamily: 'monospace',
                    fontSize: { xs: '0.9rem', md: '1.2rem' },
                    width: '100%',
                    lineHeight: 1.3,
                  }}
                >
                  {typewriterReady && (
                    isMobile ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3 }}>
                        {t('sidebar.strings').map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </Box>
                    ) : (
                      <Typewriter
                        key={lang}
                        options={{
                          strings: t('sidebar.strings'),
                          autoStart: true,
                          loop: true,
                          delay: 140,
                          deleteSpeed: 60,
                        }}
                      />
                    )
                  )}
                </Typography>
              </Box>
            </Box>

            {/* MENÚ: empieza arriba (debajo de la foto); al aparecer la primera letra baja y se fija */}
            <Box
              sx={{
                width: isMobile ? '100%' : '170%',
                transform: menuSlideDown ? 'translateY(0)' : 'translateY(-4.5em)',
                transition: 'transform 0.5s ease-out',
                mt: isMobile ? 0.5 : 0,
              }}
            >
              <Stack spacing={isMobile ? 0.75 : 2} sx={{ width: '100%', mt: isMobile ? 0 : -2 }}>
              {menuItems.map(({ id, icon }) => {
                const menuLabels = { about: t('menu.about'), experience: t('menu.experience'), projects: t('menu.projects'), contacto: t('menu.contact') }
                const label = menuLabels[id] || id
                return (
                <Box
                  key={id}
                  onClick={() => scrollToSection(id)}
                  sx={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 1.5 : 2,
                    px: isMobile ? 2 : 2.5,
                    py: isMobile ? 0.9 : 1.2,
                    borderRadius: 3,
                    position: 'relative',
                    bgcolor: active === id ? 'rgba(100,255,218,0.1)' : 'transparent',
                    color: active === id ? '#64ffda' : '#8892b0',
                    fontWeight: active === id ? 'bold' : 400,
                    fontSize: { xs: '0.85rem', md: '0.95rem' },
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
              )
            })}
              </Stack>
            </Box>

            {/* REDES SOCIALES: primera carga = visibles; después del ciclo = Fade uno a uno */}
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: isMobile ? '100%' : '170%',
                alignItems: 'center',
                justifyContent: 'center',
                mt: isMobile ? 2.5 : 4,
                mb: isMobile ? 4 : 0,
                pb: isMobile ? 2 : 0,
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

      <Box
        ref={mainRef}
        component="main"
        sx={{
          ml: isMobile ? 0 : isTablet ? '300px' : '400px',
          mt: isMobile ? 2 : 1,
          px: isMobile ? 3 : 24,
          py: -4,
          height: isMobile ? 'auto' : '100vh',
          overflowY: isMobile ? 'visible' : 'auto',
          color: '#ccd6f6',
          fontFamily: "'Inter', sans-serif",
          scrollBehavior: 'smooth',
          animation: appReady
            ? 'mainContentEntrance 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both'
            : 'none',
        }}
      >
        <AboutSection aboutBlocks={aboutBlocks} isMobile={isMobile} scrollContainerRef={scrollContainerRef} highlightedSection={highlightedSection} />
        <ExperienceSection technologies={technologies} isMobile={isMobile} scrollContainerRef={scrollContainerRef} highlightedSection={highlightedSection} />
        <ProjectsSection
          proyectosData={proyectosData}
          onProjectClick={onProjectClick}
          isMobile={isMobile}
          isTablet={isTablet}
          scrollContainerRef={scrollContainerRef}
          highlightedSection={highlightedSection}
        />
        <ContactSection sendEmail={sendEmail} isMobile={isMobile} scrollContainerRef={scrollContainerRef} highlightedSection={highlightedSection} />
        <Footer />
      </Box>

      <ProjectDetail
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      </Box>
    </Box>
  )
}
