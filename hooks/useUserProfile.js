import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import { md5 } from "js-md5";
import { useNavigation, StackActions } from "@react-navigation/native";
import ModalChangePassword from "../pages/Auth/modalChangePassword";
import { err } from "react-native-svg";
import { Cache } from "react-native-cache";

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
  const [loadingPass, setLoadingPass] = useState(false);

  //Inicio temporal
  const [email2, setEmail2] = useState("");

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
    } else if (Text.length < 8) {
      setMessagePassword("La contraseña debe tener al menos 8 caracteres");
    } else {
      setMessagePassword("");
    }
  };

  const handleChangeConfirmNewPassword = (Text) => {
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

  const handleChangeEmail2 = (Text) => {
    setEmail2(Text);
  };

  const handleUpdatePassword = async (flag) => {
    let _body = [];
    let _email = "";

    // if (flag === 1) {
    //     _email = await AsyncStorage.getItem('email');
    // } else if (flag === 2) {
    _email = email;
    // }

    if (
      newPassword.trim() !== "" &&
      confirmNewPassword.trim() !== "" &&
      newPassword === confirmNewPassword &&
      newPassword.length >= 8
    ) {
      _body.push({
        correo: _email,
        pass: md5(newPassword),
      });

      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      setLoadingPass(true);

      try {
        let response = await axios({
          method: "post",
          url: `${API_URL}/api/setPasswd`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: _body[0],
        });

        if (response.data.estatus === "ok") {
          let _message = response.data.mensaje;

          setLoadingPass(false);
          alert(_message);

          if (flag === 1) {
            setRefreshKey((prevKey) => prevKey + 1);
          } else if (flag === 2) {
            navigation.navigate("IndexScreen");
          } else {
            let _messageUpdatePassword = response.data.mensaje;
            setMessageUpatePassword(_messageUpdatePassword);
            alert(_messageUpdatePassword);
          }
        }
      } catch (error) {
        setLoadingPass(false);
        alert("Error en el servidor");
      }
    }
  };

  const handleCloseSesion = async () => {
    try {
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("id");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("nis");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("rol");
      await AsyncStorage.clear();


      
      navigation.navigate("Login");

      navigation.dispatch(
        StackActions.replace('Login')
      );
      
    } catch (error) {
      console.log(error);
      alert("Ha ocurrido un error al intentar cerrar la sesión");
    }
  };


  const clearAllAppData = async () => {
    try {
      // Limpiar AsyncStorage
      await AsyncStorage.clear();
      console.log('AsyncStorage cleared');
  
      // Limpiar caché de imágenes
      // FastImage.clearDiskCache().then(() => console.log('Image disk cache cleared'));
      // FastImage.clearMemoryCache().then(() => console.log('Image memory cache cleared'));
  
      // Limpiar caché de la aplicación
      ClearAppCache.clearAppCache(() => {
        console.log('App cache cleared');
      });
  
      // Aquí puedes agregar cualquier otra limpieza adicional que necesites
      console.log('All app data cleared');
    } catch (error) {
      console.error('Error clearing all app data:', error);
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

    //Inicio temporal
    handleChangeEmail2,
    loadingPass,
    handleCloseSesion,
  };
};
