import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { galleryService } from '../../services/galleryService';
import { storageService } from '../../services/storageService';
import { GalleryItem } from '../../types';
import { CONTROL_PANEL_ACCESS_KEY } from '../../config/firebase';

const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.xl};
  margin: 100px auto;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.text};
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  color: ${({ theme }) => theme.colors.text};
  min-height: 100px;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: ${({ theme }) => theme.colors.accentLight};
  }
`;

const ImageUploadContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const UploadButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const ItemList = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ItemCard = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ControlPanel: React.FC = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();

  // Check access key
  const params = new URLSearchParams(location.search);
  const accessKey = params.get('key');
  console.log('Access key:', accessKey, 'CONTROL_PANEL_ACCESS_KEY', CONTROL_PANEL_ACCESS_KEY );
  if (accessKey !== CONTROL_PANEL_ACCESS_KEY) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const result = await galleryService.getGalleryItems();
      setItems(result.items);
      setLoading(false);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setError(null);
    try {
      const uploadPromises = Array.from(files).map(file => storageService.uploadImage(file));
      const urls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...urls]);
      
      // Update the images input field
      const imagesInput = document.querySelector('input[name="images"]') as HTMLInputElement;
      if (imagesInput) {
        const currentUrls = imagesInput.value ? imagesInput.value.split(',').map(url => url.trim()) : [];
        imagesInput.value = [...currentUrls, ...urls].join(', ');
      }
    } catch (error: any) {
      console.error('Error uploading images:', error);
      setError(error.message || 'Error uploading images. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const itemData = {
      title: {
        en: formData.get('titleEn') as string,
        he: formData.get('titleHe') as string,
      },
      description: {
        en: formData.get('descriptionEn') as string,
        he: formData.get('descriptionHe') as string,
      },
      price: formData.get('price') ? String(formData.get('price')) : undefined,
      images: (formData.get('images') as string).split(',').map(url => url.trim()),
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      date: new Date().toISOString(),
    };

    try {
      if (selectedItem) {
        await galleryService.updateGalleryItem(selectedItem.id, itemData);
      } else {
        await galleryService.addGalleryItem(itemData);
      }
      await loadItems();
      form.reset();
      setSelectedItem(null);
      setUploadedImages([]); // Clear uploaded images after submit
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('controlPanel.confirmDelete'))) {
      try {
        await galleryService.deleteGalleryItem(id);
        await loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  if (loading) {
    return <Container>{t('common.loading')}</Container>;
  }

  return (
    <Container>
      <Title>{t('controlPanel.title')}</Title>
      <Form onSubmit={handleSubmit}>
        <Input 
          name="titleEn" 
          placeholder={t('controlPanel.titleEn')}
          defaultValue={selectedItem?.title.en || ''}
          required 
        />
        <Input 
          name="titleHe" 
          placeholder={t('controlPanel.titleHe')}
          defaultValue={selectedItem?.title.he || ''}
          required 
        />
        <TextArea 
          name="descriptionEn" 
          placeholder={t('controlPanel.descriptionEn')}
          defaultValue={selectedItem?.description.en || ''}
          required 
        />
        <TextArea 
          name="descriptionHe" 
          placeholder={t('controlPanel.descriptionHe')}
          defaultValue={selectedItem?.description.he || ''}
          required 
        />
        <Input 
          name="price" 
          placeholder={t('controlPanel.price')}
          defaultValue={selectedItem?.price || ''}
        />
        <ImageUploadContainer>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
          <UploadButton type="button" onClick={() => fileInputRef.current?.click()}>
            {t('controlPanel.uploadImages')}
          </UploadButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {uploadedImages.map((url, index) => (
            <ImagePreview key={index} src={url} alt={`Uploaded ${index + 1}`} />
          ))}
        </ImageUploadContainer>
        <Input
          name="images"
          placeholder={t('controlPanel.imagesPlaceholder')}
          defaultValue={selectedItem?.images?.join(', ')}
        />
        <Input 
          name="tags" 
          placeholder={t('controlPanel.tags')}
          defaultValue={selectedItem?.tags.join(', ') || ''}
          required 
        />
        <Button type="submit">
          {selectedItem ? t('controlPanel.update') : t('controlPanel.add')}
        </Button>
      </Form>

      <ItemList>
        {items.map(item => (
          <ItemCard
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <h3>{item.title.en}</h3>
              <p>{item.description.en.substring(0, 100)}...</p>
            </div>
            <div>
              <Button onClick={() => setSelectedItem(item)}>
                {t('controlPanel.edit')}
              </Button>
              <Button onClick={() => handleDelete(item.id)}>
                {t('controlPanel.delete')}
              </Button>
            </div>
          </ItemCard>
        ))}
      </ItemList>
    </Container>
  );
};

export default ControlPanel;
