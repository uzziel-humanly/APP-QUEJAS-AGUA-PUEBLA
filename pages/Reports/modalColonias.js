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
  FlatList,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useReports } from "../../hooks/Reports/useReports";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormReports from "./formReports";

export default function ModalColonias({
  modalVisibleC,
  setModalVisibleC,
  handleSelectColonia,
  setValue,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredColonias, setFilteredColonias] = useState([]);
  const [selectedColonia, setSelectedColonia] = useState("");
  const [colonias, setColonias] = useState([]);

  useEffect(() => {
    getCatalogoColonias();
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredColonias(colonias);
    } else {
      const filtered = colonias.filter((colonia) =>
        colonia.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredColonias(filtered);
    }
  }, [searchTerm, colonias]);

  const getCatalogoColonias = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getColonias`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        setColonias(_data);
        setFilteredColonias(_data);
      } else {
        alert("Ocurrió un error en el servidor");
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      //console.error(error);
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
            visible={modalVisibleC}
          >
            <View style={styles.background}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {/* <Text style={styles.title}>
                    Colonias
                  </Text> */}
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisibleC(false)}
                  >
                    <Text style={styles.textStyle}>Cerrar</Text>
                  </Pressable>

                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Colonia:</Text>
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Buscar colonia"
                      value={searchTerm}
                      onChangeText={setSearchTerm}
                    />
                    <FlatList
                      data={filteredColonias}
                      keyExtractor={(item) => item.id.toString()}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          style={styles.coloniaItem}
                          onPress={() => {
                            handleSelectColonia(setValue, item.id);
                            setSelectedColonia(item.nombre);
                            setSearchTerm("");
                            setFilteredColonias(colonias);
                            setModalVisibleC(false);
                          }}
                        >
                          <Text>{item.nombre}</Text>
                        </TouchableOpacity>
                      )}
                    />
                    {selectedColonia ? (
                      <Text style={styles.selectedColonia}>
                        Colonia seleccionada: {selectedColonia}
                      </Text>
                    ) : null}
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
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
