import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiMapPin, FiPhone, FiMail, FiFacebook, FiMessageCircle } from 'react-icons/fi'
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_GOOGLE_MAPS_API_KEY: string;
    }
  }
}

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

const mapStyles = [
  {
    featureType: 'all',
    elementType: 'all',
    stylers: [
      { saturation: -100 },
      { lightness: -30 }
    ]
  }
]

const ContactSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.gradients.light};
  width: 100%;
  overflow: hidden;
`

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`

const Title = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: ${({ theme }) => theme.shadows.gold};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.backgroundDark};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
  }

  svg {
    color: ${({ theme }) => theme.colors.accent};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    flex-shrink: 0;
  }

  a {
    color: ${({ theme }) => theme.colors.textLight};
    transition: color ${({ theme }) => theme.transitions.default};
    word-break: break-word;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`

const MapContainer = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }
`

const WhatsAppButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textDark};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.default};
  text-decoration: none;
  width: fit-content;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.gold};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const SocialLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  transition: all ${({ theme }) => theme.transitions.default};

  &:hover {
    color: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`

const Contact: React.FC = () => {
  const { t } = useTranslation()
  const location = { lat: 32.0132, lng: 34.7506 } // Coordinates for יוסף טל 92, בת ים

  const mapOptions = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoom: 16,
  }

  const whatsappNumber = '+972543106600'
  const whatsappMessage = encodeURIComponent(t('contact.whatsappMessage'))
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <ContactSection id="contact">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')}
        </Title>
        <Content>
          <ContactInfo
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <InfoItem>
              <FiMapPin />
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=יוסף+טל+92+קניון+בת-ים+בת+ים"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('contact.address')}
              </a>
            </InfoItem>
            <InfoItem>
              <FiPhone />
              <a href="tel:+972543106600">054-310-6600</a>
            </InfoItem>
            <InfoItem>
              <FiMail />
              <a href="mailto:aviarnon@gmail.com">aviarnon@gmail.com</a>
            </InfoItem>
            <WhatsAppButton href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <FiMessageCircle />
              {t('contact.whatsappButton')}
            </WhatsAppButton>
            <SocialLinks>
              <SocialLink
                href="https://www.facebook.com/profile.php?id=100063906674318"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiFacebook />
              </SocialLink>
            </SocialLinks>
          </ContactInfo>
          <MapContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={location}
                options={mapOptions}
              >
                <MarkerF
                  position={location}
                  onClick={() => {
                    window.open(
                      'https://www.google.com/maps/dir/?api=1&destination=יוסף+טל+92+קניון+בת-ים+בת+ים',
                      '_blank'
                    )
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </MapContainer>
        </Content>
      </Container>
    </ContactSection>
  )
}

export default Contact
