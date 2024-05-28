import { useState } from "react";
import { Alert } from "react-native";
import { AlertPrincipal } from "../pages/Components/alert";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";

export function useRegister() {
  const { showAlertRegister, showAlertPasswordIncorrect } = AlertPrincipal();
  const navigation = useNavigation();
  //Validacion de contraseña ingresada
  const handleCheckPassword = (e) => {
    let password = e.target.value;
    //console.log(password);
  };

  //* Acciones registro *//
  const onSubmit = async (data) => {
    //  const onSubmit = (data) => {
    var json = data;
    if (data.pass == data.passwordConfirmation) {
      try {
        let pass = md5(API_TOKEN);
        let credentials = `${API_AUTH}:${pass}`;
        let encodedCredentials = btoa(credentials);
        let auth = "Basic " + encodedCredentials;
        //Obtenemos el la fecha actual y la hora para el registro
        const currentDate = new Date().toISOString().split("T")[0];
        const currentTime = new Date()
          .toISOString()
          .split("T")[1]
          .split(".")[0];

        const additionalData = {
          fecha_registro: currentDate,
          hr_registro: currentTime,
          id_estatus_registro: "1",
        };
        //Esa informacion extra la metemos dentro del json body
        const completeData = { ...data, ...additionalData };
        let body = JSON.stringify(completeData);

        let response = await axios({
          method: "POST",
          url: `${API_URL}/api/registrar`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: body,
        });

        if (response.data.estatus === "ok") {
          const data = [
            { status: "Exito", msj: "Los datos se han registrado" },
          ];
          showAlertRegister(data);
        } else {
          const data = [
            {
              status: "Error",
              msj: "Ha ocurrido un error al intentar registrar los datos",
            },
          ];
          showAlertRegister(data);
        }
      } catch (error) {
        console.error(error);
        alert("Ocurrió un error en el servidor");
      }
    } else {
      const data = [
        { status: "Advertencia", msj: "Las contraseñas no coinciden" },
      ];
      showAlertPasswordIncorrect(data);
    }
  };

  const handleClickLogin = (e) => {
    navigation.navigate("Login");
  };

  return {
    onSubmit,
    handleCheckPassword,
    handleClickLogin,
  };
}
