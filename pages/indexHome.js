import "react-native-gesture-handler";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { useHome } from "../hooks/useHome";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Home() {
  const { username, welcomeMessage, viewProfile, getTransparencia } = useHome();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.welcomeMessage}>{welcomeMessage}</Text>
        <TouchableOpacity onPress={viewProfile}>
          <MaterialCommunityIcons
            name="account-circle"
            color={"white"}
            size={26}
          />
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 40 }}>

        <View style={{marginBottom:40}}>
        <Text style={styles.title}>Nuestros horarios</Text>
        <Text style={styles.subtitle}>Lunes a viernes de 08:00 a 17:00</Text>
        </View>

        <Text style={styles.title}>Transparencia</Text>
        <View style={styles.groupButtons}>
          <TouchableOpacity
            style={styles.btnNeutral}
            onPress={() => {
              Linking.openURL(
                "https://consultapublicamx.plataformadetransparencia.org.mx/vut-web/faces/view/consultaPublica.xhtml?idEntidad=MjE=&idSujetoObligado=NDIzNg==#inicio"
              );
            }}
          >
            <Text style={styles.textNeutral}>Transparencia SOAPAP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnNeutral}
            onPress={getTransparencia}
          >
            <Text style={styles.textNeutral}>Obras del año</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Módulo comercial</Text>
        <TouchableOpacity style={styles.btnNeutral2}
           onPress={() => {
            Linking.openURL(
              "https://www.aguapuebla.mx/"
            );
          }}
        >
          <Text style={styles.textNeutral}>Mi servicio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const buttonWidth = (screenWidth - 60) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  welcomeMessage: {
    color: "#fff",
    flex: 1,
  },
  headerImg: {
    width: 350,
    height: 80,
    alignSelf: "center",
    marginBottom: 36,
  },
  title: {
    fontWeight: "700",
    fontSize: 27,
    textAlign: "left",
    marginLeft: 5,
    
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    marginLeft: 10,
    marginTop:10
  },
  input: {
    width: "100%",
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    backgroundColor: "#fff",
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontWeight: "500",
    color: "#222",
  },
  form: {
    width: "100%",
  },
  formAction: {
    marginVertical: 24,
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  signupText: {
    color: "#0000FF",
    textDecorationLine: "underline",
  },
  groupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 20,
  },
  btnNeutral: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: buttonWidth,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  btnNeutral2: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: screenWidth - 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 40,
  },
  textNeutral: {
    color: "#333333",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});
