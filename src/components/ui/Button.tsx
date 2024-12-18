import React from 'react'
import styled, { css } from 'styled-components'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  children: React.ReactNode
}

const ButtonStyles = styled.button<{ $variant: NonNullable<ButtonProps['variant']> }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.default};

  ${({ theme, $variant }) =>
    $variant === 'primary' &&
    css`
      background: ${theme.colors.textLight};
      color: ${theme.colors.primary};
      border: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'secondary' &&
    css`
      background: ${theme.colors.primary};
      color: ${theme.colors.textLight};
      border: none;

      &:hover {
        transform: translateY(-2px);
        box-shadow: ${theme.shadows.md};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'ghost' &&
    css`
      background: transparent;
      color: ${theme.colors.textLight};
      border: 1px solid ${theme.colors.textLight};

      &:hover {
        background: ${theme.colors.textLight}10;
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'link' &&
    css`
      background: none;
      color: ${theme.colors.text};
      border: none;
      padding: 0;

      &:hover {
        color: ${theme.colors.accent};
      }
    `}
`

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, ...props }) => {
  return (
    <ButtonStyles $variant={variant} {...props}>
      {children}
    </ButtonStyles>
  )
}

export default Button
