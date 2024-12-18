import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-scroll'

const HeroSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing.xl};
`

const Title = styled(motion.h1)`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: clamp(2.5rem, 8vw, 5rem);
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const Description = styled(motion.p)`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: clamp(1rem, 4vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`

interface ButtonProps {
  $variant?: 'primary' | 'ghost'
}

const StyledButton = styled(Link)<ButtonProps>`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ $variant, theme }) =>
    $variant === 'ghost' ? 'transparent' : theme.colors.accent};
  color: ${({ theme }) => theme.colors.textLight};
  border: ${({ $variant, theme }) =>
    $variant === 'ghost' ? `2px solid ${theme.colors.textLight}` : 'none'};
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all ${({ theme }) => theme.transitions.default};
  margin: 0 ${({ theme }) => theme.spacing.md};
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
    background: ${({ $variant, theme }) =>
      $variant === 'ghost' ? theme.colors.textLight : theme.colors.accent};
    color: ${({ $variant, theme }) =>
      $variant === 'ghost' ? theme.colors.background : theme.colors.textLight};
  }
`

const ButtonGroup = styled(motion.div)`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
  }
`

const Hero: React.FC = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <HeroSection id="hero" ref={ref}>
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </VideoBackground>
      <Overlay />
      <Content>
        <Title
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Avi Arnon Gallery
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {t('hero.description')}
        </Description>
        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <StyledButton to="contact" smooth={true} duration={500} $variant="primary">
            {t('hero.contactUs')}
          </StyledButton>
          <StyledButton to="gallery" smooth={true} duration={500} $variant="ghost">
            {t('hero.gallery')}
          </StyledButton>
        </ButtonGroup>
      </Content>
    </HeroSection>
  )
}

export default Hero
