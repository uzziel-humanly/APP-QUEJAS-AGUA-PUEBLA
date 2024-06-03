import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import StackNavigation from './hooks/useNavigations';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';


export default function App() {

  return (
      <ThemeProvider theme={theme}>
        <StackNavigation/>
      </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
