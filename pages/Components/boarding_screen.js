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
import { useRegister } from "../../hooks/useRegister";

export default function BoardingScreen() {
  const { handleClickLogin } = useRegister();
  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../assets/banner.png")}
            style={styles.headerImg}
          />
          <Text style={styles.title}>¡Gracias por registrarte!</Text>
          <Text style={styles.subtitle}>
            Nuestro equipo de trabajo esta validando tu información, pronto nos
            comunicaremos contigo.
          </Text>

          <View style={styles.formAction}>
            <TouchableOpacity style={styles.btn} onPress={handleClickLogin}>
              <Text style={styles.btnTxt}>Regresar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
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
    width: 500,
    height: 200,
    resizeMode: "center",
    alignSelf: "center",
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
