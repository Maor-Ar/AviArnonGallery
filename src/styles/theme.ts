export const theme = {
  colors: {
    background: '#000000',
    backgroundDark: '#111111',
    backgroundLight: '#1A1A1A',
    text: '#FFFFFF',
    textLight: '#FFFFFF',
    textDark: '#000000',
    accent: '#D4AF37', // More vibrant gold
    accentLight: '#F4C460', // Lighter gold for hover states
    primary: '#D4AF37',
    secondary: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.85)',
    modal: 'rgba(0, 0, 0, 0.95)',
    error: '#ff4444',
    success: '#00C851',
    border: '#2A2A2A', // New border color
    gradients: {
      dark: 'linear-gradient(180deg, #0a0a0a 0%, #121212 100%)',
      light: 'linear-gradient(180deg, #121212 0%, #1a1a1a 100%)',
      accent: 'linear-gradient(45deg, #D4AF37 0%, #E5C158 100%)',
    },
  },
  fonts: {
    primary: "'Playfair Display', 'Assistant', serif",
    secondary: "'Montserrat', 'Assistant', sans-serif",
    hebrew: "'Assistant', sans-serif"
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem',
    '3xl': '3rem',
    '4xl': '4rem'
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  transitions: {
    default: '0.3s ease',
    slow: '0.6s ease'
  },
  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.2)',
    md: '0 4px 6px rgba(0, 0, 0, 0.2)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.2)',
    gold: '0 4px 12px rgba(212, 175, 55, 0.3)' 
  },
  zIndices: {
    base: 1,
    content: 10,
    header: 1000,
    navigation: 999,
    modal: 1100,
    overlay: 998,
    dropdown: 100,
    tooltip: 200,
  }
} as const

export type Theme = typeof theme
export default theme
