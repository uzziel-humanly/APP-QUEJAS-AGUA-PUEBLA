import React from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";

const getRandomColors = () => {
  const colorsList = [
    ["#06beb6", "#48b1bf"],
    // ["#4568DC", "#4568DC"],
    // ["#B06AB3", "#B06AB3"],
    ["#42e695", "#3bb2b8", "#2b5876"],
    //["#bdc3c7", "#2c3e50", "#4ca1af"],
  ];

  const randomIndex = Math.floor(Math.random() * colorsList.length);
  return colorsList[randomIndex];
};

export default function TransparenciaPagina() {
  const [colors, setColors] = useState(getRandomColors());

  useEffect(() => {
    getTransparencia();
  }, []);

  const [cabeceras, setCabeceras] = useState([]);
  const [contenido, setContenido] = useState([]);

  const getTransparencia = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTransparencia`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje[0];
        //let _dataContent = response.data.mensaje;
        let _dataContent = response.data.mensaje.slice(1);
        setCabeceras(_data);
        setContenido(_dataContent);
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
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Obras de Transparencia</Text>
              <Text style={styles.subtitle}>
                A continuación se muestra una breve descripción de las obras que
                se tienen en proceso en la ciudad.
              </Text>
              {contenido.map((registro, index) => (
                <LinearGradient
                  key={index}
                  style={{
                    width: 350,
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: "#fda400",
                    borderRadius: 10,
                    position: "relative",
                  }}
                  colors={getRandomColors()}
                >
                  {cabeceras.map((cabecera, i) => (
                    <View key={i} style={styles.row}>
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        {cabecera}:
                      </Text>
                      <Text style={{ color: "white" }}>{registro[i]}</Text>
                    </View>
                  ))}
                  <View style={styles.iconContainer}>
                    <FontAwesome name="gears" size={50} color="white" />
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 36,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontWeight: "700",
    fontSize: 27,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
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
  formAction: {
    marginTop: 24,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});