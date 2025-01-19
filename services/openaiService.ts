import { apiClient } from '../utils/apiClient';

export const generateImage = async (prompt: string): Promise<string> => {
  const response = await apiClient.post('/images/generations', {
    prompt,
    n: 1,
    size: '512x512',
  });

  if (!response.data || !response.data.data.length) {
    throw new Error('No image generated');
  }

  return response.data.data[0].url; // Return the URL of the generated image
};
