import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Home  () {
  return (
    <View style={styles.container}>
      <Text>Pruebas</Text>
      <StatusBar style="auto" />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

