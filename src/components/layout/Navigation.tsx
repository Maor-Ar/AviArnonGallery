import React from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const Nav = styled(motion.nav)<{ isOpen: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  z-index: 999;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: opacity 0.3s ease;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: transparent;
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
  }
`

const Overlay = styled(motion.div)<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  transition: color ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const CloseButton = styled.button`
  display: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  z-index: 1001;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const menuVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  closed: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

interface NavigationProps {
  isOpen: boolean
  onClose: () => void
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            isOpen={isOpen}
          />
        )}
      </AnimatePresence>
      <Nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        isOpen={isOpen}
      >
        {isOpen && (
          <CloseButton onClick={onClose}>
            <FiX />
          </CloseButton>
        )}
        <NavLink to="home" spy={true} smooth={true} offset={-100} onClick={onClose}>
          {t('nav.home')}
        </NavLink>
        <NavLink to="about" spy={true} smooth={true} offset={-100} onClick={onClose}>
          {t('nav.about')}
        </NavLink>
        <NavLink to="gallery" spy={true} smooth={true} offset={-100} onClick={onClose}>
          {t('nav.gallery')}
        </NavLink>
        <NavLink to="contact" spy={true} smooth={true} offset={-100} onClick={onClose}>
          {t('nav.contact')}
        </NavLink>
      </Nav>
    </>
  )
}

export default Navigation
