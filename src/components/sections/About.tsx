import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'

const AboutSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.gradients.dark};
  overflow: hidden;
`

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 75%; // 4:3 aspect ratio
  overflow: hidden;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const TextContent = styled(motion.div)`
  color: ${({ theme }) => theme.colors.textLight};

  h2 {
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-shadow: ${({ theme }) => theme.shadows.gold};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`

const About: React.FC = () => {
  const { t } = useTranslation()
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <AboutSection id="about" ref={ref}>
      <Container>
        <Content>
          <TextContent
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2>{t('about.title')}</h2>
            <p>{t('about.description')}</p>
            <p>{t('about.philosophy')}</p>
          </TextContent>
          <ImageContainer
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <img src="/AviArnonGallery/images/avi-arnon.jpg" alt={t('about.imageAlt')} />
          </ImageContainer>
        </Content>
      </Container>
    </AboutSection>
  )
}

export default About
