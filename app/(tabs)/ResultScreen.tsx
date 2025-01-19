import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useGenerateImage } from '../../hooks/useGenerateImage';

export default function ResultScreen() {
  const { prompt } = useLocalSearchParams();
  const { imageUrl, loading } = useGenerateImage(prompt as string | null);
  const router = useRouter();

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText type="subtitle" style={styles.text}>
          Generating your image...
        </ThemedText>
      </ThemedView>
    );
  }

  if (!imageUrl) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="error" style={styles.error}>
          Failed to load the image. Please try again.
        </ThemedText>
        <ThemedButton
          title="Back to Home"
          onPress={() => {
            router.push('/');
          }}
          style={styles.button}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.text}>
        Generated Image
      </ThemedText>
      <ThemedText type="subtitle" style={styles.prompt}>
        Prompt: {prompt}
      </ThemedText>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <ThemedButton
        title="Generate Another"
        onPress={() => {
          router.push('/');
        }}
        style={styles.button}
      />
    </ThemedView>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  prompt: {
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
