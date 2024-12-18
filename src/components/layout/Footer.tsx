import React from 'react'
import styled from 'styled-components'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.backgroundDark};
  color: ${({ theme }) => theme.colors.textLight};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  margin-top: ${({ theme }) => theme.spacing.xl};
`

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`

const Copyright = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.8;
`

const DevInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const DevLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const DevLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.md};
  transition: all ${({ theme }) => theme.transitions.default};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.backgroundLight};

  &:hover {
    color: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
    background: ${({ theme }) => theme.colors.background};
  }

  svg {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <FooterContainer>
      <FooterContent>
        <Copyright> {currentYear} Avi Arnon Gallery. All rights reserved.</Copyright>
        <DevInfo>
          <Copyright>Developed by Maor Arnon</Copyright>
          <DevLinks>
            <DevLink
              href="https://maor-ar.github.io/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub /> Portfolio
            </DevLink>
            <DevLink
              href="https://www.linkedin.com/in/ma-fullstackdev/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin /> LinkedIn
            </DevLink>
            <DevLink href="mailto:maorarnon@gmail.com">
              <FiMail /> Contact
            </DevLink>
          </DevLinks>
        </DevInfo>
      </FooterContent>
    </FooterContainer>
  )
}

export default Footer
