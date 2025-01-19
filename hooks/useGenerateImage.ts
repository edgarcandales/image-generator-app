import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { generateImage } from '../services/openaiService';

export const useGenerateImage = (prompt: string | null) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (!prompt) {
        Alert.alert('Error', 'No prompt provided.');
        setLoading(false);
        return;
      }

      try {
        const url = await generateImage(prompt);
        setImageUrl(url);
      } catch (error) {
        Alert.alert('Error', 'Failed to generate image. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [prompt]);

  return { imageUrl, loading };
};
