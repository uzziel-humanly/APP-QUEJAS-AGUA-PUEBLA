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
import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

  //Se le bajo la calidad a la imagen para que la base 64 no pesara tanto
  const takePhoto = async (option) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        // allowsEditing: true,
        // aspect: [4, 3],
        // quality: 1,
        base64: true,
        mediaType: "photo",
        allowsEditing: true,
        //aspect:[4,3],
        quality: 0.1,
      });

      if (option == "PICINCIDENCIA") {
        let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        base64Image = base64Image.replace(/(?:\r\n|\r|\n)/g, "");
        setImage(result.assets.name);
        setValue("evidencia", base64Image);
      }

      // if (!result.cancelled) {
      // let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      //base64Image = base64Image.replace(/\s/g, '');
      // if (!result.cancelled) {
      //   setImage(result.uri);
      // }
    } catch (err) {
      //console.log("Error picking document: ", err);
      //alert("Ocurrió un error en el servidor");
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

  const [tipoReporte, setTipoReporte] = useState([]);
  const [incidenciaFiltrada, setIncidenciaFiltrada] = useState([]);

  const [colonias, setColonias] = useState([]);

  useEffect(() => {
    getTipoReporte();
    //getTipoIncidencia();
    getCatalogoColonias();
  }, []);

  const getTipoReporte = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTipoReporte`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.tipo;
        setTipoReporte(_data);
      } else {
        //console.error("Error en la respuesta de la API");
        alert("Ocurrió un error en el servidor");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const getTipoIncidencia = async (idTipo) => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTipoReporte`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.incidencia;
        //En esta parte filtramos por el idTipo que se haya seleccionado
        const incidenciaFiltrada = _data.filter(
          (incidencia) => incidencia.id_tipo === idTipo
        );
        //Lo asiganamos al arreglo de incidencias con los nuevos campos filtrados
        setIncidenciaFiltrada(incidenciaFiltrada);
      } else {
        alert("Ocurrió un error en la petición");
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

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
      } else {
        alert("Ocurrió un error en el servidor");
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const [selectedDocument, setSelectedDocument] = useState("");

  // const handleDocumentPicker = async (setValue, option) => {
  //   try {
  //     let result = await DocumentPicker.getDocumentAsync({});
  //     if (result.assets.length == 1) {
  //       if (option == "evidencia") {
  //         setSelectedDocument(result.assets.name);
  //         setValue("evidencia", result);
  //       }
  //     }
  //   } catch (err) {
  //     //console.log("Error picking document: ", err);
  //   }
  // };
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const handleDocumentPicker = async (setValue, option) => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Necesitamos permisos para acceder a tu multimedia");
      return;
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        // allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // aspect: [4, 3],
        // quality: 1,
        base64: true,
        mediaType: "photo",
        allowsEditing: true,
        //aspect:[4,3],
        quality: 0.1,
      });

      if (option == "evidencia") {
        let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        base64Image = base64Image.replace(/(?:\r\n|\r|\n)/g, "");
        setImage(result.assets.name);
        setValue("evidencia", base64Image);
      }
    } catch (err) {
      //console.log("Error picking document: ", err);
      //alert("Ocurrió un error en el servidor");
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
                <Text style={styles.inputLabel}>Tipo de reporte:</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
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
                          setSelectedValue(itemValue);
                          getTipoIncidencia(itemValue);
                        }}
                      >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {tipoReporte.map((item) => (
                          <Picker.Item
                            label={item.tipo.toUpperCase()}
                            value={item.id}
                            key={item.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  name="id_tipo"
                  defaultValue=""
                />
                {errors.id_tipo && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tipo de incidencia:</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
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
                          setSelectedValue(itemValue);
                        }}
                      >
                        <Picker.Item label="Selecciona una opción" value="" />
                        {incidenciaFiltrada.map((item) => (
                          <Picker.Item
                            label={item.incidencia.toUpperCase()}
                            value={item.id}
                            key={item.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  name="id_incidencia"
                  defaultValue=""
                />
                {errors.id_incidencia && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )}
              </View>

              <Text style={styles.inputLabel}>Fotografia de incidencia:</Text>
              <View style={styles.btnFotos}>
                <Controller
                  control={control}
                  name="evidencia"
                  //rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        //onPress={takePhoto}
                        onPress={() => takePhoto("PICINCIDENCIA")}
                      >
                        <AntDesign name="camera" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Toma una foto</Text>
                      </TouchableOpacity>
                      {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )}
                    </View>
                  )}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDocumentPicker(setValue, "evidencia")}
                >
                  <MaterialCommunityIcons
                    name="file-image-outline"
                    size={24}
                    color="#FFFFFF"
                  />
                  <Text style={styles.buttonText}>Adjunta imagen</Text>
                </TouchableOpacity>
              </View>
              {/* {errors.evidencia && (
                <Text style={styles.error}>La fotografia es obligatoria.</Text>
              )} */}

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
                {errors.calle && (
                  <Text style={styles.error}>{errors.calle.message}</Text>
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
                  name="num_ext"
                  defaultValue=""
                />
                {errors.num_ext && (
                  <Text style={styles.error}>{errors.num_ext.message}</Text>
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
                  name="num_int"
                  defaultValue=""
                />
                {errors.num_int && (
                  <Text style={styles.error}>{errors.num_int.message}</Text>
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
                        {colonias.map((item) => (
                          <Picker.Item
                            label={item.nombre}
                            value={item.id}
                            key={item.id}
                          />
                        ))}
                      </Picker>
                    </View>
                  )}
                  name="id_colonia"
                  defaultValue=""
                />
                {errors.id_colonia && (
                  <Text style={styles.error}>La colonia es obligatoria</Text>
                )}
              </View>
            </View>
          )}
          {showElement && Object.keys(errors).length === 0 && (
            <View style={styles.formAction}>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit(handleRegisterReport)}
              >
                <Text style={styles.btnTxt}>Registrar</Text>
              </TouchableOpacity>
            </View>
          )}

          {showElement && Object.keys(errors).length != 0 && (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                width: 320,
                borderRadius: 10,
                backgroundColor: "#feba29",
              }}
            >
              <Feather
                style={{
                  marginRight: 5,
                  marginTop: 5,
                }}
                name="alert-triangle"
                size={24}
                color="white"
              />
              <Text
                style={{
                  fontWeight: "600",
                  color: "white",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                Hay campos requeridos que necesitan ser completados. ¡Verifica!
              </Text>
            </View>
          )}
          <View style={styles.ribbonEnd}></View>
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
    width: "100%",
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
    ///textAlignVertical: "top",
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
    width: 150,
    height: 45,
    flexDirection: "row",
    backgroundColor: "#00bf63",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 4,
  },
  buttonText: {
    color: "#FFFFFF",

    //marginLeft: 10,
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
    borderColor: "white",
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
  btnFotos: {
    flexDirection: "row",
  },

  // selectedPicker: {
  //   color: 'green'
  // },
});
