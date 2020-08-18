import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

const Paragraph = ({ children }) => (
  <Text style={styles.text}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: "lightblue",
    textAlign: 'center',
    marginBottom: 14,
  },
});

export default memo(Paragraph);
