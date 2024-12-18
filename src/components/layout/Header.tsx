import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FiMenu } from 'react-icons/fi'
import Navigation from './Navigation'
import LanguageSelector from './LanguageSelector'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeaderContainerProps {
  $isScrolled: boolean;
}

const HeaderContainer = styled(motion.header)<HeaderContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${({ $isScrolled }) => $isScrolled ? 'rgba(18, 18, 18, 0.95)' : 'transparent'};
  padding: ${({ theme }) => theme.spacing.md} 0;
  transition: background-color 0.3s ease-in-out;
  backdrop-filter: ${({ $isScrolled }) => $isScrolled ? 'blur(10px)' : 'none'};
`

const HeaderContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const Logo = styled.a`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  transition: color ${({ theme }) => theme.transitions.default};
  z-index: 1001;

  &:hover {
    color: ${({ theme }) => theme.colors.accentLight};
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  z-index: 1001;
`

const MenuButton = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: color ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  z-index: 1001;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: static;
    transform: none;
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.default};
    transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0')});
  }
`

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => setIsOpen(false)

  return (
    <HeaderContainer $isScrolled={isScrolled}
      initial={{ backgroundColor: 'transparent' }}
      animate={{ 
        backgroundColor: isScrolled ? 'rgba(18, 18, 18, 0.95)' : 'transparent',
      }}
      transition={{ duration: 0.3 }}
    >
      <HeaderContent>
        <Logo href="#home">Avi Arnon</Logo>
        <MenuButton $isOpen={isOpen} onClick={toggleMenu}>
          <FiMenu />
        </MenuButton>
        <Controls>
          <Navigation isOpen={isOpen} onClose={closeMenu} />
          <LanguageSelector />
        </Controls>
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header
