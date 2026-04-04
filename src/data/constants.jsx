import InfoIcon from '@mui/icons-material/Info'
import WorkIcon from '@mui/icons-material/Work'
import FolderIcon from '@mui/icons-material/Folder'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { FaInstagram } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import JavascriptIcon from '@mui/icons-material/Javascript'
import HtmlIcon from '@mui/icons-material/Html'
import CssIcon from '@mui/icons-material/Css'
import ReactIcon from '@mui/icons-material/IntegrationInstructions'
import MuiIcon from '@mui/icons-material/Style'
import { Box } from '@mui/material'

const FlutterLogo = () => (
  <Box
    component="img"
    src="https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png"
    alt="Flutter"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const PythonLogo = () => (
  <Box
    component="img"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
    alt="Python"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const TailwindLogo = () => (
  <Box
    component="img"
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"
    alt="Tailwind CSS"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const SqlLogo = () => (
  <Box
    component="img"
    src="https://www.fileeagle.com/data/2021/11/Oracle-SQL-Developer.png"
    alt="SQL BD"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const NodeLogo = () => (
  <Box
    component="img"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    alt="Node.js"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const FirebaseLogo = () => (
  <Box
    component="img"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"
    alt="Firebase"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

const MongoLogo = () => (
  <Box
    component="img"
    src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    alt="MongoDB"
    sx={{ width: 48, height: 48, objectFit: 'contain' }}
  />
)

export const socialLinks = [
  { icon: <GitHubIcon />, href: 'https://github.com/Poxi-JRMC', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/johan-mamani-b3a0b9310', label: 'LinkedIn' },
  { icon: <FaInstagram />, href: 'https://www.instagram.com/poxiflow?igsh=MmVtbXJ1NTM0YXA5', label: 'Instagram' },
  { icon: <WhatsAppIcon />, href: 'https://wa.me/59169707601', label: 'WhatsApp' },
]

export const menuItems = [
  { id: 'about', label: 'Más sobre mí', icon: <InfoIcon /> },
  { id: 'experience', label: 'Experiencia', icon: <WorkIcon /> },
  { id: 'projects', label: 'Proyectos', icon: <FolderIcon /> },
  { id: 'contacto', label: 'Contáctame', icon: <FiSend /> },
]

// background: URL o path (ej: '/img/bg-tracktoger.jpg'). Si null, fondo oscuro por defecto.
// Puedes usar imágenes generadas con IA, screenshots o fondos abstractos.
export const proyectosData = [
  {
    id: 1,
    title: 'Tracktoger',
    description: 'Proyecto de egresado. App Flutter para gestión de maquinaria industrial: inventario, alquileres, mantenimiento predictivo y reportes. Incluye backend Node.js y soporte multi-plataforma.',
    image: '/tracktoger.webp',
    background: '/tracktoger.webp',
    link: 'https://github.com/Poxi-JRMC/tracktoger',
    demo: null,
    tech: ['Flutter', 'Dart', 'Node.js', 'MongoDB'],
    screenshots: [
      'https://raw.githubusercontent.com/Poxi-JRMC/tracktoger/main/screenshots/inicio.jpg',
      'https://raw.githubusercontent.com/Poxi-JRMC/tracktoger/main/screenshots/dashboard.jpg',
      'https://raw.githubusercontent.com/Poxi-JRMC/tracktoger/main/screenshots/inventario.jpg',
    ],
  },
  {
    id: 2,
    title: 'INNOVA - Sistema de Impresiones',
    description: 'Sistema comercial (INNOVA J.M.C.) para análisis de PDFs, cálculo de costos de impresión, cotizaciones y reportes ejecutivos. Autenticación JWT, roles y generación de PDFs.',
    image: '/innova-impresiones.webp',
    background: '/innova-impresiones.webp',
    link: 'https://github.com/Poxi-JRMC/Innova-Sistema-Impresion-Portfolio',
    demo: null,
    tech: ['React', 'FastAPI', 'Material UI', 'SQLite/PostgreSQL'],
    screenshots: [
      'https://raw.githubusercontent.com/Poxi-JRMC/Innova-Sistema-Impresion-Portfolio/main/screenshots/02-dashboard.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Innova-Sistema-Impresion-Portfolio/main/screenshots/03-cotizacion.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Innova-Sistema-Impresion-Portfolio/main/screenshots/04-reportes.png',
    ],
  },
  {
    id: 3,
    title: 'INNOVA - Trading Bot',
    description: 'Bot de trading automatizado en Python para análisis técnico y ejecución de órdenes en mercados financieros (Forex e índices sintéticos). Arquitectura backend + frontend React.',
    image: '/innova-trading.webp',
    background: '/innova-trading.webp',
    link: 'https://github.com/Poxi-JRMC/Innova-TradingBot-Py',
    demo: null,
    tech: ['Python', 'FastAPI', 'React', 'WebSockets'],
    screenshots: [],
  },
  {
    id: 4,
    title: 'INNOVA - Sistema de Inventarios',
    description:
      'Sistema web de inventario y gestión de stock para INNOVA J.M.C.: productos, movimientos, alertas y reportes en tiempo real. Frontend React con interfaz clara; backend con API REST, autenticación y base de datos relacional. Repositorio privado por datos sensibles del negocio.',
    image: '/inventario-innova.svg',
    background: '/inventario-innova.svg',
    link: 'https://github.com/Poxi-JRMC/Innova-INVENTARIOS-priv',
    demo: null,
    tech: ['React', 'FastAPI', 'PostgreSQL', 'JWT', 'Material UI'],
    screenshots: [],
  },
  {
    id: 5,
    title: 'MigloPet - Landing Web',
    description: 'Rediseño minimalista de la landing page para MigloPet, tienda de mascotas. Incluye pantalla de carga, secciones de inicio, categorías, productos, nosotros y contacto. Stack moderno con Next.js, TypeScript, Tailwind CSS y Framer Motion.',
    image: 'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/inicio.png',
    background: 'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/inicio.png',
    link: 'https://github.com/Poxi-JRMC/Miglopet--INNOVA-JMC',
    demo: 'https://miglopet.com',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    screenshots: [
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/inicio.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/categorias.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/productos.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/nosotros.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/contacto.png',
      'https://raw.githubusercontent.com/Poxi-JRMC/Miglopet--INNOVA-JMC/main/pantalla-carga.png',
    ],
  },
  {
    id: 6,
    title: 'Innova JMC - Landing corporativa',
    description:
      'Landing page corporativa para Innova J.M.C.: servicios, proyectos en producción, proceso de trabajo y contacto (WhatsApp/Email). Stack Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion e internacionalización ES/EN con next-intl. En desarrollo activo, casi listo para producción final.',
    image: 'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/1portafolio.webp',
    background: 'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/1portafolio.webp',
    link: 'https://github.com/Poxi-JRMC/web-innovajmc',
    demo: 'https://innova-jmc-landing-page.vercel.app/',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl', 'EmailJS'],
    screenshots: [
      'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/1portafolio.webp',
      'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/2portafolio.webp',
      'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/3portafolio.webp',
      'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/4portafolio.webp',
      'https://raw.githubusercontent.com/Poxi-JRMC/web-innovajmc/main/5portafolio.webp',
    ],
  },
  {
    id: 7,
    title: 'QUION Bolivia - Sitio Corporativo',
    description: 'Sitio web corporativo para empresa boliviana de producción y exportación de quinua en Oruro (Challapata). Diseño institucional responsivo con identidad de marca, desplegado en Vercel.',
    image: '/QUION_BO.png',
    background: '/QUION_BO.png',
    link: 'https://github.com/Poxi-JRMC/QUION-BOLIVIA',
    demo: 'https://quion-bolivia.vercel.app',
    tech: ['React', 'Vite', 'JavaScript'],
    screenshots: [],
  },
  {
    id: 8,
    title: 'Cajero Automático',
    description: 'Proyecto universitario. Sistema de cajero con Python, Tkinter, Oracle DB: autenticación por PIN y voz, operaciones bancarias, panel admin y reportes PDF.',
    image: '/cajero-automatico.webp',
    background: '/cajero-automatico.webp',
    link: 'https://github.com/Poxi-JRMC/Proyecto-cajero-Automatico',
    demo: null,
    tech: ['Python', 'Tkinter', 'Oracle DB', 'bcrypt'],
    screenshots: [],
  },
  {
    id: 9,
    title: 'Carta de Amor',
    description: 'Carta digital interactiva para el 14 de febrero con React y Material UI: galería de fotos y música, desplegada en Vercel.',
    note: 'Personalizable: edita nombres y fotos en el código del proyecto para dedicarlo a quien quieras.',
    image: '/carta-amor.webp',
    background: '/carta-amor.webp',
    link: 'https://github.com/Poxi-JRMC/carta-amor',
    demo: 'https://carta-amor-five.vercel.app',
    tech: ['React', 'Material UI', 'Vite'],
    screenshots: [],
  },
]

export const aboutBlocks = [
  {
    id: 'about-1',
    text: `Soy Johan Raúl Mamani Cañari, Ingeniero de Sistemas egresado de la Universidad Tecnológica Boliviana. Me especializo en el desarrollo de interfaces dinámicas y responsivas utilizando tecnologías modernas como React.js, Next.js y Tailwind CSS. Mi enfoque combina el diseño elegante con una arquitectura de código limpia para crear experiencias de usuario que son visualmente impactantes y técnicamente robustas.`,
    img: '/de.webp',
    alt: 'Desarrollo frontend',
  },
  {
    id: 'about-2',
    text: `Mi diferencial radica en una sólida base técnica en mantenimiento de hardware y software, certificada desde 2022. Esta experiencia me otorga una capacidad analítica superior para la resolución de incidencias críticas y la gestión de infraestructura IT. Entiendo cómo el software interactúa con los componentes físicos, lo que me permite optimizar la eficiencia operacional y asegurar que las soluciones digitales corran sobre bases tecnológicas estables.`,
    img: '/ex.webp',
    alt: 'El valor del soporte técnico',
  },
  {
    id: 'about-3',
    text: `A lo largo de mi trayectoria, he liderado proyectos que van desde plataformas corporativas hasta aplicaciones móviles con Machine Learning. Mi proyecto de grado, Tracktoger, integra Flutter con modelos predictivos inteligentes, demostrando mi capacidad para implementar tecnologías de vanguardia en entornos de producción real. Me apasiona resolver desafíos complejos con agilidad, entregando productos que aporten valor real tanto al negocio como al usuario final.`,
    img: '/ma.webp',
    alt: 'Proyectos e innovación',
  },
]

export const supportBlocks = [
  { id: 'support-1', img: '/ensamblaje.jpg', alt: 'Ensamblaje de equipos' },
  { id: 'support-2', img: '/ensamblaje2.jpg', alt: 'Armado de PCs' },
  { id: 'support-3', img: '/infraestructura.jpg', alt: 'Infraestructura IT' },
  { id: 'support-4', img: '/infraestructura2.jpg', alt: 'Gestión de infraestructura' },
]

export const technologies = [
  { label: 'React', icon: <ReactIcon sx={{ color: '#61dafb', fontSize: 48 }} /> },
  { label: 'JavaScript', icon: <JavascriptIcon sx={{ color: '#f7df1e', fontSize: 48 }} /> },
  { label: 'Node.js', icon: <NodeLogo /> },
  { label: 'Python', icon: <PythonLogo /> },
  { label: 'FastAPI', icon: <PythonLogo /> },
  { label: 'Firebase', icon: <FirebaseLogo /> },
  { label: 'MongoDB', icon: <MongoLogo /> },
  { label: 'Oracle/SQLite', icon: <SqlLogo /> },
  { label: 'HTML5', icon: <HtmlIcon sx={{ color: '#e34c26', fontSize: 48 }} /> },
  { label: 'CSS3', icon: <CssIcon sx={{ color: '#264de4', fontSize: 48 }} /> },
  { label: 'Material UI', icon: <MuiIcon sx={{ color: '#007fff', fontSize: 48 }} /> },
  { label: 'Tailwind', icon: <TailwindLogo /> },
  { label: 'Flutter', icon: <FlutterLogo /> },
]
