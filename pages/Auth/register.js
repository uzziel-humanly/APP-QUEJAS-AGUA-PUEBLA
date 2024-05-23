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
      console.log("Error picking document: ", err);
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
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const takePhoto = async (option) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (option == "PICINEFRONTAL") {
      setImage(result.assets.name);
      setValue("imageIneFrontal", result);
    } else if (option == "PICINETRASERO") {
      setImage(result.assets.name);
      setValue("imageIneTrasero", result);
    } else if (option == "PICRECIBO") {
      setImage(result.assets.name);
      setValue("imageRecibo", result);
    } else if (option == "PICCDOM") {
      setImage(result.assets.name);
      setValue("imageComprobante", result);
    } else if (option == "SELFIE") {
      setImage(result.assets.name);
      setValue("selfie", result);
    }

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/logo_soapap.png")}
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
              <Text style={styles.inputLabel}>Nombre Completo</Text>
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
                    placeholder="Nombre Apellidos (Paterno y Materno)"
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
                name="noCuenta"
                defaultValue=""
              />
              {errors.noCuenta && (
                <Text style={styles.error}>{errors.noCuenta.message}</Text>
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
                name="cellphone"
                defaultValue=""
              />
              {errors.cellphone && (
                <Text style={styles.error}>{errors.cellphone.message}</Text>
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
                name="email"
                defaultValue=""
              />
              {errors.email && (
                <Text style={styles.error}>{errors.email.message}</Text>
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
                name="password"
                defaultValue=""
              />
              {errors.password && (
                <Text style={styles.error}>{errors.password.message}</Text>
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
                      <Picker.Item
                        label="Cliente Titular"
                        value="ClienteTitular"
                      />
                      <Picker.Item
                        label="Gestor Autorizado"
                        value="GestorAutorizado"
                      />
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

            <Text style={styles.inputLabel}>INE (Por ambos lados):</Text>
            <View style={styles.containerBtn}>
              {/* <TouchableOpacity style={styles.button} 
              //onPress={pickImage}
              onPress={() => pickImage('INEFILE')}
              >
                <FontAwesome name="file-photo-o" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Elige una pdf</Text>
              </TouchableOpacity> */}

              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("PICINEFRONTAL")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Foto frontal</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}

              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("PICINETRASERO")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Foto trasera</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>

            <Text style={styles.inputLabel}>Ultimo recibo Agua de Puebla:</Text>
            <View style={styles.containerBtn}>
              <Controller
                control={control}
                name="document"
                //rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() =>
                        handleDocumentPicker(setValue, "RECIBOPDF")
                      }
                    >
                      <FontAwesome
                        name="file-pdf-o"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.buttonText}>Adjunta un pdf</Text>
                    </TouchableOpacity>
                    {value && (
                      <Text style={styles.selectedText}>{value.name}</Text>
                    )}
                  </View>
                )}
              />
              {errors.document && (
                <Text style={styles.error}>Este campo es obligatorio.</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("PICRECIBO")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Toma una foto</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>

            <Text style={styles.inputLabel}>
              Comprobante de domicilio (No mayor a 3 meses):
            </Text>
            <View style={styles.containerBtn}>
              <Controller
                control={control}
                name="document"
                //rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => handleDocumentPicker(setValue, "CDOMIPDF")}
                    >
                      <FontAwesome
                        name="file-pdf-o"
                        size={24}
                        color="#FFFFFF"
                      />
                      <Text style={styles.buttonText}>Adjunta un pdf</Text>
                    </TouchableOpacity>
                    {value && (
                      <Text style={styles.selectedText}>{value.name}</Text>
                    )}
                  </View>
                )}
              />
              {errors.document && (
                <Text style={styles.error}>Este campo es obligatorio.</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                //onPress={takePhoto}
                onPress={() => takePhoto("PICCDOM")}
              >
                <AntDesign name="camera" size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Toma una foto</Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
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

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Acepto los términos y condiciones
              </Text>
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
              {errors.acceptTerms && (
                <Text style={styles.error}>{errors.acceptTerms.message}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Contrato de adhesión</Text>
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
              {errors.acceptContract && (
                <Text style={styles.error}>
                  {errors.acceptContract.message}
                </Text>
              )}
            </View>
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
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  webview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  // scrollContainer: {
  //   flexGrow: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 24
  // },
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
    // width: "100%",
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
});
