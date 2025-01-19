import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Please enter a prompt');
      return;
    }

    // Navigate to the Result screen with the entered prompt
    router.push({ pathname: '/ResultScreen', params: { prompt } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter a prompt to generate an image:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type your prompt here"
        value={prompt}
        onChangeText={setPrompt}
      />
      <Button title="Generate" onPress={handleGenerate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
