import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import ModalTransparencia from "./modalTransparencia";
import { useTransparencia } from "../hooks/useTransparencia";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import {
  ButtonInfo,
  ButtonMandys,
  ButtonRomantic,
  ButtonSandy,
  ButtonPolar,
  ButtonFrench,
  ButtonMine,
} from "../styles/resources/stylesButton";
import {
  TitlePrimary,
  TitleSecondary,
  TitleInfo,
  TitleMine,
  TitleGray,
} from "../styles/resources/styleTitles";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "@react-navigation/native";
import { Colors } from "../theme/colors";

const { width } = Dimensions.get("window");

const getRandomColors = () => {
  const colorsList = [
    ["#06beb6", "#48b1bf"],
    //["#4568DC", "#4568DC"],
    //["#B06AB3", "#B06AB3"],
    // ["#42e695", "#3bb2b8", "#2b5876"],
    // ["#bdc3c7", "#2c3e50", "#4ca1af"],
  ];

  const randomIndex = Math.floor(Math.random() * colorsList.length);
  return colorsList[randomIndex];
};

export default function TransparenciaPagina() {
  const theme = useTheme();

  const {
    modalVisible,
    setModalVisible,
    handleModalObras,
    idObra,
    loading,
    setLoading,
  } = useTransparencia();
  const [colors, setColors] = useState(getRandomColors());

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getTransparencia();
    rangeYear();
  }, []);

  const [years, setYears] = useState([]);
  function rangeYear() {
    const max = new Date().getFullYear();
    const min = max - 10;

    for (let i = max; i >= min; i--) {
      years.push(i);
    }
    const yearsWithId = years.map((year, index) => {
      return { year: year, id: index + 1 };
    });

    setYears(yearsWithId);
  }

  const [cabeceras, setCabeceras] = useState([]);
  const [contenido, setContenido] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cardsShow, setCardsShow] = useState(false);

  const handlePress = (id) => {
    handleModalObras(id);
    //setIsExpanded(!isExpanded);
    //setIdSeleccionado(id === idSeleccionado ? null : id); // Alterna la selección
  };

  const getTransparencia = async () => {
    setLoading(true);
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
          setMensaje("Lo sentimos, no se han encontrado resultados");
          setCardsShow(false);
          //No se efectua nada por el momento
        } else {
          let _data = response.data.mensaje[0];
          //let _dataContent = response.data.mensaje;
          let _dataContent = response.data.mensaje.slice(1);
          //let _dataContent = response.data.mensaje.slice(1);
          let _dataContentWithId = _dataContent.map((item, index) => {
            return { ...item, id: index + 1 };
          });
          setCabeceras(_data);
          setContenido(_dataContentWithId);
          setCardsShow(true);
          setLoading(false);
        }
      } else if (
        response.data.mensaje === "Sin datos almacenados para mostrar."
      ) {
      } else {
        setLoading(false);
        alert("Ocurrió un error en el servidor");
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const getObrasYear = async (anio) => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const year = {
        anio: anio,
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
          setMensaje("No se han encontrado resultados");
          setContenido([""]);
          setCardsShow(false);
          //No se efectua nada por el momento
        } else {
          let _data = response.data.mensaje[0];
          //let _dataContent = response.data.mensaje;
          let _dataContent = response.data.mensaje.slice(1);
          //let _dataContent = response.data.mensaje.slice(1);
          let _dataContentWithId = _dataContent.map((item, index) => {
            return { ...item, id: index + 1 };
          });
          setCabeceras(_data);
          setContenido(_dataContentWithId);
          setMensaje("");
          setCardsShow(true);
        }
      } else if (
        response.data.mensaje === "Sin datos almacenados para mostrar."
      ) {
      } else {
        alert("Ocurrió un error en el servidor");
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
          <View style={styles.container}>
            <Svg
              height="150"
              width={width}
              viewBox="0 0 35.28 2.17"
              preserveAspectRatio="none"
              style={{ backgroundColor: "#f2f2f2" }}
            >
              <Path
                d="M0 .5c3.07.55 9.27-.42 16.14 0 6.88.4 13.75.57 19.14-.11V0H0z"
                fill={Colors.bandw.gray}
              />
              <Path
                d="M0 1c3.17.8 7.29-.38 10.04-.55 2.75-.17 9.25 1.47 12.67 1.3 3.43-.17 4.65-.84 7.05-.87 2.4-.02 5.52.88 5.52.88V0H0z"
                opacity="0.5"
                fill={Colors.bandw.gray}
              />
              <Path
                d="M0 1.85c2.56-.83 7.68-.3 11.79-.42 4.1-.12 6.86-.61 9.58-.28 2.73.33 5.61 1.17 8.61 1 3-.19 4.73-.82 5.3-.84V.1H0z"
                opacity="0.5"
                fill={Colors.bandw.gray}
              />
            </Svg>

            <View style={styles.header}>
              <TitlePrimary style={styles.title}>Transparencia</TitlePrimary>
              <Text style={styles.subtitle}>Obras</Text>
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Elige el año:</Text>
                  <Controller
                    control={control}
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={value}
                          //style={styles.picker}
                          style={[
                            styles.picker,
                            value !== "" && styles.selectedPicker,
                          ]}
                          onValueChange={(itemValue) => {
                            onChange(itemValue);
                            //setSelectedValue(itemValue);
                            getObrasYear(itemValue);
                          }}
                        >
                          <Picker.Item label="Selecciona una opción" value="" />
                          {years.map((item) => (
                            <Picker.Item
                              label={item.year}
                              value={item.year}
                              key={item.id}
                            />
                          ))}
                        </Picker>
                      </View>
                    )}
                    name="year"
                    defaultValue=""
                  />
                </View>
              </View>

              {mensaje != "" && (
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      fontSize: 17,
                      fontWeight: "600",
                      padding: 5,
                    }}
                  >
                    {mensaje}
                  </Text>
                  {/* <Image
                    source={require("../assets/no_found.png")}
                    style={styles.headerImg}
                  /> */}
                </View>
              )}

              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                cardsShow && (
                  <View>
                    {contenido.map((registro) => (
                      <ButtonMine
                        style={{
                          width: 350,
                          opacity: 1,
                          // height:
                          //   isExpanded && idSeleccionado === registro.id ? 500 : 70,
                          marginTop: 10,
                          padding: 10,
                          //backgroundColor: "#fda400",
                          borderRadius: 10,
                          position: "relative",
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 3,
                          },
                          shadowOpacity: 0.27,
                          shadowRadius: 4.65,

                          elevation: 6,
                        }}
                        key={registro.id}
                        onPress={() => handlePress(registro.id)}
                      >
                        <View
                        // style={{
                        //   width: 350,
                        //   // height:
                        //   //   isExpanded && idSeleccionado === registro.id ? 500 : 70,
                        //   marginTop: 10,
                        //   padding: 10,
                        //   //backgroundColor: "#fda400",
                        //   borderRadius: 10,
                        //   position: "relative",
                        // }}
                        //colors={getRandomColors()}
                        >
                          <Text
                            style={{
                              color: "white",
                              textAlign: "center",
                              alignItems: "center",
                              padding: 5,
                            }}
                          >
                            {registro[1]} {/* Mostrar título */}
                          </Text>
                          {idSeleccionado === registro.id && (
                            <View>
                              {cabeceras.map((cabecera, i) => (
                                <View key={i} style={styles.row}>
                                  <Text
                                    style={{
                                      color: "white",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {cabecera}:
                                  </Text>
                                  <Text style={{ color: "white" }}>
                                    {registro[i]}
                                  </Text>
                                </View>
                              ))}
                            </View>
                          )}
                        </View>
                      </ButtonMine>
                    ))}
                  </View>
                )
              )}
            </View>

            {modalVisible && (
              <ModalTransparencia
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                idObra={idObra}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    //paddingTop: 40,
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    height: 44,
    width: "115%",
    alignSelf: "center",
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  inputContainer: {
    alignSelf: "center",
    width: 300,
    alignItems: "center",
  },
  headerImg: {
    width: 150,
    height: 150,
    resizeMode: "center",
    alignSelf: "center",
  },
});
