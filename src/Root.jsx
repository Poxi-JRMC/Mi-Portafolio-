import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext'

const darkTheme = createTheme({
  palette: { mode: 'dark' },
  typography: {
    fontFamily: "'Space Grotesk', 'Inter', sans-serif",
    h5: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 },
    h6: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 },
    overline: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, letterSpacing: 4 },
    body1: { fontFamily: "'Space Grotesk', sans-serif" },
    body2: { fontFamily: "'Space Grotesk', sans-serif" },
    button: { fontFamily: "'Space Grotesk', sans-serif" },
  },
})

export default function Root() {
  return (
    <LanguageProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </LanguageProvider>
  )
}
