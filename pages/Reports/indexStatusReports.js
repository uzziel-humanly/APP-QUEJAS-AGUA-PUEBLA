import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Table, Row, Rows } from "react-native-table-component";
import axios from "axios";
import { API_URL, API_TOKEN, API_AUTH } from "@env";
import md5 from "js-md5";
import { useState, useEffect, useCallback } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useReports } from "../../hooks/Reports/useReports";
import ModalReports from "./modalReports";
import { useFocusEffect } from "@react-navigation/native";
import { Title1, ButtonP } from "../../styles/index/stylesHome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from '@expo/vector-icons';

const getRandomColors = () => {
  const colorsList = [
    //["#fda400", "#fda400"],
    ["#00bf63", "#00bf63"],
    ["#1bbac8", "#1bbac8"],
    //["#72e128", "#72e128"],
    ["#26c6f9", "#26c6f9"],
    //["#dfdfe3", "#dfdfe3"],
    //["#7678100", "#7678100"],
    ["#4b4b4b", "#4b4b4b"],
  ];

  const randomIndex = Math.floor(Math.random() * colorsList.length);
  return colorsList[randomIndex];
};

export default function IndexStatusReports() {
  const {
    modalVisible,
    setModalVisible,
    idReporte,
    handleModalReport,
    status,
  } = useReports();

  const tableHead = ["Folio seguimiento", "Estatus"];
  const [reportes, setReportes] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getReportes();
      getEstatus();
    }, [])
  );

  // useEffect(() => {
  //   getReportes();
  //   getEstatus();
  // }, []);

  const getReportes = async () => {
    let _id_user = await AsyncStorage.getItem("id");
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const data = {
        id_usuario_app: _id_user,
      };
      let body = JSON.stringify(data);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getReportes`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      //console.log(response);

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        //console.log(_data);
        setReportes(_data);
        setLoading(false);
      } else {
        setLoading(false);
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      setLoading(false);
      //console.log("AAAAA");
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const getEstatus = async () => {
    let _id_user = await AsyncStorage.getItem("id");
    try {
      let pass = md5(API_TOKEN);
      let credentials = `${API_AUTH}:${pass}`;
      let encodedCredentials = btoa(credentials);
      let auth = "Basic " + encodedCredentials;

      const data = {
        id_usuario_app: _id_user,
      };
      let body = JSON.stringify(data);

      let response = await axios({
        method: "post",
        url: `${API_URL}/api/getEstatus`,
        headers: { Authorization: auth, "Content-Type": "application/json" },
        data: body,
      });

      if (response.data.estatus === "ok") {
        let _data = response.data.mensaje;
        setEstatus(_data);
      } else {
        //console.error("Error en la respuesta de la API");
      }
    } catch (error) {
      //console.error(error);
      alert("Ocurrió un error en el servidor");
    }
  };

  const tableData = reportes.map((item) => {
    const status = estatus.find((status) => status.id === item.estatus);
    return [item.id, status ? status.estatus : "Desconocido",item.folio];
  });

  console.log(tableData);

  //const tableData = reportes.map((item) => [item.id, item.tipo]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Title1>Historial de reportes</Title1>
          <View style={styles.line} />

          <Image
            source={require("../../assets/report5.png")}
            style={styles.headerImg}
          />

          <Text style={styles.subtitle}>Listado de reportes</Text>
        </View>

        <View style={styles.container2}>
          {loading ? (
            // Si loading es true, no se muestra nada
            <ActivityIndicator size="large" />
          ) : !loading && tableData != "" ? (
            <Table borderStyle={styles.tableBorder}>
              <Row
                data={tableHead}
                style={styles.head}
                textStyle={styles.textRow}
              />

              {/* <Rows data={tableData} textStyle={{ textAlign: "center" }} /> */}
              {tableData.map((reportes) => {
                let color;

                if (reportes[1] === "ALTA") {
                  color = "#1bbac8";
                } else if (reportes[1] === "TRAMITE") {
                  color = "#020402";
                } else if (reportes[1] === "CONCLUIDO") {
                  color = "#00bf63";
                } else if (reportes[1] === "Desconocido") {
                  color = "#D1CCDC";
                }

                return (
                  <TouchableOpacity
                    onPress={() => handleModalReport(reportes[0], reportes[1])}
                  >
                    <View
                      //key={index}
                      style={{
                        width: 350,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: color,
                        borderRadius: 20,
                      }}
                      //colors={getRandomColors()}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            alignSelf: "left",
                            color: "white",
                            fontWeight: "600",
                            marginRight: 50,
                          }}
                        >
                          {reportes[2]}
                        </Text>

                        <Text style={{ color: "white", fontWeight: "600" }}>
                          {reportes[1]}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Table>
          ) : (
            <View>
              <Text style={{ color: "black", textAlign: "center" }}>
                Ops, ¡Parece que no hay resultados!
              </Text>
            </View>
          )}

          {modalVisible && (
            <ModalReports
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              idReporte={idReporte}
              status={status}
            />
          )}
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
  head: { height: 40, backgroundColor: "#333333", color: "#fff52w",borderRadius:10 },
  text: { margin: 6 },
  textRow: {
    textAlign: "center",
    color: "white",
  },
});
