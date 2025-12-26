// Simple i18n implementation
const translations = {
  en: {
    home: 'Home',
    menu: 'Menu',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    account: 'Account',
    orders: 'Orders',
    cart: 'Cart',
    checkout: 'Checkout',
    welcome: 'Welcome to Hybah Coffee House',
    addToCart: 'Add to Cart',
    orderOnline: 'Order Online',
    reserveSeat: 'Reserve a Seat',
    joinVIP: 'Join VIP'
  },
  es: {
    home: 'Inicio',
    menu: 'Menú',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar sesión',
    logout: 'Cerrar sesión',
    register: 'Registrarse',
    account: 'Cuenta',
    orders: 'Pedidos',
    cart: 'Carrito',
    checkout: 'Pago',
    welcome: 'Bienvenido a Hybah Coffee House',
    addToCart: 'Añadir al carrito',
    orderOnline: 'Pedir en línea',
    reserveSeat: 'Reservar asiento',
    joinVIP: 'Unirse a VIP'
  },
  fr: {
    home: 'Accueil',
    menu: 'Menu',
    about: 'À propos',
    contact: 'Contact',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    register: "S'inscrire",
    account: 'Compte',
    orders: 'Commandes',
    cart: 'Panier',
    checkout: 'Paiement',
    welcome: 'Bienvenue chez Hybah Coffee House',
    addToCart: 'Ajouter au panier',
    orderOnline: 'Commander en ligne',
    reserveSeat: 'Réserver une place',
    joinVIP: 'Rejoindre VIP'
  }
}

let currentLanguage = localStorage.getItem('language') || 'en'

export const setLanguage = (lang) => {
  if (translations[lang]) {
    currentLanguage = lang
    localStorage.setItem('language', lang)
    window.dispatchEvent(new Event('languagechange'))
  }
}

export const getLanguage = () => currentLanguage

export const t = (key) => {
  return translations[currentLanguage]?.[key] || translations.en[key] || key
}

export const getAvailableLanguages = () => Object.keys(translations)

export default { setLanguage, getLanguage, t, getAvailableLanguages }



