import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import { md5 } from "js-md5";
import { useNavigation } from "@react-navigation/native";
import ModalChangePassword from "../pages/Auth/modalChangePassword";

export const useUserProfile = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  //New password
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [messagePassword2, setMessagePassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(0);
  const [messageUpdatePassword, setMessageUpatePassword] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const getInformationUser = async () => {
    let _name = await AsyncStorage.getItem("name");
    let _email = await AsyncStorage.getItem("email");

    setName(_name);
    setEmail(_email);
  };

  useEffect(() => {
    getInformationUser();
  }, []);

  const handleChangePassword = () => {
    setModalVisible(!modalVisible);
  };

  const handleChangeNewPassword = (Text) => {
    setNewPassword(Text);
    if (Text.trim() === "") {
      setMessagePassword("La contraseña no puede estar vacía");
    } else {
      setMessagePassword("");
    }
  };

  const handleChangeConfirmNewPassword = (Text) => {
    console.log("entro? ", Text);
    console.log("pass ", newPassword);
    setConfirmNewPassword(Text);

    if (Text.trim() === "") {
      setPasswordMatch(2);
      setMessagePassword2("La contraseña no puede estar vacía");
    } else if (newPassword !== Text) {
      setPasswordMatch(2);
      setMessagePassword2("Las contraseñas no coinciden");
    } else {
      setPasswordMatch(1);
      setMessagePassword2("Las contraseñas coinciden");
    }
  };

  const handleUpdatePassword = async () => {
    let _email = await AsyncStorage.getItem("email");
    if (
      newPassword.trim() !== "" &&
      confirmNewPassword.trim() !== "" &&
      newPassword === confirmNewPassword
    ) {
      let _newPassword = md5(newPassword);
      let _body = [
        {
          correo: _email,
          pass: _newPassword,
        },
      ];

      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      try {
        let response = await axios({
          method: "post",
          url: `${API_URL}/api/setPasswd`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: _body[0],
        });
        console.log(response);
        if (response.data.estatus === "ok") {
          let _message = response.data.mensaje;

          setRefreshKey((prevKey) => prevKey + 1);

          alert(_message);
        } else {
          let _messageUpdatePassword = response.data.mensaje;
          setMessageUpatePassword(_messageUpdatePassword);
          alert(_messageUpdatePassword);
        }
      } catch {}
    } else {
      alert("Verifica tus datos");
    }
  };

  return {
    //information user
    name,
    email,

    //Change password
    modalVisible,
    setModalVisible,
    handleChangePassword,
    handleChangeNewPassword,
    handleChangeConfirmNewPassword,
    messagePassword,
    messagePassword2,
    passwordMatch,
    handleUpdatePassword,
  };
};
