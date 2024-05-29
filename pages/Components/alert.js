import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AlertPrincipal = () => {
  const navigation = useNavigation();

  const showAlertRegister = (data) => {
    Alert.alert(data[0].status, data[0].msj, [
      {
        text: "Cancelar",
        onPress: () => navigation.navigate("BoardingScreen"),
        style: "cancel",
      },
      { text: "OK", onPress: () => navigation.navigate("BoardingScreen") },
    ]);
  };

  const showAlertPasswordIncorrect = (data) => {
    Alert.alert(data[0].status, data[0].msj, [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const showAlertReport = (data) => {
    if (data[0].status == "Exito") {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => navigation.navigate("BoardingScreenReport"),
        },
      ]);
    } else if (data[0].status == "Error") {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return {
    showAlertRegister,
    showAlertPasswordIncorrect,
    showAlertReport,
  };
};
