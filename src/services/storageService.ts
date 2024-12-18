import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const storageService = {
  uploadImage: async (file: File): Promise<string> => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Only image files are allowed');
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        throw new Error('File size must be less than 5MB');
      }

      // Create a unique filename using timestamp and original name
      const timestamp = new Date().getTime();
      const uniqueFilename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      
      // Create a reference to the file location
      const storageRef = ref(storage, `gallery/${uniqueFilename}`);
      
      // Upload the file with metadata
      const metadata = {
        contentType: file.type,
        customMetadata: {
          originalName: file.name
        }
      };
      
      console.log('Uploading file:', {
        name: file.name,
        size: file.size,
        type: file.type,
        destination: `gallery/${uniqueFilename}`
      });

      const snapshot = await uploadBytes(storageRef, file, metadata);
      console.log('Uploaded file:', snapshot.metadata);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at:', downloadURL);
      
      return downloadURL;
    } catch (error: any) {
      console.error('Error uploading image:', {
        error,
        code: error.code,
        message: error.message,
        serverResponse: error.serverResponse
      });
      throw error;
    }
  }
};
