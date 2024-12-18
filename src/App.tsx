import React from 'react'
import { ThemeProvider } from 'styled-components'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import { theme } from './styles/theme'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Gallery from './components/sections/Gallery'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import ControlPanel from './components/pages/ControlPanel'

const MainContent = () => (
  <>
    <Hero />
    <About />
    <Gallery />
    <Contact />
  </>
)

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/control-panel" element={<ControlPanel />} />
          </Routes>
        </main>
        <Footer />
      </ThemeProvider>
    </Router>
  )
}

export default App
