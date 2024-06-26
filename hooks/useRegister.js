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
  const [loading, setLoading] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(0);
  const [emailMatch, setEmailMatch] = useState(0);
  //const [messagePassword, setMessagePassword] = useState("");
  const [celularMatch, setCelularMatch] = useState(0);
  const [messageEmail, setMessageEmail] = useState("");
  const [messageCelular, setMessageCelular] = useState("");
  const [messagePassword2, setMessagePassword2] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  //Validacion de contraseña ingresada
  const handleCheckPassword = (e) => {
    let password = e.target.value;

  };

  const onSubmit = async (data) => {

    setLoading(true);
    var emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (
      data.Archivo1 != undefined &&
      data.Archivo2 != undefined &&
      data.Archivo3 != undefined &&
      data.Archivo4 != undefined &&
      data.Archivo5 != undefined
    ) {
      if (emailRegex.test(data.correo)) {
        if (data.passprev === data.passwordConfirmation) {
          if (
            data.passprev.length >= 8 &&
            data.passwordConfirmation.length >= 8
          ) {

            try {
              let passcyrpt = md5(data.passprev);
              let pass = md5(API_TOKEN);
              let credentials = `${API_AUTH}:${pass}`;
              let encodedCredentials = btoa(credentials);
              let auth = "Basic " + encodedCredentials;
              const currentDate = new Date().toISOString().split("T")[0];
              const currentTime = new Date()
                .toISOString()
                .split("T")[1]
                .split(".")[0];

              // Crear un objeto FormData
              const formData = new FormData();

              if (data.Archivo1 != undefined) {
                formData.append("archivo1", {
                  uri: data.Archivo1[0].uri,
                  type: "image/jpeg",
                  name: data.Archivo1[0].fileName,
                });
              }

              if (data.Archivo2 != undefined) {
                formData.append("archivo2", {
                  uri: data.Archivo2[0].uri,
                  type: "image/jpeg",
                  name: data.Archivo2[0].fileName,
                });
              }

              if (data.Archivo3 != undefined) {
                formData.append("archivo3", {
                  uri: data.Archivo3[0].uri,
                  type: "image/jpeg",
                  name: data.Archivo3[0].fileName,
                });
              }

              if (data.Archivo4 != undefined) {
                var formato = "";
                var name = "";
                var uri = "";
                if (data.banF4 == "1") {
                  formato = "image/jpeg";
                  name = data.Archivo4[0].fileName;
                  uri = data.Archivo4[0].uri;
                } else if (data.banD4 == "2") {
                  formato = "application/pdf";
                  name = data.Archivo4.assets[0].name;
                  uri = data.Archivo4.assets[0].uri;
                }
                formData.append("archivo4", {
                  uri: uri,
                  type: formato,
                  name: name,
                });
              }

              if (data.Archivo5 != undefined) {
                var formato = "";
                var name = "";
                var uri = "";
                if (data.banF5 == "1") {
                  formato = "image/jpeg";
                  name = data.Archivo5[0].fileName;
                  uri = data.Archivo5[0].uri;
                } else if (data.banD5 == "2") {
                  formato = "application/pdf";
                  name = data.Archivo5.assets[0].name;
                  uri = data.Archivo5.assets[0].uri;
                }
                formData.append("archivo5", {
                  uri: uri,
                  type: formato,
                  name: name,
                });
              }

              if (data.Archivo6 != undefined) {
                var formato = "";
                var name = "";
                var uri = "";
                if (data.banF6 == "1") {
                  formato = "image/jpeg";
                  name = data.Archivo6[0].fileName;
                  uri = data.Archivo6[0].uri;
                } else if (data.banD6 == "2") {
                  formato = "application/pdf";
                  name = data.Archivo6.assets[0].name;
                  uri = data.Archivo6.assets[0].uri;
                }
                formData.append("archivo6", {
                  uri: uri,
                  type: formato,
                  name: name,
                });
              }

              formData.append("nombre", data.nombre);
              formData.append("apellido_p", data.apellido_p);
              formData.append("apellido_m", data.apellido_m);
              formData.append("nis", data.nis);
              formData.append("celular", data.celular);
              formData.append("correo", data.correo);
              formData.append("id_tipo_cuenta", data.id_tipo_cuenta);
              formData.append("fecha_selfie", data.fecha_selfie);
              formData.append("hora_selfie", data.hora_selfie);
              //formData.append("fecha_registro", currentDate);
              //formData.append("hr_registro", currentTime);
              ///formData.append("id_estatus_registro", "1");
              formData.append("pass", passcyrpt);
       

              let response = await axios({
                method: "POST",
                url: `${API_URL}/api/registrar`,
                headers: {
                  Authorization: auth,
                  "Content-Type": "multipart/form-data",
                },
                data: formData,
              });

   

              if (response.data.estatus === "ok") {
                setLoading(false);
                const data = [
                  { status: "Exito", msj: "Los datos se han registrado" },
                ];
                showAlertRegister(data);
              } else {
                setLoading(false);
                const data = [
                  {
                    status: "Error",
                    msj: "Ha ocurrido un error al intentar registrar los datos",
                  },
                ];
                showAlertRegister(data);
              }
            } catch (error) {
              setLoading(false);
              //console.error(error);
              const data = [
                {
                  status: "Error",
                  msj: "Ocurrio un error en el servidor",
                },
              ];
              showAlertRegister(data);
            }
          } else {
            setLoading(false);
            const data = [
              {
                status: "Advertencia",
                msj: "La contraseña debe tener al menos 8 caracteres",
              },
            ];
            showAlertRegister(data);
          }
        } else {
          setLoading(false);
          const data = [
            { status: "Advertencia", msj: "Las contraseñas no coinciden" },
          ];
          showAlertPasswordIncorrect(data);
        }
      } else {
        setLoading(false);
        const data = [
          {
            status: "Advertencia",
            msj: "El correo es invalido, por favor verifica",
          },
        ];
        showAlertRegister(data);
      }
    } else {
      setLoading(false);
      const data = [
        {
          status: "Advertencia",
          msj: "Debes adjuntar todos los documentos",
        },
      ];
      showAlertRegister(data);
    }
  };

  const handleClickLogin = (e) => {
    navigation.navigate("Login");
  };

  const handleConfirmPassword = (Text) => {
    if (Text.trim() === "") {
      setPasswordMatch(2);
      setMessagePassword2("La contraseña no puede estar vacía");
    } else if (newPassword !== Text) {
      setPasswordMatch(2);
      setMessagePassword2("Las contraseñas no coinciden");
    } else if (Text.length < 8) {
      setPasswordMatch(2);
      setMessagePassword2("La contraseña debe tener mas de 8 caracteres");
    } else {
      setPasswordMatch(1);
      setMessagePassword2("Las contraseñas coinciden");
    }
  };

  const validaCorreo = (Text) => {
    var emailRegex =
      /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (Text.trim() === "") {
      setEmailMatch(2);
      setMessageEmail("El correo no puede estar vacio");
    } else if (emailRegex.test(Text)) {
      setEmailMatch(1);
      setMessageEmail("Correo valido");
    } else {
      setEmailMatch(2);
      setMessageEmail("Correo invalido");
    }
  };

  const validaCelular = (celular) => {
    const esNumero = /^[0-9]+$/.test(celular);
    if (celular.length === 10 && esNumero) {
      //if (celular.length >= 10 && celular.length <= 10) {
      setCelularMatch(1);
      setMessageCelular("Telefono celular valido");
    } else {
      setCelularMatch(2);
      setMessageCelular("Telefono celular invalido");
    }
  };

  const inputPassword = (Text) => {
    setNewPassword(Text);
  };

  const [tipoContrato, setTipoContrato] = useState("");

  const handleModalDocuments = (tipo) => {
    setTipoContrato(tipo);
    setModalVisible(!modalVisible);
  };

  return {
    onSubmit,
    handleCheckPassword,
    handleClickLogin,
    loading,
    setLoading,
    handleConfirmPassword,
    passwordMatch,
    messagePassword2,
    inputPassword,
    modalVisible,
    setModalVisible,
    handleModalDocuments,
    emailMatch,
    setEmailMatch,
    messageEmail,
    validaCorreo,
    celularMatch,
    validaCelular,
    messageCelular,
    tipoContrato,setTipoContrato,
    setCelularMatch,
    setPasswordMatch
  };
}
