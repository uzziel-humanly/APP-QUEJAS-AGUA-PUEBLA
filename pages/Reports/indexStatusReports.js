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
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Table, Row, Rows } from "react-native-table-component";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { useState, useEffect } from "react";

export default function IndexStatusReports() {
  const tableHead = ["Folio seguimiento", "Estatus"];
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    getTipoArchivos();
  }, []);

  const getTipoArchivos = async () => {
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getTipoArchivos`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        setReportes(_data);
      } else {
        console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const tableData = reportes.map((item) => [item.id, item.tipo]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Historial de reportes</Text>
          <View style={styles.line} />

          <Image
            source={require("../../assets/histReport2.png")}
            style={styles.headerImg}
          />

          <Text style={styles.subtitle}>Listado de reportes</Text>
        </View>

        <View style={styles.container2}>
          <Table borderStyle={styles.tableBorder}>
            <Row
              data={tableHead}
              style={styles.head}
              //textStyle={styles.text}
            />
            <Rows
              data={tableData}
              //textStyle={styles.text}
            />
          </Table>
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
  },
  scrollContainer: {
    flexGrow: 1,
    //justifyContent: "center",
    //alignItems: "center",
    // padding: 24
  },
  // scrollContainer2: {
  //   flexGrow: 1,
  //   justifyContent: "center",
  //   //alignItems: "center",
  //   // padding: 24
  // },
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
  container2: { flex: 1, padding: 16, color: "#ffffff" },
  head: { height: 40, backgroundColor: "#00bf63", color: "#FFFFFF" },
  text: { margin: 6 },
});
