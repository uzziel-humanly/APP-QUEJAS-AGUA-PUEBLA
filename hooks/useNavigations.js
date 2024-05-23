import React from "react";
import {
  NavigationContainer,
  useScrollToTop,
  FlatList,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  DrawerContentScrollView,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { StyleSheet, TouchableOpacity, Text, AppRegistry } from "react-native";
import Home from "../pages/indexHome";
import Login from "../pages/Auth/indexLogin";
import Register from "../pages/Auth/register";
import BoardingScreen from "../pages/Components/boarding_screen";
import Complaints from "../pages/Complaints/indexComplaints";
import Reports from "../pages/Reports/indexReports";
//import { ScrollView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MenuButtonItem = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
};

const MenuItems = ({ navigation }) => {
  return (
    <DrawerContentScrollView style={styles.container}>
      <Text style={styles.title}>Menú</Text>
      <MenuButtonItem
        text={"Inicio"}
        onPress={() => navigation.navigate("Inicio")}
      />
      <MenuButtonItem
        text={"Quejas"}
        onPress={() => navigation.navigate("Quejas")}
      />
      <MenuButtonItem
        text={"Reportes"}
        onPress={() => navigation.navigate("Reportes")}
      />
    </DrawerContentScrollView>
  );
};

function MainStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <MenuItems {...props} />}
    >
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Quejas" component={Complaints} />
      <Drawer.Screen name="Reportes" component={Reports} />
    </Drawer.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView
        contentContainerStyle={{ minHeight: "100%", overflow: "visible" }}
        style={styles.container}
      >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="IndexScreen"
            component={MainStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BoardingScreen"
            component={BoardingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    backgroundColor: "#d9d9d9",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
});
