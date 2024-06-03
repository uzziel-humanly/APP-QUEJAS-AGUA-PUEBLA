import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexStatusComplaints from './indexStatusComplaints';
import styled, { useTheme } from 'styled-components/native';
import FormComplaints from './formComplaints';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function Complaints() {
  const theme = useTheme();

  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Mis quejas" 
        component={IndexStatusComplaints} 
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
          tabBarIconStyle: {
            color: theme.Colors.ui.primary, 
          }
        }}
      />
      <Tab.Screen 
        name="Nueva queja" 
        component={FormComplaints}
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
