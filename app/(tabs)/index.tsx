import { ThemedButton } from '@/components/ThemedButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    router.push({ pathname: '/ResultScreen', params: { prompt } });
    setPrompt('')
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        AI Image Generator
      </ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>
        Unleash your creativity by generating stunning AI-powered images with just a few words.
      </ThemedText>

      <ThemedView style={styles.inputContainer}>
        <ThemedText type="defaultSemiBold">Your Prompt</ThemedText>
        <ThemedTextInput
          style={styles.input}
          placeholder="Describe an image (e.g., a futuristic city at sunset)"
          value={prompt}
          onChangeText={setPrompt}
          type="outline"
        />
      </ThemedView>

      <ThemedButton title="Generate Image" onPress={handleGenerate} style={styles.button} />

      <ThemedText type="link" style={styles.footerText}>
        Built with React Native, Expo, and OpenAI.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 18,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    marginTop: 8,
    width: '100%',
  },
  button: {
    marginVertical: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: 'green',

  },
  footerText: {
    marginTop: 32,
    textAlign: 'center',
    fontSize: 14,
  },
});
