import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

//Import all translation files
import translationEnglish from './locales/en/translation.json'

const resources = {
  en: {
    translation: translationEnglish,
  },
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'en', //default language
  fallbackLng: 'en', //default language
})
export default i18next
