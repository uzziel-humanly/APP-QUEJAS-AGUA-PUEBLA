import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Register from "./pages/Auth/register";

export default function App() {
  return (
    <View style={styles.container}>
      <Register />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
