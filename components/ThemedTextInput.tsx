import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'outline' | 'rounded';
};

export function ThemedTextInput({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextInputProps) {
  const borderColor = useThemeColor({ light: lightColor, dark: darkColor }, 'border');
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <TextInput
      style={[
        { borderColor, backgroundColor, color: textColor },
        type === 'default' ? styles.default : undefined,
        type === 'outline' ? styles.outline : undefined,
        type === 'rounded' ? styles.rounded : undefined,
        style,
      ]}
      placeholderTextColor={textColor + '88'} // Adding transparency to placeholder text
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 16,
  },
  outline: {
    height: 40,
    borderWidth: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  rounded: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 20,
    fontSize: 16,
  },
});
