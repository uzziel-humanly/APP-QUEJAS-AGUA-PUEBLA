import { useState } from "react";
import { Alert } from "react-native";
import { AlertPrincipal } from "../../pages/Components/alert";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useExtraNis() {
  const { showAlertRegisterNis } = AlertPrincipal();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showElement, setShowElement] = useState(false);

  const onSubmit = async (data) => {
    let _id_user = await AsyncStorage.getItem("id");
    let _email = await AsyncStorage.getItem("email");
    setLoading(true);
    if (
      data.Archivo1 != undefined &&
      data.Archivo2 != undefined &&
      data.Archivo3 != undefined &&
      data.Archivo4 != undefined &&
      data.Archivo5 != undefined
    ) {
      try {
        let pass = md5(API_TOKEN);
        let credentials = `${API_AUTH}:${pass}`;
        let encodedCredentials = btoa(credentials);
        let auth = "Basic " + encodedCredentials;

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

        formData.append("nis", data.nis);
        formData.append("id_tipo_cuenta", data.id_tipo_cuenta);
        formData.append("id_usuario_app", _id_user);
        //formData.append("nis", _nis2[0].nis);
        formData.append("correo", _email);

        let response = await axios({
          method: "POST",
          url: `${API_URL}/api/setRegistrarNis`,
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
          showAlertRegisterNis(data);
          setShowElement(false);

        } else {
          setLoading(false);
          const data = [
            {
              status: "Error",
              msj: "Ha ocurrido un error al intentar registrar los datos",
            },
          ];
          showAlertRegisterNis(data);
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
        showAlertRegisterNis(data);
      }
    } else {
      setLoading(false);
      const data = [
        {
          status: "Advertencia",
          msj: "Debes adjuntar todos los documentos",
        },
      ];
      showAlertRegisterNis(data);
    }
  };

  const [tipoContrato, setTipoContrato] = useState("");

  const handleModalDocuments = (tipo) => {
    setTipoContrato(tipo);
    setModalVisible(!modalVisible);
  };

  return {
    onSubmit,
    loading,
    setLoading,
    modalVisible,
    setModalVisible,
    handleModalDocuments,
    tipoContrato,
    setTipoContrato,
    showElement,
    setShowElement,
  };
}
