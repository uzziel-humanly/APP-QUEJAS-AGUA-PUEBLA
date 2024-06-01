import React from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useReports } from "../../hooks/Reports/useReports";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";

export default function ModalReports({
  modalVisible,
  setModalVisible,
  idReporte,
  status
}) {
  const [dataFiltrada, setDataFiltrada] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportesInfo();
  }, []);

  const getReportesInfo = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const data = {
        id_usuario_app: "1",
      };
      let body = JSON.stringify(data);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getReportes`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        const mensajeFiltrado = _data.find(
          (mensaje) => mensaje.id === idReporte
        );
        setDataFiltrada(mensajeFiltrado);
        setLoading(false);
      } else {
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor modal");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View style={styles.background}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.title}>
                    Detalles generales del reporte
                  </Text>

                  <View
                    style={{
                      alignSelf: "center",
                      marginTop: 20,
                      marginBottom: 30,
                    }}
                  >
                    {loading ? (
                      // Si loading es true, no se muestra nada
                      <ActivityIndicator size="large" />
                    ) : !loading && dataFiltrada ? (
                      // Si loading es false y dataFiltrada tiene datos, mostrar los datos
                      <View>
                        <Text style={{}}>Folio: {dataFiltrada.folio}</Text>
                        <Text>Descripcion: {dataFiltrada.descripcion}</Text>
                        <Text>Fecha: {dataFiltrada.fecha}</Text>
                        <Text>Estatus: {status}</Text>
                        <Text>Evidencia:</Text>
                        <Image
                          source={{
                            uri: `${dataFiltrada.evidencia}`,
                          }}
                          style={{ width: 200, height: 200 }}
                        />
                      </View>
                    ) : (
                      // Si loading es false pero dataFiltrada está vacío, mostrar el mensaje de error
                      <Text>Ops, ¡Ha ocurrido un error!</Text>
                    )}
                  </View>

                  <View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "grey",
    marginRight: 5,
  },
  buttonConfirm: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  inputControl: {
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "500",
    color: "#333",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  form: {
    width: "100%",
  },
});
