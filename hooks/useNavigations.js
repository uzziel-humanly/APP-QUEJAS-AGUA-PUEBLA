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
import { StyleSheet, TouchableOpacity, Text, AppRegistry, Button } from "react-native";
import Home from "../pages/indexHome";
import Login from "../pages/Auth/indexLogin";
import Register from "../pages/Auth/register";
import BoardingScreen from "../pages/Components/boarding_screen";
import BoardingScreenReport from "../pages/Components/boarding_screenReport";
import Complaints from "../pages/Complaints/indexComplaints";
import Reports from "../pages/Reports/indexReports";
import FormReports from "../pages/Reports/formReports";
import IndexStatusReports from "../pages/Reports/indexStatusReports";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import IndexBoarding from "../pages/indexBoarding";
import IndexBoarding2 from "../pages/indexBoarding2";
import IndexBoarding3 from "../pages/indexBoarding3";
import ForgetPassword from "../pages/Auth/indexForgetPassword";
import NewPassword from "../pages/indexBoardingForgetPassword";
import IndexUserProfile from "../pages/Auth/indexUserProfile";

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
    screenOptions={({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#000', 
      },
      headerTintColor: '#fff', 
      
      
    })}
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
      {/* <GestureHandlerRootView
        contentContainerStyle={{ minHeight: "100%", overflow: "visible" }}
        style={styles.container}
      > */}
      <Stack.Navigator initialRouteName={"Login"}>
        <Stack.Screen
          name="Boarding"
          component={IndexBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Boarding2"
          component={IndexBoarding2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Boarding3"
          component={IndexBoarding3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndexScreen"
          component={MainStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forget Password"
          component={ForgetPassword}
          options={{ title: false }}
        />
        <Stack.Screen
          name="New Password"
          component={NewPassword}
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
        <Stack.Screen
          name="BoardingScreenReport"
          component={BoardingScreenReport}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormReports"
          component={FormReports}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="IndexStatusReports"
          component={IndexStatusReports}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      {/* </GestureHandlerRootView> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 20,
    color:'#000'
  },
  buttonContainer: {
    backgroundColor: "#d9d9d9",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
});