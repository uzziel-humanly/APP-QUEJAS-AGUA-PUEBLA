import { Alert, AppRegistry, Button, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AlertPrincipal = () => {

  const navigation = useNavigation();

    const showAlertRegister = (data) => {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () =>   navigation.navigate('BoardingScreen'),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate('BoardingScreen') },
      ]);
    };
  
    return {
      showAlertRegister,
    };
  };