import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import StackNavigation from "./hooks/useNavigations";
import Register from "./pages/Auth/register";
import Login from "./pages/Auth/indexLogin";

export default function App() {
  return (
      <StackNavigation/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
