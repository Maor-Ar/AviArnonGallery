import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ImageCarouselProps {
  images: string[]
}

const Container = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  overflow: hidden;
`

const ImageContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: ${({ theme }) => theme.colors.overlay};
  color: ${({ theme }) => theme.colors.textLight};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transitions.default};
  z-index: 1;
  border: none;

  ${Container}:hover & {
    opacity: 1;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
  }
`

const PrevButton = styled(Button)`
  left: ${({ theme }) => theme.spacing.md};
`

const NextButton = styled(Button)`
  right: ${({ theme }) => theme.spacing.md};
`

const Dots = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  z-index: 1;
`

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.textLight : theme.colors.overlay};
  transition: background-color ${({ theme }) => theme.transitions.default};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.textLight};
  }
`

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0])

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection + images.length) % images.length
    setPage([newPage, newDirection])
  }

  return (
    <Container>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <ImageContainer
          key={page}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <Image src={images[page]} alt={`Slide ${page + 1}`} />
        </ImageContainer>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <PrevButton onClick={() => paginate(-1)} type="button">
            <FiChevronLeft />
          </PrevButton>
          <NextButton onClick={() => paginate(1)} type="button">
            <FiChevronRight />
          </NextButton>
          <Dots>
            {images.map((_, index) => (
              <Dot
                key={index}
                $active={index === page}
                onClick={() => setPage([index, index > page ? 1 : -1])}
                type="button"
              />
            ))}
          </Dots>
        </>
      )}
    </Container>
  )
}

export default ImageCarousel
