import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, } from 'react-native';
import StackNavigation from './hooks/useNavigations';
import {API_URL, API_TOKEN} from "@env"


export default function App() {

  return (
    <StackNavigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
