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
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";

export default function ModalTransparencia({
  modalVisible,
  setModalVisible,
  idObra,
  setIdObra,
}) {
  const [loading, setLoading] = useState(true);
  const [cabeceras, setCabeceras] = useState([]);
  const [contenido, setContenido] = useState([]);

  useEffect(() => {
    getTransparencia();
  }, []);

  const getTransparencia = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      var anio = new Date().getFullYear();
      const year = {
        anio: 2023,
      };
      let body = JSON.stringify(year);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTransparencia`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      if (response.data.estatus === "ok") {
        if (response.data.mensaje === "Sin datos almacenados para mostrar.") {
          //No se efectua nada por el momento
        } else {
          let _data = response.data.mensaje[0];
          //let _dataContent = response.data.mensaje;
          let _dataContent = response.data.mensaje.slice(1);
          //let _dataContent = response.data.mensaje.slice(1);
          let _dataContentWithId = _dataContent.map((item, index) => {
            return { ...item, id: index + 1 };
          });
          const mensajeFiltrado = _dataContentWithId.find(
            (mensaje) => mensaje["id"] === idObra
          );
       
          setCabeceras(_data);
          setContenido(mensajeFiltrado);
          setLoading(false);
        }
      } else {
        //alert("Ocurrió un error en el servidor");
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Ocurrió un error en el servidor");
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
                    ) : !loading && contenido ? (
                      // Si loading es false y cabecera tiene datos, se muestran los datos
                      <View>
                        {cabeceras.map((cabecera, i) => (
                          <View
                            key={i}
                            style={{
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ color: "black", fontWeight: "600" }}>
                              {cabecera}:
                            </Text>
                            <Text style={{ color: "black" }}>
                              {contenido[i.toString()]}
                            </Text>
                          </View>
                        ))}
                      </View>
                    ) : (
                      // Si loading es false pero cabecera está vacío, mostrar el mensaje de error
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
