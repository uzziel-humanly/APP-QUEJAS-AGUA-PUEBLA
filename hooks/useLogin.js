import { useState } from "react";
import { Alert } from "react-native";
import { AlertPrincipal } from "../pages/Components/alert";

export const useLogin = () => {
  const { showAlert } = AlertPrincipal();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = (e) => {
    let _username = e.target.value;
    console.log(_username);
  };

  const handleChangeUsername = (e) => {
    let _username = e.target.value;
    setUsername(_username);
  };

  const handleChangePassword = (e) => {
    let _password = e.target.value;
    setPassword(_password);
  };

  const validateSession = () => {
    let _username = username;
    let _password = password;

    console.log("Harás la petición con estos datos", _username, _password);
  };

  //Validacion de contraseña ingresada
  const handleCheckPassword = (e) => {
    let password = e.target.value;
    console.log(password);
  };
  //* Acciones registro *//
  const onSubmit = (data) => {
    console.log(data);
    if (data.password == data.passwordConfirmation) {
        const data = [{ status: "Exito",msj:"Los datos se han registrado" }];
        showAlert(data);
    } else {
      const data = [{ status: "Advertencia",msj:"Las contraseñas no coinciden" }];
      showAlert(data);
    }
  };

  return {
    //sing up
    handleCreateAccount,
    //login
    validateSession,
    username,
    password,
    handleChangeUsername,
    handleChangePassword,
    onSubmit,
    handleCheckPassword,
  };
};
