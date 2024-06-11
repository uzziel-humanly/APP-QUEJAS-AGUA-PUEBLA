import React from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useReports } from "../../hooks/Reports/useReports";

export default function BoardingScreenReport() {
  const { handleClickReport } = useReports();
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/sendReport.gif")}
            style={styles.headerImg}
          />

          {/* <View style={styles.formAction}>
            <TouchableOpacity
              style={styles.btn}
              onPress={handleClickReport}
            >
              <Text style={styles.btnTxt}>Regresar</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundSize: "cover",
    // backgroundPosition: "center center",
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
  header: {
    width: "100%",
    alignItems: "center",
    marginBottom: 36,
    top: 0,
    marginVertical: 36,
  },
  headerImg: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
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
  formAction: {
    marginVertical: 24,
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
});
