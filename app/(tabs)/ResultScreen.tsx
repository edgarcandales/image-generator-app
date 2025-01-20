import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useGenerateImage } from '../../hooks/useGenerateImage';

export default function ResultScreen() {
  const { prompt } = useLocalSearchParams();
  const router = useRouter();

  // Manage local states
  const { imageUrl, loading } = useGenerateImage(prompt as string | null);
  const [imageLoading, setImageLoading] = useState(true);

  const handleGenerateAnother = () => {
    setImageLoading(true);
    router.push('/');
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
        <ThemedText type="subtitle" style={styles.loadingText}>
          Hold tight! We're creating your masterpiece...
        </ThemedText>
      </ThemedView>
    );
  }

  if (!imageUrl) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText type="error" style={styles.errorText}>
          Oops! We couldn’t generate the image. Please try again.
        </ThemedText>
        <ThemedButton
          title="Back to Home"
          onPress={handleGenerateAnother}
          style={styles.errorButton}
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.resultContainer}>
      <ThemedText type="title" style={styles.resultTitle}>
        Your Generated Image
      </ThemedText>
      <ThemedText type="subtitle" style={styles.resultPrompt}>
        Prompt: {prompt}
      </ThemedText>

      <ThemedView style={styles.imageWrapper}>
        {imageLoading && (
          <ActivityIndicator size="large" color="#0a7ea4" style={styles.imageLoader} />
        )}
        <Image
          source={{ uri: imageUrl }}
          style={[styles.resultImage, imageLoading && styles.hiddenImage]}
          onLoadEnd={() => setImageLoading(false)} // Hide loader once image is loaded
        />
      </ThemedView>

      <ThemedButton
        title="Generate Another"
        onPress={handleGenerateAnother} // Reset and navigate back
        style={styles.generateButton}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f4f8fb',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff5f5',
  },
  errorText: {
    marginBottom: 16,
    fontSize: 18,
    textAlign: 'center',
  },
  errorButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#ff4d4d',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f7faff',
  },
  resultTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  resultPrompt: {
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  imageWrapper: {
    width: 320,
    height: 320,
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
    zIndex: 1,
  },
  hiddenImage: {
    opacity: 0,
  },
  resultImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#d1e7f3',
  },
  generateButton: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#1d72b8',
  },
});
