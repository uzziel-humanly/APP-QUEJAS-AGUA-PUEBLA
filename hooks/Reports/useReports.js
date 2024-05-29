import React from "react";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import axios from "axios";
import { AlertPrincipal } from "../../pages/Components/alert";
import { useNavigation } from "@react-navigation/native";

export const useReports = () => {
  const { showAlertReport } = AlertPrincipal();
  const navigation = useNavigation();

  //* Acciones registro *//
  const handleRegisterReport = async (data) => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const currentDate = new Date().toISOString().split("T")[0];
      const additionalData = {
        id_usuario_app: "1",
        folio: "SOAPAP1",
        id_tipo: "1",
        id_incidencia: "1",
        fecha: currentDate,
      };
      //Esa informacion extra la metemos dentro del json body
      const completeData = { ...data, ...additionalData };
      let body = JSON.stringify(completeData);
      //console.log(body);

      let response = await axios({
        method: "POST",
        url: `${API_URL}/api/setReporte`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      if (response.data.estatus === "ok") {
        const data = [{ status: "Exito", msj: "Los datos se han registrado" }];
        showAlertReport(data);
      } else {
        const data = [
          {
            status: "Error",
            msj: "Ha ocurrido un error al intentar registrar los datos",
          },
        ];
        showAlertReport(data);
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const handleClickReport = (e) => {
    navigation.navigate("FormReports");
  };

  return {
    handleRegisterReport,
    handleClickReport,
  };
};
