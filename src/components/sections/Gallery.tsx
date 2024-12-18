import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { galleryService } from '../../services/galleryService'
import type { GalleryItem } from '../../types'
import { LoadingSpinner } from '../common/LoadingSpinner'

const GallerySection = styled.section`
  padding: ${({ theme }) => theme.spacing.xl} 0;
  background: ${({ theme }) => theme.colors.gradients.dark};
  margin-top: 80px;
  position: relative;
  z-index: 1;
`

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
`

const Title = styled(motion.h2)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-shadow: ${({ theme }) => theme.shadows.gold};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
`

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`

const CardTitle = styled.h3`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CardPrice = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
`

const CardTag = styled.span`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textDark};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const LoadMoreButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textDark};
  border: none;
  border-radius: 4px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  margin: ${({ theme }) => theme.spacing.xl} auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`

const Gallery: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async (page = 1) => {
    try {
      setLoading(true)
      const result = await galleryService.getGalleryItems(page)
      if (page === 1) {
        setItems(result.items)
      } else {
        setItems(prev => [...prev, ...result.items])
      }
      setHasMore(result.hasMore)
      setCurrentPage(page)
    } catch (error) {
      console.error('Error loading gallery items:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    loadItems(currentPage + 1)
  }

  const language = i18n.language as keyof typeof items[0]['title']

  if (loading && items.length === 0) {
    return (
      <GallerySection>
        <Container>
          <LoadingContainer>
            <LoadingSpinner size={60} />
          </LoadingContainer>
        </Container>
      </GallerySection>
    )
  }

  return (
    <GallerySection id="gallery">
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t('gallery.title')}
        </Title>
        <Grid>
          {items.map((item, index) => (
            <Card
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ImageContainer>
                <CardImage src={item.images[0]} alt={item.title[language]} />
              </ImageContainer>
              <CardContent>
                <CardTitle>{item.title[language]}</CardTitle>
                <CardDescription>{item.description[language]}</CardDescription>
                {item.price && <CardPrice>{item.price}</CardPrice>}
                <CardTags>
                  {item.tags.map(tag => (
                    <CardTag key={tag}>{tag}</CardTag>
                  ))}
                </CardTags>
              </CardContent>
            </Card>
          ))}
        </Grid>
        {hasMore && (
          <LoadMoreButton onClick={loadMore} disabled={loading}>
            {loading ? (
              <>
                <LoadingSpinner size={24} />
                {t('common.loading')}
              </>
            ) : (
              t('gallery.showMore')
            )}
          </LoadMoreButton>
        )}
      </Container>
    </GallerySection>
  )
}

export default Gallery
