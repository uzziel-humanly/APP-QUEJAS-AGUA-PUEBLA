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
  // const onSubmit = async (data) => {
  //   var formData = new FormData();

  //   // Agrega los datos adicionales al FormData
  //   formData.append("document", "NADA");
  //   formData.append("nombre", data.nombre);
  //   formData.append("apellido_p", data.apellido_p);
  //   formData.append("apellido_m", data.apellido_m);
  //   // Agrega otros campos según sea necesario

  //   // Agrega el archivo físico al FormData
  //   if (data.Archivo2 && data.Archivo2[0] && data.Archivo2[0].uri) {
  //     formData.append("Archivo2", {
  //       uri: data.Archivo2[0].uri,
  //       type: "image/jpeg",
  //       name: data.Archivo2[0].fileName,
  //     });
  //   }

  //   // Realiza una solicitud POST al servidor
  //   try {
  //     let passcyrpt = md5(data.passprev);
  //     let pass = md5(API_TOKEN);
  //     let credentials = `${API_AUTH}:${pass}`;
  //     let encodedCredentials = btoa(credentials);
  //     let auth = "Basic " + encodedCredentials;
  //     //Obtenemos el la fecha actual y la hora para el registro
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const currentTime = new Date().toISOString().split("T")[1].split(".")[0];

  //     console.log(formData);

  //     let response = await fetch(
  //       `https://hs.ac-labs.com.mx/copia_insumos/contenido/apis/api.php?metodo=registerApp`,
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );
  //     let responseData = await response.json();
  //     if (responseData.estatus === "ok") {
  //       const data = [{ status: "Exito", msj: "Los datos se han registrado" }];
  //       showAlertRegister(data);
  //     } else {
  //       const data = [
  //         {
  //           status: "Error",
  //           msj: "Ha ocurrido un error al intentar registrar los datos",
  //         },
  //       ];
  //       showAlertRegister(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Ocurrió un error en el servidor");
  //   }
  // };

  const onSubmit = async (data) => {
    //console.log(data);
    if (data.passprev === data.passwordConfirmation) {
      let passcyrpt = md5(data.passprev);
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;
      const currentDate = new Date().toISOString().split("T")[0];
      const currentTime = new Date().toISOString().split("T")[1].split(".")[0];
      // Crear un objeto FormData
      const formData = new FormData();
      // Añadir el archivo a FormData
      // formData.append("Archivo2", {
      //   uri: data.Archivo2[0].uri,
      //   type: "image/jpeg",
      //   name: data.Archivo2[0].fileName,
      // });

      formData.append("Archivo3", {
        uri: data.Archivo3[0].uri,
        type: "image/jpeg",
        name: data.Archivo3[0].fileName,
      });

      // formData.append("Archivo3", {
      //   uri: data.Archivo3[0].uri,
      //   type: "image/jpeg",
      //   name: data.Archivo3[0].fileName,
      // });
      formData.append("nombre", data.nombre);
      formData.append("Archivo2", data.Archivo2);
      formData.append("apellido_p", data.apellido_p);
      formData.append("apellido_m", data.apellido_m);
      formData.append("nis", data.nis);
      formData.append("celular", data.celular);
      formData.append("correo", data.correo);
      formData.append("id_tipo_cuenta", data.id_tipo_cuenta);
      formData.append("fecha_registro", currentDate);
      formData.append("hr_registro", currentTime);
      formData.append("id_estatus_registro", "1");
      formData.append("pass", passcyrpt);

      console.log(data);

      try {
        let response = await axios.post(
          "https://hs.ac-labs.com.mx/copia_insumos/contenido/apis/api.php?metodo=registerApp",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: auth,
            },
          }
        );

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
        console.error("Error:", error);
        alert("Ocurrió un error en el servidor");
      }
    } else {
      const data = [
        { status: "Advertencia", msj: "Las contraseñas no coinciden" },
      ];
      showAlertPasswordIncorrect(data);
    }
  };

  //  const onSubmit = async (data) => {

  //   //  const onSubmit = (data) => {
  //   var json = data;
  //   if (data.passprev == data.passwordConfirmation) {
  //     //try {
  //       let passcyrpt = md5(data.passprev);
  //       let pass = md5(API_TOKEN);
  //       let credentials = `${API_AUTH}:${pass}`;
  //       let encodedCredentials = btoa(credentials);
  //       let auth = "Basic " + encodedCredentials;
  //       //Obtenemos el la fecha actual y la hora para el registro
  //       const currentDate = new Date().toISOString().split("T")[0];
  //       const currentTime = new Date()
  //         .toISOString()
  //         .split("T")[1]
  //         .split(".")[0];
  //         var formData = new FormData();
  //         formData.append("Archivo2", {
  //           uri: data.Archivo2[0].uri,
  //           type: "image/jpeg",
  //           name: data.Archivo2[0].fileName,
  //         });

  //       //console.log("A->"+data.Archivo2[0].fileName);
  //       const additionalData = {
  //         fecha_registro: currentDate,
  //         hr_registro: currentTime,
  //         id_estatus_registro: "1",
  //         pass:passcyrpt,
  //         //Archivo3:[formData],
  //       };
  //       //Esa informacion extra la metemos dentro del json body
  //       const completeData = { ...data, ...additionalData };
  //       let body = JSON.stringify(completeData);
  //       console.log(body);
  //       // let response = await axios({
  //       //   method: "POST",
  //       //   url: `${API_URL}/api/registrar`,
  //       //   headers: { Authorization: auth, "Content-Type": "application/json" },
  //       //   data: body,
  //       // });
  //       let response = await axios({
  //         method: "post",
  //         url: `https://hs.ac-labs.com.mx/copia_insumos/contenido/apis/api.php?metodo=registerApp`,
  //         headers: {  "Content-Type": "application/json" },
  //         data: json
  //       });

  //       if (response.data.estatus === "ok") {
  //         const data = [
  //           { status: "Exito", msj: "Los datos se han registrado" },
  //         ];
  //         showAlertRegister(data);
  //       } else {
  //         const data = [
  //           {
  //             status: "Error",
  //             msj: "Ha ocurrido un error al intentar registrar los datos",
  //           },
  //         ];
  //         showAlertRegister(data);
  //       }
  //     // } catch (error) {
  //     //   console.error(error);
  //     //   alert("Ocurrió un error en el servidor");
  //     // }
  //   } else {
  //     const data = [
  //       { status: "Advertencia", msj: "Las contraseñas no coinciden" },
  //     ];
  //     showAlertPasswordIncorrect(data);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   var formData = new FormData();

  //   // Agrega los datos adicionales al FormData
  //   formData.append('document', 'NADA');
  //   formData.append('nombre', data.nombre);
  //   formData.append('apellido_p', data.apellido_p);
  //   formData.append('apellido_m', data.apellido_m);
  //   // Agrega otros campos según sea necesario

  //   // Agrega el archivo físico al FormData
  //   if (data.Archivo2 && data.Archivo2[0] && data.Archivo2[0].uri) {
  //     formData.append('Archivo2', {
  //       uri: data.Archivo2[0].uri,
  //       type: 'image/jpeg',
  //       name: data.Archivo2[0].fileName,
  //     });
  //   }

  //   // Realiza una solicitud POST al servidor
  //   try {
  //     let passcyrpt = md5(data.passprev);
  //     let pass = md5(API_TOKEN);
  //     let credentials = `${API_AUTH}:${pass}`;
  //     let encodedCredentials = btoa(credentials);
  //     let auth = "Basic " + encodedCredentials;
  //     //Obtenemos el la fecha actual y la hora para el registro
  //     const currentDate = new Date().toISOString().split("T")[0];
  //     const currentTime = new Date()
  //       .toISOString()
  //       .split("T")[1]
  //       .split(".")[0];

  //     // Agrega los datos adicionales al FormData
  //     formData.append('fecha_registro', currentDate);
  //     formData.append('hr_registro', currentTime);
  //     formData.append('id_estatus_registro', "1");
  //     formData.append('pass', passcyrpt);

  //     console.log(formData);

  //     // Realiza la solicitud al servidor
  //     let response = await fetch(`https://hs.ac-labs.com.mx/copia_insumos/contenido/apis/api.php?metodo=registerApp`, {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     // Maneja la respuesta del servidor
  //     let responseData = await response.json();
  //     if (responseData.estatus === "ok") {
  //       const data = [
  //         { status: "Exito", msj: "Los datos se han registrado" },
  //       ];
  //       showAlertRegister(data);
  //     } else {
  //       const data = [
  //         {
  //           status: "Error",
  //           msj: "Ha ocurrido un error al intentar registrar los datos",
  //         },
  //       ];
  //       showAlertRegister(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Ocurrió un error en el servidor");
  //   }
  // };

  const handleClickLogin = (e) => {
    navigation.navigate("Login");
  };

  return {
    onSubmit,
    handleCheckPassword,
    handleClickLogin,
  };
}
