import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Table, Row, Rows } from "react-native-table-component";
import { useComplaints } from "../../hooks/Complaints/useComplaints";

export default function IndexStatusComplaints() {
  const{
    tableHead, tableData
  } = useComplaints();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Historial de quejas</Text>
          <View style={styles.line} />

          <Image
            source={require("../../assets/status-complaints.png")}
            style={styles.headerImg}
          />

          <Text style={styles.subtitle}>Listado de quejas</Text>
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
  head: { height: 40, backgroundColor: "#fff", color: "white" },
  text: { margin: 6, color:'#fff' },
});
