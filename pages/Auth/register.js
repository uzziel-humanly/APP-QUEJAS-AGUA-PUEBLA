import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLogin } from "../../hooks/useLogin";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";

export default function Register() {
  const { onSubmit } = useLogin();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  //Select normal
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedDocument, setSelectedDocument] = useState("");

  const handleDocumentPicker = async (setValue) => {
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      if (result.assets.length == 1) {
        setSelectedDocument(result.assets.name);
        setValue("document", result);
      }
    } catch (err) {
      console.log("Error picking document: ", err);
    }
  };

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/logoAPPT.png")}
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

            <Text style={styles.inputLabel}>INE (Por ambos lados):</Text>
            <Controller
              control={control}
              name="document"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <View>
                  <TouchableOpacity
                    style={styles.btnUploadFile}
                    onPress={() => handleDocumentPicker(setValue)}
                  >
                    <Text style={styles.btnTxt}>Seleccionar Documento</Text>
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

            {/*** */}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#e8ecf4",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  //   scrollContainer: {
  //     flexGrow: 1,
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     padding: 24,
  //   },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
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
    resizeMode: "cover",
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
    backgroundColor: "#2f784a",
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
  },
  fileName: {
    marginTop: 10,
    fontSize: 16,
  },
});
