import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useReports } from "../../hooks/Reports/useReports";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";

export default function FormReports() {
  const { handleRegisterReport } = useReports();
  //Formulario
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [showElement, setShowElement] = useState(false);

  const cleanForm = async () => {
    reset();
    setShowElement(true);
  };

  useFocusEffect(
    useCallback(() => {
      setShowElement(false);
    }, [])
  );

  const [image, setImage] = useState(null);

  const takePhoto = async (option) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result.assets.base64);

    if (option == "PICINCIDENCIA") {
      setImage(result.assets.name);
      setValue("evidencia", "BASE 64");
    }
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  //const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValueCol, setSelectedValueCol] = useState("");

  const getLocation = async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      //console.log(location);
      //Aqui agrego la longitud y latitud a la data
      setValue("latitud", location.coords.latitude);
      setValue("longitud", location.coords.longitude);
    })();
  };

  const [tipoArchivos, setTipoArchivos] = useState([]);

  useEffect(() => {
    getTipoArchivos();
  }, []);

  const getTipoArchivos = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;
      console.log(auth);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTipoArchivos`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        //console.log("si entre");
        let _data = response.data.mensaje;
        setTipoArchivos(_data);
        //console.log(tipoArchivos);
      } else {
        console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Formulario de Reporte</Text>
          <View style={styles.line} />
          <Image
            source={require("../../assets/report3d.png")}
            style={styles.headerImg}
          />
          <Text style={styles.subtitle}>
            A continuación ingrese cada uno de los datos solicitados sin omitir
            campos para generar tu reporte.
          </Text>
          {!showElement && (
            <View style={styles.formAction}>
              <TouchableOpacity style={styles.btn} onPress={() => cleanForm()}>
                <Text style={styles.btnTxt}>Generar</Text>
              </TouchableOpacity>
            </View>
          )}
          {showElement && (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tipo de incidencia:</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setSelectedValue(itemValue);
                        }}
                      >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {tipoArchivos.map((item) => (
                          <Picker.Item
                            label={item.tipo}
                            value={item.id}
                            key={item.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  name="select"
                  defaultValue=""
                />
                {errors.select && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )}
              </View>

              <Text style={styles.inputLabel}>Fotografia de incidencia:</Text>
              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("PICINCIDENCIA")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Toma una foto</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  ¿Se encuentra en la ubicación del incidente?
                </Text>
                <Controller
                  control={control}
                  //rules={{required: "Debe aceptar el contrato de adhesión",}}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      onChange={getLocation}
                    />
                  )}
                  name="acceptContract"
                  defaultValue={false}
                />
                {errors.acceptContract && (
                  <Text style={styles.error}>
                    {errors.acceptContract.message}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Descripción del incidente</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "La descripción es obligatoria",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      //style={styles.inputControlIncident}
                      style={styles.multiline}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      multiline={true}
                      rows={3}
                      //placeholder="Descripcion del incidente"
                    />
                  )}
                  name="descripcion"
                  defaultValue=""
                />
                {errors.descripcion && (
                  <Text style={styles.error}>{errors.descripcion.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Calle</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "La calle es obligatoria",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Calle"
                    />
                  )}
                  name="calle"
                  defaultValue=""
                />
                {errors.descripcion && (
                  <Text style={styles.error}>{errors.descripcion.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número exterior</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El número exterior es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="#No. exterior"
                    />
                  )}
                  name="noExterior"
                  defaultValue=""
                />
                {errors.noExterior && (
                  <Text style={styles.error}>{errors.noExterior.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número interior</Text>
                <Controller
                  control={control}
                  // rules={{
                  //   required: "El número exterior es obligatorio",
                  // }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="#No. interior (Opcional)"
                    />
                  )}
                  name="noInterior"
                  defaultValue=""
                />
                {errors.noInterior && (
                  <Text style={styles.error}>{errors.noInterior.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Colonia:</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.pickerContainer}>
                      <Picker
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setSelectedValueCol(itemValue);
                        }}
                      >
                        <Picker.Item label="Selecciona tu colonia" value="" />
                        {tipoArchivos.map((item) => (
                          <Picker.Item
                            label={item.tipo}
                            value={item.id}
                            key={item.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  name="colonia"
                  defaultValue=""
                />
                {errors.colonia && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )}
              </View>
            </View>
          )}
          {showElement && (
            <View style={styles.formAction}>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit(handleRegisterReport)}
              >
                <Text style={styles.btnTxt}>Registrar</Text>
              </TouchableOpacity>
            </View>
          )}
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontWeight: "700",
    fontSize: 27,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 24
  },
  line: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  headerImg: {
    width: 250,
    height: 200,
    resizeMode: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  form: {
    flex: 1,
    marginBottom: 24,
    width: "80%",
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  inputControl: {
    width: "115%",
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "500",
    color: "#222",
    marginBottom: 16,
  },
  inputControlIncident: {
    width: "100%",
    backgroundColor: "#fff",
    height: 100, // Altura fija para evitar expansión
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "500",
    color: "#222",
    textAlignVertical: "top", // Para asegurar que el texto empieza desde arriba en Android
  },
  multiline: {
    width: 350,
    borderWidth: 0.5,
    height: 150, // Altura fija para evitar expansión
    backgroundColor: "#fff",
    marginBottom: 10,
    marginVertical: "1rem",
    color: "#222",
    borderRadius: 12,
    fontWeight: "500",
    ///textAlignVertical: "top", // Para asegurar que el texto empieza desde arriba en Android
    borderColor: "#fff",
  },
  error: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
  },
  formAction: {
    marginVertical: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00bf63",
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    backgroundColor: "#000",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
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
});
