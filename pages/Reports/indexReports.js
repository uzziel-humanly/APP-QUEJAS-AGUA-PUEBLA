import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FormReports from "./formReports";
import IndexStatusReports from "./indexStatusReports";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styled, {useTheme} from "styled-components/native";
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();

export default function Reports() {

  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Mis reportes"
        component={IndexStatusReports}
        options={{
          tabBarInactiveTintColor: theme.Colors.ui.disabled,
          tabBarActiveTintColor: theme.Colors.ui.primary,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-list-text"
              color={color}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Nuevo reporte"
        component={FormReports}
        options={{
          tabBarInactiveTintColor: theme.Colors.ui.disabled,
          tabBarActiveTintColor: theme.Colors.ui.primary,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
