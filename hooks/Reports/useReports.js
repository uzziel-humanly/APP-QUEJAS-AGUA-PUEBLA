import React from "react";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import axios from "axios";
import { AlertPrincipal } from "../../pages/Components/alert";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useReports = () => {
  const { showAlertReport } = AlertPrincipal();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleC, setModalVisibleC] = useState(false);
  const [idReporte, setIdReporte] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedColonia, setSelectedColonia] = useState("");

  //* Acciones registro *//
  const handleRegisterReport = async (data) => {
    //console.log(data);
    if (data.evidencia != undefined) {
      let _id_user = await AsyncStorage.getItem("id");
      try {
        setLoading(true);
        let pass = md5(API_TOKEN);
        let credentials = `${API_AUTH}:${pass}`;
        let encodedCredentials = btoa(credentials);
        let auth = "Basic " + encodedCredentials;

        const currentDate = new Date().toISOString().split("T")[0];
        var completeData = "";

        if (
          data.hasOwnProperty("latitud") == false &&
          data.hasOwnProperty("longitud") == false
        ) {
          const additionalData = {
            id_usuario_app: _id_user,
            fecha: currentDate,
            nis: "3074856",
            folio: "",
            longitud: "",
            latitud: "",
          };
          //Esa informacion extra la metemos dentro del json body
          completeData = { ...data, ...additionalData };
        } else {
          const additionalData = {
            id_usuario_app: _id_user,
            fecha: currentDate,
            nis: "3074856",
            folio: "",
          };
          //Esa informacion extra la metemos dentro del json body
          completeData = { ...data, ...additionalData };
        }

        let body = JSON.stringify(completeData);

        let response = await axios({
          method: "POST",
          url: `${API_URL}/api/setReporte`,
          headers: { Authorization: auth, "Content-Type": "application/json" },
          data: body,
        });

        if (response.data.estatus === "ok") {
          setLoading(false);
          const data = [
            { status: "Exito", msj: "Los datos se han registrado" },
          ];
          showAlertReport(data);
        } else {
          setLoading(false);
          const data = [
            {
              status: "Error",
              msj: "Ha ocurrido un error al intentar registrar los datos",
            },
          ];
          showAlertReport(data);
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
        showAlertReport(data);
      }
    } else {
      setLoading(false);
      //console.error(error);
      const data = [
        {
          status: "Error",
          msj: "Debes adjuntar o tomar una fotografia",
        },
      ];
      showAlertReport(data);
    }
  };

  const handleClickReport = (e) => {
    navigation.navigate("FormReports");
  };

  const handleModalReport = (id, estatus) => {
    setIdReporte(id);
    setStatus(estatus);
    setModalVisible(!modalVisible);
  };

  const handleModalColonia = () => {
    setModalVisibleC(!modalVisibleC);
  };

  return {
    handleRegisterReport,
    handleClickReport,
    handleModalReport,
    modalVisible,
    setModalVisible,
    modalVisibleC,
    setModalVisibleC,
    idReporte,
    setIdReporte,
    status,
    setStatus,
    loading,
    setLoading,
    handleModalColonia,
    selectedColonia,
    setSelectedColonia,
  };
};
