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
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  AppRegistry,
  Button,
} from "react-native";
import Home from "../pages/indexHome";
import TransparenciaPagina from "../pages/indexTransparencia";
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
import IndexUserService from "../pages/user_service/indexUserService";
import IndexTemporalPassword from "../pages/Auth/indexTemporalPassword";
import IndexBoardingComplaints from "../pages/Complaints/indexBoardingComplaints";
import { ThemeProvider } from "styled-components/native";
import { theme } from "../theme";
import styled, { useTheme } from "styled-components/native";

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
  const theme = useTheme(); 

  return (
    <DrawerContentScrollView style={styles.container}>
      <Text style={[styles.title, {color: theme.Colors.ui.primary}]}>Menú</Text>
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
  const theme = useTheme(); 

  return (
    <ThemeProvider theme={theme}>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <MenuItems {...props} />}
        screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: theme.Colors.ui.primary, 
          },
          headerTintColor: "#fff",
        })}
      >
        <Drawer.Screen name="Inicio" component={Home} />
        <Drawer.Screen name="Quejas" component={Complaints} />
        <Drawer.Screen name="Reportes" component={Reports} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}

export default function StackNavigation() {
  const theme = useTheme(); 

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
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
            name="Regresar a reportes"
            component={BoardingScreenReport}
            options={{ headerTitle: false, headerBackTitle: false }}
          />
          <Stack.Screen
            name="FormReports"
            component={FormReports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Mi perfil"
            component={IndexUserProfile}
            options={{ headerTitle: false, headerBackTitle: false }}
          />
          <Stack.Screen
            name="IndexStatusReports"
            component={IndexStatusReports}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Transparencia"
            component={TransparenciaPagina}
            options={{ headerTitle: false, headerBackTitle: false }}
          />
          <Stack.Screen
            name="Horarios de servicio"
            component={IndexUserService}
            options={{ headerTitle: false, headerBackTitle: false }}
          />
          <Stack.Screen
            name="Inicio temporal"
            component={IndexTemporalPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Queja finalizada"
            component={IndexBoardingComplaints}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
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
  },
  buttonContainer: {
    backgroundColor: "#d9d9d9",
    marginBottom: 15,
    padding: 15,
    borderRadius: 8,
  },
});
