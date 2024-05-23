import { useState } from "react";
import { Alert } from "react-native";
import { AlertPrincipal } from "../pages/Components/alert";
import { useNavigation } from "@react-navigation/native";


export function useRegister() {
  const { showAlertRegister } = AlertPrincipal();
  const navigation = useNavigation();
  //Validacion de contraseña ingresada
  const handleCheckPassword = (e) => {
    let password = e.target.value;
    console.log(password);
  };
  
  //* Acciones registro *//
  const onSubmit = (data) => {
    console.log(data);
    if (data.password == data.passwordConfirmation) {
      const data = [{ status: "Exito", msj: "Los datos se han registrado" }];
      showAlertRegister(data);
    } else {
      const data = [
        { status: "Advertencia", msj: "Las contraseñas no coinciden" },
      ];
      //showAlertRegister(data);
    }
  };

  const handleClickLogin = (e) => {
    navigation.navigate('Login')
  };
  

  return {
    onSubmit,
    handleCheckPassword,
    handleClickLogin
  };
}
