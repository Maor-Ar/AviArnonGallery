import React from 'react'
import styled, { keyframes } from 'styled-components'

interface LoadingSpinnerProps {
  size?: number
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const SpinnerContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: inline-block;
  position: relative;
`

const Spinner = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border: ${({ size }) => size / 8}px solid ${({ theme }) => theme.colors.accent};
  border-top: ${({ size }) => size / 8}px solid transparent;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 40 }) => {
  return (
    <SpinnerContainer size={size}>
      <Spinner size={size} />
    </SpinnerContainer>
  )
}
