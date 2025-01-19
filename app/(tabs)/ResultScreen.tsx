import { OPENAI_API_KEY } from '@env'; // Import the API key from the .env file
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router'; // Correct hook for fetching parameters
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from 'react-native';

export default function ResultScreen() {
  const { prompt } = useLocalSearchParams(); // Use correct hook
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGeneratedImage = async () => {
      if (!prompt) {
        Alert.alert('Error', 'No prompt provided.');
        setLoading(false);
        return;
      }
      try {
        // Make a request to the OpenAI API
        const response = await axios.post(
          'https://api.openai.com/v1/images/generations',
          {
            //model: 'image-alpha-001',
            prompt, // User's input prompt
            n: 1, // Number of images to generate
            size: '512x512', // Image dimensions
          },
          {
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`, // API Key from .env
              'Content-Type': 'application/json',
            },
          }
        );

        const generatedImageUrl = response.data.data[0].url; // Get the generated image URL
        setImageUrl(generatedImageUrl);
      } catch (error) {
        Alert.alert('Error', 'Failed to generate image. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGeneratedImage();
  }, [prompt]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Generating your image...</Text>
      </View>
    );
  }

  if (!imageUrl) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Failed to load the image. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Generated Image for:</Text>
      <Text style={styles.prompt}>{prompt}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  prompt: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
