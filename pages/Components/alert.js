import { Alert, AppRegistry, Button, StyleSheet, View } from "react-native";

export const AlertPrincipal = () => {

    const showAlert = (data) => {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    };
  
    return {
      showAlert,
    };
  };