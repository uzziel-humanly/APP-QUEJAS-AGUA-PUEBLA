import 'react-native-gesture-handler';
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useHome } from '../hooks/useHome';

export default function Home  () {

  const{
    username
  }= useHome();

  return (
    <View style={styles.container}>
      <Text>¡Hola, {username}!</Text>
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

