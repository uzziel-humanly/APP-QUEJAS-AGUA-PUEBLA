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
  FlatList,
  ActivityIndicator,
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
import { Title1, ButtonP } from "../../styles/index/stylesHome";
import {
  ButtonPrimary,
  ButtonSecondary,
  TextNeutral,
  Header,
  ButtonInfo,
  ButtonDisabled,
  ButtonStatusAlta,
  ButtonSandy,
  selectedColonia,
  setSelectedColonia,
} from "../../styles/resources/stylesButton";
import { StatusBar } from "expo-status-bar";
import ModalReports from "./modalColonias";
import ModalColonias from "./modalColonias";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import MultiSelect from "react-native-multiple-select";
import { Colors } from "../../theme/colors";

export default function FormReports() {
  const {
    handleRegisterReport,
    loading,
    modalVisibleC,
    setModalVisibleC,
    handleModalColonia,
    selectedColonia,
    setSelectedColonia,
  } = useReports();

  const [disabledButtons, setDisabledButtons] = useState({
    PICINCIDENCIA: false,
    evidencia: false,
  });
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
      setDisabledButtons(false);
      setShowElement(false);
      setSelectedColonia("");
      setDisabledButtons((prev) => ({ ...prev, ["evidencia"]: false }));
      setDisabledButtons((prev) => ({ ...prev, ["PICINCIDENCIA"]: false }));
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
        quality: 0.8,
      });

      if (option == "PICINCIDENCIA") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        base64Image = base64Image.replace(/(?:\r\n|\r|\n)/g, "");
        setImage(result.assets.name);
        setValue("evidencia", base64Image);
        setDisabledButtons((prev) => ({ ...prev, ["evidencia"]: false }));
      }

      // if (!result.cancelled) {
      // let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
      //base64Image = base64Image.replace(/\s/g, '');
      // if (!result.cancelled) {
      //   setImage(result.uri);
      // }
    } catch (err) {
      //setDisabledButtons((prev) => ({ ...prev, [option]: false }));
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
  const [colony, setColony] = useState([]);

  useEffect(() => {
    getTipoReporte();
    getColony();
    //getTipoIncidencia();
    //getCatalogoColonias();
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

  // const [searchTerm, setSearchTerm] = useState("");
  // const [filteredColonias, setFilteredColonias] = useState(colonias);
  // const [selectedColonia, setSelectedColonia] = useState("");

  // const handleSearch = (text) => {
  //   setSearchTerm(text);
  //   if (text === "") {
  //     setFilteredColonias(colonias);
  //   } else {
  //     const filtered = colonias.filter((colonia) =>
  //       colonia.nombre.toLowerCase().includes(text.toLowerCase())
  //     );
  //     setFilteredColonias(filtered);
  //   }
  // };

  // const getCatalogoColonias = async () => {
  //   try {
  //     let pass = md5(API_TOKEN);
  //     let credentials = `${API_AUTH}:${pass}`;
  //     let encodedCredentials = btoa(credentials);
  //     let auth = "Basic " + encodedCredentials;

  //     let response = await axios({
  //       method: "post",
  //       url: `${API_URL}/api/getColonias`,
  //       headers: { Authorization: auth, "Content-Type": "application/json" },
  //     });

  //     if (response.data.estatus === "ok") {
  //       let _data = response.data.mensaje;
  //       setColonias(_data);
  //     } else {
  //       alert("Ocurrió un error en el servidor");
  //       //console.error("Error en la respuesta de la API");
  //     }
  //   } catch (error) {
  //     //console.error(error);
  //     alert("Ocurrió un error en el servidor");
  //   }
  // };

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
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        let base64Image = `data:image/jpeg;base64,${result.assets[0].base64}`;
        base64Image = base64Image.replace(/(?:\r\n|\r|\n)/g, "");
        setImage(result.assets.name);
        setValue("evidencia", base64Image);
        setDisabledButtons((prev) => ({ ...prev, ["PICINCIDENCIA"]: false }));
      }
    } catch (err) {
      //setDisabledButtons((prev) => ({ ...prev, [option]: false }));
      //console.log("Error picking document: ", err);
      //alert("Ocurrió un error en el servidor");
    }
  };

  const getColony = async () => {
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
        let _colony = [];

        if (_data.length > 0) {
          _data.map((_c, _i) => {
            _colony.push({
              id: _c.id,
              name: _c.nombre,
            });
          });
        }
        setColony(_colony);
      } else {
        alert("Ocurrió un error en el servidor");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const handleSelectColonia = async (setValue, id_colonia) => {
    setValue("id_colonia", id_colonia);
  };

  const [filteredColonies, setFilteredColonies] = useState(colony);

  useEffect(() => {
    setFilteredColonies(colony.slice(0, 5));
  }, [colony]);

  const handleSearch = (text) => {
  
    const filteredData = colony.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    if (filteredData.length === 0) {
      setFilteredColonies([{ id: "0", name: "No se encontró la colonia" }]);
    } else {
      setFilteredColonies(filteredData);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Title1>Formulario de Reporte</Title1>
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
              <ButtonP onPress={() => cleanForm()}>
                <Text style={styles.btnTxt}>Generar</Text>
              </ButtonP>
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
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Fotografia de incidencia:</Text>
                <View style={styles.btnFotos}>
                  <Controller
                    control={control}
                    name="evidencia"
                    //rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View>
                        <ButtonInfo
                          //style={styles.button}
                          style={[
                            styles.button,
                            disabledButtons.PICINCIDENCIA &&
                              styles.buttonDisabled,
                          ]}
                          //onPress={takePhoto}
                          onPress={() => takePhoto("PICINCIDENCIA")}
                        >
                          <AntDesign name="camera" size={24} color="#FFFFFF" />
                          <Text style={styles.buttonText}>Toma una foto</Text>
                        </ButtonInfo>
                        {value && (
                          <Text style={styles.selectedText}>{value.name}</Text>
                        )}
                      </View>
                    )}
                  />
                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.evidencia && styles.buttonDisabled,
                    ]}
                    //style={styles.button}
                    onPress={() => handleDocumentPicker(setValue, "evidencia")}
                  >
                    <MaterialCommunityIcons
                      name="file-image-outline"
                      size={24}
                      color="#FFFFFF"
                    />
                    <Text style={styles.buttonText}>Adjunta imagen</Text>
                  </ButtonInfo>
                </View>
              </View>
              {/* {errors.evidencia && (
                <Text style={styles.error}>La fotografia es obligatoria.</Text>
              )} */}

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ubicación:</Text>

                <Text
                  style={{
                    textAlign: "justify",
                    marginBottom: 10,
                    fontWeight: "500",
                    marginTop: 10,
                  }}
                >
                  Para poder registrar una incidencia y garantizar un
                  seguimiento preciso de su solicitud, es necesario que active
                  las coordenadas de su dispositivo. Las coordenadas se
                  capturarán en tiempo real, por lo que le pedimos que se
                  asegure de estar en el lugar exacto de la incidencia al
                  momento de realizar el registro.
                </Text>

                <Controller
                  control={control}
                  rules={{ required: "Debe agregar la ubicación" }}
                  render={({ field: { onChange, value } }) => (
                    <Switch
                      trackColor={{
                        false: Colors.minimalist.alto,
                        true: Colors.pastel.french,
                      }}
                      //trackColor={{ true: Colors.pastel.french }}
                      thumbColor={
                        onChange ? Colors.pastel.french : Colors.pastel.french
                      }
                      ios_backgroundColor={Colors.pastel.french}
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
                <Text style={styles.inputLabel}>
                  Descripción del incidente:
                </Text>
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
                <Text style={styles.inputLabel}>Calle:</Text>
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
                <Text style={styles.inputLabel}>Entre calle 1:</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Entre calle es obligatoria",
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
                  name="entrecalle_1"
                  defaultValue=""
                />
                {errors.entrecalle_1 && (
                  <Text style={styles.error}>
                    {errors.entrecalle_1.message}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Entre calle 2:</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "Entre calle es obligatoria",
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
                  name="entrecalle_2"
                  defaultValue=""
                />
                {errors.entrecalle_2 && (
                  <Text style={styles.error}>
                    {errors.entrecalle_2.message}
                  </Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número exterior:</Text>
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
                <Text style={styles.inputLabel}>Número interior:</Text>
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
              {/* <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>
                  Selecciona o busca tu colonia:
                </Text>
                <ButtonPrimary
                  style={styles.btn}
                  onPress={() => handleModalColonia()}
                >
                  <Text style={styles.btnTxt}>
                    <FontAwesome6 name="tree-city" size={24} color="white" />{" "}
                    Colonias
                  </Text>
                </ButtonPrimary>
                {selectedColonia ? (
                  <Text style={styles.selectedColonia}>
                    Colonia seleccionada: {selectedColonia}
                  </Text>
                ) : null}
                <View style={styles.formAction}>
                  {modalVisibleC && (
                    <ModalColonias
                      modalVisibleC={modalVisibleC}
                      setModalVisibleC={setModalVisibleC}
                      handleSelectColonia={handleSelectColonia}
                      setValue={setValue}
                      setSelectedColonia={setSelectedColonia}
                    />
                  )}
                </View>
              </View> */}

              {/* <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Colonia:</Text>
                <Controller
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <>
                      <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar colonia"
                        value={searchTerm}
                        onChangeText={handleSearch}
                      />
                      <FlatList
                        data={filteredColonias}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.coloniaItem}
                            onPress={() => {
                              onChange(item.id);
                              setSelectedColonia(item.nombre);
                              setSearchTerm("");
                              setFilteredColonias(colonias);
                            }}
                          >
                            <Text>{item.nombre}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    </>
                  )}
                  name="id_colonia"
                  defaultValue=""
                />
                {errors.id_colonia && (
                  <Text style={styles.error}>La colonia es obligatoria</Text>
                )}
                {selectedColonia ? (
                  <Text style={styles.selectedColonia}>
                    Colonia seleccionada: {selectedColonia}
                  </Text>
                ) : null}
              </View> */}

              {/* <View style={styles.inputContainer}>
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
              </View> */}
            </View>
          )}

          {showElement && (
            <View>
              <Text
                style={{
                  width: "100%",
                  fontSize: 17,
                  fontWeight: "600",
                  color: "#222",
                  marginLeft: 25,
                }}
              >
                Colonia
              </Text>
              <View style={{ width: 350 }}>
                <Controller
                  control={control}
                  name="colonia"
                  rules={{ required: "Debes seleccionar la colonia." }}
                  render={({ field: { onChange, value } }) => (
                    <ScrollView>
                    <MultiSelect
                      items={filteredColonies}
                      uniqueKey="id"
                      ref={(component) => {
                        this.multiSelect = component;
                      }}
                      onSelectedItemsChange={(selectedItems) => {
                        if (selectedItems.length > 1) {
                          selectedItems = [
                            selectedItems[selectedItems.length - 1],
                          ];
                        }
                        onChange(selectedItems);
                      }}
                      selectedItems={value}
                      single
                      selectText="Selecciona tu colonia"
                      searchInputPlaceholderText="Busca tu colonia..."
                      onChangeInput={handleSearch}
                      altFontFamily="ProximaNova-Light"
                      tagRemoveIconColor="#fff"
                      tagBorderColor="#000"
                      tagContainerStyle={{ backgroundColor: "#000" }}
                      tagTextColor="#fff"
                      selectedItemTextColor="#CCC"
                      selectedItemIconColor="#CCC"
                      itemTextColor="#000"
                      displayKey="name"
                      searchInputStyle={{ color: "#CCC" }}
                      submitButtonColor="#000"
                      submitButtonText="Seleccionar colonia"
                      styleDropdownMenuSubsection={{
                        borderRadius: 10,
                        height: 50,
                        width: "150%",
                        alignContent: "flex-start",
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginTop: 11,
                      }}
                    />
                    </ScrollView>
                  )}
                />
                {errors.colonia && (
                  <Text style={[styles.error,{ paddingLeft: 26}]}>{errors.colonia.message}</Text>
                )}
              </View>
            </View>
          )}

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            !loading &&
            showElement &&
            Object.keys(errors).length === 0 && (
              <View>
                <ButtonPrimary
                  style={styles.btn}
                  onPress={handleSubmit(handleRegisterReport)}
                >
                  <Text style={styles.btnTxt}>Registrar</Text>
                </ButtonPrimary>
              </View>
            )
          )}

          {showElement && Object.keys(errors).length != 0 && (
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                width: 320,
                borderRadius: 10,
                backgroundColor: "#feba29",
                marginTop: 20,
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
    width: "100%",
  },
  inputContainer: {
    width: 300,
    alignItems: "center",
    marginTop: 20,
  },
  inputLabel: {
    width: "100%",
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
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
    //backgroundColor: "#00bf63",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginRight: 4,
  },
  buttonText: {
    color: "#FFFFFF",

    //marginLeft: 10,
  },
  btn: {
    //backgroundColor: "#000",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 50,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 120,
    height: 45,
    alignSelf: "center",
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
  },
  picker: {
    height: 50,
    width: "100%",
  },
  btnFotos: {
    flexDirection: "row",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },

  // selectedPicker: {
  //   color: 'green'
  // },
});
