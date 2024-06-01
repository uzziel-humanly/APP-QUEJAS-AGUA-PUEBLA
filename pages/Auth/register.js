import { React, useEffect } from "react";
import {
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
} from "react-native";
import { useRegister } from "../../hooks/useRegister";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { CameraView, useCameraPermissions } from "expo-camera";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { WebView } from "react-native-webview";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PDFIMP } from "../../assets/docPrueba.pdf";

export default function Register() {
  //Boton para guardar el formulario
  const { onSubmit } = useRegister();
  //Formulario
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //Select normal
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");

  setValue("document", "NADA");

  const handleDocumentPicker = async (setValue, option) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.assets.length == 1) {
        if (option == "RECIBOPDF") {
          setSelectedDocument(result.assets.name);
          setValue("reciboPDF", result);
        } else if (option == "CDOMIPDF") {
          setSelectedDocument(result.assets.name);
          setValue("comprobantePDF", result);
        }
      }
    } catch (err) {
      //console.log("Error picking document: ", err);
    }
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    setImage(result.assets.name);
    setValue("image", result);
    //console.log(result);

    if (!result.cancelled) {
      //setImage(result.uri);
    }
  };

  const takePhoto = async (option) => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaType: "photo",
        allowsEditing: true,
        quality: 1,
      });

      let dato = {
        uri: result.assets[0].uri,
        type: "image/jpeg",
        name: result.assets[0].fileName,
      };

      if (option == "PICINEFRONTAL") {
        setImage(result.assets.name);
        setValue("Archivo2", dato);
      } else if (option == "PICINETRASERO") {
        setImage(result.assets.name);
        setValue("Archivo3", result.assets);
      } else if (option == "PICRECIBO") {
        setImage(result.assets.name);
        setValue("Archivo4", result.assets);
      } else if (option == "PICCDOM") {
        setImage(result.assets.name);
        setValue("imageComprobante", result.assets);
      } else if (option == "SELFIE") {
        setImage(result.assets.name);
        setValue("Archivo1", result.assets);
      }

      if (!result.canceled) {
        setImage(result.uri);
      }
    } catch (err) {
      //console.log("Error picking document: ", err);
    }
  };

  // const takePhoto = async (option) => {
  //   try {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaType: "photo",
  //       allowsEditing: true,
  //       quality: 0.1,
  //     });

  //     if (!result.canceled) {
  //       const photo = result.assets[0];
  //       const response = await fetch(photo.uri);
  //       const blob = await response.blob();

  //       // Prepare the form data
  //       const formData = new FormData();
  //       // Append the blob to the FormData
  //       formData.append("Archivo2", {
  //         uri: photo.uri,
  //         name: photo.fileName || "photo.jpg",
  //         type: photo.type || "image/jpeg",
  //         data: blob,
  //       });

  //       // Set the image and form data for the specific option
  //       if (option === "PICINEFRONTAL") {
  //         setImage(photo.uri);
  //         setValue("Archivo2", formData._parts[0]);
  //       } else if (option === "PICINETRASERO") {
  //         setImage(photo.uri);
  //         setValue("Archivo3", formData);
  //       } else if (option === "PICRECIBO") {
  //         setImage(photo.uri);
  //         setValue("Archivo4", formData);
  //       } else if (option === "PICCDOM") {
  //         setImage(photo.uri);
  //         setValue("imageComprobante", formData);
  //       } else if (option === "SELFIE") {
  //         setImage(photo.uri);
  //         setValue("Archivo1", formData);
  //       }
  //     }
  //   } catch (err) {
  //     console.log("Error picking document: ", err);
  //   }
  // };

  // const takePhoto = async (option) => {
  //   try {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaType: "photo",
  //       allowsEditing: true,
  //       quality: 0.1,
  //     });

  //     //console.log(result);

  //     if (!result.canceled) {
  //       const photo = result.assets[0];
  //       const formData = new FormData();

  //       formData.append("file", {
  //         uri: photo.uri,
  //         name: photo.fileName || "photo.jpg",
  //         type: photo.type || "image/jpeg",
  //       });

  //       let keyName = "";
  //       if (option === "PICINEFRONTAL") {
  //         keyName = "Archivo2";
  //         formData.append(keyName, {
  //           uri: photo.uri,
  //           name: photo.fileName || "photo.jpg",
  //           type: photo.type || "image/jpeg",
  //         });
  //         console.log(formData._parts[1]);
  //         setValue("Archivo2", formData._parts[1].uri);
  //       } else if (option === "PICINETRASERO") {
  //         keyName = "Archivo3";
  //         formData.append(keyName, {
  //           uri: photo.uri,
  //           name: photo.fileName || "photo.jpg",
  //           type: photo.type || "image/jpeg",
  //         });
  //         setValue("Archivo3", formData._parts[1].keyName);
  //       } else if (option === "PICRECIBO") {
  //         keyName = "Archivo4";
  //         formData.append(keyName, {
  //           uri: photo.uri,
  //           name: photo.fileName || "photo.jpg",
  //           type: photo.type || "image/jpeg",
  //         });
  //         setValue("Archivo4", formData._parts[1].keyName);
  //       } else if (option === "PICCDOM") {
  //         keyName = "imageComprobante";
  //       } else if (option === "SELFIE") {
  //         keyName = "Archivo1";
  //         formData.append(keyName, {
  //           uri: photo.uri,
  //           name: photo.fileName || "photo.jpg",
  //           type: photo.type || "image/jpeg",
  //         });
  //         setValue("Archivo4", formData._parts[1].keyName);
  //       }

  //       if (!result.canceled) {
  //         setImage(result.uri);
  //       }
  //     }
  //   } catch (err) {
  //     console.log("Error picking document: ", err);
  //   }
  // };

  // const [facing, setFacing] = useState("back");
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image
                source={require("../../assets/tuSoapap.png")}
                style={styles.headerImg}
              />
              <Text style={styles.title}>Formulario de Registro</Text>
              <Text style={styles.subtitle}>
                A continuación ingrese cada uno de los datos solicitados sin
                omitir campos.
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El nombre es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Nombre"
                    />
                  )}
                  name="nombre"
                  defaultValue=""
                />
                {errors.nombre && (
                  <Text style={styles.error}>{errors.nombre.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Apellido Paterno</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El apellido paterno es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Apellido paterno"
                    />
                  )}
                  name="apellido_p"
                  defaultValue=""
                />
                {errors.apellido_p && (
                  <Text style={styles.error}>{errors.apellido_p.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Apellido Materno</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El apellido materno es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Apellido materno"
                    />
                  )}
                  name="apellido_m"
                  defaultValue=""
                />
                {errors.apellido_m && (
                  <Text style={styles.error}>{errors.apellido_m.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Número de cuenta</Text>
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
                <Text style={styles.inputLabel}>Teléfono celular</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El número de celular es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType="numeric"
                      placeholder="221-222-2222"
                      maxLength={10}
                    />
                  )}
                  name="celular"
                  defaultValue=""
                />
                {errors.celular && (
                  <Text style={styles.error}>{errors.celular.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Correo electrónico</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "El correo electronico es obligatorio",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="usuario@ejemplo.com"
                    />
                  )}
                  name="correo"
                  defaultValue=""
                />
                {errors.correo && (
                  <Text style={styles.error}>{errors.correo.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Contraseña</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "La contraseña es obligatoria",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={true}
                      placeholder="*********"
                    />
                  )}
                  name="passprev"
                  defaultValue=""
                />
                {errors.passprev && (
                  <Text style={styles.error}>{errors.passprev.message}</Text>
                )}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Confirma tu contraseña</Text>
                <Controller
                  control={control}
                  rules={{
                    required: "La confirmación de contraseña es obligatoria",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.inputControl}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      secureTextEntry={true}
                      placeholder="*********"
                    />
                  )}
                  name="passwordConfirmation"
                  defaultValue=""
                />
                {errors.passwordConfirmation && (
                  <Text style={styles.error}>
                    {errors.passwordConfirmation.message}
                  </Text>
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
                        selectedValue={value}
                        style={styles.picker}
                        onValueChange={(itemValue) => {
                          onChange(itemValue);
                          setSelectedValue(itemValue);
                        }}
                      >
                        <Picker.Item label="Selecciona una opción" value="" />
                        <Picker.Item label="Cliente Titular" value="1" />
                        <Picker.Item label="Gestor Autorizado" value="2" />
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
                Nota: en caso de recibo de agua y comprobante domiciliario solo
                debe elegir una opción (Adjuntar PDF o tomar fotografia)
              </Text>

              <Text style={styles.inputLabel}>INE (Por ambos lados):</Text>
              <View style={styles.containerBtn}>
                <TouchableOpacity
                  style={styles.button}
                  //onPress={takePhoto}
                  onPress={() => takePhoto("PICINEFRONTAL")}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Foto frontal</Text>
                </TouchableOpacity>
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}

                <TouchableOpacity
                  style={styles.button}
                  //onPress={takePhoto}
                  onPress={() => takePhoto("PICINETRASERO")}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Foto trasera</Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDocumentPicker(setValue, "RECIBOPDF")}
                >
                  <FontAwesome name="file-pdf-o" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Adjunta un pdf</Text>
                </TouchableOpacity>
                {/* {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )}
                    </View>
                  )}
                />
                {errors.document && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )} */}

                <TouchableOpacity
                  style={styles.button}
                  //onPress={takePhoto}
                  onPress={() => takePhoto("PICRECIBO")}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Toma una foto</Text>
                </TouchableOpacity>
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
                  name="document"
                  //rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <View> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDocumentPicker(setValue, "CDOMIPDF")}
                >
                  <FontAwesome name="file-pdf-o" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Adjunta un pdf</Text>
                </TouchableOpacity>
                {/* {value && (
                        <Text style={styles.selectedText}>{value.name}</Text>
                      )}
                    </View>
                  )}
                />
                {errors.document && (
                  <Text style={styles.error}>Este campo es obligatorio.</Text>
                )} */}

                <TouchableOpacity
                  style={styles.button}
                  //onPress={takePhoto}
                  onPress={() => takePhoto("PICCDOM")}
                >
                  <AntDesign name="camera" size={24} color="#FFFFFF" />
                  <Text style={styles.buttonText}>Toma una foto</Text>
                </TouchableOpacity>
                {image && (
                  <Image source={{ uri: image }} style={styles.image} />
                )}
              </View>

              <Text style={styles.inputLabel}>Fotografia (Selfie):</Text>
              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("SELFIE")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Toma una foto</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}

              <View style={styles.line} />
              {/* ESTA ES LA PARTE DE TERMINOS Y CONDICIONES */}
              <Text style={styles.inputLabelC}>
                Acepto los términos y condiciones más contrato de adhesión
              </Text>
              <View style={styles.containerBtn}>
                <View style={{ marginRight: 40 }}>
                  <TouchableOpacity
                    style={styles.btnContratos}
                    //onPress={handleSubmit(onSubmit)}
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
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: "Debe aceptar los términos y condiciones",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Switch value={value} onValueChange={onChange} />
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
                  <TouchableOpacity
                    style={styles.btnContratos}
                    //onPress={handleSubmit(onSubmit)}
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
                  </TouchableOpacity>
                </View>
                <Controller
                  control={control}
                  rules={{
                    required: "Debe aceptar el contrato de adhesión",
                  }}
                  render={({ field: { onChange, value } }) => (
                    <Switch value={value} onValueChange={onChange} />
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

            <View style={styles.formAction}>
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.btnTxt}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    flex: 1,
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
    width: 250,
    height: 80,
    resizeMode: "center",
    alignSelf: "center",
    marginBottom: 20,
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
    marginBottom: 20,
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
    marginBottom: 16,
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
    backgroundColor: "#000",
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
    backgroundColor: "#1bbac8",
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
    backgroundColor: "#00bf63",
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
});
