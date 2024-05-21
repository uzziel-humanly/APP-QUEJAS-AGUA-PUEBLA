import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IndexStatusReports from '../Reports/indexStatusReports';
import FormComplaints from './formComplaints';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export default function Complaints() {
  return (
    <Tab.Navigator 
    screenOptions={{
      headerShown: false,
    }}
    >
      <Tab.Screen 
          name="Mis quejas" 
          component={IndexStatusReports} 
          color={"black"}
          options={{
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'black',
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
        name="Nueva queja" 
        component={FormComplaints}
        color={"black"}
        options={{
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'black',
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
