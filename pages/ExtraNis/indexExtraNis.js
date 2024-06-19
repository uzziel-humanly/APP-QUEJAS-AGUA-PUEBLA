import { React, useEffect } from "react";
import {
  Linking,
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Switch,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useExtraNis } from "../../hooks/ExtraNis/useExtraNis";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState, useCallback } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { WebView } from "react-native-webview";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import ModalDocuments from "./modalDocuments";
import styled from "styled-components/native";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { useFocusEffect } from "@react-navigation/native";
import {
  ButtonPrimary,
  ButtonSecondary,
  TextNeutral,
  Header,
  ButtonInfo,
  ButtonDisabled,
  ButtonStatusAlta,
} from "../../styles/resources/stylesButton";
import {
  TitlePrimary,
  TitleSecondary,
  TitleInfo,
  TitleMine,
  TitleGray,
} from "../../styles/resources/styleTitles";
import { Colors } from "../../theme/colors";
import { StatusBar } from "expo-status-bar";
import { Title1, ButtonP } from "../../styles/index/stylesHome";

export default function ExtraNis() {
  const [tipoCuenta, setTipoCuenta] = useState([]);

  const getTipoCuenta = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTipoCuenta`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        setTipoCuenta(_data);
      } else {
        //console.error("Error en la respuesta de la API");
        alert("Ocurrió un error al obtener los datos");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const handleOpenPdf = async () => {
    try {
      // Cargar el archivo PDF desde assets
      const asset = Asset.fromModule(require("../../assets/ccaunidad1.pdf"));
      await asset.downloadAsync();
      // Obtener la URI del archivo descargado
      const fileUri = `${FileSystem.documentDirectory}doc.pdf`;

      //console.log(fileUri);
      // Copiar el archivo a un directorio accesible
      await FileSystem.copyAsync({
        from: asset.localUri,
        to: fileUri,
      });

      // Verificar si el dispositivo tiene una aplicación para abrir PDFs
      const supported = await Linking.canOpenURL(pdfUri);

      if (supported) {
        // Abrir la URL del PDF en una aplicación de visor de PDF
        await Linking.openURL(fileUri);
      } else {
        alert(`No se puede abrir el PDF: ${pdfUri}`);
      }

      setPdfUri(fileUri);
    } catch (error) {
      //console.error("Error loading PDF:", error);
    } finally {
    }
  };
  //Boton para guardar el formulario
  const {
    onSubmit,
    modalVisible,
    setModalVisible,
    handleModalDocuments,
    loading,
    setLoading,
    tipoContrato,
    setTipoContrato,
    showElement,
    setShowElement,
  } = useExtraNis();

  const [disabledButtons, setDisabledButtons] = useState({
    SELFIE: false,
    PICINEFRONTAL: false,
    PICINETRASERO: false,
    PICRECIBO: false,
    PICCDOM: false,
    RECIBOPDF: false,
    CDOMIPDF: false,
    BOLETA: false,
    PICBOLETA: false,
  });
  //Formulario
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  //Select normal

  useFocusEffect(
    useCallback(() => {
      setShowElement(false);
    }, [])
  );

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");
  const [boleta, setBoleta] = useState(false);
  const [boletaSt, setBoletaSt] = useState(false);

  setValue("document", "NADA");

  const handleDocumentPicker = async (setValue, option) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
      });
      if (result.assets.length == 1) {
        if (option == "RECIBOPDF") {
          setDisabledButtons((prev) => ({ ...prev, [option]: true }));
          setSelectedDocument(result.assets);
          setValue("Archivo4", result);
          setValue("banD4", "2");
          setDisabledButtons((prev) => ({ ...prev, ["PICRECIBO"]: false }));
        } else if (option == "CDOMIPDF") {
          setDisabledButtons((prev) => ({ ...prev, [option]: true }));
          setSelectedDocument(result.assets);
          setValue("Archivo5", result);
          setValue("banD5", "2");
          setDisabledButtons((prev) => ({ ...prev, ["PICCDOM"]: false }));
        } else if (option == "BOLETA") {
          setDisabledButtons((prev) => ({ ...prev, [option]: true }));
          setSelectedDocument(result.assets);
          setValue("Archivo6", result);
          setValue("banD6", "2");
          setBoletaSt(false);
          setDisabledButtons((prev) => ({ ...prev, ["PICBOLETA"]: false }));
        }
      }
    } catch (err) {
      //console.log("Error picking document: ", err);
    }
  };

  const [image, setImage] = useState(null);

  const takePhoto = async (option) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaType: "photo",
        allowsEditing: true,
        quality: 0.5,
      });

      if (option == "PICINEFRONTAL") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo2", result.assets);
      } else if (option == "PICINETRASERO") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo3", result.assets);
      } else if (option == "PICRECIBO") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo4", result.assets);
        setValue("banF4", "1");
        setDisabledButtons((prev) => ({ ...prev, ["RECIBOPDF"]: false }));
      } else if (option == "PICCDOM") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo5", result.assets);
        setValue("banF5", "1");
        setDisabledButtons((prev) => ({ ...prev, ["CDOMIPDF"]: false }));
      } else if (option == "SELFIE") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo1", result.assets);
      } else if (option == "PICBOLETA") {
        setDisabledButtons((prev) => ({ ...prev, [option]: true }));
        setImage(result.assets.name);
        setValue("Archivo6", result.assets);
        setValue("banF6", "1");
        setDisabledButtons((prev) => ({ ...prev, ["BOLETA"]: false }));
        setBoletaSt(false);
      }

      if (!result.canceled) {
        setImage(result.uri);
      }
    } catch (err) {
      //console.log("Error picking document: ", err);
    }
  };

  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos permisos para acceder a la camara.
        </Text>
        <Button onPress={requestPermission} title="Aceptar Permisos" />
      </View>
    );
  }

  const validaSelector = async (value) => {
    if (value == 1) {
      setBoleta(true);
      setBoletaSt(true);
    } else {
      setBoleta(false);
      setBoletaSt(false);
    }
  };

  const cleanForm = async () => {
    reset();
    setShowElement(true);
    setDisabledButtons((prev) => ({ ...prev, ["SELFIE"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["PICINEFRONTAL"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["PICINETRASERO"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["PICRECIBO"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["PICCDOM"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["RECIBOPDF"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["CDOMIPDF"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["BOLETA"]: false }));
    setDisabledButtons((prev) => ({ ...prev, ["PICBOLETA"]: false }));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="auto" />
        <View style={styles.safeArea}>
          <View style={styles.container}>
            <Image
              source={require("../../assets/correct.png")}
              style={styles.headerImg}
            />
            <View style={styles.header}>
              <TitlePrimary style={styles.title}>
                Registra un NIS Extra
              </TitlePrimary>

              <TitleSecondary style={styles.subtitle}>
                Para dar de alta un NIS adicional deberas complentar todos los
                campos solicitados.
              </TitleSecondary>
            </View>
            {!showElement && (
              <View style={styles.formAction}>
                <ButtonP onPress={() => cleanForm()}>
                  <Text style={styles.btnTxt}>Registrar</Text>
                </ButtonP>
              </View>
            )}
            {showElement && (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>NIS adicional</Text>
                  <Controller
                    control={control}
                    rules={{
                      required: "El número de cuenta es obligatorio",
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.inputControl}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        keyboardType="numeric"
                        placeholder="NIS"
                      />
                    )}
                    name="nis"
                    defaultValue=""
                  />
                  {errors.nis && (
                    <Text style={styles.error}>{errors.nis.message}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Tipo de cuenta:</Text>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <View style={styles.pickerContainer}>
                        <Picker
                          onPress={getTipoCuenta()}
                          selectedValue={value}
                          style={styles.picker}
                          onValueChange={(itemValue) => {
                            onChange(itemValue);
                            setSelectedValue(itemValue);
                            validaSelector(itemValue);
                          }}
                        >
                          <Picker.Item label="Selecciona una opción" value="" />

                          {tipoCuenta.map((item) => (
                            <Picker.Item
                              label={item.tipo.toUpperCase()}
                              value={item.id}
                              key={item.id}
                            />
                          ))}
                        </Picker>
                      </View>
                    )}
                    name="id_tipo_cuenta"
                    defaultValue=""
                  />
                  {errors.id_tipo_cuenta && (
                    <Text style={styles.error}>Este campo es obligatorio.</Text>
                  )}
                </View>

                <Text style={{ textAlign: "justify", marginBottom: 20 }}>
                  Nota: en caso de recibo de agua y comprobante domiciliario
                  solo debe elegir una opción (Adjuntar PDF o tomar fotografia)
                </Text>

                <Text style={styles.inputLabel}>INE (Por ambos lados):</Text>
                <View style={styles.containerBtn}>
                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.PICINEFRONTAL && styles.buttonDisabled,
                    ]}
                    //onPress={takePhoto}
                    onPress={() => takePhoto("PICINEFRONTAL")}
                  >
                    <AntDesign name="camera" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Foto frontal</Text>
                  </ButtonInfo>
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}

                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.PICINETRASERO && styles.buttonDisabled,
                    ]}
                    //onPress={takePhoto}
                    onPress={() => takePhoto("PICINETRASERO")}
                  >
                    <AntDesign name="camera" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Foto trasera</Text>
                  </ButtonInfo>
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}
                </View>

                <Text style={styles.inputLabel}>
                  Ultimo recibo Agua de Puebla:
                </Text>
                <View style={styles.containerBtn}>
                  {/* <Controller
                  control={control}
                  name="document"
                  //rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View> */}
                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.RECIBOPDF && styles.buttonDisabled,
                    ]}
                    onPress={() => handleDocumentPicker(setValue, "RECIBOPDF")}
                  >
                    <FontAwesome name="file-pdf-o" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Adjunta un pdf</Text>
                  </ButtonInfo>
                  {/* {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )}
                    </View>
                  )}
                />
                {errors.document && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )} */}

                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.PICRECIBO && styles.buttonDisabled,
                    ]}
                    //onPress={takePhoto}
                    onPress={() => takePhoto("PICRECIBO")}
                  >
                    <AntDesign name="camera" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Toma una foto</Text>
                  </ButtonInfo>
                  {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                  )}
                </View>

                <Text style={styles.inputLabel}>
                  Comprobante de domicilio (No mayor a 3 meses):
                </Text>
                <View style={styles.containerBtn}>
                  {/* <Controller
                  control={control}
                  name="Archivo5"
                  //rules={{ required: true }}
                  render={({ field: { onChange, value } }) => ( */}
                  <View>
                    <ButtonInfo
                      style={[
                        styles.button,
                        disabledButtons.CDOMIPDF && styles.buttonDisabled,
                      ]}
                      onPress={() => handleDocumentPicker(setValue, "CDOMIPDF")}
                    >
                      <FontAwesome
                        name="file-pdf-o"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.buttonText}>Adjunta un pdf</Text>
                    </ButtonInfo>
                    {/* {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )} */}
                  </View>
                  {/* )}
                /> */}

                  <ButtonInfo
                    style={[
                      styles.button,
                      disabledButtons.PICCDOM && styles.buttonDisabled,
                    ]}
                    //onPress={takePhoto}
                    onPress={() => takePhoto("PICCDOM")}
                  >
                    <AntDesign name="camera" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Toma una foto</Text>
                  </ButtonInfo>
                </View>

                {errors.Archivo5 && (
                  <Text style={styles.error}>
                    El comprobante de domicilio es requerido.
                  </Text>
                )}

                {boleta && (
                  <View style={{ marginBottom: 10 }}>
                    {/* <Text style={styles.inputLabel}>Boleta Predial:</Text>
                  <ButtonInfo
                    //disabled={disabledButtons.SELFIE}
                    style={[
                      styles.button,
                      disabledButtons.BOLETA && styles.buttonDisabled,
                    ]}
                    //onPress={takePhoto}
                    onPress={() => handleDocumentPicker(setValue, "BOLETA")}
                  >
                    <FontAwesome name="file-pdf-o" size={24} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Adjunta un pdf</Text>
                  </ButtonInfo>
                  {boletaSt && (
                    <Text style={styles.error}>
                      Debes adjuntar tu documento de predial
                    </Text>
                  )} */}
                    <Text style={styles.inputLabel}>Predial:</Text>
                    <View style={styles.containerBtn}>
                      {/* <Controller
                  control={control}
                  name="Archivo5"
                  //rules={{ required: true }}
                  render={({ field: { onChange, value } }) => ( */}
                      <View>
                        <ButtonInfo
                          style={[
                            styles.button,
                            disabledButtons.BOLETA && styles.buttonDisabled,
                          ]}
                          onPress={() =>
                            handleDocumentPicker(setValue, "BOLETA")
                          }
                        >
                          <FontAwesome
                            name="file-pdf-o"
                            size={24}
                            color="#FFFFFF"
                          />
                          <Text style={styles.buttonText}>Adjunta un pdf</Text>
                        </ButtonInfo>
                        {/* {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )} */}
                      </View>
                      {/* )}
                /> */}

                      <ButtonInfo
                        style={[
                          styles.button,
                          disabledButtons.PICBOLETA && styles.buttonDisabled,
                        ]}
                        //onPress={takePhoto}
                        onPress={() => takePhoto("PICBOLETA")}
                      >
                        <AntDesign name="camera" size={24} color="#FFFFFF" />
                        <Text style={styles.buttonText}>Toma una foto</Text>
                      </ButtonInfo>
                    </View>
                  </View>
                )}

                <Text style={styles.inputLabel}>Fotografia (Selfie):</Text>
                <ButtonInfo
                  //disabled={disabledButtons.SELFIE}
                  style={[
                    styles.button,
                    disabledButtons.SELFIE && styles.buttonDisabled,
                  ]}
                  //onPress={takePhoto}
                  onPress={() => takePhoto("SELFIE")}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Toma una foto</Text>
                </ButtonInfo>

                <View style={styles.line} />
                {/* ESTA ES LA PARTE DE TERMINOS Y CONDICIONES */}
                <Text style={styles.inputLabelC}>
                  Acepto los términos y condiciones más contrato de adhesión
                </Text>
                <View style={styles.containerBtn}>
                  <View style={{ marginRight: 40 }}>
                    <ButtonStatusAlta
                      style={styles.btnContratos}
                      //onPress={handleSubmit(onSubmit)}
                      // onPress={() =>
                      //   OpenAnything.Pdf(
                      //     "https://publuu.com/flip-book/4712/9016/page/4"
                      //   )
                      // }
                      onPress={() => handleModalDocuments("terminos")}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        Terminos y condiciones
                      </Text>
                    </ButtonStatusAlta>
                  </View>
                  <Controller
                    control={control}
                    rules={{
                      required: "Debe aceptar los términos y condiciones",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        value={value}
                        onValueChange={onChange}
                        // trackColor={{false: '#767577', true: '#81b0ff'}}
                        trackColor={{ true: Colors.pastel.french }}
                        thumbColor={
                          onChange ? Colors.pastel.french : Colors.pastel.french
                        }
                        ios_backgroundColor={Colors.pastel.french}
                      />
                    )}
                    name="acceptTerms"
                    defaultValue={false}
                  />
                </View>
                {errors.acceptTerms && (
                  <Text style={styles.error}>{errors.acceptTerms.message}</Text>
                )}

                {/* ESTA ES LA PARTE DE CONTRATO DE ADHESION */}
                {/* <Text style={styles.inputLabel}>Contrato de adhesión</Text> */}
                <View style={styles.containerBtn}>
                  <View style={{ marginRight: 40 }}>
                    <ButtonStatusAlta
                      style={styles.btnContratos}
                      // onPress={() =>
                      //   OpenAnything.Pdf(
                      //     "https://publuu.com/flip-book/4712/9016/page/4"
                      //   )
                      // }
                      onPress={() => handleModalDocuments("adhesion")}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#FFFFFF",
                          textAlign: "center",
                        }}
                      >
                        Contrato de adhesión
                      </Text>
                    </ButtonStatusAlta>
                  </View>
                  <Controller
                    control={control}
                    rules={{
                      required: "Debe aceptar el contrato de adhesión",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        value={value}
                        onValueChange={onChange}
                        // trackColor={{false: '#767577', true: '#81b0ff'}}
                        trackColor={{ true: Colors.pastel.french }}
                        thumbColor={
                          onChange ? Colors.pastel.french : Colors.pastel.french
                        }
                        ios_backgroundColor={Colors.pastel.french}
                      />
                    )}
                    name="acceptContract"
                    defaultValue={false}
                  />
                </View>
                {errors.acceptContract && (
                  <Text style={styles.error}>
                    {errors.acceptContract.message}
                  </Text>
                )}
              </View>
            )}

            {showElement && (
              <View style={styles.formAction}>
                {loading ? (
                  // Si loading es true, se muestra el indicador de carga
                  <ActivityIndicator size="large" />
                ) : (
                  !loading &&
                  // Si no está cargando y no hay errores, se muestra el botón de registrar
                  (!boletaSt && Object.keys(errors).length === 0 ? (
                    <ButtonPrimary
                      style={styles.btn}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text style={styles.btnTxt}>Registrar</Text>
                    </ButtonPrimary>
                  ) : (
                    // Si no está cargando pero hay errores, se muestra el mensaje de alerta
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
                        Hay campos requeridos que necesitan ser completados o
                        corregidos. ¡Verifica!
                      </Text>
                    </View>
                  ))
                )}
              </View>
            )}
            {/* <View>
                <Button title='pdf' onPress={() => OpenAnything.Pdf(pdfUri)}/>
                </View> */}

            {/* <PDFView
                    style={{backgroundColor: 'red'}}
                    source="file:///path/to/local/file.pdf"
                    distanceBetweenPages={16}
                    maxZoom={5}
                    onPageChange={(current, total) => {
                    console.log(current, total);
                    }}
                /> */}
          </View>
        </View>

        {/* 
        <WebView
          originWhitelist={["*"]}
          //source={{ uri: pdfUri }}
          source={{ uri: pdfUri || undefined }}
          style={{ height: 400, width: 350 }}
          onError={(error) => console.error("Error en WebView:", error)}
          //nestedScrollEnabled={true}
          //source={{ uri: `file:///${pdfUri}` }}
          //style={styles.pdf}
          //useWebKit={true}
          allowFileAccess={true}
          allowFileAccessFromFileURLs={true}
        /> */}

        {modalVisible && (
          <ModalDocuments
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            tipoContrato={tipoContrato}
          />
        )}

        {/* <WebView style={{ height: 500, width: 350 }} nestedScrollEnabled={true} source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=http://faa.unse.edu.ar/apuntes/ccaunidad1.pdf' }} /> */}
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundSize: "cover",
    //backgroundPosition: "center center",
  },
  webview: {
    flex: 1,
    // width: "100%",
    // height: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 24
  },
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 24,
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    flex: 1,
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 36,
    top: 0,
    marginVertical: 36,
  },
  headerImg: {
    width: 400,
    height: 100,
    resizeMode: "center",
    alignSelf: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 27,
    textAlign: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    height: 44,
    width: "105%",
    alignSelf: "center",
    //marginBottom: 20,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  form: {
    flex: 1,
    marginBottom: 24,
    width: "80%",
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    alignSelf: "flex-start",
    width: "100%",
  },
  inputLabelC: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    width: 320,
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "500",
    color: "#222",
  },
  error: {
    color: "red",
    fontSize: 14,
    alignSelf: "flex-start",
  },
  formAction: {
    marginVertical: 24,
  },
  btn: {
    //backgroundColor: "#000",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  btnContratos: {
    width: 200,
    //backgroundColor: "#1bbac8",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    //paddingHorizontal: 20,
  },
  btnUploadFile: {
    backgroundColor: "#00bf63",
    borderColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    //paddingHorizontal: 20,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "#00bf63",
    padding: 10,
    borderRadius: 8,
    marginRight: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 10,
  },
  line: {
    marginTop: 50,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    color: "blue",
  },
  buttonDisabled: {
    backgroundColor: "#A9A9A9",
  },
});
