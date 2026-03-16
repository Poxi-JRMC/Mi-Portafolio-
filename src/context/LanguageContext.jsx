import React, { createContext, useContext, useState, useCallback } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es')
  const toggle = () => setLang((l) => (l === 'es' ? 'en' : 'es'))
  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)

export const useT = () => {
  const { lang } = useLang()
  return useCallback(
    (key) => {
      const keys = key.split('.')
      let val = translations[lang]
      for (const k of keys) val = val?.[k]
      return val ?? key
    },
    [lang]
  )
}
