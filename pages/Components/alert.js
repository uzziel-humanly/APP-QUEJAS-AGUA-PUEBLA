import React from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const AlertPrincipal = () => {
  const navigation = useNavigation();

  const showAlertRegister = (data) => {
    if (data[0].status == "Exito") {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () => navigation.navigate("BoardingScreen"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.navigate("BoardingScreen") },
      ]);
    } else if (data[0].status == "Advertencia") {
      Alert.alert(data[0].status, data[0].msj, [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
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
          onPress: () => navigation.navigate("Regresar a reportes"),
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
